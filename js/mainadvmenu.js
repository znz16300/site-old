const modalMenu = document.querySelector('.modal__menu')    
const advmenu_ul_id = document.querySelector('#advmenu_ul_id')
let fieldNamesAdv = {};
gl_dataAdv = []




// function setPageKey(title, key) {
//     setStorage('keyPages', key);
//     setStorage('titlePages', title);
//     document.location.href = './page.html';
// }




let setFieldsAdv = (dataAdv) => {
    let i = 0;
    $.each(dataAdv[0], function (key, value) {
        if (key.slice(0, 4) === 'gsx$') {
            fieldNamesAdv[i] = { 'key': key, 'title': value['$t'] };
            i++;
        }
    })
}



function readAdvMenu(keyAdv) {
    let shNameAdv = "sheet1"
    let urlAdv = 'https://schooltools.pythonanywhere.com/getblock/' + keyAdv + '/' + shNameAdv;
    //  let urlAdv = 'http://127.0.0.1:5000/getblock/'+keyAdv+'/'+shNameAdv;
    requestAdv = new XMLHttpRequest();
    requestAdv.open('GET', urlAdv, true);
    requestAdv.onload = function () {
        if (requestAdv.status >= 200 && requestAdv.status < 400) {
            dataAdv = JSON.parse(requestAdv.responseText);
            dataAdv = dataAdv['feed']['entry'];
            setFieldsAdv(dataAdv);
            gl_dataAdv = gl_dataAdv.concat(dataAdv)
            drawMenu(0)
         } else {
            console.log('Upps Adv ');
        }
    };
    requestAdv.onerror = function () {
        // There was a connection error of some sort
    };
    requestAdv.send();
};

function drawMenu(k) {
    advmenu_ul_id.innerHTML = ""
    let titleKey = ''
    let linkKey = ''
    let FathMenu = ''
    let N = ''
    for (t of Object.values(fieldNamesAdv)) {
        let key = t['key']
        let value = t['title']
        if (value === 'Title') {
            titleKey = key
        } else
            if (value === 'link') {
                linkKey = key
            } else
                if (value === 'FathMenu') {
                    FathMenu = key
                } else
                    if (value === 'N') {
                        N = key
                    }

    }

    modalMenu.append(advmenu_ul_id)
    if (k != '0'){
        const li = document.createElement('li')
        li.innerHTML = `<div class="advmenu_a__item advmenu__item" 
                    data-child=0
                    data-link="#"> 
                    ... </div>`
        advmenu_ul_id.append(li)
        li.addEventListener('click', (e) => {
            let link = e.target.dataset['link']
                if (link !== "#"){
                    window.location.href = link
            } else {
               drawMenu(e.target.dataset['child'])
            }
        })
    }
    for (p of Object.values(gl_dataAdv)) {
        if (p[FathMenu]['$t'] == k) {
            const li = document.createElement('li')
            li.innerHTML = `<div class="advmenu_a__item advmenu__item" 
                data-child=${p[N]['$t']}
                data-link=${p[linkKey]['$t']}> 
                ${p[titleKey]['$t']}</div>`
            advmenu_ul_id.append(li)
            li.addEventListener('click', (e) => {
                let link = e.target.dataset['link']
                if (link !== "#"){
                    window.location.href = link
                } else {
                    drawMenu(e.target.dataset['child'])
                }
            })
        } else {

            
        }
    }
}

const body = document.querySelector('body')

body.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        modalMenu.classList.add('hide');
           }
})

modalMenu.addEventListener('mouseleave', () => {
    modalMenu.classList.add('hide');
   
})


advM.addEventListener('click', () => {
    drawMenu(0)
    modalMenu.classList.toggle('hide');

})




// https://docs.google.com/spreadsheets/d/1G1l3J4HHLOItVLYbrPL08ml3TtON_fAULcpecqn0vwM/edit#gid=0

const keyTAdv = '1G1l3J4HHLOItVLYbrPL08ml3TtON_fAULcpecqn0vwM'



readAdvMenu(keyTAdv);

