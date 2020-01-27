import { parsepgn, promoteNode, deleteNode, mergeTrees, parseMultiple } from '../utils/pgnutils'
import { gamemap } from '../games'
import { editStore as store } from '../store'
import { gameChangedAction, boardFlippedAction, hintClickedAction, positionChangedAction } from '../actions/game-actions'
import { configureButton } from '../utils/documentutils'
import { getPGNText } from '../utils/showpgn'
import { copyToClipboard } from '../utils/documentutils'

export const init = () => {
    configureButtons()

    store.subscribe(() => {
        let {current} = store.getState()
        if (current) {
            let ta = document.getElementById('multipurpose-textarea')
            ta.value = current.comment? current.comment : ''

        }
    })
}

const fwd = () => { 
    let {current} = store.getState()
    if (current.children.length == 1) {
        store.dispatch(positionChangedAction(current.children[0]))
    } else if (current.children.length > 1) {
        store.dispatch(hintClickedAction())
    }
}

const back = () => {
    let {current} = store.getState()
    if (current.parent) {
        store.dispatch(positionChangedAction(current.parent))
    }
}

const getParsedPgn = () => {
    let pgn = document.getElementById('multipurpose-textarea').value
    let fullPgn = '[White "me"]\n[Black "you"]\n' + pgn + ' * '
    let root = parsepgn(fullPgn)
    return root
}

const loadPgn = () => {
    store.dispatch(gameChangedAction(getParsedPgn(), 'white'))
}

const promoteVariation = () => {
    let {current} = store.getState()
    promoteNode(current)
    store.dispatch(positionChangedAction(current))
}

const deleteVariation = () => {
    let {current} = store.getState()
    console.log(current)
    let newCurrent = current
    if (current.parent) {
        newCurrent = current.parent
        deleteNode(current)
        store.dispatch(positionChangedAction(newCurrent))
    }
}

const addComment = () => {
    let {current} = store.getState()
    current.comment = document.getElementById('multipurpose-textarea').value
    store.dispatch(positionChangedAction(current))
}

const merge = () => {
    let pgn = document.getElementById('multipurpose-textarea').value

    let root = parseMultiple(pgn)
    
    store.dispatch(gameChangedAction(root))
}


function configureButtons() {
    configureButton('fwd', fwd)
    configureButton('back', back)
    configureButton('loadpgn', loadPgn)
    configureButton('promote', promoteVariation)
    configureButton('delete', deleteVariation)
    configureButton('add-comment', addComment)
    configureButton('merge', merge)
    configureButton('copy', event => {
        let {currentRoot} = store.getState()
        let text = getPGNText(currentRoot)
        copyToClipboard(text)
        
    })
    configureButton('flipboard', event => {
        let current = store.getState()

        store.dispatch(boardFlippedAction(event.target.checked))

    })
}

export default {init}