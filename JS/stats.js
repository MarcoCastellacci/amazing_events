let amazingEvents = []

async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(JSON => amazingEvents = JSON)

    const amazing = amazingEvents.events;
    let fechaActual = amazingEvents.currentDate;
    let upComingTable = document.getElementById(`upStats`);
    let pastTable = document.getElementById(`pastStats`);
    let table = document.getElementById("stats")
    let eventosPasados = amazing.filter(pastEvents => pastEvents.date < fechaActual)
    let eventosFuturos = amazing.filter(futureEvents => futureEvents.date > fechaActual)
    console.log(eventosFuturos);

    function arrayStats() {
        let arrayAttendance = amazing.map(evento => {
            var percentage = (evento.assistance / evento.capacity) * 100
            var percentage = percentage.toFixed(2)
            let objeto = {
                price: evento.price,
                name: evento.name,
                capacity: evento.capacity,
                assistance: evento.assistance,
                percentage: percentage,
                category: evento.category
            }
            return objeto
        })
        return arrayAttendance
    }
    let arrayAttendance = arrayStats()
    let arrayAttendanceMax = arrayAttendance.filter(evento => evento.assistance !== undefined).sort(function(a, b) {
        return b.percentage - a.percentage
    })
    let arrayAttendanceMin = arrayAttendance.filter(evento => evento.assistance !== undefined).sort(function(a, b) {
        return a.percentage - b.percentage
    })

    let capacity = arrayStats()
    capacity.sort(function(a, b) {
        return b.capacity - a.capacity
    })


    function tableMaxMin(arrayAttendance, arrayAttendanceMin, capacity) {
        let tableHtml = ""
        tableHtml += `<tr>
            <td> ${arrayAttendance[0].name}  (${arrayAttendance[0].percentage}%)</td> 
            <td> ${arrayAttendanceMin[0].name} (${arrayAttendanceMin[0].percentage}%)</td> 
            <td> ${capacity[0].name} - ${capacity[0].capacity}</td>   
            </tr> `

        table.innerHTML = tableHtml
    }
    tableMaxMin(arrayAttendanceMax, arrayAttendanceMin, capacity)

    let categoryFuture = []
    categoryFuture = filterCategories(eventosFuturos)
    let categoryPast = []
    categoryPast = filterCategories(eventosPasados)
        // Filtramos las categorias de los eventos


    function filterCategories(array) {
        let categorysFiltered = array.map(evento => evento.category)
        return [...new Set(categorysFiltered)]
    }
    // Calculamos el total de ingresos
    let upComingStats = calculateStats(categoryFuture, eventosFuturos)
    let pastStats = calculateStats(categoryPast, eventosPasados)

    console.log(upComingStats);

    function calculateStats(arraycategories, arrayeventos) {
        let categoryStats = []
        let revenueCategory = 0;
        let attendanceCategory = 0;
        let eventsPerCategory = 0;

        for (categoria of arraycategories) {
            revenueCategory = 0;
            attendanceCategory = 0;
            eventsPerCategory = 0;
            for (elemento of arrayeventos) {
                if (elemento.category == categoria) {
                    if (elemento.date > fechaActual) {
                        revenueCategory += Number(elemento.price) * Number(elemento.estimate);
                        attendanceCategory += Number(elemento.estimate) / Number(elemento.capacity) * 100;
                        eventsPerCategory++
                    } else {
                        revenueCategory += Number(elemento.price) * Number(elemento.assistance);
                        attendanceCategory += Number(elemento.assistance) / Number(elemento.capacity) * 100;
                        eventsPerCategory++
                    }

                }
            }
            categoryStats.push({
                category: categoria,
                revenue: revenueCategory / eventsPerCategory,
                attendance: attendanceCategory / eventsPerCategory
            })
            console.log(categoryStats);
        }
        return categoryStats;
    }

    function paintCards(array, contenedorTarjetas) {
        contenedorTarjetas.innerHTML = "";

        array.forEach(evento => {
            contenedorTarjetas.innerHTML += `<tr>
            <td> ${evento.category}</td> 
            <td class="percent"> $${evento.revenue.toFixed(2)}</td> 
            <td class="percent"> ${evento.attendance.toFixed(2)} %</td>   
            </tr> `
        })

    }

    if (pastTable != null) {
        paintCards(pastStats, pastTable)
    }
    if (upComingTable != null) {
        paintCards(upComingStats, upComingTable)
    }

}
getData()