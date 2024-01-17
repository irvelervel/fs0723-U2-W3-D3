// impariamo ad utilizzare il metodo fetch()
// fetch è un metodo integrato in JS ormai supportato da tutti i moderni browsers
// fetch effettua una HTTP REQUEST da un client (noi) -> verso un server esterno

// N.B: fetch() ritorna una Promise!
// come funziona?
// fetch() può accettare fino a DUE parametri (il primo è obbligatorio, il secondo no):
// 1) URL, l'indirizzo (come stringa)
// 2) un oggetto di configurazione, che può contenere ad es. un method, headers per l'authorization, payload etc.

// METODI HTTP:
// GET -> chiedo dei dati
// POST -> voglio creare un nuovo dato
// PUT -> voglio modificare un dato esistente
// DELETE -> voglio eliminare un dato esistente

fetch('https://jsonplaceholder.typicode.com/users', {
  // method: 'GET' // il GET è il metodo in ogni caso predefinito
})
  .then((response) => {
    // io finisco qui dentro se la fetch finisce bene!
    // come lavoro qui con la response?
    console.log(response)
    if (response.ok) {
      // ABBIAMO OTTENUTO QUELLO CHE VOLEVAMO
      console.log('la fetch è finita bene!')
      // ora possiamo proseguire prendendo i dati dalla response
      // per prelevare dalla response I DATI esiste un comodo metodo response.json()
      return response.json()
    } else {
      // C'È STATO UN PROBLEMA NELLA NOSTRA CHIAMATA
      console.log("la fetch non è finita come ce l'aspettavamo")
      throw new Error() // teletrasportiamoci nel catch()
    }
  })
  .then((userArray) => {
    console.log('ALLA FINE DEL SECONDO THEN', userArray)
    // ora posso manipolare il DOM con data!
    const ul = document.getElementById('usersList') // ul vuota
    userArray.forEach((user) => {
      const newLi = document.createElement('li') // creo un <li>
      newLi.classList.add('list-group-item') // <li class="list-group-item"></li>
      newLi.innerText = user.id + ' - ' + user.name
      ul.appendChild(newLi)
    })
  })
  .catch((error) => {
    console.log('errore generico', error)
    // si gestisce l'errore
  })
