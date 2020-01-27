import { parsepgn } from '../utils/pgnutils'
import { gamemap } from '../games'
import { gameChangedAction, autoPlayChangedAction, hidePgnChangedAction, hintClickedAction } from '../actions/game-actions'
import { configureButton, copyToClipboard } from '../utils/documentutils'
import { practiceStore as store } from '../store'
import { getPGNText } from '../utils/showpgn'

export const init = (selectDivId) => {
    configureSelect(selectDivId, store)
    configureButtons(store)
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

function onSelect(event) {

    let pgn = gamemap[event.target.value]
    let root = parsepgn(pgn['pgn'])
    store.dispatch(gameChangedAction(root, pgn['engineColor']))

}

function configureButtons() {
    configureButton('play', () => { console.log('Play') })
    configureButton('hint', event => store.dispatch(hintClickedAction()))
    configureButton('autoplay', event => store.dispatch(autoPlayChangedAction(event.target.checked)))
    configureButton('hidepgn', event => store.dispatch(hidePgnChangedAction(event.target.checked)))
    configureButton('copy', event => {
        let {currentRoot} = store.getState()
        let text = getPGNText(currentRoot)
        copyToClipboard(text)
        
    })
}

export default { init }