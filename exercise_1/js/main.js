
const API = "https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json";
let passengers = [],
    filterList = [],
    genderFilterList = [],
    statusFilterList = [],
    radioBtnGender = document.getElementsByName('gender'),
    radioBtnStatus = document.getElementsByName('status');

function getJson(url) {
    return fetch(url)
        .then(res => res.json())
        .then(data => handleData(data))
        .catch(err => {
            console.log(err);
        })
};

function handleData(data) {
    passengers = [...data];
    renderPassengerList(passengers);
}

function init() {
    getJson(API);
    document.querySelector('.filter').addEventListener('submit', e => {
        e.preventDefault();
        filter(document.querySelector('.search-field__input').value);
    })
}

function renderPassengerList(list) {
    const block = document.querySelector('.passengers');
    for (let item of list) {
        block.insertAdjacentHTML('beforeend', renderListItem(item));
    }
};

function renderListItem(item) {
    return `<div class="passenger passenger-${item.id}">
                <p>${item.id} --- ${item.name}, ${item.gender}, ${item.age}, is survived?: ${item.survived}</p>
            </div>`
}

function filter(value) {
    const regexp = new RegExp(value, 'i');
    filterList = passengers.filter(item => regexp.test(item.name));
    passengers.forEach(item => setInvisible(filterList, item));
    radioBtnGender.forEach(item => item.checked = false);
    radioBtnStatus.forEach(item => item.checked = false);
};

function setGender(value) {
    let list = filterList.length == 0 ? passengers : filterList;
    genderFilterList = list.filter(item => item.gender == value);
    passengers.forEach(item => setInvisible(genderFilterList, item))
};

function setStatus(value) {
    let list = filterList.length == 0 ? passengers : filterList;
    list = genderFilterList.length == 0 ? list : genderFilterList;
    statusFilterList = list.filter(item => (String(item.survived)) == value);
    passengers.forEach(item => setInvisible(statusFilterList, item))
};

const setInvisible = (list, item) => {
    const block = document.querySelector(`.passenger-${item.id}`);
    if (!list.includes(item)) {
        block.classList.add('invisible');
    } else {
        block.classList.remove('invisible');
    }
};

window.onload = init();
