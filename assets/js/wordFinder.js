"use strict";

class WordFinder
{
    constructor(langCollection, inputElement, resultEl, dictionary, listElement) {
        this.langCollection = langCollection;
        this.inputEl = inputElement;
        this.resultEl = resultEl;
        this.dictionary = dictionary;
        this.listElement = listElement;
    }

    generateNotFoundTemplate() {
        return {
            'pl':'Nie znaleziono',
            'en':'Not found',
            'cz':'???',
            'imgPath': '',
            'symbol': ''
        };
    }

    findMatching() {
        let inputValue = this.inputEl.value.toLowerCase();
        let lang = null;
        let node = this.generateNotFoundTemplate();

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

        let PL = document.createElement('h5');
        PL.setAttribute('class', 'col s4 center-align');
        PL.setAttribute('style', 'border-right: 1px solid grey');
        PL.textContent = node.pl;

        let EN = document.createElement('h5');
        EN.setAttribute('class', 'col s4 center-align');
        EN.setAttribute('style', 'border-right: 1px solid grey');
        EN.textContent = node.en;

        let CZ = document.createElement('h5');
        CZ.setAttribute('class', 'col s4 center-align');
        CZ.textContent = node.cz;

        row1.appendChild(PL);
        row1.appendChild(EN);
        row1.appendChild(CZ);

        let resultNode = document.createElement('div');
        resultNode.setAttribute('class', 'card z-depth-2');
        resultNode.appendChild(row1);

        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row center-align');

        let valignWrapper = document.createElement('div');
        valignWrapper.setAttribute('class', 'center-align valign-wrapper col s12');
        valignWrapper.setAttribute('style', 'padding: 32px');

        if(node.imgPath.toString().length > 0)
        {
            let IMG = document.createElement('img');
            IMG.setAttribute('class', 'valign');
            IMG.setAttribute('src', node.imgPath);
            IMG.setAttribute('style', "max-height: 135px;");

            valignWrapper.appendChild(IMG);
        }

        if(node.symbol.toString().length > 0)
        {
            let SYMBOL = document.createElement('img');
            SYMBOL.setAttribute('class', 'valign');
            SYMBOL.setAttribute('src', node.symbol);
            SYMBOL.setAttribute('style', "max-height: 100px;");

            valignWrapper.appendChild(SYMBOL);
        }

        row2.appendChild(valignWrapper);

        if(node.symbol.toString().length > 0 || node.imgPath.toString().length > 0)
        {
            resultNode.appendChild(row2);
        }



        return resultNode;
    }
}
