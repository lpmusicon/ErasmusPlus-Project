"use strict";

class WordFinder {
    constructor(langCollection, inputElement, resultEl, dictionary, listElement) {
        this.langCollection = langCollection;
        this.inputEl = inputElement;
        this.resultEl = resultEl;
        this.dictionary = dictionary;
        this.listElement = listElement;
    }

    findMatching() {
        let inputValue = this.inputEl.value.toLowerCase();
        let lang = null;
        let node = {'pl':'Nie znaleziono', 'en':'Not found', 'cz':'???', 'imgPath':'assets/error.svg', 'symbol':'assets/error.svg'};
        
        this.langCollection.forEach(function(element) {
            if(element.checked) 
                lang = element.value.toLowerCase();
        }, this);

        this.dictionary.forEach(function (dictionaryNode) {
            if(dictionaryNode[lang].toLowerCase() == inputValue.toLowerCase()) 
                node = dictionaryNode;
        }, this);

        return node;
    }

    renderMatch() {
        let matchingNode = this.findMatching();
        let resultNode = this.prepareResultNodes(matchingNode);

        this.resultEl.innerHTML = "";
        this.resultEl.appendChild(resultNode);
    }

    renderList() {
        this.dictionary.forEach(function(node) {
            this.listElement.appendChild(this.prepareResultNodes(node));
        }, this);
    }

    prepareResultNodes(node) {
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row');

        let PL = document.createElement('h4');
        PL.setAttribute('class', 'col s4 center-align');
        PL.setAttribute('style', 'border-right: 1px solid grey');
        PL.textContent = node.pl;

        let EN = document.createElement('h4');
        EN.setAttribute('class', 'col s4 center-align');
        EN.setAttribute('style', 'border-right: 1px solid grey');
        EN.textContent = node.en;

        let CZ = document.createElement('h4');
        CZ.setAttribute('class', 'col s4 center-align');
        CZ.textContent = node.cz;

        row1.appendChild(PL);
        row1.appendChild(EN);
        row1.appendChild(CZ);

        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row');

        let IMG = document.createElement('img');
        IMG.setAttribute('class', 'col s6 center-align');
        IMG.setAttribute('src', node.imgPath);

        let SYMBOL = document.createElement('img');
        SYMBOL.setAttribute('class', 'col s6 center-align');
        SYMBOL.setAttribute('src', node.symbol);

        row2.appendChild(IMG);
        row2.appendChild(SYMBOL);

        let resultNode = document.createElement('div');
        resultNode.setAttribute('class', 'card ');
        resultNode.appendChild(row1);
        resultNode.appendChild(row2);

        return resultNode;
    }
}