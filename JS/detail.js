let amazingEvents = []

async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(JSON => amazingEvents = JSON)

    console.log(amazingEvents);
    const amazing = amazingEvents.events

    function getDetail() {
        var id = 1
        amazing.map(detail => detail.id = id++)
        var id = location.search.split("?=").filter(Number)
        console.log(id);
        var idSelected = Number(id[0])
        let showDetail = amazing.find((detalle) => {
            return detalle.id == idSelected
        })
        console.log(showDetail);
        var templateDetail = `
    <div class="descripcion align-self-center justify-self-center">
                <img src="${showDetail.image}" alt="cine">
            </div>
            <div class="descripcion texto d-flex align-self-center flex-column mx-1">
                <h5 class="title">${showDetail.name}</h5>
                <ul class="card-text detalles-li">
                    <li>${showDetail.date}</li>
                    <li>${showDetail.description}</li>
                    <li>${showDetail.category}</li>
                    <li>${showDetail.place}</li>
                    <li>$${showDetail.price}</li>
                </ul>
                <a href="./stats.html" class="desplegable align-items-center btn btn-primary">Stats</a>
            </div>
    `

        document.getElementById("detail").innerHTML = templateDetail
    }
    getDetail()

}
getData()