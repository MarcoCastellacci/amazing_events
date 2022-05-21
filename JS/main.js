function cardEvent(cards) {
    var events = "";
    events = events +=
        `<div class="card tarjetas m-3">
            <img src="${cards.image}" class="card-img-top" alt="imagen-evento">
                    <div class="card-body">
                        <h5 class="card-title">${cards.name}</h5>
                        <p class="card-text">${cards.description}</p>
                        <p class="card-text fecha">${cards.date}</p>
                        <a href="./dateil.html" class="desplegable btn btn-primary"> Detail </a>
                    </div>
                    </div>`
    return events
}
let currenDate = data.fechaActual;
let events = document.querySelector("#events")
let eventsPast = document.querySelector("#p-events")
let eventsUP = document.querySelector("#up-events")

if (events != null) {
    eventsCard = data.eventos.forEach(cards => {
        events.innerHTML += cardEvent(cards)
    })
} else if (eventsPast != null) {
    filterEvents = data.eventos.filter(pastEvents => pastEvents.date < currenDate).forEach(cards => {
        eventsPast.innerHTML += cardEvent(cards)
    })
} else if (eventsUP != null) {
    filterEvents = data.eventos.filter(pastEvents => pastEvents.date > currenDate).forEach(cards => {
        eventsUP.innerHTML += cardEvent(cards)
    })
}
let checkboxSelected = [];
let searchText = "";


function crearChecks() {
    let checkboxes = document.getElementById(`checkbox`); // Llamamos al Id del Html
    let checkboxFilter = data.eventos.map(checks => { return checks.category });
    const arrayChecks = new Set(checkboxFilter);
    let checkboxs = [...arrayChecks]
    let checkHtml = ""
    checkboxs.forEach(check => {
            checkHtml += `<label><input type="checkbox" value="${check}">${check}</label>`
        }) // Con este .map recorremos el array original filtramos por "category" y con "new Set" eliminamos los repetidos 
    checkboxes.innerHTML = checkHtml // Imprimimos el template armado
    var id = 1
    data.eventos.map(ids => ids.id = id++)
}
crearChecks() // Llamamo a la funcion que crea los checkbox


var checkbox = document.querySelectorAll(`input[type=checkbox]`) // Seleccionamos todos los checkbox dentro de un Input
checkbox.forEach(check => check.addEventListener("click", (event) => {
    var cheked = event.target.checked
    if (cheked) { //Condicional sobre un atributo validatorio
        checkedboxSelected.push(event.target.value) //Guardamos en una variable el true
        arrayFiltered() //Funcion que se ocupa del check
    } else {
        checkboxSelected = checkboxSelected.filter(nocheckeado => nocheckeado !== event.target.value) //Busca cuadno el evento .target es opuesto a true
        arrayFiltered()
    }
}))

var searchbar = document.getElementById(`bar-search`)
searchbar.addEventListener("keyup", (event) => { // El escuchador Keyup es para cuando se presionan teclas
    searchText = event.target.value //esta variable fue creada por fuera al principio para iniciar en String Vacio
    arrayFiltered()
})

function arrayfiltered() {
    let data = []
    if (checkboxSelected.length > 0 && target.cheked)
}