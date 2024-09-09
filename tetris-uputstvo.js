$(document).ready(function() {
    $("input:checkbox").prop("checked", true)
    azurirajVisinuTD()
    $(window).resize(azurirajVisinuTD)
    $("#zapocniIgru").on("click", zapocniIgru)
});

function azurirajVisinuTD() {
    $("#formPocetak table tr td").css("height", $("#formPocetak table tr td").css("width"))
}

function zapocniIgru() {
    console.log("ALO")
    ans = new Array()
    $("input[type='checkbox']").each(function() {
        if ($(this).is(":checked")) {
            ans.push($(this).attr("id"))
        }
    });
    console.log(ans)
    if (ans.length === 0) {
        alert("Морате изабрати барем једну врсту фигуре.")
        return
    }
    localStorage.setItem("figure", ans)
    let nivo = $("input[type='radio'][name=nivo]:checked").val()
    localStorage.setItem("nivo", nivo)
    window.location.href = "tetris-igra.html"
}