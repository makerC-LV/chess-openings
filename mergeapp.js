import { mergeTrees, parsepgn, assignUniqueIndices } from './pgnutils'
import { displayFormattedPgn } from './showpgn'

let root

document.getElementById('merge').addEventListener("click", merge)

function merge() {
    let pgn = '[White "me"]\n[Black "you"]\n' + 
        document.getElementById('merge-input').value + ' *'

    let newRoot = parsepgn(pgn)
    if (root) {
        mergeTrees(root, newRoot)
    } else {
        root = newRoot
    }
    assignUniqueIndices(root)
    
    let pgndiv = document.getElementById('pgndisplay')
    displayFormattedPgn(pgndiv, root, root, false, () => {})
}