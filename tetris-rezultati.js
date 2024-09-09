$(document).ready(function() {
    postaviTrenutniScore()
});

function postaviTrenutniScore() {
    let currscore = localStorage.getItem("score")
    let currusername = localStorage.getItem("ime")
    if (currscore == null) currscore = "-"
    if (currusername == null) currusername = "-"
    let lista = localStorage.getItem("lista")
    if (lista == null) {
        lista = new Array()
        for (let i = 0; i < 5; i++) {
            lista.push({
                username: "-",
                score: "-"
            })
        }
    } else {
        lista = JSON.parse(lista)
    }

    if (currscore != "-") {
        currscore = parseInt(currscore)        
        for (let i = 0; i < lista.length; i++) {
            let tmpscore = lista[i]["score"]
            if (tmpscore == "-") {
                tmpscore = 0
            } else {
                tmpscore = parseInt(tmpscore)
            }
            if (currscore >= tmpscore) {
                for (let j = lista.length - 1; j > i; j--) {
                    lista[j] = lista[j - 1]
                }
                lista[i] = {
                    username: currusername,
                    score: currscore
                }
                break
            }
        }
    }

    $(".username").text(currusername)
    $(".score").text(currscore)

    let context = "<table><tr><td colspan='2' class='header'>Топ 5</td>"
    context += "</tr><tr><th>Корисничко име</th><th>Резултат</th></tr>"
    for (let i = 0; i < lista.length; i++) {
        context += "<tr><td>" + lista[i]["username"] + "</td>"
        context += "<td>" + lista[i]["score"] + "</td></tr>"
    }
    context += "</table>"
    $("#leaderboard").append(context)

    localStorage.setItem("score", "-")
    localStorage.setItem("ime", "-")
    localStorage.setItem("lista", JSON.stringify(lista))
}