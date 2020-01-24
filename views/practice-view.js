import Board from '../components/chessboard'
import PControls from '../components/practice-controls'
import PGNView from '../components/pgnviewer'

import store from '../store'
import { isEngineMove as isEnginesTurn } from '../utils/gameutils'
import { positionChangedAction } from '../actions/game-actions'
import { findNext } from '../utils/pgnutils'

const computeNewPosition = (orig, dest) => {
    let {current, engineColor, autoPlay} = store.getState()
    let next = findNext(current, orig, dest)
    if (next) {
        current = next
    }
    return current
}

let localCurrent = null
const triggerEngineMove = () => {
    let {currentRoot, current, engineColor, autoPlay} = store.getState()
    // exit if the game is over
    if (current.children.length === 0) {
        console.log("End of variation")
        window.setTimeout(() => {
            store.dispatch(positionChangedAction(currentRoot))
        }, 2000)
        return
    }
    if (localCurrent !== current && autoPlay && isEnginesTurn(current, engineColor)) {
        window.setTimeout(makeNextMove, 500);
    }
    localCurrent = current
}

const makeNextMove = function() {
    let {currentRoot, current, engineColor} = store.getState()
    
    var possibleMoves = current.children

    if (possibleMoves.length === 0) {
        return
    }

    let move; 
    let idx = 0;
    while (idx < possibleMoves.length) {
        if (!current.played.has(possibleMoves[idx])) {
            move = possibleMoves[idx]
            break
        }
        idx++
    }
    if (!move) {
        console.log("Choosing random move")
        let randomIdx = Math.floor(Math.random() * possibleMoves.length)
        move = possibleMoves[randomIdx]
    }

    var from = move.from;
    var to = move.to;
    
    console.log('' + from + ':' + to);
    current = move
    store.dispatch(positionChangedAction(current))

};

PControls.init('game-select')
PGNView.init('pgndisplay')
let ground = Board.init('dirty', computeNewPosition)

store.subscribe(() => {
    triggerEngineMove()
})


