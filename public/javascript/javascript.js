
    let monnaie2 = 0;
    let monnaie1 = 0;
    const p = document.querySelector('.content')
    const convMonnaie = p.querySelector('#paysTarget')
    const responseConvert = p.querySelector('#convert')
    const calc = p.querySelector('#sommes')
    const convMonnaie1 = p.querySelector('#paysTarget1')
    const info = p.querySelector('.info')
    const pays = p.querySelector('#pays')
    const response = p.querySelector('#response')
    const montant = p.querySelector('input')
    let ok;
    let r;
    let tab = []
    let i = 0;
    
    //stockage de l'url qui va servir à appeller mon api
    const url = 'https://blockchain.info/ticker'
    fetch(url)
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    console.log(data)
    
                    p.querySelector('p').innerHTML = `${ data.EUR.last}`
    
                    response.innerHTML = data.AUD.last
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) i++;
                        console.log(i,"ok")
                        pays.innerHTML += ` <option value="${key}">${key}</option>`
                        convMonnaie.innerHTML += ` <option value="${key}">${key}</option>`
                        convMonnaie1.innerHTML += ` <option value="${key}">${key}</option>`
                        if (key === convMonnaie.value) {
                            monnaie1 = data[key].last
                            console.log(monnaie1)
                        }
                        if (key === convMonnaie1.value) {
                            monnaie2 = data[key].last
                            console.log(monnaie1)
                        }
                        // je viens afficher une fois un montant pour ne pas laisser mon input vide
                        responseConvert.innerHTML = monnaie1 / monnaie2 * calc.value
                        //
                        convMonnaie1.addEventListener('change', () => {
                            if (key === convMonnaie1.value) {
                                monnaie1 = data[key].last
                                responseConvert.innerHTML = ""
                                responseConvert.innerHTML = monnaie1 / monnaie2 * calc.value
                               // console.log(monnaie1 + "monnaie1")
                            }
                        })
                        convMonnaie.addEventListener('change', () => {
                            if (key === convMonnaie.value) {
                                monnaie2 = data[key].last
                                responseConvert.innerHTML = ""
                                responseConvert.innerHTML = monnaie1 / monnaie2 * calc.value
                               // console.log(monnaie2)
                            }
                        })
                        //permet
                        setTimeout(() => {
                            if (i < key.length) {
                                console.log(key.length)
                            }
                        }, 1000)
    
                        //on vient faire l'event pour le convertisseur du bitcoin
                        pays.addEventListener('change', () => {
    
                            if (key === pays.value) {
                                if (montant.value == "") {
                                    montant.innerHTML = 1
                                    ok = data[key].last
                                    response.innerHTML = ok + ' ' + key
                                } else {
                                    ok = data[key].last * montant.value
                                    response.innerHTML = ok + ' ' + key
                                }
                            }
                        })
                        //un event d'écoute sur l'input pour convertir en même temps que l'utilisateur rendre ça donnée.
                        montant.addEventListener('input', () => {
                            // si la valeur entrée n'est pas un chiffre alors la valeur sera 1 on évite que quelqu'un rentre des lettres
                            while (isNaN(montant.value)) {
                                montant.value = 1
                            }
    
                            if (key === pays.value) {
                                ok = data[key].last * montant.value
                                response.innerHTML = ok + ' ' + key
    
                            }
                            //change devise END
                            return i;
                        })
                        //  console.log(i)
    
                    }
                    calc.addEventListener('input', () => {
                        while (isNaN(calc.value)) {
                            calc.value = 1
                        }
                        responseConvert.innerHTML = monnaie1 / monnaie2 * calc.value
                    })
    
                    let val;
                    //va me permettre de récupérer la clée que je vais boucler puis je vais push pour avoir un tableau avec mes infos 
                    Object.keys(data).forEach(value => {
                        tab.push([value, data[value].last])
                    })
                    //changement du tableau des prix        
                    let t = -1;
                    info.querySelector('p').innerHTML = tab[0][1] + " " + tab[0][0]
                    setInterval(() => {
                        t++
                        if (t < tab.length) {
                            info.querySelector('p').innerHTML = ""
                            info.querySelector('p').innerHTML = tab[t][1] + " " + tab[t][0]
                        } else {
                            t = -1
                        }
                    }, 10000);
                })
    
    
    
    
            } else {
                console.log("erreur")
            }
        })
   
 /*
pays.addEventListener('change',()=>{
    if(key === pays.value){
     ok = (data[key].last) * (montant.value)
         response.innerHTML=ok 
   
     
         montant.addEventListener('input',()=>{
         ok = (data[key].last) * (montant.value)
         response.innerHTML=ok 

          })
         
        }
 })
 */