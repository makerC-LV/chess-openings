import { createStore } from 'redux'
import { POSITION_CHANGED, GAME_CHANGED, PLAYER_MADE_MOVE, ENGINE_MADE_MOVE, HIDE_PGN_CHANGED, AUTOPLAY_CHANGED, HINT_CLICKED } from '../actions/game-actions'
import {findNext} from '../utils/pgnutils'

let initialState = {
    currentRoot: null,
    current: null,
    engineColor: 'white',
    hidePGN: false,
    autoPlay: false,
    hint: false
}

const reducer = (state = initialState, action) => {
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

        case ENGINE_MADE_MOVE: return engine.moveMade(state, action)

        case HIDE_PGN_CHANGED: return { ...state, hidePGN: action.checked }

        case AUTOPLAY_CHANGED: return { ...state, autoPlay: action.checked }

        case HINT_CLICKED: return { ...state, hint: true }

        default: return state
    }
}




const store = createStore(reducer)

let currentState = initialState
store.subscribe(() => {
    let state = store.getState()
    console.log(currentState, state)
    currentState = state
})

export default store