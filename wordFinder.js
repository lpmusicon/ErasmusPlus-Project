"use strict";

class WordFinder {
    constructor(langCollection, inputElement, resultElement, dictionary, listElement) {
        this.langCollection = langCollection;
        this.inputElement = inputElement;
        this.resultElement = resultElement;
        this.dictionary = dictionary;
        this.listElement = listElement;
        this.wordFinder = this;
    }

    findMatching() {
        let inputValue = inputElement.value.toLowerCase();
        let lang = null;
        let node = {'pl':'Nie znaleziono', 'en':'Not found', 'cz':'???', 'imgPath':'assets/error.svg', 'symbol':'assets/error.svg'};
        langCollection.forEach(function(element) {
            if(element.checked) 
                lang = element.value.toLowerCase();
        }, this);

        dictionary.forEach(function (dictionaryNode) {
            if(dictionaryNode[lang].toLowerCase() == inputValue.toLowerCase()) 
                node = dictionaryNode;
        }, this);

        return node;
    }

    renderMatch() {
        let matchingNode = wordFinder.findMatching();
        let resultNode = wordFinder.prepareResultNodes(matchingNode);

        resultElement.innerHTML = "";
        resultElement.appendChild(resultNode);
    }

    renderList() {
        this.dictionary.forEach(function(node) {
            this.listElement.appendChild(this.prepareResultNodes(node));
        }, this);
    }

    prepareResultNodes(node) {
        let PL = document.createElement('div');
        PL.textContent = node.pl;

        let EN = document.createElement('div');
        EN.textContent = node.en;

        let CZ = document.createElement('div');
        CZ.textContent = node.cz;

        let IMG = document.createElement('img');
        IMG.setAttribute('src', node.imgPath);

        let SYMBOL = document.createElement('img');
        SYMBOL.setAttribute('src', node.symbol);

        let resultNode = document.createElement('div');
        resultNode.appendChild(PL);
        resultNode.appendChild(EN);
        resultNode.appendChild(CZ);
        resultNode.appendChild(IMG);
        resultNode.appendChild(SYMBOL);

        return resultNode;
    }
}