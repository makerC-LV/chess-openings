import { createStore } from 'redux'
import { POSITION_CHANGED, GAME_CHANGED, PLAYER_MADE_MOVE, HIDE_PGN_CHANGED, 
    AUTOPLAY_CHANGED, HINT_CLICKED, BOARD_FLIPPED } 
    from '../actions/game-actions'
import {findNext, parsepgn} from '../utils/pgnutils'
import { gamemap } from '../games'

let initialStatePractice = {
    currentRoot: null,
    current: null,
    engineColor: 'white',
    hidePGN: false,
    autoPlay: false,
    hint: false
}
let emptyTree = parsepgn(gamemap['Select a game']['pgn'])

let initialStateEdit = {
    currentRoot: emptyTree,
    current: emptyTree,
    engineColor: 'black',
    hidePGN: false,
    autoPlay: false,
    hint: false
}

const practiceReducer = (state=initialStatePractice, action) => {
    return reducer(state, action)
}

const editReducer = (state=initialStateEdit, action) => {
    return reducer(state, action)
}

const reducer = (state, action) => {
    switch (action.type) {
        case POSITION_CHANGED: return { ...state, hint: false, current: action.node }
        case GAME_CHANGED: return {
            ...state,
            currentRoot: action.root,
            current: action.root,
            engineColor: action.engineColor,
            hint: false
        }
        case PLAYER_MADE_MOVE:
            return { ...state, current: action.newCurrent }

        case HIDE_PGN_CHANGED: return { ...state, hidePGN: action.checked }

        case AUTOPLAY_CHANGED: return { ...state, autoPlay: action.checked }

        case HINT_CLICKED: return { ...state, hint: true }

        case BOARD_FLIPPED: return {...state, engineColor: action.checked? 'white' : 'black'}

        default: return state
    }
}

export const practiceStore = createStore(practiceReducer)

export const editStore = createStore(editReducer)

let currentState = initialStateEdit
editStore.subscribe(() => {
    let state = editStore.getState()
    console.log(currentState, state)
    currentState = state
})





