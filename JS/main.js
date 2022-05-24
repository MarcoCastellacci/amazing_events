function paintCards(array, div) {
    div.innerHTML = "";
    array.forEach(evento => {
        div.innerHTML += `<div class="card tarjetas m-3">
            <img src="${evento.image}" class="card-img-top" alt="imagen-evento">
                    <div class="card-body">
                        <h5 class="card-title">${evento.name}</h5>
                        <p class="card-text">${evento.description}</p>
                        <p class="card-text fecha">${evento.date}</p>
                        <a href="./dateil.html?=${evento.id}" class="desplegable btn btn-primary"> Detail </a>
                    </div>
                    </div>`
    })
}

let currenDate = data.fechaActual;
var events = document.querySelector("#events")
var eventsPast = document.querySelector("#p-events")
var eventsUP = document.querySelector("#up-events")
var detail = document.querySelector("#detail")


if (events != null) {
    paintCards(data.eventos, events)
} else if (eventsPast != null) {
    filterEvents = data.eventos.filter(pastEvents => pastEvents.date < currenDate)
    paintCards(filterEvents, eventsPast)
} else if (eventsUP != null) {
    filterEvents = data.eventos.filter(pastEvents => pastEvents.date > currenDate)
    paintCards(filterEvents, eventsUP)
}

var searchbar = document.getElementById("bar-search")

function crearChecks() {
    let checkboxes = document.getElementById(`checkbox`); // Llamamos al Id del Html
    let checkboxFilter = data.eventos.map(checks => { return checks.category }); // Con este .map recorremos el array original filtramos por "category" y con "new Set" eliminamos los repetidos 
    const arrayChecks = new Set(checkboxFilter);
    let checkboxs = [...arrayChecks]
    let checkHtml = ""
    checkboxs.forEach(check => {
        checkHtml += `<label><input type="checkbox" value="${check}">${check}</label>`
    })
    checkboxes.innerHTML = checkHtml // Imprimimos el template armado
    var id = 1
    data.eventos.map(ids => ids.id = id++)
}
crearChecks() // Llamamo a la funcion que crea los checkbox

let checkboxSelected = [];
let searchText = "";

var checkbox = document.querySelectorAll("input[type=checkbox]")
    // Seleccionamos todos los checkbox dentro de un Input
checkbox.forEach(check => check.addEventListener("click", (event) => {
    var cheked = event.target.checked
    if (cheked) { //Condicional sobre un atributo validatorio
        checkboxSelected.push(event.target.value) //Guardamos en una variable el true

    } else {
        checkboxSelected = checkboxSelected.filter(nocheckeado => nocheckeado !== event.target.value) //Busca cuadno el evento .target es opuesto a true
    }
    arrayFiltered() //Funcion que se ocupa del check
}))



searchbar.addEventListener("keyup", (event) => { // El escuchador Keyup es para cuando se presionan teclas
    searchText = event.target.value //esta variable fue creada por fuera al principio para iniciar en String Vacio
    arrayFiltered()
})
let dataArray = [];


function arrayFiltered() {
    dataArray = []
    if (checkboxSelected.length > 0 && searchText !== "") {
        checkboxSelected.map(events => {
            dataArray.push(...data.eventos.filter(show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) || show.description.toLowerCase().includes(searchText.trim().toLowerCase()) && show.category === events)) //De esta forma estamos combinando los filtrados por checkbox y barra de buscado
        })
        console.log(checkboxSelected);

    } else if (checkboxSelected.length > 0 && searchText === "") {
        checkboxSelected.map(events => dataArray.push(...data.eventos.filter(show => show.category == events)))

    } else if (checkboxSelected.length === 0 && searchText !== "") {
        dataArray.push(...data.eventos.filter(show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) || show.description.toLowerCase().includes(searchText.trim().toLowerCase())))

    } else { dataArray.push(...data.eventos) }

    if (events != null) {
        paintCards(dataArray, events)
    } else if (eventsPast != null) {
        paintCards(dataArray, eventsPast)
    } else if (eventsUP != null) {
        paintCards(dataArray, eventsUP)
    }
}
arrayFiltered()