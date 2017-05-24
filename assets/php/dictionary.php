<?php

function readDictionary($filename = null)
{
    $filenames = "../db.json";
    $unparsedDictionary = file_get_contents( $filenames );

    if($unparsedDictionary)
    {
        return json_decode($unparsedDictionary, true);
    }
}

function saveDictionary($dictionary, $filename = null)
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
    $workingEntry["id"] = $dictionary[count($dictionary) - 1]["id"] + 1;
    array_push($dictionary, $workingEntry);

    return $dictionary;
}