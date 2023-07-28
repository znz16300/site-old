// advmenu

var d1 = "";
let sheet2 = "default";
let shName = 'sheet1';
let title_st = '';

const title = document.getElementById("title__id");
const text = document.getElementById("paragraphs__id");
let burgerItem_1 = document.querySelector('.header__burger');
let menu_1 = document.querySelector('.header__nav');
let header_1 = document.querySelector('.header');
let activeLink_1 = document.querySelector('.list-item_active');
// let modalWindow = document.querySelector('.modal__wrapper');


function changeOverflow_1() {
    let overflowY = document.body.style.overflowY;
    document.body.style.overflowY = overflowY != 'hidden' ? 'hidden' : 'visible';
    document.body.style.paddingRight = overflowY != 'hidden' ? `${getScrollbarWidth_1()}px` : '0';
}
function getScrollbarWidth_1() {
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
function toggleMenu_1() {
    menu_1.classList.toggle('header__nav-active');
    burgerItem_1.classList.toggle('header__burger-active');
    header_1.classList.toggle('header_active');
    changeOverflow_1();

}

burgerItem_1.addEventListener('click', () => toggleMenu_1());
menu_1.addEventListener('click', e => {
    if (!e.target.closest('.header__list')) toggleMenu_1();
});

let step = 0;

let fieldNames = {};


let setFields = (data)=>{
    let i=0;
    $.each(data[0],function(key,value){
        if (key.slice(0,4) === 'gsx$'){
            fieldNames[i] = {'key': key, 'title': value['$t']};
            i++;
        }        
    })
}

function readAdvMenu(key){
gl_data = []
 shName = "sheet1"
//  let url = 'https://zelenskiy.pythonanywhere.com/getpage/'+key+'/'+shName;
 let url = 'http://127.0.0.1:5000/getblock/'+key+'/'+shName;
  request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);
        data = data['feed']['entry'];
        setFields(data);
        gl_data = gl_data.concat(data)
        let titleKey = ''
        let linkKey = ''
        for (t of Object.values(fieldNames)){            
            let key = t['key']
            let value = t['title']
            if (value === 'Title'){
                titleKey = key
            }
            if (value === 'link'){
                linkKey = key
            }
        }
        
        
        let paragraphs__id = document.querySelector('#paragraphs__id')
        const ul = document.createElement('ul')
        paragraphs__id.append(ul)
        for (p of Object.values(gl_data)){
            const li = document.createElement('li')
            li.innerText = p[titleKey]['$t']
            
            ul.append(li)
        }
      

    } else {
      console.log('Upps ');
    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();
};

// https://docs.google.com/spreadsheets/d/1G1l3J4HHLOItVLYbrPL08ml3TtON_fAULcpecqn0vwM/edit#gid=0


window.onscroll = function() {
    var scrollElem = document.getElementById("scrollToTop");
    if (document.body.scrollTop > document.documentElement.clientHeight) {
       scrollElem.style.opacity = "1";
    } else {
        //scrollElem.style.opacity = "0.5";
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

if (true){

    const title_ = document.getElementById('title__');
    




const title_dom = document.getElementById('title__id');
    let strGET = window.location.search.replace( '?', '').split('&'); 
    let par_1 = strGET[0].split("=")
    let par_2 = strGET[1].split("=")
    title_st = decodeURI(par_1[1])
    const keyT = par_2[1]
    if (title_ !== null){
        title_.innerText = title_st;
        title_dom.innerHTML = title_st;
    }

    function ScrollUpShow(){

        if (window.pageYOffset>=200){
            document.getElementById("scrollToTop").style.display ='block';   
        } else {
            document.getElementById("scrollToTop").style.display =  'none';
        }
    }

    readAdvMenu(keyT);

}
















