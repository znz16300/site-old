// let url = 'http://127.0.0.1:5000/'
let url = 'https://schooltools.pythonanywhere.com/'
let shName = 'Answer'
let key = '1cYpcT17iZydWA8a292KDXx6C_Y7p6gDDkgy_aM9dT9w'


let title = document.getElementById("paragraphs__id")
let image = document.getElementById("image__id")


let readPageMenu = ()=>{
    gl_data = []
    data = ''
    
    $.getJSON(url + 'getmultiblock/'+key,        
       function (data) {
            // console.log(data) 
            for (s of data) {
               date = s.data[s.data.length-1][1]
               imag = s.data[s.data.length-1][2]
               imageKey = imag.split('?id=')[1]
               im = "http://drive.google.com/uc?export=view&id="+imageKey;
               title.innerText = `меню на  ${date}`
               image.innerHTML = `
                    <a href="${im}">
                        <img class="imMenuClass" src="${im}">
                    </a>
               ` 


            //    console.log(date)
            //    console.log(im)
            }             
        }
    );           
 
}


readPageMenu();