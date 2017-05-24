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
if(isset($stream["symbol"])) {
    $stream["symbol"] = $fileUploader->uploadFile($stream["symbol"]);
}
if(isset($stream["images"])) {
    $stream["image"] = $fileUploader->uploadFile($stream["images"]);
}

$dictionary = readDictionary();
$dictionary = appendEntry($dictionary, $stream);
saveDictionary($dictionary, "");
