let header = document.querySelector('.header');
let menu = document.querySelectorAll('.menu');
let list = document.querySelector('.list');
let li = document.querySelectorAll('.li');
let ul = document.querySelector('ul');
let descrKeys = document.querySelector('.keys');
let descrValues = document.querySelector('.values');
let search = document.querySelector('.search');
let inputValue;


header.addEventListener("click", openList);
search.addEventListener('input', input);
list.addEventListener("click", openDescription);


async function getData(dataIn) {
    try {
        let response = await fetch(`https://swapi.co/api/${dataIn}`);
        let data = await response.json();

        return data.results;

    }
    catch (error) {
        throw new Error(`Не удалось получить данные`);
    }
}



function openList(elem) {
    let target = elem.target;

    if(!target.querySelectorAll('.menu')) return;
    document.querySelector('.search').classList.add('visible');

    if(target.classList.contains('people')){
        clearList();
        list.setAttribute('nameList', 'people');
        if(list.innerHTML === ''){
            addDataToList('people');
        }
    }
    if(target.classList.contains('starships')){
        clearList();
        list.setAttribute('nameList', 'starships');
        if(list.innerHTML === ''){
            addDataToList('starships');
        }
    }
    if(target.classList.contains('planets')){
        clearList();
        list.setAttribute('nameList', 'planets');
        if(list.innerHTML === ''){
            addDataToList('planets');
        }
    }

}



function addDataToList(data) {
    getData(data)
        .then((data) => {
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = data[i].name;
            li.classList.add('li');
            list.append(li);
        }
    });
}



function clearList (){
    if(list.innerHTML){
        list.innerHTML = '';
    }
}



function openDescription(elem){
    let target = elem.target;

    if(!target.classList.contains('li')) return;

    document.querySelector('.title').classList.add('visible');
    if(target.classList.contains('li') && list.getAttribute('nameList') === 'people'){
        clearDescription();
        if(descrKeys.innerHTML === ''){
            addDataToDescription('people', elem);
        }
    }

    if(target.classList.contains('li') && list.getAttribute('nameList') === 'starships'){
        clearDescription();
        if(descrKeys.innerHTML === ''){
            addDataToDescription('starships', elem);
        }
    }

    if(target.classList.contains('li') && list.getAttribute('nameList') === 'planets'){
        clearDescription();
        if(descrKeys.innerHTML === ''){
            addDataToDescription('planets', elem);
        }
    }
}


function clearDescription(){
    if(descrKeys.innerHTML || descrValues.innerHTML){
        descrKeys.innerHTML = '';
        descrValues.innerHTML = '';
    }
}


function addDataToDescription(dataIn, elem) {
    getData(dataIn)
        .then((data) => {
            let keys;
            let values;
            let target = elem.target;
            for (let i = 0; i < data.length; i++) {
                if(target.innerHTML === data[i].name){
                    keys = Object.keys(data[i]);
                    values = Object.values(data[i]);
                }
            }
            keys.forEach((element) => {
                    let div = document.createElement('div');
                    div.innerHTML = `${element} :`;
                    descrKeys.appendChild(div);
            });
            values.forEach((element) => {
                    let div = document.createElement('div');
                    div.innerHTML = element;
                    descrValues.appendChild(div);
            });
    })
}



function input() {
    inputValue = search.value;
    filterListData();
}



function filterListData() {
    let val = inputValue.toLowerCase();
    for (let i = 0; i < ul.children.length ; i++) {
        !ul.children[i].innerHTML.includes(val) ? ul.children[i].hidden = true : ul.children[i].hidden = false;
    }
}


// function checkListOpen() {
//     list.className = list.className === 'visible'? 'hidden' :'visible';
// }




