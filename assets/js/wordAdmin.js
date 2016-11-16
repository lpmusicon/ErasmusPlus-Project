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

        this.currentSymbol = document.createElement('input');
        this.currentSymbol.setAttribute('type', 'file');

        this.currentPhoto = document.createElement('input');
        this.currentPhoto.setAttribute('type', 'file');
    }

    addNewEntry()
    {
        let PL = this.polishInput.value;
        let EN = this.englishInput.value;
        let CZ = this.czechInput.value;

        if(PL.length == 0 && EN.length == 0 && CZ.length == 0)
            return;

        let entry = {
            "pl": PL,
            "en": EN,
            "cz": CZ,
            "imgPath": "",
            "symbol": ""
        };

        this.workingDictionary.push(entry);

        this.polishInput.value = "";
        this.englishInput.value = "";
        this.czechInput.value = "";

        this.currentSymbol.setAttribute('type', 'text');
        this.currentSymbol.setAttribute('type', 'file');

        this.postToServer();
    }

    postToServer()
    {
        let fData = new FormData();
        fData.append("entry", JSON.stringify(this.workingDictionary));
        fData.append("symbols[]", this.currentSymbol.value);
        fData.append("images[]", this.currentPhoto.value);
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

    bindSymbolInput(button)
    {
        var cs = this.currentSymbol;
        button.onclick = function(e) {
            cs.click();
        };
    }

    bindPhotoInput(button)
    {
        var cp = this.currentPhoto;
        button.onclick = function(e) {
            cp.click();
        };
    }

    bindAddButton(button)
    {
        var wa = this;
        button.onclick = function(e) {
            wa.addNewEntry();
        }
    }

    bindDownloadedDictionaryNode(node)
    {
        this.downloadedDictionaryNode = node;
        return this;
    }

    bindWorkingDictionaryNode(node)
    {
        this.workingDictionaryNode = node;
        return this;
    }


    composeDictionaryEntry(element)
    {
        let row1 = document.createElement('div');
        row1.setAttribute('class', 'row valign-wrapper');

        let PL = document.createElement('h5');
        PL.setAttribute('class', 'col s3 center-align');
        PL.setAttribute('style', 'border-right: 1px solid #ccc; font-size: 1.3rem');
        PL.textContent = element.pl;

        let EN = document.createElement('h5');
        EN.setAttribute('class', 'col s4 center-align');
        EN.setAttribute('style', 'border-right: 1px solid #ccc;font-size: 1.3rem');
        EN.textContent = element.en;

        let CZ = document.createElement('h5');
        CZ.setAttribute('class', 'col s3 center-align');
        CZ.setAttribute('style', 'font-size: 1.3rem');
        CZ.textContent = element.cz;

        let ROW = document.createElement('div');
        ROW.setAttribute('class', 'col s2 right-align');

        let EDIT = document.createElement('a');
        EDIT.setAttribute('class', 'waves-effect waves-orange btn-flat disabled');
        EDIT.setAttribute('style', 'padding: 2px 1rem 0 1rem; height: 100%');
        EDIT.innerHTML = '<i class="material-icons">edit</i>';

        let DELETE = document.createElement('a');
        DELETE.setAttribute('class', 'waves-effect waves-red btn-flat disabled');
        DELETE.setAttribute('style', 'padding: 2px 1rem 0 1rem; height: 100%');
        DELETE.innerHTML = '<i class="material-icons">delete</i>';

        row1.appendChild(PL);
        row1.appendChild(EN);
        row1.appendChild(CZ);

        ROW.appendChild(EDIT);
        ROW.appendChild(DELETE);

        row1.appendChild(ROW);

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
        //Gods forgive me please
        node.innerHTML = "";

        dictionary.forEach(function(element) {
            node.appendChild(this.composeDictionaryEntry(element));
        }, this);
    }

    renderDownloadedDictionary()
    {
        if(!this.downloadedDictionaryNode) return;
        this.renderDictionaryToNode(this.downloadedDictionary, this.downloadedDictionaryNode);
    }

    renderWorkingDictionary()
    {
        if(!this.workingDictionaryNode) return;
        this.renderDictionaryToNode(this.workingDictionary, this.workingDictionaryNode);
    }
}
