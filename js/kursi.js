// const url = "http://127.0.0.1:5000/";
 const url = "https://schooltools.pythonanywhere.com/";
let glData
let teachers = new Set()


const teachList = document.getElementById('teach_id')
const table = document.getElementById('table_id')
const teachCombo = document.getElementById('teach_id')

teachList.addEventListener('change', ()=> {
    table.innerHTML = ``
    
    let head = document.createElement('thead');
    let tBody = document.createElement('tbody');
    head.classList.add('cel_row');
    head.innerHTML = `       
            <tr>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Час уведення</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Вчитель</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Тема</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Годин</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Номер документа</div> 
                                        </div>
                                    </th>

                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Дата документа</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Суб'єкт підвищення кваліфікації</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1 >&#2714</div> 
                                        </div>
                                    </th>
            </tr>     

    `
    table.append(head)
    table.append(tBody)

    let teachName = teachCombo.value
    let dat = glData[0].data
    let ii = 0
    for (r of dat){
        if (teachName == r[1]){
            
            let row = document.createElement('tr');
            row.setAttribute('id','ii_'+String(ii));
            row.innerHTML = `
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>${r[2]}</td>
            <td>${r[3]}</td>
            <td>${r[4]}</td>
            <td>${r[5]}</td>
            <td>${r[6]}</td>
            <td><input class="chk_clas" type="checkbox"></td>
            `
            tBody.append(row)
        }
        ii++
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


function sortSet(set) {
    const entries = [];
    for (const member of set) {
      entries.push(member);
    }
    set.clear();
    for (const entry of entries.sort()) {
      set.add(entry);
    }
    return set;
  };


let readAnaliz = ()=>{    
    $.getJSON(url + 'getmultiblock/'+key,         
       function (data) {
              
            glData = data   
            let dat = glData[0].data
            for (r of dat){
                teachers.add(r[1])
            } 
            sortSet(teachers)  
            let i = 0  
            for (t of teachers){
                let opt = document.createElement('option');
                opt.setAttribute('id','ii_'+String(i++));
                opt.classList.add('opt_cl'); 
                opt.innerText = t
                teachList.append(opt);
            }   
            
                     
        }
    );   
}

// readStorage();

//TODO ---- devmode
let key = "1PrzC3ODe_HSdcn7kGxGJZBWW5vHb__uDv9U3zD-IE5E"
let sheet = "Відповіді форми (1)"

readAnaliz();

