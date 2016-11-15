"use strict";

class WordAdmin
{
    constructor(downloadedDictionary, polishInput, englishInput, czechInput) 
    {
        this.downloadedDictionary = downloadedDictionary;
        this.polishInput = polishInput;
        this.czechInput = czechInput;
        this.englishInput = englishInput;

        this.workingDictionary = [];
        this.downloadedDictionaryNode = null;
        this.workingDictionaryNode = null;
    }

    bindPolishInput(input)
    {
        this.polishInput = input;
        return this;
    }

    bindEnglishInput(input)
    {
        this.englishInput = input;
        return this;
    }

    bindCzechInput(input)
    {
        this.englishInput = input;
        return this;
    }

    bindDownloadedDictionaryNode(node)
    {
        this.downloadedDictionaryNode = node;
        return this;
    }

    composeDictionaryEntry(element) 
    {
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row');

        let PL = document.createElement('h5');
        PL.setAttribute('class', 'col s4 center-align');
        PL.setAttribute('style', 'border-right: 1px solid grey');
        PL.textContent = element.pl;

        let EN = document.createElement('h5');
        EN.setAttribute('class', 'col s4 center-align');
        EN.setAttribute('style', 'border-right: 1px solid grey');
        EN.textContent = element.en;

        let CZ = document.createElement('h5');
        CZ.setAttribute('class', 'col s4 center-align');
        CZ.textContent = element.cz;

        row1.appendChild(PL);
        row1.appendChild(EN);
        row1.appendChild(CZ);

        let resultNode = document.createElement('div');
        resultNode.setAttribute('class', 'card ');
        resultNode.appendChild(row1);

        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row');

        if(element.imgPath.toString().length > 0)
        {
            let IMG = document.createElement('img');
            IMG.setAttribute('class', 'col s6 center-align');
            IMG.setAttribute('src', element.imgPath);
            row2.appendChild(IMG);
        }

        if(element.symbol.toString().length > 0)
        {
            let SYMBOL = document.createElement('img');
            SYMBOL.setAttribute('class', 'col s6 center-align');
            SYMBOL.setAttribute('src', element.symbol);
            row2.appendChild(SYMBOL);
        }

        if(element.symbol.toString().length > 0 || element.imgPath.toString().length > 0)
        {
            resultNode.appendChild(row2);
        }

        return resultNode;
    }

    renderDictionaryToNode(dictionary, node)
    {
        dictionary.forEach(function(element) {
            node.appendChild(composeDictionaryEntry(element));
        }, this);
    }

    renderDownloadedDictionary()
    {
        if(!this.downloadedDictionaryNode) return;
        this.renderDictionaryToNode(this.downloadedDictionary, this.downloadedDictionaryNode);
    }
}