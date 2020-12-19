var d1 = "";
let data_table = {};

let sheet2 = "default";
let title_st = '';
let key = '1VQq2KHHgf_rLtNMzyh9LETjbdSSmkpZRjAvbr9kdkjY';

const text = document.getElementById("content");

function readPage(){
    let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];

            $.each(data[0],function(key,value){
                if (key.indexOf('gsx$') === 0){
                    data_table[key] = value['$t'];                   
                }              
            });
            $.each(data[2],function(key,value){
                if (value['$t'] !== ""){
                    console.log(data_table[key]," ===> ", value['$t']);
                }
                
                        
            });
        }

        
    );
    
}

readPage();
