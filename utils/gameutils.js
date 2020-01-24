
export const isEngineMove = (current, engineColor)  => {
    return current && 
        ((current.color === 'w' && engineColor === 'black') ||
        (current.color === 'b' && engineColor === 'white'));
}