import Board from '../components/chessboard'
import EControls from '../components/edit-controls'
import PGNView from '../components/pgnviewer'
import Fen from '../components/fen'

import { editStore as store } from '../store'
import { isEngineMove as isEnginesTurn } from '../utils/gameutils'
import { positionChangedAction } from '../actions/game-actions'
import { findNext, addNode } from '../utils/pgnutils'
import { Chess } from 'chess.js'

let game = Chess()

const computeNewPosition = (orig, dest) => {
    let {current, engineColor, autoPlay} = store.getState()
    let next = findNext(current, orig, dest)
    if (next) {
        current = next
    } else {
        game.reset()
        game.load(current.fen)
        let legalMoves = game.moves({verbose: true})
        for (let move of legalMoves) {
            if (move.from === orig && move.to === dest) {
                game.move(move.san)
                move.fen = game.fen()
                addNode(move, current, null, null, null)
                return move
            }
        }
    }
    return current
}

// let localCurrent = null
// const triggerEngineMove = () => {
//     let {currentRoot, current, engineColor, autoPlay} = store.getState()
//     // exit if the game is over
//     if (current.children.length === 0) {
//         console.log("End of variation")
//         window.setTimeout(() => {
//             store.dispatch(positionChangedAction(currentRoot))
//         }, 2000)
//         return
//     }
//     if (localCurrent !== current && autoPlay && isEnginesTurn(current, engineColor)) {
//         window.setTimeout(makeNextMove, 500);
//     }
//     localCurrent = current
// }

// const makeNextMove = function() {
//     let {currentRoot, current, engineColor} = store.getState()
    
//     var possibleMoves = current.children

//     if (possibleMoves.length === 0) {
//         return
//     }

//     let move; 
//     let idx = 0;
//     while (idx < possibleMoves.length) {
//         if (!current.played.has(possibleMoves[idx])) {
//             move = possibleMoves[idx]
//             break
//         }
//         idx++
//     }
//     if (!move) {
//         console.log("Choosing random move")
//         let randomIdx = Math.floor(Math.random() * possibleMoves.length)
//         move = possibleMoves[randomIdx]
//     }

//     var from = move.from;
//     var to = move.to;
    
//     console.log('' + from + ':' + to);
//     current = move
//     store.dispatch(positionChangedAction(current))

// };

EControls.init()
PGNView.init('pgndisplay', store)
Fen.init('fen', store)
Board.init('dirty', computeNewPosition, store)
document.getElementById('multipurpose-textarea').rows = 8




