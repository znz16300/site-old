var d1 = "";
let sheet = "1";

let newsData = [];

// const keyTableNews ="1O_bJjH8TAHww34uxA51rdyJoX4PaxMGOzL57N8G7H34";
var url  = "https://spreadsheets.google.com/feeds/list/"+keyTableDocs+"/"+sheet+"/public/values?alt=json";

let burgerItem_2 = document.querySelector('.header__burger_2');
let menu_2 = document.querySelector('.header__nav');
let header_2 = document.querySelector('.header');
let activeLink_2 = document.querySelector('.list-item_active');
let modalWindow = document.querySelector('.modal__wrapper');
let cards = document.querySelector('.cards');
let arrowNext = document.querySelector('.arrow_next');
let arrowPrevious = document.querySelector('.arrow_previous');
let arrowToStart = document.querySelector('.arrow_to_start');
let arrowToEnd = document.querySelector('.arrow_to_end');
let currentPageBtn = document.querySelector('.page_number');
let navigation = document.querySelector('.pages');
let pages = [];
let res = [];

function changeOverflow_2() {
    let overflowY = document.body.style.overflowY;
    document.body.style.overflowY = overflowY != 'hidden' ? 'hidden' : 'visible';
    document.body.style.paddingRight = overflowY != 'hidden' ? `${getScrollbarWidth_2()}px` : '0';
}

function toggleMenu_2() {
    menu_2.classList.toggle('header__nav-active');
    burgerItem_2.classList.toggle('header__burger-active');
    header_2.classList.toggle('header_active');

    changeOverflow_2();
}

function getTitle(url){
    $.ajax({
        url : url,
        type : "GET",
        success : function(msg){
            let res = msg.match(/<title>(.*?)<\/title>/);
            console.log(res);
            return res[1];
        }
    });
}

function fillModalWindow(title, item) {

    let petName = document.querySelector('.pet_info__name');
    petName.innerText = title;

    let petAbout = document.querySelector('.pet_info__about');

    let i = 0;
    item.forEach(link=>{
        i++;
        let ttle = getTitle(link);
        petAbout.innerHTML += `<p><a  class="docum__link" href="${link}" target="_blank" title="${ttle}">Документ ${i}</a></p><br>`
    });
    
}

function toggleModalWindow() {
    modalWindow.classList.toggle('modal__wrapper_active');

    changeOverflow_2();
}

function getScrollbarWidth_2() {
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

function find(id, list){
    let f = false;
    list.forEach(e=>{
        if (e.id === id){
            f = true;
            return f;
        }
    })
    return f;
}

function createCardItem(item) {
    if (true){
        let cardItem = document.createElement('div');
        cardItem.classList.add('cards__item');
        cardItem.classList.add('shake-hard');
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
        cardItemImage.append(image);
        cardItem.append(cardItemImage, cardItemName, button);
        return cardItem;
    }
    
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

burgerItem_2.addEventListener('click', () => toggleMenu_2());

menu_2.addEventListener('click', e => {
    if (!e.target.closest('.header__list')) toggleMenu_2();
});

activeLink_2.addEventListener('click', e => {
    if (document.querySelector('.header__nav-active')) {
        e.preventDefault();
        toggleMenu_2();
    }
});

cards.addEventListener('click', e => {
    let card = e.target.closest('.cards__item');
    if (!card) return;
    let listLinks = [];
    let itemId = card.dataset.id;
    let link = newsData.find(p => p.id == itemId)["description"];
    if (link !== "") {
        let links = link.split(',');
        links.forEach(e=>{
            listLinks.push(e);
        })
    } 

    let id_ = newsData.find(p => p.id == itemId);
    link = id_["type"];
    if (link !== "") {
        let links = link.split(',');
        links.forEach(e=>{
            listLinks.push(e);
        })
    } 
    if (listLinks.length === 1){
        window.open(listLinks[0], '_blank');
    } else {
        //make modalwindow
        fillModalWindow(id_['name'], listLinks);
        toggleModalWindow();
    }


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

function loadDocuments(data, d){
    data = data['feed']['entry'];
    newsData = [];
    for (let i=0; i<data.length;i++){
        if (data[i]["gsx$show"]["$t"] !== ""){
            d1 = data[i];
            let images = d1["gsx$фотонеобовязково"]["$t"].split(",");
            let codeImages = [] 
            let photoPath = ""
            for(let j=0; j<images.length; j++){
                let start = images[j].indexOf('?id=') + 4;
                let ss = images[j].substr(start);
                codeImages.push(ss);
            }                    
            let im = ""
            if (codeImages[0].length === 0) {
                im = './assets/images/docum.png';
            } else {
                im = "http://drive.google.com/uc?export=view&id="+codeImages[0]
            }
            // console.log(d1);
            let newsOne = {
                "id": String(i+1),
                "name": d1["gsx$назвадокументу"]["$t"],
                "img": im,
                "type": d1["gsx$посиланнянадокументякщобільшеодноготочерезкому"]["$t"],
                "breed": "",
                "description": d1["gsx$файлидокументу"]["$t"],
                "age": d1["gsx$позначкачасу"]["$t"],
                "inoculations": ["none"],
                "diseases": ["none"],
                "parasites": ["none"]
            }
            if (d){
                newsData.push(newsOne);
            } else {
                if (find(newsOne.id,res)){
                    newsData.push(newsOne);
                }
            }
            
        }

    }
    
}

let step = 0;

function readDocum(d){    
    let shName = 'Відповіді форми (1)';
    // let url = 'http://127.0.0.1:5000/getdocument/'+keyTableDocs+'/'+shName;
    let url = 'https://schooltools.pythonanywhere.com/getdocument/'+keyTableDocs+'/'+shName;
    // let url = 'https://zelenskiy.pythonanywhere.com/getdocument/'+keyTableDocs+'/'+shName;
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);  
        loadDocuments(data, d);
        changeDisableStatus(currentPageBtn.textContent); 
        calculatePages();
        drawPage(currentPageBtn.textContent);
      } else {
        // We reached our target server, but it returned an error
        console.log('Upps Docum');
        // if (step < 25)
        //     readDocum(d);
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
    };
    request.send();
  };

// function readNews(d){
//     $.getJSON(url,
//        function (data) {
//             loadDocuments(data, d);
//             calculatePages();
//             changeDisableStatus(currentPageBtn.textContent); 
//             drawPage(currentPageBtn.textContent);
                    
//         }        
//     );    
// }

window.onscroll = function() {
    var scrollElem = document.getElementById("scrollToTop");
    if (document.body.scrollTop > document.documentElement.clientHeight) {
       scrollElem.style.opacity = "1";
    } else {
        scrollElem.style.opacity = "0.5";
    }
    ScrollUpShow();
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

function Search(text){
    console.log("Search");
    readDocum(true);
    res = [];

    if (text === ""){
        newsData.forEach(e=>{
            res.push(e.id);
        })
    } else {
        newsData.forEach(e=>{
            if (e.name.toUpperCase().indexOf(text.toUpperCase()) !== -1){
                res.push(e);
            }        
        })
    }
    if (res.length>0){
        readDocum(false);
    } else {
        alert("Документа не знайдено")
    }
}

let edtSearch = document.getElementById("searchEditId");
let btnSearch = document.getElementById("searchButtonId");
btnSearch.addEventListener("click", ()=>{
    Search(edtSearch.value);
    
})

edtSearch.addEventListener("keypress", (e)=>{
    if (e.key === "Enter"){
        Search(edtSearch.value);
    }
})

function ScrollUpShow(){
    // const heightMainBlock2 = document.documentElement.clientHeight ;        
    if (window.pageYOffset>=200){
        document.getElementById("scrollToTop").style.display ='block';   
    } else {
        document.getElementById("scrollToTop").style.display =  'none';
    }
}

readDocum(true);








