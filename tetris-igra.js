$(document).ready(function() {
    inicijalizujTablu()
    azurirajKonstante()
    $(window).resize(azurirajVelicinuTD)
    $(document).keydown(klik)
    generateFigura()
    igraj()
});

function klik(event) {
    if (enter === false) return
    enter = false
    let e = event.which
    // console.log(e)
    if (e === 37) {
        if (checkLeft(figura) === false) {
            let novaFigura = {
                pos: figura["pos"] - 1,
                x: figura["x"]
            }
            if (check(novaFigura)) {
                obrisiFiguru()
                figura = novaFigura
                crtajFiguru(figura, oznaka)
            }
        }
    } else
    if (e == 39) {
        if (checkRight(figura) === false) {
            let novaFigura = {
                pos: figura["pos"] + 1,
                x: figura["x"]
            }
            if (check(novaFigura)) {
                obrisiFiguru()
                figura = novaFigura
                crtajFiguru(figura, oznaka)
            }
        }
    } else
    if (e == 40) {
        let novaFigura = {
            pos: figura["pos"] + M,
            x: figura["x"]
        }
        if (check(novaFigura)) {
            obrisiFiguru()
            figura = novaFigura
            crtajFiguru(figura, oznaka)
        }
    } else
    if (e == 38) {
        if ((notRight() === false || checkRight(figura) === false) &&
            (notLeft() === false || checkLeft(figura) == false) && checkForI2() === false) {
            let novaFigura = rotate(figura)
            if (check(novaFigura)) {
                obrisiFiguru()
                figura = novaFigura
                rotacija = (rotacija) % parseInt(brojRotacija[oznaka]) + 1
                console.log(rotacija)
                crtajFiguru(figura, oznaka)
            }
        }
    }
    enter = true
}

const brojRotacija = {
    "I": 2,
    "J": 4,
    "L": 4,
    "O": 1,
    "S": 4,
    "T": 4,
    "Z": 4
}

function rotate(ovaFigura) {
    let key = oznaka + rotacija
    console.log(key)
    let novaFigura = {
        pos: rotation[key]["pos"],
        x: rotation[key]["x"]
    }
    console.log(novaFigura)
    console.log(ovaFigura)
    novaFigura["pos"] = novaFigura["pos"] + ovaFigura["pos"]
    console.log(novaFigura)
    return novaFigura
}

const listnotleft = ["I2", "J2", "L2", "S2", "Z4", "T4"]
const listnotright = ["I2", "J4", "L4", "S4", "Z2", "T2"]

function notRight() {
    let key = oznaka + rotacija
    return listnotright.includes(key)
}

function notLeft() {
    let key = oznaka + rotacija
    return listnotleft.includes(key)
}

function checkForI2() {
    let key = oznaka + rotacija
    if (key !== "I2") return false
    let pos = figura["pos"]
    let x = figura["x"]
    for (let i = 0; i < x.length; i++) {
        let currind = pos + x[i]
        let indi = Math.floor(currind / M)
        let indj = currind % M
        if (indj === 1) return true
    }
    return false
}

function checkRight(ovaFigura) {
    let pos = ovaFigura["pos"]
    let x = ovaFigura["x"]
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        let indi = Math.floor(currpos / M)
        let indj = currpos % M
        if (indj == M - 1) return true
    }
    return false
}

function izbrisiRed(i) {
    for (let j = i; j > 0; j--) {
        for (let k = 0; k < M; k++) {
            let colorcurr = $("#" + (j * M + k)).attr("class")
            let colornext = $("#" + ((j - 1) * M + k)).attr("class")
            $("#" + (j * M + k)).attr("class", colornext)
        }
    }
    for (let k = 0; k < M; k++) {
        $("#" + (k)).attr("class", "B")
    }
}

const score = 500

function uvecajScore() {
    let val = parseInt($("#score").text()) + score
    $("#score").text(val)
}

function linija() {
    for (let i = 0; i < N; i++) {
        let cntB = 0
        for (let j = 0; j < M; j++) {
            let currind = i * M + j
            let color = $("#" + currind).attr("class")
            if (color === "B") {
                cntB += 1
                break
            }
        }
        if (cntB === 0) {
            uvecajScore()
            izbrisiRed(i)
        }
    }
}

function checkLeft(ovaFigura) {
    let pos = ovaFigura["pos"]
    let x = ovaFigura["x"]
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        let indi = Math.floor(currpos / M)
        let indj = currpos % M
        if (indj == 0) return true
    }
    return false
}

const N = 20
const M = 10
let intervalID;
let sledecaFigura = NaN;
let figura = NaN;
let sledecaOznaka = NaN;
let oznaka = NaN;
let rotacija = 1

const figure = {
    "I": {
        pos: M / 2 - 2,
        x: [0, 1, 2, 3]
    },
    "J": {
        pos: M / 2 - 1,
        x: [0, M, M + 1, M + 2]
    },
    "L": {
        pos: M / 2 - 1,
        x: [M, M + 1, M + 2, 2]
    },
    "O": {
        pos: M / 2 - 1,
        x: [0, 1, M, M + 1]
    },
    "S": {
        pos: M / 2 - 1,
        x: [M, 1, M + 1, 2]
    },
    "T": {
        pos: M / 2 - 1,
        x: [M, 1, M + 1, M + 2]
    },
    "Z": {
        pos: M / 2 - 1,
        x: [0, 1, M + 1, M + 2]
    }
}

const rotation = {
    "I1" : {
        pos: -2 * M + 2,
        x: [0, M, 2 * M, 3 * M]
    },
    "I2" : {
        pos: 2 * M - 2,
        x: [0, 1, 2, 3]
    },
    "J1" : {
        pos: 1,
        x: [0, 1, M, 2 * M]
    },
    "J2" : {
        pos: M - 1,
        x: [0, 1, 2, M + 2]
    },
    "J3" : {
        pos: -M + 1,
        x: [0, M, 2 * M, 2 * M - 1]
    },
    "J4" : {
        pos: -1,
        x: [0, M, M + 1, M + 2]
    },
    "L1" : {
        pos: -M + 1,
        x: [0, M, 2 * M, 2 * M + 1]
    },
    "L2" : {
        pos: M - 1,
        x: [0, 1, 2, M]
    },
    "L3" : {
        pos: -M,
        x: [0, 1, M + 1, 2 * M + 1]
    },
    "L4" : {
        pos: 0,
        x: [M, M + 1, M + 2, 2]
    },
    "O1" : {
        pos: 0,
        x: [0, 1, M, M + 1]
    },
    "S1" : {
        pos: -M + 1,
        x: [0, M, M + 1, 2 * M + 1]
    },
    "S2" : {
        pos: 0,
        x: [0, 1, M - 1, M]
    },
    "S3" : {
        pos: -1,
        x: [0, M, M + 1, 2 * M + 1]
    },
    "S4" : {
        pos: M,
        x: [M, 1, M + 1, 2]
    },
    "T1" : {
        pos: -M,
        x: [0, M, M + 1, 2 * M]
    },
    "T2" : {
        pos: 0,
        x: [0, 1, 2, M + 1]
    },
    "T3" : {
        pos: 2,
        x: [0, M - 1, M, 2 * M]
    },
    "T4" : {
        pos: M - 2,
        x: [M, 1, M + 1, M + 2]
    },
    "Z1" : {
        pos: -M + 1,
        x: [0, M, M - 1, 2 * M - 1]
    },
    "Z2" : {
        pos: -1,
        x: [0, 1, M + 1, M + 2]
    },
    "Z3" : {
        pos: 2,
        x: [0, M - 1, M, 2 * M - 1]
    },
    "Z4" : {
        pos: M - 2,
        x: [0, 1, M + 1, M + 2]
    }
}

let oznake

let radi = true
let enter = false
let cnt = 0

const nivoi = {
    "Лаки": 1000,
    "Средњи": 750,
    "Тежак": 500
}

const granica = {
    "Лаки": 750,
    "Средњи": 500,
    "Тежак": 100
}

const step = 50

function izracunajVreme() {
    let ans = nivoi[nivo] - cnt * step
    if (ans < granica[nivo]) ans = granica[nivo]
    return ans 
}

function igraj() {
    cnt++
    //crtajFiguru(sledecaFigura, sledecaOznaka)
    let flag = checkNaPocetku(sledecaFigura)
    crtajFiguru(sledecaFigura, sledecaOznaka)
    if (flag == false) {
        localStorage.setItem("score", $("#score").text())
        let person = prompt("Крај! Молимо Вас унесите име.")
        if (person == null || person == "") {
            person = "-"
        }
        localStorage.setItem("ime", person)
        window.location.href = "tetris-rezultati.html"
        return
    }
    enter = true
    oznaka = sledecaOznaka
    figura = sledecaFigura
    rotacija = 1
    let periodTime = izracunajVreme()
    //crtajFiguru(figura, oznaka)
    generateFigura()

    intervalID = setInterval(padaj, periodTime)
}

function checkNaPocetku(novaFigura) {
    let x = novaFigura["x"]
    let pos = novaFigura["pos"]
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        let color = $("#" + currpos).attr("class")
        // console.log(color)
        if (color != "B") {
            return false
        }
    }
    return true
}

function check(novaFigura) {
    let x = novaFigura["x"]
    let pos = novaFigura["pos"]
    let oldpos = new Array()
    let xold = figura["x"]
    for (let i = 0; i < xold.length; i++) {
        oldpos.push(figura["pos"] + xold[i])
    }
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        let indi = Math.floor(currpos / M)
        let indj = currpos % M
        if (indi < 0 || indi >= N) return false
        if (indj < 0 || indj >= M) return false
        let sadrzano = oldpos.includes(currpos)
        // console.log(sadrzano)
        if (sadrzano) continue
        let color = $("#" + currpos).attr("class")
        // console.log(color)
        if (color != "B") return false
    }
    return true
}

function generateFigura() {
    let ind = Math.floor(Math.random() * oznake.length)
    sledecaOznaka = oznake[ind]
    sledecaFigura = figure[sledecaOznaka]
    // console.log(sledecaOznaka)
    // console.log(sledecaFigura)
    crtajSledecuFiguru()
}

function padaj() {
    if (enter === false) return
    enter = false
    let novaFigura = {
        pos: figura["pos"] + M,
        x: figura["x"]
    }
    let flag = check(novaFigura)
    if (flag) {
        obrisiFiguru()
        figura = novaFigura
        crtajFiguru(figura, oznaka)
        enter = true
    } else {
        clearInterval(intervalID)
        linija()
        igraj()
    }
}

function azurirajVelicinuTD() {
    let height = $("#igra table tr td").height();
    let size = height
    //console.log(size)
    $("#igra table tr td").css("width", size);
    $("#info table tr td").css("height", size);
    $("#info table tr td").css("width", size);
}

let nivo;

function azurirajKonstante() {
    oznake = localStorage.getItem("figure").split(",")
    // console.log(oznake)
}

function inicijalizujTablu() {
    let context = "<table>"
    for (let i = 0; i < N; i++) {
        context += "<tr>"
        for (let j = 0; j < M; j++) {
            context += "<td id=" + (i * M + j) + " class='B'></td>"
        }
        context += "</tr>"
    }
    context += "</table>"
    $("#igra").append(context)
    context = "<table>"
    for (let i = 0; i < 4; i++) {
        context += "<tr>"
        for (let j = 0; j < 4; j++) {
            context += '<td id=' + (N * M + i * 4 + j) + ' class="B"></td>'
        }
        context += "</tr>"
    }
    context += "</table>"
    $("#info").append(context)
    nivo = localStorage.getItem("nivo")
    context = "<p>Ниво: " + nivo + "</p>"
    $("#info").append(context)
    azurirajVelicinuTD();
}

function crtajFiguru(ovaFigura, ovaOznaka) {
    let x = ovaFigura["x"]
    // console.log(x)
    let pos = ovaFigura["pos"]
    // console.log(pos)
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        // console.log(currpos)
        $("#" + currpos).attr("class", ovaOznaka)
    }
}

function crtajSledecuFiguru() {
    $("." + oznaka).filter(function() {
        return parseInt(this.id) >= N * M
    }).attr("class", "B")
    let x = sledecaFigura["x"]
    let pos = N * M
    for (let i = 0; i < x.length; i++) {
        let tmpx = Math.floor(x[i] / M) * 4 + x[i] % M
        let currpos = pos + tmpx
        $("#" + currpos).attr("class", sledecaOznaka)
    }
}

function obrisiFiguru() {
    let x = figura["x"]
    // console.log(x)
    let pos = figura["pos"]
    // console.log(pos)
    for (let i = 0; i < x.length; i++) {
        let currpos = pos + x[i]
        // console.log(currpos)
        $("#" + currpos).attr("class", "B")
    }
}