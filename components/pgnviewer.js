
import store from '../store'
import { displayFormattedPgn } from '../utils/showpgn'
import { positionChangedAction } from '../actions/game-actions'

export const init = (divId) => {

    const onClick = (node) => {
        store.dispatch(positionChangedAction(node))
    }

    store.subscribe(() => {
        let {currentRoot, current, hidePGN} = store.getState()
        let pgnDiv = document.getElementById(divId)
        displayFormattedPgn(pgnDiv, currentRoot, current, hidePGN, onClick)
        
    })
}

export default {init}
