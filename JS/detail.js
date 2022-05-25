let arrayData = data.eventos
console.log(arrayData);

function getDetail() {
    var id = 1
    arrayData.map(detail => detail.id = id++)
    var id = location.search.split("?=").filter(Number)
    console.log(id);
    var idSelected = Number(id[0])
    let showDetail = arrayData.find((detalle) => {
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