<?php

namespace ErasmusPlusProject;

require 'dictionary.php';

if(isset($_GET['id'])) {
    $dictionary = readDictionary();
    $id = $_GET['id'];
    for($i = 0; $i < count($dictionary); $i++)
    {
        if($id == $dictionary[$i]["id"]) {
            array_splice($dictionary, $i, 1);
        }
    }
    saveDictionary($dictionary);
}