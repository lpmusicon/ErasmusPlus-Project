<?php

namespace ErasmusPlusProject;

function readDictionary(string $filename)
{
    $filenames = "../db.json";
    $unparsedDictionary = file_get_contents( $filenames );

    if($unparsedDictionary)
    {
        return json_decode($unparsedDictionary, true);
    }
}

function saveDictionary($dictionary, string $filename)
{
    $filename = "../db.json";
    $stringify = json_encode($dictionary);

    file_put_contents($filename, $stringify);
}

function appendEntry($dictionary, $entry)
{
    $workingEntry = $entry["entry"];
    $workingEntry["imgPath"] = $entry["images"][0] == NULL ? "" : $entry["images"][0];
    $workingEntry["symbol"] = $entry["symbols"][0] == NULL ? "" : $entry["symbols"][0];
    array_push($dictionary, $workingEntry);

    return $dictionary;
}

function readFromStream()
{
    $entry = json_decode($_POST['entry'], true);
    $symbols = $_FILES["symbols"];
    $images = $_FILES["images"];
    
    return [ "entry" => $entry[0], "symbols" => $symbols, "images" => $images ];
}

function uploadFiles($files)
{
    $uploaded = [];
    for($i = 0; $i < count($files["tmp_name"]); $i++)
    {
        $check = getimagesize($files["tmp_name"][$i]);
        if($check !== false) {
            $newName = "../../img/".uniqid("img").".".pathinfo($files["name"][$i], PATHINFO_EXTENSION);
            if (move_uploaded_file($files["tmp_name"][$i], $newName)) 
            {
                array_push($uploaded, "img/".basename( $newName ));
            }
            else array_push($uploaded, "");
        }
    }
    return $uploaded;
}

$stream = readFromStream();
$stream["symbols"] = uploadFiles($stream["symbols"]);
$stream["images"] = uploadFiles($stream["images"]);
$dictionary = readDictionary("");

$dictionary = appendEntry($dictionary, $stream);
saveDictionary($dictionary, "");
