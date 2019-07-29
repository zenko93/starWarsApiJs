let header = document.querySelector('.header');
let menu = document.querySelectorAll('.menu');
let list = document.querySelector('.list');
let ul = document.querySelector('ul');
let description = document.querySelector('.description');
let descrKeys = document.querySelector('.keys');
let descrValues = document.querySelector('.values');
let search = document.querySelector('.search');
let title = document.querySelector('.title');
let backPopup = document.querySelector('.b-popup');
let regBtn = document.querySelector('.reg-button');
let closeBtn = document.querySelector('.close');
let confirmBtn = document.querySelector('.confirm');
let errorMesage = document.querySelector('.error-mesage');
let popupContent = document.querySelector('.b-popup-content');
let inputs = document.querySelector('.inputs');
let menuElement = ['people', 'starships', 'planets'];


header.addEventListener("click", openList);
search.addEventListener('input', searchListData);
list.addEventListener("click", openDescription);
regBtn.addEventListener("click", regButtonClick);
closeBtn.addEventListener('click', closeReg);
confirmBtn.addEventListener("click", confirmClick);
list.addEventListener('change', addDataWithCheckBox);

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

    if(!target.querySelectorAll('.menu')) {
        return;
    }

    showElement(search);
    menuElement.forEach(e => checkList(e, target));
    menuElement.forEach(e => menuElemDecoration(e, target));
}



function checkList(typeList, target) {
    if(target.classList.contains(typeList)){
        clearList();
        list.setAttribute('nameList', typeList);
        if(!list.innerHTML){
            addDataToList(typeList);
        }
    }

}



function addDataToList(dataIn) {
    getData(dataIn)
        .then(data => {
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.classList.add('containerItemsList');
            li.innerHTML = data[i].name;
            li.classList.add('li');
            span.append(li);
            list.append(span);

            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.classList.add('check-box');
            checkBox.setAttribute('name', li.innerHTML);
            span.append(checkBox);
        }
        console.log(list)
        })
}


function menuElemDecoration(typeList, target) {
    let listAttr = list.getAttribute('nameList');
    let menuElem = header.children;

    if(!target.classList.contains(typeList)) {
        return;
    }

    for (let i = 0; i < menuElem.length; i++) {
        if(!target.classList.contains('textDecoration')){
            menuElem[i].classList.remove('textDecoration');
        }
    }
    if(listAttr === typeList){
        target.classList.add('textDecoration');
    }
}



function clearList (){
    if(list.innerHTML){
        list.innerHTML = '';
    }
}



function openDescription(elem){
    let target = elem.target;

    if(!target.classList.contains('li')) {
        return;
    }
    showElement(title);
    menuElement.forEach(e => checkDescreption(e, target));
}



function checkDescreption(typeList, target){
    if(target.classList.contains('li') && list.getAttribute('nameList') === typeList){
        clearDescription();
        if(descrKeys.innerHTML === ''){
            addDataToDescription(typeList, target);
        }
    }
}



function clearDescription(){
    if(descrKeys.innerHTML || descrValues.innerHTML){
        descrKeys.innerHTML = '';
        descrValues.innerHTML = '';
    }
}


function addDataToDescription(dataIn, target) {
    getData(dataIn)
        .then(data => {
            let keys;
            let values;
            for (let i = 0; i < data.length; i++) {
                if(target.innerHTML === data[i].name || target === data[i].name){
                    keys = Object.keys(data[i]);
                    values = Object.values(data[i]);
                }
            }
            let divA = document.createElement('div');
            divA.classList.add('divA');
            keys.forEach(element => {
                filterKeysData(divA, element)
            });
            descrKeys.appendChild(divA);

            let divB = document.createElement('div');
            divB.classList.add('divB');
            values.forEach(element => {
                filterValuesData(divB, element);
            });
            descrValues.appendChild(divB);
    })
}


function filterKeysData (divA, element){
    if(element === 'films' || element === 'residents' || element === 'pilots') {
        return;
    }
    let div = document.createElement('div');
    div.innerHTML = `${element} :`;
    divA.appendChild(div);
}


function filterValuesData(divB, element) {
    let div = document.createElement('div');
    div.innerHTML = element;
    if(div.innerHTML.includes('films') || div.innerHTML.includes('people')){
        return;
    }
    divB.appendChild(div);
}


function addDataWithCheckBox(elem) {
    let target = elem.target;

    if(target.checked){
        console.log(target.getAttribute('name'));
        addDataToDescription('people', target.getAttribute('name'));
    }
}


function searchListData() {
    let val = search.value;
    let valUp = val.toUpperCase();
    let valLow = val.toLowerCase();

    let list = document.querySelectorAll('.li');
    console.log(list);
    for (let i = 0; i < list.length ; i++) {
        !list[i].innerHTML.includes(valUp || valLow) ? list[i].hidden = true : list[i].hidden = false;
    }
}


function showElement(elem) {
    elem.classList.add('visible');
}


function regButtonClick() {
    backPopup.classList.remove('hidden');
}


function closeReg() {
    backPopup.classList.toggle('hidden');
}


function confirmClick() {
    let inputList = inputs.children;
    let isFilled = true;

    for (let i = 0; i < inputList.length; i++) {
        isFilled = isFilled && ( /\S/.test(inputList[i].value));

        if(!/\S/.test(inputList[i].value)){
            inputList[i].classList.add('error');
            errorMesage.innerHTML = 'Заполните все поля';
        }
        else {
            errorMesage.innerHTML = '';
        }
    }

    checkName();
    checkEmail();
    checkPassword();
    checkData();
    if(isFilled) {
        backPopup.classList.add('hidden');
    }
}


function checkName() {
    let firstName = document.querySelector('.first-name');
    let lastName = document.querySelector('.last-name');

    if (!isNaN(firstName.value) || firstName.value.length < 2){
        firstName.focus();
        // firstName.classList.add('error');
        alert('Некоректное имя')
    }
    else if(!isNaN(lastName.value) || lastName.value.length < 2){
        lastName.focus();
        alert('Некоректная фамилия')
    }
}


function checkEmail() {
    let email = document.querySelector('.email');

    if(!email.value.includes('@')){
        email.focus();
        alert('Некоректная почта')
    }
}


function checkPassword() {
    let pas = document.querySelector('.password');
    let pasConfirm = document.querySelector('.password-confirm');
    let pasValue = pas.value;
    let pasConValue = pasConfirm.value;
    let number = /\d/.test(pasValue);
    let string = /\D/.test(pasValue);

    if(pasValue.length < 6 || !number || !string){
        pas.focus();
        alert('минимальное количество символов в пороле 6 из которых должна быть одна цифра и одна буква');
    }

    else if(pasValue !== pasConValue){
        pasConfirm.focus();
        alert('пороль не подтвержден');
    }
}


function checkData() {
    let date = document.querySelector('.birthday');
    let dateArr = date.value.split('-');

    if (!isNaN(date.value)){
        date.focus();
        alert('Заполните дату рождения')
    }
    else if(dateArr[0] > 2019){
        date.focus();
        date.classList.add('error');
        alert('Кажется вы ошиблись годом')
    }
}


