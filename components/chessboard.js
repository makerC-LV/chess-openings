
import Chessground from '../assets/libs/chessground'
import store from '../store'
import { findNext, updatePlayedStatus } from '../utils/pgnutils'
import { isEngineMove }  from '../utils/gameutils'
import {playerMadeMoveAction} from '../actions/game-actions'



export const init = (boardId, nextFunc) => {

    let ground

    let options = {
        resizable: true,
        // orientation: 'black',
        // fen: '2r3k1/pp2Qpbp/4b1p1/3p4/3n1PP1/2N4P/Pq6/R2K1B1R w -'
        events: {
            // change: onchange, // called after the situation changes on the board
            // called after a piece has been moved.
            // capturedPiece is undefined or like {color: 'white'; 'role': 'queen'}
            move: (orig, dest, capturedPiece) => onMove(orig, dest, capturedPiece, nextFunc),
            // dropNewPiece: onDropNewPiece,
            // select: onSelect, // called when a square is selected
            // insert: onInsert // when the board DOM has been (re)inserted
        }
        
    }
    
    resizeBoard()

    ground = Chessground(document.getElementById(boardId), options)
    store.subscribe(() => {
        // console.log(store.getState())
        let { current, engineColor, hint} = store.getState()
        let options = {
            fen: current.fen,
            orientation: engineColor === 'white' ? 'black' : 'white'
        }
        
        window.setTimeout(() => {
            ground.set(options)
            if (hint) {
                let shapes = getHintShapes(current)
                ground.setShapes(shapes)
            }
        }, 100)
    })
    return ground
}

function getHintShapes(current) {
    let arr = []
    current.children.forEach(child => {
        arr.push({
            orig: child.from,
            dest: child.to,
            brush: 'red'
        })
    })
    return arr
    
    
}

function onMove(orig, dest, capturedPiece, nextFunc) {
    let {current} = store.getState()
    let next = nextFunc(orig, dest)

    store.dispatch(playerMadeMoveAction(next))

}


function resizeBoard() {
    var boardElem = document.getElementById("dirty")
    var parentElem = boardElem.parentNode
    var rect = parentElem.getBoundingClientRect()
    let maxw = rect.width - 10
    let w8 = maxw - maxw % 8 
    boardElem.style.width = w8 + "px"
    boardElem.style.height = w8 + "px"
}

export default {init}
