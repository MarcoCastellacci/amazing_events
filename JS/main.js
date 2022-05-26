let currenDate = data.fechaActual;
var events = document.querySelector("#events")
var eventsPast = document.querySelector("#p-events")
var eventsUP = document.querySelector("#up-events")
var detail = document.querySelector("#detail")
var searchbar = document.getElementById("bar-search")
let checkboxSelected = [];
let searchText = "";
let dataArray = [];
let eventosPasados = data.eventos.filter(pastEvents => pastEvents.date < currenDate)
let eventosFuturos = data.eventos.filter(UpEvents => UpEvents.date > currenDate)
var id = 1
data.eventos.map(detail => detail.id = id++)

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
}
crearChecks() // Llamamo a la funcion que crea los checkbox

function paintCards(array, contenedorTarjetas) {
    contenedorTarjetas.innerHTML = "";
    if (array.length > 0) {
        array.forEach(evento => {
            contenedorTarjetas.innerHTML += `<div class="card tarjetas m-3">
            <img src="${evento.image}" class="card-img-top" alt="imagen-evento">
                    <div class="card-body eventos">
                        <h5 class="card-title">${evento.name}</h5>
                        
                        <p class="card-text">${evento.description}</p>
                        <p class="fecha">${evento.date}
                        <a href="./dateil.html?=${evento.id}" class="boton-detail btn btn-primary"> Detail </a></p>
                        
                    </div>
                    </div>`
        })
    } else {
        contenedorTarjetas.innerHTML = `
        <h5 class="card-title not-found">Not Found 📛</h5>`
    }
}

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

function filtrado(array) {
    dataArray = []
    if (checkboxSelected.length > 0 && searchText !== "") {
        checkboxSelected.map(events => {
            dataArray.push(...array.filter(show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) && show.category === events)) //De esta forma estamos combinando los filtrados por checkbox y barra de buscado
        })
    } else if (checkboxSelected.length > 0 && searchText === "") {
        checkboxSelected.map(events => dataArray.push(...array.filter(show => show.category == events)))
    } else if (checkboxSelected.length === 0 && searchText !== "") {
        dataArray.push(...array.filter(show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) || show.description.toLowerCase().includes(searchText.trim().toLowerCase())))
        console.log(arrayEventos)
    } else {
        dataArray.push(...array)
        console.log(dataArray);
    }
}
var arrayEventos = "";

function arrayFiltered() {
    if (events != null) {
        filtrado(data.eventos)
        paintCards(dataArray, events)
    } else if (eventsPast != null) {
        filtrado(eventosPasados)
        paintCards(dataArray, eventsPast)
    } else if (eventsUP != null) {
        filtrado(eventosFuturos)
        paintCards(dataArray, eventsUP)
    }
}
arrayFiltered()

if (events != null) {
    paintCards(data.eventos, events)
} else if (eventsPast != null) {
    paintCards(eventosPasados, eventsPast)
} else if (eventsUP != null) {
    paintCards(eventosFuturos, eventsUP)
}