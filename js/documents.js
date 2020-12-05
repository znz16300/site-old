var d1 = "";
let sheet = "1";

let newsData = [];

const keyTableNews ="1O_bJjH8TAHww34uxA51rdyJoX4PaxMGOzL57N8G7H34";
var url  = "https://spreadsheets.google.com/feeds/list/"+keyTableNews+"/"+sheet+"/public/values?alt=json";

let burgerItem = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');
let header = document.querySelector('.header');
let activeLink = document.querySelector('.list-item_active');
let modalWindow = document.querySelector('.modal__wrapper');
let cards = document.querySelector('.cards');
let arrowNext = document.querySelector('.arrow_next');
let arrowPrevious = document.querySelector('.arrow_previous');
let arrowToStart = document.querySelector('.arrow_to_start');
let arrowToEnd = document.querySelector('.arrow_to_end');
let currentPageBtn = document.querySelector('.page_number');
let navigation = document.querySelector('.pages');
let pages = [];

function changeOverflow() {
    let overflowY = document.body.style.overflowY;
    document.body.style.overflowY = overflowY != 'hidden' ? 'hidden' : 'visible';
    document.body.style.paddingRight = overflowY != 'hidden' ? `${getScrollbarWidth()}px` : '0';
}

function toggleMenu() {
    menu.classList.toggle('header__nav-active');
    burgerItem.classList.toggle('header__burger-active');
    header.classList.toggle('header_active');

    changeOverflow();
}

function fillModalWindow(item) {
    let petImage = document.querySelector('.modal__image img');
    petImage.setAttribute('alt', item.name);
    petImage.setAttribute('src', item.img);

    let petName = document.querySelector('.pet_info__name');
    //petName.textContent = item.name;
    petName.innerHTML = `<a class="docum__link" href="${item.description}" target="_blank">${item.name}</a>`

    let petType = document.querySelector('.pet_info__type');
    petType.textContent = `${item.type}`;
    
    // petType.innerHTML = `<a class="docum__link" href="${item.description}" target="_blank">${item.name}</a>`

    let petAbout = document.querySelector('.pet_info__about');
    //petAbout.textContent = item.description;
    petAbout.innerHTML = `<a class="docum__link" href="${item.description}" target="_blank">${item.description}</a>`


    let petAge = document.querySelector('.pet__info__age .value');
    petAge.textContent = item.age;

    let petInoculations = document.querySelector('.pet_info__inoculations .value');
    petInoculations.textContent = item.inoculations.join(', ');

    let petDiseases = document.querySelector('.pet_info__diseases .value');
    petDiseases.textContent = item.diseases.join(', ');

    let petParasites = document.querySelector('.pet_info__parasites .value');
    petParasites.textContent = item.parasites.join(', ');

    let btnLoad = document.getElementById('act__button');
    btnLoad.setAttribute('onclick', `window.location.href="${item.description}"`);



}

function toggleModalWindow() {
    modalWindow.classList.toggle('modal__wrapper_active');

    changeOverflow();
}

function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

function computeNumberItemsOnPage() {
    let width = window.innerWidth;
    if (width > 1279) 
        return 8;
    else 
        if (width > 767) 
            return 6;
    else 
        return 3;
}

function shuffle(array) {
    // let i = array.length, j = 0;

    // while (i--) {
    //     j = Math.floor(Math.random() * (i + 1));
    //     [array[i], array[j]] = [array[j], array[i]];
    // }

    return array;
}

function calculatePages() {
    pages = [];
    let items = [];
    let itemsOnPage = computeNumberItemsOnPage();
    let pagesCount = Math.ceil(newsData.length / itemsOnPage);
    for (let i = newsData.length - 1; i >= 0; i--){
        items.push(i+1);
    }
    for (let i = 0; i < pagesCount; i++) {
        pages.push(items.slice(i*itemsOnPage, (i+1)*itemsOnPage))
    }
}

function createCardItem(item) {
    let cardItem = document.createElement('div');
    cardItem.classList.add('cards__item');
    cardItem.dataset.id = item.id;
    let cardItemImage = document.createElement('div');
    cardItemImage.classList.add('cards__item-image');
    let image = document.createElement('img');
    image.setAttribute('src', item.img);
    image.setAttribute('alt', item.name);
    image.setAttribute('width', "160px");
    let cardItemName = document.createElement('div');
    cardItemName.classList.add('cards__item-name');
    cardItemName.innerText = item.name;
    let button = document.createElement('button');
    button.classList.add('cards__item-button');
    button.innerText = 'Читати далі...';
    // button.setAttribute('click', 'window.location.href="'+item.type+'"')  //item.type
    cardItemImage.append(image);
    cardItem.append(cardItemImage, cardItemName, button);
    return cardItem;
}

function drawPage(pageNumber) {
    let cardContainer = document.querySelector('.cards');
    let itemNumbersForShow = pages[pageNumber - 1];
    let itemsForShow = itemNumbersForShow.map(n => createCardItem(newsData[n - 1]));
    cardContainer.innerHTML = '';
    cardContainer.append(...itemsForShow);
    window.scrollBy(0,-2000);
}

function changeDisableStatus(pageNumber) {
    arrowToStart.disabled = arrowPrevious.disabled =
        pageNumber == 1 ? true : false;

    arrowToEnd.disabled = arrowNext.disabled =
        pageNumber == pages.length ? true : false;
    
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

cards.addEventListener('click', e => {
    let card = e.target.closest('.cards__item');
    if (!card) return;

    let itemId = card.dataset.id;
    // console.log(itemId);
    // console.log(newsData.find(p => p.id == itemId));
    window.open(newsData.find(p => p.id == itemId)["description"]);

    // fillModalWindow(newsData.find(p => p.id == itemId));
    // toggleModalWindow();
});

modalWindow.addEventListener('click', e => {
    if (!e.target.closest('.modal') || e.target.closest('.modal_close')) toggleModalWindow();
});

window.addEventListener("resize", () => {
    if (pages[0] !== undefined){
        if (pages[0].length != computeNumberItemsOnPage()) {
            calculatePages();
            currentPageBtn.textContent = 1;
            drawPage(currentPageBtn.textContent);
            changeDisableStatus(currentPageBtn.textContent);
        }
    }
    
});

navigation.addEventListener('click', e => {
    let target = e.target.closest('.pages__paginator');
    if (!target) return;

    let direction = target.dataset.direction;

    switch (direction) {
        case 'toStart':
            currentPageBtn.textContent = 1;
            break;
        case 'previous':
            currentPageBtn.textContent--;
            break;
        case 'next':
            currentPageBtn.textContent++;
            break;
        case 'toEnd':
            currentPageBtn.textContent = pages.length;
            break;

        default:
            return;
    }

    drawPage(currentPageBtn.textContent);
    changeDisableStatus(currentPageBtn.textContent);
});

function readNews(){
    $.getJSON(url,
       function (data) {
            data = data['feed']['entry'];
            for (let i=0; i<data.length;i++){
                console.log("============");
                console.log(data[i]);
                if (data[i]["gsx$show"]["$t"] !== ""){
                    d1 = data[i];
                    // console.log(d1);
                    let images = d1["gsx$фотонеобовязково"]["$t"].split(",");
                    let codeImages = [] 
                    let photoPath = ""
                    for(let j=0; j<images.length; j++){
                        let start = images[j].indexOf('?id=') + 4;
                        // let end  = images[j].indexOf('/edit');
                        // let l = end - start -1;
                        let ss = images[j].substr(start);
                        codeImages.push(ss);
                    }
                    
                    let im = ""
                    if (codeImages[0].length === 0) {
                        im = './assets/images/docum.png';
                    } else {
                        im = "http://drive.google.com/uc?export=view&id="+codeImages[0]
                    }
                    // nophoto.png
                    let newsOne = {
                        "id": String(i+1),
                        "name": d1["gsx$назвадокументу"]["$t"],
                        "img": im,
                        "type": d1["gsx$посиланнянадокумент"]["$t"],
                        "breed": "",
                        "description": d1["gsx$файлдокументу"]["$t"],
                        "age": d1["gsx$позначкачасу"]["$t"],
                        "inoculations": ["none"],
                        "diseases": ["none"],
                        "parasites": ["none"]
                    }
                    newsData.push(newsOne);
                }
                
            }
            // console.log(newsData);   
            calculatePages();
            drawPage(currentPageBtn.textContent);
            changeDisableStatus(currentPageBtn.textContent);         
        }

        
    );
    
}

window.onscroll = function() {
    var scrollElem = document.getElementById("scrollToTop");
    if (document.body.scrollTop > document.documentElement.clientHeight) {
       scrollElem.style.opacity = "1";
    } else {
        scrollElem.style.opacity = "0.5";
    }
 }

var timeOut;
function goUp() {
    // window.scrollBy(0,-2000);
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
       window.scrollBy(0,-20);
       timeOut = setTimeout('goUp()',20);
    } else clearTimeout(timeOut);
}

const scroolBtn = document.getElementById("scrollToTop");

scroolBtn.addEventListener("click", ()=>{
    goUp();
});


readNews();


    





