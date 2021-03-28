let id_table =  '1gIGSxWp-DQ6Cm5KiB-Z76gj4YyN0crjseQQgCetDCtY';




function read(sheet){
    let url = "https://spreadsheets.google.com/feeds/list/"+id_table+"/"+sheet+"/public/values?alt=json";

    $.getJSON(url,
        function (data) {
            data = data['feed']['entry'];
            console.log(sheet); 
            console.log(data);
            


        }        
    ).fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); })
     
      
}

for (let i=0; i<=10; i++){
    read(i);

}
