<?php

namespace ErasmusPlusProject;

class FileUploader
{
    private $file;

    public function __construct()
    {

    }

    private function clearBuffer()
    {
        $this->file = null;
    }

    private function isImage()
    {
        return getimagesize($this->file["tmp_name"]) !== false;
    }

    private function generateFilename()
    {
        $uploadPath = "../../img/";
        $extension = ".".pathinfo($this->file["name"], PATHINFO_EXTENSION);
        return $uploadPath.uniqid("img").$extension;
    }

    private function moveFile()
    {
        $fName = $this->generateFilename();
        if(move_uploaded_file($this->file["tmp_name"], $fName))
        {
            $this->clearBuffer();
            return "img/".basename( $fName );
        }
        else
        {
            $this->clearBuffer();
            return "";
        }
    }

    public function uploadFile($file)
    {
        $this->file = $file;
        if($this->isImage())
        {
            return $this->moveFile();
        }
        else 
        {
            $this->clearBuffer();
            return "";
        }
    }
}