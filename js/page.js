var d1 = "";
let sheet2 = "default";
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

activeLink_1.addEventListener('click', e => {
    if (document.querySelector('.header__nav-active')) {
        e.preventDefault();
        toggleMenu_1();
    }
});

function readPage(key){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];
            console.log(data);
            let text_tmp = "";
            for (let i=0; i<data.length;i++){
                if (title_st === data[i]["gsx$розділ"]["$t"]){
                    let text = data[i]["gsx$абзац"]["$t"];
                    console.log("text_tmp");
                    console.log(data[i]);


                    const regex = String.fromCharCode(10);
                    text = text.replace(regex,'<br>');
                    console.log(text);
                    text_tmp += `${text}`
                    // text_tmp += `<p class="default_par"> ${text} </p>`
                

                    // text.innerText = text_tmp;
                    
                    let images = data[i]["gsx$фото"]["$t"].split(",");
                    let codeImages = [] 
                    let photoPath = ""
                    for(let j=0; j<images.length; j++){
                       
                        let x=images[j].indexOf('?id=');
                        if (x>-1){
                            //Це якщо малюнок відправлено формою
                            //  https://drive.google.com/open?id=1s2l8ZXUmEbts4OmZww2D2buw0F_Jqxss
                            let start = images[j].indexOf('?id=') + 4;
                            let ss = images[j].substr(start);
                            //codeImages.push(ss);
                            im = "http://drive.google.com/uc?export=view&id="+ss;
                            text_tmp += `<br><p class="default_par"> <img src="${im}" alt="" width = "95%"> </p>`
                        } else {
                            x = images[j].indexOf('/file/d/');
                            if (false){
                            // if (x>-1){
                                //Якщо малюнок з гугл диска
                                //  https://drive.google.com/file/d/1trA3XhkNgZVNw9lwKVl59GBDf4r4ISgp/view?usp=sharing
                                // let start = images[j].indexOf('/file/d/') + 8;
                                // let endKey = images[j].indexOf('/view');
                                // let length = endKey - start;
                                // let ss = images[j].substr(start, length);
                                // im = "https://drive.google.com/open?id="+ss;
                                // text_tmp += `<br><p class="default_par"> <img src="${im}" alt="" width = "95%"> </p>`

                            } else {
                                //Якщо малюнок по посиланню з іншого ресурсу
                                im = images[j];
                                text_tmp += `<br><p class="default_par"> <img src="${im}" alt="" width = "95%"> </p>`
                            }
                        }               
                     }
                }                
            }        
            if (text !== null)    
                text.innerHTML = text_tmp;      
        }        
    );    
}

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

document.getElementById("scrollToTop").addEventListener("click", ()=>{
    goUp();
});



if (true){
//var keyT = JSON.parse(window.localStorage.getItem('keyPages') || null);    
// if (keyT !== undefined){
    // title_st = JSON.parse(window.localStorage.getItem('titlePages') || null);
    const title_ = document.getElementById('title__');
    const title_dom = document.getElementById('title__id');
    // if (title_ !== null){
    //     title_.innerText = title_st;
    //     title_dom.innerHTML = title_st;
    // }
    let strGET = window.location.search.replace( '?', '').split('&'); 
    let par_1 = strGET[0].split("=")
    let par_2 = strGET[1].split("=")
    // const title_ = decodeURI(par_1[1])
    // const title_dom = decodeURI(par_1[1])
    title_st = decodeURI(par_1[1])
    const keyT = par_2[1]
    if (title_ !== null){
        title_.innerText = title_st;
        title_dom.innerHTML = title_st;
    }
    console.log(keyT)
    readPage(keyT);

}
