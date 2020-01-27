
/*
 Uses CSS styles: 

move div has classes: 'pgnelement', 'move', 'level0', level1, ...
                        played or unplayed, and possibly currentmove
comment div has classes:  pgnelement', 'comment', 'level0', level1, ...

variation div has classes: 'pgnelement', 'variation', 'level0', level1,...

*/

import { allChildrenPlayed } from './pgnutils'

export const displayFormattedPgn = (pgndiv, root, current, hidePGN, setCurrent) => {
    pgndiv.innerHTML = ''
    if (!hidePGN) {
        // console.log("Current:" + current.san)
        appendElements(root, pgndiv, 0, current, true, setCurrent);
        if (current) {
            let currentDiv = document.getElementById(nodeId(current))
            console.log(currentDiv.offsetTop)
            pgndiv.scrollTop = currentDiv.offsetTop 
            // currentDiv.scrollIntoView(false, {block:"nearest"})

        }
    }
}

function appendElements(node, parentElem, varDepth, current, writeNode, setCurrent) {
    let isCurrent = (node === current)
    if (writeNode) {
        parentElem.appendChild(makeNodeDiv(node, varDepth, isCurrent, setCurrent))
    }
    if (node.children.length > 1) {
        parentElem.appendChild(makeNodeDiv(node.children[0], varDepth, node.children[0] === current, setCurrent))
        for (var i = 1; i < node.children.length; i++) {
            let varDiv = makeVarDiv(varDepth)
            parentElem.appendChild(varDiv)
            let child = node.children[i]
            addTextChild(varDiv, '(')
            appendElements(child, varDiv, varDepth + 1, current, true, setCurrent)
            addTextChild(varDiv, ')')
        }
        appendElements(node.children[0], parentElem, varDepth, current, false, setCurrent)
    } else if (node.children.length > 0) {
        appendElements(node.children[0], parentElem, varDepth, current, true, setCurrent)
    }
    
}

function makeNodeDiv(node, varDepth, isCurrent, setCurrent) {
    let div = document.createElement("div")
    div.id = nodeId(node)
    div.classList.add('pgnelement', 'move', 'level' + varDepth)

    if (node.san) {
        if (isCurrent) {
            div.classList.add('currentmove')
        }
        if (allChildrenPlayed(node)) {
            div.classList.add('played')
        } else {
            div.classList.add('unplayed')
        }
        if (node.color == 'w') {
            div.appendChild(document.createTextNode(node.move_number + "."))
        } else if (firstInVariation(node) ||
                    firstAfterVariation(node)) {
            div.appendChild(document.createTextNode(node.move_number + "..."))
        }
        div.appendChild(document.createTextNode(node.san))
        if (node.comment) {
            let cdiv = addTextChild(div, ['{', node.comment, '}'].join(' '))
            cdiv.classList.add('pgnelement', 'comment', 'level' + varDepth)
        }
    }
    div.onclick = function (ev) {
        setCurrent(node)
    }
    return div

}

function addTextChild(parentDiv, text) {
    let cdiv = document.createElement("div")
    cdiv.appendChild(document.createTextNode(text))
    parentDiv.appendChild(cdiv)
    return cdiv
}

function makeVarDiv(varDepth) {
    let div = document.createElement("div")
    div.classList.add('pgnelement', 'variation', 'level' + varDepth)
    return div
}

function firstInVariation(node) {
    return (node.parent && node.parent.children.length > 1 &&
        node != node.parent.children[0])
}

function firstAfterVariation(node) {
    return (node.parent.parent && node.parent.parent.children.length > 1 &&
        node.parent == node.parent.parent.children[0] && 
        node == node.parent.children[0])
}

function nodeId(node) {
    let id = "";
    while (node.parent) {
        id += node.parent.children.indexOf(node)
        node = node.parent
    }
    return id ? id : 'ROOT'
}

let pgnBuffer

export const getPGNText = (root) => {
    pgnBuffer = ""
    writePGN(root.children[0], "", true, "  ")
    return pgnBuffer
}

const writePGN = (node, currentIndent, writeNodeFirst, indent) => {
    if (writeNodeFirst) {
        writeNode(node)
    }
    if (node.children.length > 1) {
        writeNode(node.children[0])
        for (var i = 1; i < node.children.length; i++) {
            pgnBuffer += ('\n' + currentIndent + ' (')
            writePGN(node.children[i], currentIndent + indent, true, indent)
            pgnBuffer += ('\n' + currentIndent + ') ')
        }
        writePGN(node.children[0], currentIndent, false, indent)
    } else if (node.children.length > 0) {
        writePGN(node.children[0], currentIndent, true, indent)
    }
}

const writeNode = (node) => {
    if (node.color == 'w') {
        pgnBuffer += (node.move_number + ".")
    } else if (firstInVariation(node) ||
                firstAfterVariation(node)) {
        pgnBuffer += (node.move_number + "...")
    }
    pgnBuffer += (node.san + ' ')
    if (node.comment) {
        pgnBuffer += [' {', node.comment, '} '].join(' ')
    }
}