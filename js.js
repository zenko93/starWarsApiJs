let header = document.querySelector('.header');
let menu = document.querySelectorAll('.menu');
let list = document.querySelector('.list');
let descrKeys = document.querySelector('.keys');
let descrValues = document.querySelector('.values');
let search = document.querySelector('.search');
let title = document.querySelector('.title');
let backPopup = document.querySelector('.b-popup');
let regBtn = document.querySelector('.reg-button');
let confirmBtn = document.querySelector('.confirm');
let errorName = document.querySelector('.errorName');
let errorLastName = document.querySelector('.errorLastName');
let errorEmail = document.querySelector('.errorEmail');
let errorBirthday = document.querySelector('.errorBirthday');
let errorPass = document.querySelector('.errorPass');
let errorConfirmPass = document.querySelector('.errorConfirmPass');
let errors = document.querySelector('.errors');
let menuElement = ['people', 'starships', 'planets'];


header.addEventListener("click", openList);
search.addEventListener('input', searchListData);
list.addEventListener("click", openDescription);
regBtn.addEventListener("click", regButtonClick);
backPopup.addEventListener('click', popupUpHide);
confirmBtn.addEventListener("click", checkErrors);
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

    menuElement.forEach(e => checkList(e, target));
    menuElement.forEach(e => menuElemDecoration(e, target));
}



function checkList(typeList, target) {
    if(target.classList.contains(typeList)){
        clearList();
        showElement(search);
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
            divB.setAttribute('name', target);
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
    let name = target.getAttribute('name');
    let divValues = descrValues.children;

    if(target.checked){
        showElement(title);
        addDataToDescription(list.getAttribute('nameList'), name);
    }
    else {
        for (let i = 0; i < divValues.length; i++) {
            if(name === divValues[i].getAttribute('name')){
                divValues[i].hidden = true;
                descrKeys.children[i].hidden = true;
            }
        }
    }
}


function searchListData() {
    let val = search.value;
    let valLow = val.toLowerCase();
    let arrList = [];
    let list = document.querySelectorAll('.li');

    for (let i = 0; i < list.length ; i++) {
        arrList.push(list[i].innerHTML.toLowerCase());
        !arrList[i].includes(valLow) ? list[i].hidden = true: list[i].hidden = false;
    }
}


function showElement(elem) {
    elem.classList.add('visible');
}


function regButtonClick() {
    backPopup.classList.remove('hidden');
}


function popupUpHide(elem) {
    let target = elem.target;

    if(target.className === 'b-popup' || target.className === 'close') {
        backPopup.classList.toggle('hidden');
    }
}


function checkErrors() {
    let childrenErr = errors.children;
    let isFilled = true;
    checkName();
    checkSurname();
    checkEmail();
    checkPassword();
    checkConfirmPass();
    checkData();

    for (let i = 0; i < childrenErr.length ; i++) {
        isFilled = isFilled && (childrenErr[i].innerHTML === '');
    }
    if (isFilled){
        backPopup.classList.add('hidden');
    }
}



function checkName() {
    let firstName = document.querySelector('.first-name');
    let noNumber = /\d/.test(firstName.value);
    let noSymbol = /\s/.test(firstName.value);

    if ( noSymbol || noNumber || firstName.value.length < 2){
        firstName.focus();
        errorName.innerHTML = 'Некоректное имя';
        firstName.classList.add('error');
    }
    else {
        firstName.classList.remove('error');
        errorName.innerHTML = '';
    }
}

function checkSurname() {
    let lastName = document.querySelector('.last-name');
    let noNumber = /\d/.test(lastName.value);
    let noSymbol = /\s/.test(lastName.value)

    if( noSymbol || noNumber || lastName.value.length < 2){
        lastName.focus();
        errorLastName.innerHTML = 'Некоректная фамилия';
        lastName.classList.add('error');
    }
    else {
        errorLastName.innerHTML = '';
        lastName.classList.remove('error');
    }
}


function checkEmail() {
    let email = document.querySelector('.email');

    if(!email.value.includes('@')){
        email.focus();
        errorEmail.innerHTML = 'Некоректная почта';
        email.classList.add('error');
    }
    else {
        errorEmail.innerHTML = '';
        email.classList.remove('error');
    }
}


function checkPassword() {
    let pas = document.querySelector('.password');
    let pasValue = pas.value;
    let number = /\d/.test(pasValue);
    let string = /\D/.test(pasValue);

    if(pasValue.length < 6 || !number || !string){
        pas.focus();
        errorPass.innerHTML = 'Пороль должен содержать 6 символов из которых минимум 1 буква и 1 цифра.';
        pas.classList.add('error');
    }
    else {
        errorPass.innerHTML = '';
        pas.classList.remove('error');
    }
}


function checkConfirmPass() {
    let pas = document.querySelector('.password');
    let pasConfirm = document.querySelector('.password-confirm');

    if(pas.value !== pasConfirm.value){
        pasConfirm.focus();
        errorConfirmPass.innerHTML = 'Пороль не совпадает';
        pasConfirm.classList.add('error');
    }
    else if(pas.value === ''){
        pasConfirm.classList.add('error');
    }
    else {
        errorConfirmPass.innerHTML = '';
        pasConfirm.classList.remove('error');
    }
}


function checkData() {
    let date = document.querySelector('.birthday');
    let dateArr = date.value.split('-');

    if (!isNaN(date.value)){
        date.focus();
        errorBirthday.innerHTML = 'Заполните дату рождения';
        date.classList.add('error');
    }
    else if(dateArr[0] > 2019){
        date.focus();
        date.classList.add('error');
        errorBirthday.innerHTML = 'Кажется вы ошиблись годом';
    }
    else {
        errorBirthday.innerHTML = '';
        date.classList.remove('error');
    }
}


