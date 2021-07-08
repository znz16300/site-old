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


// burgerItem_1.addEventListener('click', () => toggleMenu_1());

menu_1.addEventListener('click', e => {
    if (!e.target.closest('.header__list')) toggleMenu_1();
});



function readPage(key){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];
            
            let text_tmp = "";
            for (let i=0; i<data.length;i++){
                if (title_st === data[i]["gsx$розділ"]["$t"]){
                    
                    let text = data[i]["gsx$абзац"]["$t"];
                    let tip = data[i]["gsx$тип1-картки2-абзаци"]["$t"];
                    let link = data[i]["gsx$кнопказпосиланням"]["$t"];
                    let images = data[i]["gsx$фото"]["$t"].split(",");
                    let image = images[0];

                    if (tip === '1') {
                        document.getElementById('paragraphs__id').style.display = 'flex';
                        text = `
                        <div class="sect-1 shake-hard " style="text-align: center; text-decoration: none;">
                        <a href="${link}"  target="_blank">
                                    <div class="item1"><img
                                        width="180px"
                                     src="${image}" alt=""></div>
                                     <div class="item2">${text}</div></a>
                        </div>
                        `; 
                        text_tmp += `${text}`
                    } else {
                        document.getElementById('paragraphs__id').style.display = 'block';
                        text_tmp += `<p>${text}</p>` 
                        let codeImages = [] 
                        let photoPath = ""
                        for(let j=0; j<images.length; j++){
                        
                            let x=images[j].indexOf('?id=');
                            if (x>-1){
                                //Це якщо малюнок відправлено формою

                                let start = images[j].indexOf('?id=') + 4;
                                let ss = images[j].substr(start);

                                im = "http://drive.google.com/uc?export=view&id="+ss;
                                text_tmp += `<img src="${im}" alt="" width = "95%">`
                            } else {
                                x = images[j].indexOf('/file/d/');
                                if (false){


                                } else {
                                    //Якщо малюнок по посиланню з іншого ресурсу
                                    im = images[j];
                                    text_tmp += `<img src="${im}" alt="" width = "95%"> `
                                }
                            }               
                        }
                    }
       


                    const regex = String.fromCharCode(10);                   

                    


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

    readPage(keyT);

}
