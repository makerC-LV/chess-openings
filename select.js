// let pnp = require("./pgnparser")



let seldiv = document.getElementById("game-select")
let sel = document.createElement("select")


for (let key in gamemap) {
    let option = document.createElement("option");
    option.value = key;
    option.text = key;
    sel.appendChild(option);
}
seldiv.appendChild(sel)
sel.addEventListener("change", onSelect)

function onSelect(event) {
    
    let pgn = gamemap[event.target.value]
    result = parsepgn(pgn['pgn'])
    console.log(result)
    setGame(result, pgn['engineColor'])

}