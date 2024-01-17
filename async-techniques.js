// ESEMPIO DI CODICE ASINCRONO

const countUntilThree = function () {
  setTimeout(() => {
    console.log('ho contato fino a tre...')
  }, Math.random() * 5000) // simulo un tempo variabile di conclusione timeout
}

const pageStart = function () {
  countUntilThree() // questa riga non viene aspettata :(
  console.log('FINITO!') // vorrei che questo console.log di FINITO arrivasse in fondo!
}

// pageStart()

// riassumiamo il problema: avete due funzioni, la prima delle quali contiene un'operazione ASINCRONA (parte subito,
// ma non sapete quando finisce :(...)
// e avete la necessità di chiamare la seconda funzione solamente al termine della prima

// SOLUZIONE 1) approccio con una CALLBACK
// una callback è una funzione passata come parametro ad un'altra funzione

const countUntilThreeWithCallback = function (nextCode) {
  setTimeout(() => {
    console.log('conto un intervallo variabile <5s')
    nextCode()
  }, Math.random() * 5000)
}

const pageStartWithCallback = function () {
  countUntilThreeWithCallback(() => {
    // questo è il CODICE SUCCESSIVO DA ESEGUIRE
    console.log('FINITO!')
  })
}

// pageStartWithCallback()

// SOLUZIONE 2) approccio con una PROMISE
// Una Promise è un wrapper, uno sugar coating sopra il concetto di callback
// una Promise è un modo più elegante per scrivere e gestire un'operazione asincrona, e soprattutto
// concaternare elegantemente diverse operazione asincrone in fila

const countUntilThreeWithPromise = function () {
  return new Promise((resolve, reject) => {
    const timer = Math.random() * 5000

    if (timer > 4000) {
      // troppo!
      reject('errore di timeout')
    } else {
      setTimeout(() => {
        console.log('conto un intervallo variabile <4s')
        resolve('ho ottenuto i dati che volevo')
      }, timer)
    }
  })
}

const pageStartWithPromise = function () {
  countUntilThreeWithPromise()
    .then(
      // qua inserisco il codice successivo da eseguire se l'operazione asincrona è finita BENE
      // in pratica qua proseguo il flow una volta che nella Promise è stato chiamato resolve()
      (data) => {
        console.log('FINITO IN 4S O MENO', data)
      }
    )
    .catch((errMessage) => {
      // qua inserisco il codice successivo da eseguire se l'operazione asincrona è finita MALE
      // in pratica qua proseguo il flow una volta che nella Promise è stato chiamato reject()

      console.log('si è verificato un errore: ', errMessage)
    })
}

pageStartWithPromise()
