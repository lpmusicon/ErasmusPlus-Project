<?php

require 'dictionary.php';

$jsonTable = readDictionary();

for($i = 0; $i < count($jsonTable); $i++)
{
    if(!isset($jsonTable[$i]["id"])) {
        $jsonTable[$i]["id"] = $i;
        var_dump($jsonTable[$i]);
    } 
}

saveDictionary($jsonTable);