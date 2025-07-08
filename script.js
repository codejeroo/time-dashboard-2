
const category = document.querySelectorAll(".category")
const currentTime = document.querySelectorAll(".current-time")
const pastTime = document.querySelectorAll(".past-time")

async function loadData() {
  return (await fetch("data.json")).json()
}



function getContent(content,data) {
for ( let i = 0 ; i < 6; i++) {
    let currentData = data[i].timeframes[content].current
    let pastData = data[i].timeframes[content].previous

    if (currentData > 1) {
        currentData += "hrs"
    } else {
        currentData += "hr"
    }

    if(pastData > 1) {
        pastData += "hrs"
    } else {
        pastData += "hr"
    }

    currentTime[i].textContent = currentData

    if(content === "daily") {
    pastTime[i].textContent = `Yesterday - ${pastData}`
    } else if (content === "weekly") {
        pastTime[i].textContent = `Last Week - ${pastData}`
    } else if (content === "monthly") {
        pastTime[i].textContent = `Last Month - ${pastData}`
    } else {
        console.log("Error on Printing Past Time")
    }
    
}
}


function changeData (data) {

    category.forEach(btn => {
    
    btn.addEventListener("click", () => {
       category.forEach(btn  => {
        btn.classList.remove("highlight")
       })

       btn.classList.add("highlight")
       content = btn.textContent.toLowerCase()

       switch(content) {
        case "daily":
            getContent("daily",data)
            break;
        case "weekly":
            getContent("weekly", data)
            break;
        case "monthly":
            getContent("monthly", data)
            break;
       }

    })
})
}

pastTime[0].textContent = `Last Week - 35hrs`

document.addEventListener("DOMContentLoaded", async() => {
let data = []
try {
    data = await loadData()
    changeData(data)
} catch (e) {
    console.log("Error")
    console.log(e)
}

})








