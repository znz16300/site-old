const url = "http://127.0.0.1:5000/";
//const url = "https://schooltools.pythonanywhere.com/";
let glData
let teachers = new Set()


const teachList = document.getElementById('teach_id')
const tBody = document.getElementById('tbody__id')
const teachCombo = document.getElementById('teach_id')

teachList.addEventListener('change', ()=> {
    tBody.innerHTML = ''

    let teachName = teachCombo.value
    let dat = glData[0].data
    for (r of dat){
        if (teachName == r[1]){
            
            let row = document.createElement('tr');
            row.setAttribute('id','ii_'+String(1));
            row.innerHTML = `
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>${r[2]}</td>
            <td>${r[3]}</td>
            <td>${r[4]}</td>
            <td>${r[5]}</td>
            `
            tBody.append(row)
        }
    } 

})


function getCol(dat, numTable, name){
    header = dat[numTable].header[0]
    for (let col=0; col<header.length; col++){
        if (name === header[col]){
            return col
        }        
    }
}




let readAnaliz = ()=>{    
    $.getJSON(url + 'getmultiblock/'+key,         
       function (data) {
            console.log(data)  
            glData = data   
            let dat = glData[0].data
            for (r of dat){
                teachers.add(r[1])
            } 
            let i = 0  
            for (t of teachers){
                let opt = document.createElement('option');
                opt.setAttribute('id','ii_'+String(i++));
                opt.classList.add('opt_cl'); 
                opt.innerText = t
                teachList.append(opt);
            }   
            
            console.log(teachers)           
        }
    );   
}

// readStorage();

//TODO ---- devmode
let key = "1PrzC3ODe_HSdcn7kGxGJZBWW5vHb__uDv9U3zD-IE5E"
let sheet = "Відповіді форми (1)"

readAnaliz();

