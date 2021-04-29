// Import stylesheets
import { BehaviorSubject, of } from 'rxjs';
import './style.css';

// 
const dummy_arr = [5, 10, 6, 8 ];
const users_url = 'https://reqres.in/api/users?page=1&per_page=6';

out(`<h1>Funciones asincrónicas</h1>`);
out(`<p>Cambia por if(true) para que se ejecuten los distintos ejemplos</p>`);

if(false){
  out(`<h3>Promise starter!</h3>`);
  ejemploPromise('/api/data');
}

if(false){
  out(`<h3>Async-await starter</h3>`)
  ejemploAsync('/api/data');
}

if(false){
  out(`<h3>Recuperando usuarios con fetch()</h3>`)
  ejemploFetchUsersByFech(users_url);
}

if(false){
  out(`<h3>Recuperando usuarios con XMLHttpRequest()</h3>`)
  ejemploFetchUsersByXmlRequest(users_url, data => {
      data.forEach(user => {
        out('<strong>' + user.email + '</strong>: <br>', user)
      });

  });
}


/**
 *     EJEMPLO DE USO DE PROMISE
 */
function ejemploPromise(url){
  fetchPromise(url) // simula la invocación de una API
    .then(arr => {
      out('Array fetched: ', arr);
      let arr_wrapper = statisticsFactory(arr)
      return arr_wrapper.promedio();
    })
    .then(prom => {
      out('Promedio: ', prom);
    })
}

/**
 *     EJEMPLO DE USO CON ASYNC-AWAIT
 */
function ejemploAsync(url){
  fetchAsync(url) // simula la invocación de una API
    .then(suma => {
      out('Suma : ', suma);
    })
}

/**
 *     EJEMPLO DE USO CON ASYNC-AWAIT
 */
function ejemploFetchUsersByXmlRequest(url, cb){
  const xhr = new XMLHttpRequest();

  // Se suscribe como event-listener, esperando status=200 y marca de fin de lectura
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      try{
        // parsea el texto recibido con formato JSON para crear los objetos
        let response = JSON.parse(xhr.responseText);
        let data = (response && response.data) || [];
        cb(data);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  // abre la conexión
  xhr.open('GET', url);

  // ejecuta la petición al backend
  xhr.send(null);
}




/**
 *     EJEMPLO DE USO CON ASYNC-AWAIT
 */
function ejemploFetchUsersByFech(url){
  fetchUsers(url).then(data => {
    console.log(data && data.length);
    if(data && data.length){
      data.forEach(user => {
        out('<strong>' + user.email + '</strong>: <br>', user)
      })
    }
  })

}



/////////////// BIBLIOTECA DE FUNCIONES ///////////
/**
  @return Promise
  @param string
*/
async function fetchUsers(url){
  // response: Response, es un objeto de tipo Response
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      }
  });
  // result es el objeto traido del backend, que contiene un array 'data'
  const result = await response.json()

  return result.data;
}

/**
  @return Promise
  @param string
*/
function fetchPromise(url) {

  let fpromise = new Promise((resolve, reject) => {
    setTimeout(()  =>{
      resolve(dummy_arr)
      
    }, 2000)
  })

  return fpromise;
}


/**
  @return Promise
  @param string
*/
async function fetchAsync(url){
  
  // la cláusula await espera el resultado de:  
  // fetPromise.then(resul => resul)
  out('Awaiting....');
  const resul = await fetchPromise(url);  
  out('bingo! luego de await: ', resul);
 
  // el valor devuelto por la async function 
  // es wrapeado por una Promise
  // Promise.resolve(dash.promedio())
  const dash = statisticsFactory(resul);
  return dash.suma();
} 

function statisticsFactory(list){
  let dashboard = {
    suma() {
      return list.reduce((acum, el) => acum += el)
    },
    promedio() {
      return this.suma() / list.length;
    },
  };
  return dashboard;
}


// HELPER: para mostrar vía 
function out(txt, obj){
  txt = txt ? txt : 'Data: ';
  if(obj){
    txt = txt + JSON.stringify(obj)
  }

  const element = document.createElement('p');
  element.innerHTML = txt;
  document.body.appendChild(element)
}

/**
 * 
 * 
 * of(1, 2, 3)
  .subscribe(x => {
    out('of: ', {seq: x})
  },
  err => { },
  () => {
    const element = document.createElement('div');
    element.innerText = 'All done';
    document.body.appendChild(element)
  });
 */


/**
 * Promise
 * let promise = new Promise(fn_ejecutora)
 * siendo fn_ejecutora:
 * function fn_ejecutora(resolve, reject){
 *      .... código de la tarea asincrónica ....
 *      ..... que concluye éxito|fracaso ....
 *      ... si concluye con ÉXITO y obtiene un 'result':
 *           resolve(result);  // emite el resultado
 * 
 *       .... si el proceso devuelve un 'error'
 *            reject(error); // emite el error     
 * }
 */