function displayPgn(root, current, hidePGN) {
    let pgndiv = document.getElementById('pgndisplay')
    pgndiv.innerHTML = ''
    if (!hidePGN) {
        console.log("Current:" + current.san)
        appendElements(root, pgndiv, 0, current, true);
        if (current) {
            let currentDiv = document.getElementById(current.idx)
            currentDiv.scrollIntoView()

        }
    }
    let fendiv = document.getElementById('fen')
    fendiv.innerHTML = ''
    fendiv.appendChild(document.createTextNode(current.fen))

    
}

function appendElements(node, parentElem, varDepth, current, writeNode) {
    let isCurrent = (node === current)
    if (writeNode) {
        parentElem.appendChild(makeNodeDiv(node, varDepth, isCurrent))
    }
    if (node.children.length > 1) {
        parentElem.appendChild(makeNodeDiv(node.children[0], varDepth, node.children[0] === current))
        for (var i = 1; i < node.children.length; i++) {
            let varDiv = makeVarDiv(varDepth)
            parentElem.appendChild(varDiv)
            let child = node.children[i]
            // varDiv.appendChild(document.createElement('br'))
            varDiv.appendChild(document.createTextNode('('))
            appendElements(child, varDiv, varDepth + 1, current, true)
            varDiv.appendChild(document.createTextNode(')'))
            // varDiv.appendChild(document.createElement('br'))
        }
        appendElements(node.children[0], parentElem, varDepth, current, false)
    } else if (node.children.length > 0) {
        appendElements(node.children[0], parentElem, varDepth, current, true)
    }
    
}

function makeNodeDiv(node, varDepth, isCurrent) {
    let div = document.createElement("div")
    div.id = node.idx
    div.classList.add('displayable', 'move', 'level' + varDepth)

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
            let cdiv = document.createElement("div")
            cdiv.classList.add('displayable', 'comment', 'level' + varDepth)
            cdiv.appendChild(document.createTextNode('{'))
            cdiv.appendChild(document.createTextNode(node.comment))
            cdiv.appendChild(document.createTextNode('}'))
            div.appendChild(cdiv)
        }
    }
    div.onclick = function (ev) {
        setCurrent(node)
    }
    return div

}

function makeVarDiv(varDepth) {
    let div = document.createElement("div")
    div.classList.add('displayable', 'variation', 'level' + varDepth)
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

function scrollToView(element, parent) {

    var offset = element.offset().top + parent.scrollTop();

    var height = element.innerHeight();
    var offset_end = offset + height;
    if (!element.is(":visible")) {
        element.css({"visibility":"hidden"}).show();
        var offset = element.offset().top;
        element.css({"visibility":"", "display":""});
    }

    var visible_area_start = parent.scrollTop();
    var visible_area_end = visible_area_start + parent.innerHeight();

    if (offset-height < visible_area_start) {
        parent.animate({scrollTop: offset-height}, 600);
        return false;
    } else if (offset_end > visible_area_end) {
        parent.animate({scrollTop: parent.scrollTop()+ offset_end - visible_area_end }, 600);
        return false;

    }
    return true;
}
