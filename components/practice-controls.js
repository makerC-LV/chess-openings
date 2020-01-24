import { parsepgn } from '../utils/pgnutils'
import { gamemap } from '../games'
import store from '../store'
import { gameChangedAction, autoPlayChangedAction, hidePgnChangedAction, hintClickedAction } from '../actions/game-actions'

export const init = (selectDivId) => {
    configureSelect(selectDivId)
    configureButtons()
}


function configureSelect(divId) {
    let seldiv = document.getElementById(divId)
    let sel = document.createElement("select")


    for (let key in gamemap) {
        let option = document.createElement("option");
        option.value = key;
        option.text = key;
        sel.appendChild(option);
    }
    seldiv.appendChild(sel)
    sel.addEventListener("change", event => onSelect(event))

}

function onSelect(event, setGame) {

    let pgn = gamemap[event.target.value]
    let root = parsepgn(pgn['pgn'])
    store.dispatch(gameChangedAction(root, pgn['engineColor']))
    // console.log(result)
    // setGame(result, pgn['engineColor'])

}

function configureButtons() {
    document.getElementById('play').addEventListener("click", () => {})
    document.getElementById('hint').addEventListener("click", event => store.dispatch(hintClickedAction()))
    document.getElementById('autoplay').addEventListener("change", event => store.dispatch(autoPlayChangedAction(event.target.checked)))
    document.getElementById('hidepgn').addEventListener("change", event => store.dispatch(hidePgnChangedAction(event.target.checked)))
}

export default {init}