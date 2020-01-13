// require('./pgnparser')
// require('./select')

// let chess = require('./assets/libs/chess.min')
// let chessground = require('./assets/libs/chessground')

var options = {
    resizable: true,
    // orientation: 'black',
    // fen: '2r3k1/pp2Qpbp/4b1p1/3p4/3n1PP1/2N4P/Pq6/R2K1B1R w -'
    events: {
        change: onchange, // called after the situation changes on the board
        // called after a piece has been moved.
        // capturedPiece is undefined or like {color: 'white'; 'role': 'queen'}
        move: onMove,
        dropNewPiece: onDropNewPiece,
        select: onSelect, // called when a square is selected
        insert: onInsert // when the board DOM has been (re)inserted
    }
    
}

resizeBoard()

var ground = Chessground(document.getElementById("dirty"), options);
// window.addEventListener('resize', resize)

var currentRoot;
var current;
var game =  Chess()
var movearr = []
var engineColor
var hidePGN
var autoPlay

function setGame(root, engColor) {
    game.reset()
    currentRoot = root
    engineColor = engColor
    movearr = []
    addToArr(root)
    displayPgn(root, root, hidePGN)
    setCurrent(root)
    if (engineColor == 'white') {
        ground.set({orientation: 'black'})
        window.setTimeout(makeNextMove, 500);
    } else {
        ground.set({orientation: 'white'})
    }
}

function setCurrent(node) {
    current = node;
    var options = {
        fen: current.fen
    }
    ground.set(options)
    game.load(current.fen)
    displayPgn(currentRoot, current, hidePGN)
}

function addToArr(node) {
    node.idx = movearr.length
    movearr.push(node)
    node.children.forEach(child => {
        addToArr(child)
    })
}


function resize() {
    resizeBoard()
    ground.redrawAll()
}

function resizeBoard() {
    var boardElem = document.getElementById("dirty")
    var parentElem = boardElem.parentNode
    var rect = parentElem.getBoundingClientRect()
    let maxw = rect.width - 10
    // var maxw = Math.min(window.innerHeight, rect.width, 600)
    let w8 = maxw - maxw % 8 
    boardElem.style.width = w8 + "px"
    boardElem.style.height = w8 + "px"
    // parentElem.style.width = w8 + "px"
    // let pgnElem = document.getElementById('pgn-wrapper')
    // pgnElem.style.width = rect.width - w8 - 10
}

const makeNextMove = function() {
    if (!autoPlay) {
        return;
    }
    var possibleMoves = current.children

    // exit if the game is over
    if (game.game_over() === true ||
        game.in_draw() === true ||
        possibleMoves.length === 0) return;

    let move; 
    let idx = 0;
    while (idx < possibleMoves.length) {
        if (!current.played.has(possibleMoves[idx])) {
            move = possibleMoves[idx]
            break
        }
        idx++
    }
    if (!move) {
        console.log("Choosing random move")
        let randomIdx = Math.floor(Math.random() * possibleMoves.length)
        move = possibleMoves[randomIdx]
    }

    var from = move.from;
    var to = move.to;
    game.move({
        from: from,
        to: to
    });
    console.log('' + from + ':' + to);
    current = move
    ground.move(from, to);

    // window.setTimeout(makeRandomMove, 500);
};

function onMove(orig, dest, capturedPiece) {
    console.log("Move ->", orig, dest, capturedPiece)
    console.log("OnMove: ", game.turn(), current)
    if (!current.color || game.turn() != current.color) { // player made move
        next = findNext(orig, dest)
        if (next) {
            game.move({from: orig, to: dest})
            console.log("Found move: ", next)
            current = next
            if (isEngineMove()) {
                window.setTimeout(makeNextMove, 500);
            }
        } else {
            window.setTimeout(ground.set({fen: current.fen}), 100)
        }
    } else { // engine made move
        
    }
    if (autoPlay && current.children.length == 0) {
        updatePlayedStatus(current)
        setGame(currentRoot, engineColor)
    }
    displayPgn(currentRoot, current, hidePGN)
}

function updatePlayedStatus(node) {
    if (allChildrenPlayed(node)) {
        if (node.parent) {
            node.parent.played.add(node)
            updatePlayedStatus(node.parent)
        }
    }
}

function allChildrenPlayed(node) {
    for (let i = 0; i < node.children.length; i++) {
        if (!node.played.has(node.children[i])) {
            return false
        }
    }
    return true
}

function findNext(from, to) {
    for (var i = 0; i < current.children.length; i++) {
        let node = current.children[i];
        if (node.from == from && node.to == to) {
            return node
        }
    }
    return null
}

function isEngineMove() {
    return current && 
        ((current.color === 'w' && engineColor === 'black') ||
        (current.color === 'b' && engineColor === 'white'));
}

function onBoardChange() {
    console.log("OnBoardChange")
}

function onDropNewPiece(piece, key) {
    console.log("OnDropNewPiece", piece, key)
}

function onSelect(key) {
    console.log("OnSelect", key)
}

function onInsert(elements) {
    console.log("OnInsert", elements)
}

function onPGNCheckbox(target) {
    hidePGN = target.checked
    displayPgn(currentRoot, current, hidePGN)
}

function onAutoCheckbox(target) {
    autoPlay = target.checked
}

function onPlay() {
    
    if (currentRoot) {
        setGame(currentRoot, engineColor)
    }
}

function onHint() {
    let arr = []
    current.children.forEach(child => {
        arr.push({
            orig: child.from,
            dest: child.to,
            brush: 'red'
        })
    })
    ground.setShapes(arr)
    
}