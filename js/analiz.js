var d1 = "";
let data_table = {};


let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

const text = document.getElementById("content");

function sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

function print_my(data){
    data.push({'id':111111111, 'title':" ", 'value':" "});
    text.innerHTML +=`<br><hr><br><div class="title1">АНАЛІЗ УРОКУ</div>`;
    for(let i=0; i<data.length; i++){
        if (data[i]['value'] !== "" && data[i]['id'] >= 0){
            // text.innerHTML += `<span class="title">${data[i]['title']}</span> 
            //                    <span class="value">${data[i]['value']}</span><br>`;
            let tag1 = 'span';
            let tag2 = 'span';
            let sep = ' '
            // console.log(data[i+1]);
            if (data[i+1] !== undefined){
                 let sym1 =(data[i+1]['title'] +" ")[0];
                 let sym2 =(data[i]['title'] +" ")[0];
                 if (sym2.toUpperCase() === sym2){
                     tag2 = 'span';
                    sep = "<br>";
                 }
            }
            

            text.innerHTML += `${sep}<${tag1} class="title">${data[i]['title']}</${tag1}> 
                                <${tag2} class="value">${data[i]['value']}</${tag2}>`;
        }                 
    }
    text.innerHTML +=`<br> 
                      <div class="footer">З аналізом ознайомлений(на) _______________________ </div>`;
}

let num = 4

function createCard(dat){
    let data_report = []
    $.each(dat,function(key, value){
        if (value['title'] !== "" && data_table[key] !== undefined){
            let id = data_table[key]['id'];
            let title = data_table[key]['title'];
            data_report.push({'id':id, 'title':title, 'value':value['$t']})
        }            
                    
    });
    sortById(data_report);
    print_my(data_report);
}

function readPage(){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            console.log(data);
            data = data['feed']['entry'];
            
            $.each(data[0],function(key,value){
                if (key.indexOf('gsx$') === 0){
                    let m = {'id': parseFloat(data[1][key]['$t']), 'title':value['$t']};
                    data_table[key] = m;                   
                }              
            });
            // console.log(data_table);
            text.innerHTML = "";

            for (let i=3; i<data.length;i++){
                createCard(data[i]);
            }
            

            


            

        }       
    );    
    // print(data_report);
}
// console.log(data_report);



readPage();

