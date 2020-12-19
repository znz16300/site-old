var d1 = "";
let data_table = {};
var data_report = [];

let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

const text = document.getElementById("content");

function sortById(arr) {
    arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

function print_my(data){
    text.innerHTML ="";
    for(let i=0; i<data.length; i++){
        if (data[i]['value'] !== "" && data[i]['id'] >= 0){
            console.log(data[i]['title']);  
            console.log(data[i]['value']);
             text.innerHTML += `<div class="title">${data[i]['title']}</div> 
             <div class="value">${data[i]['value']}</div>`;

        }
                 
    }
}

let num = 4


function readPage(){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];

            $.each(data[0],function(key,value){
                if (key.indexOf('gsx$') === 0){
                    // console.log(data[1]);
                    let m = {'id': parseFloat(data[1][key]['$t']), 'title':value['$t']};
                    data_table[key] = m;                   
                }              
            });
            // console.log(data_table);
            data_report = [];
            
            $.each(data[num],function(key,value){
                if (value['title'] !== "" && data_table[key] !== undefined){
                    let id = data_table[key]['id'];
                    let title = data_table[key]['title'];
                    data_report.push({'id':id, 'title':title, 'value':value['$t']})
                }              
                        
            });
            sortById(data_report);

            print_my(data_report);

        }       
    );    
    // print(data_report);
}
// console.log(data_report);



readPage();

