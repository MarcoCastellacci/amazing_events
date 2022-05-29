let amazingEvents = []

async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(JSON => amazingEvents = JSON)

    const amazing = amazingEvents.events
    let upComingtable = document.getElementById(`upStats`);
    let pastTable = document.getElementById(`pastStats`);
    let table = document.getElementById("stats")

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


    let categoryTable = [];
    let arrayCategories = new Set(arrayAttendance.map(evento => evento.category));
    let category = [...arrayCategories]
    category.map(category => {
        categoryTable.push({
            category: category,
            evento: arrayAttendance.filter(evento => evento.category === category)
        })
    })
    console.log(categoryTable);

    function categoryPercentag(categoryTable) {
        let tableHtml = ""
        tableHtml += `<tr>
            <td> ${categoryTable}</td> 
            <td> ${arrayAttendance[8].name} (${arrayAttendance[8].percentage}%)</td> 
            <td> ${capacity[0].name} - ${capacity[0].capacity}</td>   
            </tr> `

        upComingtable.innerHTML = tableHtml
            // pastTable.innerHTML = tableHtml
    }
    categoryPercentag(categoryTable)

}
getData()