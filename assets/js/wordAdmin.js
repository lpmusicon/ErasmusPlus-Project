"use strict";

class WordAdmin
{
    constructor(dictionary, listElement) 
    {
        this.dictionary = dictionary;
        this.listElement = listElement;
        this.wordFinder = new WordFinder();
    }
}