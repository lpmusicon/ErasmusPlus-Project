<?php

namespace ErasmusPlusProject;

require 'fileUpload.php';
require 'dictionary.php';

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
