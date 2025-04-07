    "use strict"
    GETPromise()
        .then(result => {
            addListItems(result);
        });
    const list = document.querySelector(".main__list");
    function getFormattedDateTime() {
        const now = new Date();
        const options = {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'long'
        };
        const dateTimeString = now.toLocaleString('en-US', options);
        const timeZoneOffset = now.getTimezoneOffset();
        const gmtOffset = `GMT${timeZoneOffset > 0 ? '-' : '+'}${Math.abs(timeZoneOffset / 60).toString().padStart(2, '0')}00`;
        return `${dateTimeString} ${gmtOffset}`;
    };

async function POST_GETpromise(object){
    await POSTPromise(object)
    await GETPromise()
        .then(result => {
            addListItems(result);
        });
}
async function POSTPromise(object) {
    let promise = await fetch("https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object),
    });
};
async function GETPromise() {
    let promise = await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos`);
    let json = await promise.json();
    return json;
};
async function DELETEPromise(id) {
    let promise = await fetch(`https://6709508caf1a3998baa11eb3.mockapi.io/api/v1/todos/${id}`, {
        method: "DELETE"
    });
};
function addListItems(json){
    for (let objects of json){
        let listItem = document.createElement('li');
        listItem.classList.add(objects.id);
        let listItemHeader = listItem.appendChild(document.createElement("h4"));
        listItemHeader.textContent = objects.title;
        let listItemMainText = listItem.appendChild(document.createElement("p"));
        listItemMainText.textContent = objects.description;
        let listItemCloseButton = listItem.appendChild(document.createElement("div"));
        listItemCloseButton.className = "close-button";
        listItemCloseButton.textContent = "x";
        listItemCloseButton.addEventListener("click", ()=>{
            listItemCloseButton.parentElement.remove();
            let idItem = listItemCloseButton.parentElement.classList.value;
            DELETEPromise(idItem);
        });
        list.appendChild(listItem);
        };

}
function removeListItem(){
    for (let lil of document.querySelectorAll('li')){
        lil.remove();
    }
}
    let confirmButton  = document.querySelector(".main__confirm-button");
confirmButton.addEventListener("click", function (event) {
    let input= document.querySelector(".main__head-input");
    let textarea = document.querySelector(".main__main-text-input");
    let inputValue = input.value;
    let textareaValue = textarea.value;
    let data = getFormattedDateTime();
    if (inputValue) {
        let ListItemObject = {
            createdAt: data,
            title: inputValue,
            description: textareaValue,
            done: true,
        };
        input.value = '';
        textarea.value = '';
        removeListItem();
        POST_GETpromise(ListItemObject);
    };
});
document.querySelector(".sort-to-lower-button").addEventListener("click", function (event) {
    removeListItem();
    GETPromise()
        .then(result => {
            result.sort(function (a, b) {return a.title.length - b.title.length});
            addListItems(result);
        })
});
document.querySelector(".sort-to-higher-button").addEventListener("click", function (event) {
    removeListItem();
    GETPromise()
        .then(result => {
            result.sort(function (a, b) {return b.title.length - a.title.length});
            addListItems(result);
        });
});