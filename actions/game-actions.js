
// move made   ( orig, dest, capturedPiece )

// current changed

export const GAME_CHANGED = 'gameChanged'
export const gameChangedAction = (root, engineColor) => ({
    type: GAME_CHANGED, root, engineColor
})

export const POSITION_CHANGED = 'positionChanged'

export const positionChangedAction = (node) => ({type: POSITION_CHANGED, node })
    
export const PLAYER_MADE_MOVE = 'playerMadeMove'

export const playerMadeMoveAction = (newCurrent) => ({
    type: PLAYER_MADE_MOVE, newCurrent
})

export const ENGINE_MADE_MOVE = 'engineMadeMove'

export const engineMadeMoveAction = (orig, dest, capturedPiece) => ({
    type: ENGINE_MADE_MOVE, orig, dest, capturedPiece
})

export const HIDE_PGN_CHANGED = 'hidePgnChanged'

export const hidePgnChangedAction = (checked) => ({
    type: HIDE_PGN_CHANGED, checked
})

export const AUTOPLAY_CHANGED = 'autoPlayChanged'

export const autoPlayChangedAction = (checked) => ({
    type: AUTOPLAY_CHANGED, checked
})

export const HINT_CLICKED = 'hintClicked'
export const hintClickedAction = () => ({
    type: HINT_CLICKED
})
