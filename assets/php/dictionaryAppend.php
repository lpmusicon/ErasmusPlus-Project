<?php

namespace ErasmusPlusProject;

require 'fileUpload.php';

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
    $workingEntry["imgPath"] = $entry["image"] == NULL ? "" : $entry["image"];
    $workingEntry["symbol"] = $entry["symbol"] == NULL ? "" : $entry["symbol"];
    
    array_push($dictionary, $workingEntry);

    return $dictionary;
}

function readFromStream()
{
    return [
        "entry" => json_decode($_POST['entry'], true), 
        "symbol" => $_FILES["symbol"], 
        "images" => $_FILES["image"]];
}

$stream = readFromStream();
$fileUploader = new FileUploader();

$stream["symbol"] = $fileUploader->uploadFile($stream["symbol"]);
$stream["image"] = $fileUploader->uploadFile($stream["images"]);

$dictionary = readDictionary("");
$dictionary = appendEntry($dictionary, $stream);
saveDictionary($dictionary, "");
