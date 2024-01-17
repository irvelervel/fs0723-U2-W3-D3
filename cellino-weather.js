const getCellinoWeather = function () {
  fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=40.4713&longitude=17.9643&current=weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=1'
  )
    .then((response) => {
      console.log('response', response)
      if (response.ok) {
        // le chiamata ha tornato 200
        // dobbiamo estrapolare il JSON da questa chiamata
        return response.json()
      } else {
        if (response.status === 404) {
          throw new Error('404 - Pagina non trovata')
        } else if (response.status === 500) {
          throw new Error('500 - Internal server error')
        } else {
          throw new Error('Errore generico')
        }
      }
    })
    .then((weatherObject) => {
      console.log('weatherObject', weatherObject)
      console.log(weatherObject.daily.temperature_2m_min[0])
      console.log(weatherObject.daily.temperature_2m_max[0])
      // riferimenti al DOM:
      const minSpan = document.getElementById('min-temp')
      const maxSpan = document.getElementById('max-temp')
      // inserisco i valori presi da weatherObject
      minSpan.innerText = weatherObject.daily.temperature_2m_min[0]
      maxSpan.innerText = weatherObject.daily.temperature_2m_max[0]

      // SEZIONE DATA
      const now = new Date()
      const days = now.getDate()
      const months = now.getMonth() + 1
      console.log(days, months)
      const todayString = days + '/' + months
      const todaySpan = document.getElementById('today')
      todaySpan.innerText = todayString
    })
    .catch((err) => {
      console.log('errore!', err)
      // magari qua creeremmo un Alert di bootstrap...
      // - errori di connessione internet nostri
      // - siamo finiti qui dentro perchè abbiamo fatto un throw new Error()
    })
}

getCellinoWeather()
