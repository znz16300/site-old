let burgerItem = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let header = document.querySelector('.header');
let activeLink = document.querySelector('.list-item_active');
let btnLeft = document.querySelector('.arrow_left');
let btnRight = document.querySelector('.arrow_right');
let sliderItems = document.querySelector('.pet_slider__items');
let modalWindow = document.querySelector('.modal__wrapper');

const m_teach = document.getElementById("m_teach");

m_teach.addEventListener("click",()=>{
    setPageKey(`Вчителі`, keyTablePages);
})


let currentPetNumbers = [];




function changeOverflow() {
    let overflowY = document.body.style.overflowY;
    document.body.style.overflowY = overflowY != 'hidden' ? 'hidden' : 'visible';
}

function toggleMenu() {
    menu.classList.toggle('header__nav-active');
    burgerItem.classList.toggle('header__burger-active');
    header.classList.toggle('header_active');

    changeOverflow();
}



function computeNumberItemsInSlider() {
    let width = window.innerWidth;

    if (width > 1279) return 3;
    else if (width > 767) return 2;
    else return 1;
}

function getRandomNumbers(maxNumber) {
    let numbers = [];
    let howManyNumbers = computeNumberItemsInSlider();

    while (numbers.length != howManyNumbers) {
        let randomNumber = Math.ceil(Math.random() * maxNumber);
        if (![...currentPetNumbers, ...numbers].includes(randomNumber)) numbers.push(randomNumber);
    }

    currentPetNumbers = [...numbers];

    return numbers;
}

function createSlideItem(item, classForAnimation) {
    let petItem = document.createElement('div');
    petItem.classList.add('pet_slider__item');
    if (classForAnimation) petItem.classList.add(classForAnimation);
    petItem.dataset.id = item.id;

    let petItemImage = document.createElement('div');
    petItemImage.classList.add('pet_slider__item-image');

    let image = document.createElement('img');
    image.setAttribute('src', item.img);
    image.setAttribute('alt', item.name);

    let petName = document.createElement('div');
    petName.classList.add('pet_slider__item-name');
    petName.innerText = item.name;

    let button = document.createElement('button');
    button.classList.add('pet_slider__item-button');
    button.innerText = 'Більше...';

    petItemImage.append(image);
    petItem.append(petItemImage, petName, button);

    return petItem;
}

function fillModalWindow(item) {
    let petImage = document.querySelector('.modal__image img');
    petImage.setAttribute('alt', item.name);
    petImage.setAttribute('src', item.img);

    let petName = document.querySelector('.pet_info__name');
    petName.textContent = item.name;

    let petType = document.querySelector('.pet_info__type');
    petType.textContent = `${item.type} - ${item.breed}`;

    let petAbout = document.querySelector('.pet_info__about');
    petAbout.textContent = item.description;

    let petAge = document.querySelector('.pet__info__age .value');
    petAge.textContent = item.age;

}

function updateSlider(classForAnimation) {
    let oldPetItems = document.querySelectorAll('.pet_slider__item');
    oldPetItems.forEach(i => i.classList.add(classForAnimation));
    let sliderContainer = document.querySelector('.pet_slider__items');
    let numbersForShow = getRandomNumbers(pets.length);
    let petItems = numbersForShow.map(n => createSlideItem(pets[n - 1], classForAnimation));

    if (classForAnimation == 'item_animation-left') sliderContainer.prepend(...petItems);
    else sliderContainer.append(...petItems);

    if (classForAnimation == undefined) oldPetItems.forEach(i => i.remove());

    setTimeout(x => {
        petItems.forEach(i => i.classList.remove(classForAnimation));
        oldPetItems.forEach(i => i.remove());
    }, 480);
}

function toggleModalWindow() {
    modalWindow.classList.toggle('modal__wrapper_active');
    changeOverflow();
}

burgerItem.addEventListener('click', () => toggleMenu());

menu.addEventListener('click', e => {
    if (!e.target.closest('.header__list')) toggleMenu();
});

activeLink.addEventListener('click', e => {
    if (document.querySelector('.header__nav-active')) {
        e.preventDefault();
        toggleMenu();
    }
});

btnLeft.addEventListener('click', () => {
    btnLeft.disabled = true;
    setTimeout(() => {
        btnLeft.disabled = false;
    }, 500);
    updateSlider('item_animation-left');
});

btnRight.addEventListener('click', () => {
    btnRight.disabled = true;
    setTimeout(() => {
        btnRight.disabled = false;
    }, 500);
    updateSlider('item_animation-right')
});

window.addEventListener("resize", () => {
    if (currentPetNumbers.length != computeNumberItemsInSlider()) updateSlider();
});

sliderItems.addEventListener('click', e => {
    let sliderItem = e.target.closest('.pet_slider__item');
    if (!sliderItem) return;

    let itemId = sliderItem.dataset.id;
    fillModalWindow(pets.find(p => p.id == itemId));
    toggleModalWindow();
});

modalWindow.addEventListener('click', e => {
    if (!e.target.closest('.modal') || e.target.closest('.modal_close')) toggleModalWindow();
});

function setStorage(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}
  


function updateStorage(){
    let keyNews = window.localStorage.getItem("keyTableForNews");
    if (keyNews === null) {
        let s = prompt("Уведіть ключ для новин", "");
        if (s !== null){
            window.localStorage.setItem("keyTableForNews", s); 
        }            
    }    
}

function setStorage(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}

function getStorage(name, subst = null) {
    return JSON.parse(window.localStorage.getItem(name) || subst);
}

function delStorage(name) {
    localStorage.removeItem(name);
}

function setPageKey(title, key){
    setStorage('keyPages', key);
    setStorage('titlePages', title);
    document.location.href = './page.html';
}
 

// updateStorage();
updateSlider();