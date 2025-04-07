"use strict"
function NewObject(HTMLobject,inputValue,textareaValue){
    this.HTMLobject = HTMLobject;
    this.inputValue = inputValue;
    this.textareaValue = textareaValue;
}
function addDocumentList(HTMLArray){
    for (let object of HTMLArray){
        let HTMLList = object.HTMLobject;
        document.querySelector(".main__list").appendChild(HTMLList);
    }
}
function removeDocumentList(HTMLArray){
    for (let object of HTMLArray){
        let HTMLList = object.HTMLobject;
        HTMLList.remove();
    }
}
let listArray = [];
let confirmButton  = document.querySelector(".main__confirm-button");
confirmButton.addEventListener("click", function (event) {
    let input= document.querySelector(".main__head-input");
    let textarea = document.querySelector(".main__main-text-input");
    let inputValue = input.value;
    let textareaValue = textarea.value;
    if (inputValue) {
        let listItem = document.createElement('li');
        let listItemHeader = listItem.appendChild(document.createElement("h4"));
        listItemHeader.textContent = inputValue;
        let listItemMainText = listItem.appendChild(document.createElement("p"));
        listItemMainText.textContent = textareaValue;
        let listItemCloseButton = listItem.appendChild(document.createElement("div"));
        listItemCloseButton.className = "close-button";
        listItemCloseButton.textContent = "x";
        input.value = '';
        textarea.value = '';
        let listObject = new NewObject(listItem, inputValue, textareaValue);
        listArray.push(listObject);
        addDocumentList(listArray);
        listItem.querySelector(".close-button").addEventListener("click", function (event) {
            listItem.remove();
            listArray = listArray.filter((item) => item.HTMLobject !== listItem);
        });
    };
});
document.querySelector(".sort-to-lower-button").addEventListener("click", function (event) {
    removeDocumentList(listArray);
    listArray.sort( function (a,b) {return a.inputValue.length - b.inputValue.length; } );
    addDocumentList(listArray);
});
document.querySelector(".sort-to-higher-button").addEventListener("click", function (event) {
    removeDocumentList(listArray);
    listArray.sort( function (a,b) {return b.inputValue.length - a.inputValue.length; } );
    addDocumentList(listArray);
});