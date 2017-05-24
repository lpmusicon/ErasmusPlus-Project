"use strict";

class WordAdmin
{
    constructor(polishInput, englishInput, czechInput)
    {
        this.polishInput = polishInput;
        this.czechInput = czechInput;
        this.englishInput = englishInput;

        this.workingDictionary = [];
        this.downloadedDictionary = [];
        this.downloadedDictionaryNode = null;

        this.currentSymbol = document.createElement('input');
        this.currentSymbol.setAttribute('type', 'file');

        this.currentPhoto = document.createElement('input');
        this.currentPhoto.setAttribute('type', 'file');

        this.fetchDictionary();
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

        this.postToServer();
    }

    postToServer()
    {
        let fData = new FormData();
        fData.append("entry", JSON.stringify(this.workingDictionary[this.workingDictionary.length - 1]));
        if(this.currentSymbol.files.length > 0) {
            fData.append("symbol", this.currentSymbol.files[0], this.currentSymbol.value);
        }
        if(this.currentPhoto.files.length > 0) {
            fData.append("image", this.currentPhoto.files[0], this.currentPhoto.value);
        }
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'assets/php/dictionaryAppend.php', true);

        var a = this;
        xhr.onreadystatechange = function(e) {
            a.currentPhoto.setAttribute('type', 'text');
            a.currentPhoto.setAttribute('type', 'file');
            a.currentSymbol.setAttribute('type', 'text');
            a.currentSymbol.setAttribute('type', 'file');
            a.fetchDictionary();
        }
        xhr.send(fData);
    }

    fetchDictionary()
    {
        fetch("assets/db.json")
        .then((response) => {
            return response.json();
        })
        .then((dictionary) => {
            this.downloadedDictionary = dictionary.reverse();
            this.renderDownloadedDictionary();
        });
    }

    polishInput(input)
    {
        this.polishInput = input;
        return this;
    }

    englishInput(input)
    {
        this.englishInput = input;
        return this;
    }

    czechInput(input)
    {
        this.englishInput = input;
        return this;
    }

    symbolInput(button)
    {
        var cs = this.currentSymbol;
        button.onclick = function(e) {
            cs.click();
        };
        return this;
    }

    photoInput(button)
    {
        var cp = this.currentPhoto;
        button.onclick = function(e) {
            cp.click();
        };
        return this;
    }

    addButton(button)
    {
        var wa = this;
        button.onclick = function(e) {
            wa.addNewEntry();
        }
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
        ROW.setAttribute('class', 'col s1 right-align');

        let DELETE = document.createElement('a');
        DELETE.setAttribute('onclick', 'deleteElement(' + element.id + ')');
        DELETE.setAttribute('class', 'waves-effect waves-red btn-flat');
        DELETE.setAttribute('style', 'padding: 2px 1rem 0 1rem; height: 100%');
        DELETE.innerHTML = '<i class="material-icons">delete</i>';

        row1.appendChild(PL);
        row1.appendChild(EN);
        row1.appendChild(CZ);

        ROW.appendChild(DELETE);

        row1.appendChild(ROW);

        let resultNode = document.createElement('div');
        resultNode.setAttribute('class', 'card z-depth-2');
        resultNode.appendChild(row1);

        let row2 = document.createElement('div');
        row2.setAttribute('class', 'row center-align');

        let valignWrapper = document.createElement('div');
        valignWrapper.setAttribute('class', 'center-align valign-wrapper col s12');
        valignWrapper.setAttribute('style', 'padding: 32px');

        if(element.imgPath.toString().length > 0)
        {
            let IMG = document.createElement('img');
            IMG.setAttribute('class', 'valign');
            IMG.setAttribute('src', element.imgPath);
            IMG.setAttribute('style', "max-height: 135px;");

            valignWrapper.appendChild(IMG);
        }

        if(element.symbol.toString().length > 0)
        {
            let SYMBOL = document.createElement('img');
            SYMBOL.setAttribute('class', 'valign');
            SYMBOL.setAttribute('src', element.symbol);
            SYMBOL.setAttribute('style', "max-height: 100px;");

            valignWrapper.appendChild(SYMBOL);
        }

        row2.appendChild(valignWrapper);

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
}
