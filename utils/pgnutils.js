 
 import { generate } from 'pegjs'
 import { Chess } from 'chess.js'

let grammar = `{
    function flatten(a, acc = []) {
        for (var i = 0; i < a.length; i++) {
            if (Array.isArray(a[i])) {
                flatten(a[i], acc);
            } else {
                acc.push(a[i]);
            }
        }
        return acc;
    }
    function make_header(hn,hv) {
        var m = {};
        m[hn] = hv;
        return m;
    }
    function make_move(move_number, move, nags, ravs, comment) {
        var m = {};
        if (move_number) m.move_number = move_number;
        if (move) m.move = move;
        if (nags && nags.length) m.nags = nags;
        if (ravs && ravs.length) m.ravs = ravs;
        if (comment) m.comment = comment;
        return m;
    }
    function make_rav(moves, result) {
        return {
            moves, 
            result
        };
    }
    function make_game(h, c, m, r) {
        h = h || [];
        return {
            headers: h.reduce((acc, x) => Object.assign(acc, x), {}),
            comment: c,
            moves: m || [],
            result: r
        };
    }
}

start = gs:(game newline*)* EOF {return gs.map(function(g) { return g[0]})}

game = 
    whitespace*
    h:headers? 
    c:comment? 
    whitespace* 
    mr:(m:movetext whitespace+ r:result {return [m, r]} / r:result {return [null, r]}) 
    whitespace* {return make_game(h, c, mr[0], mr[1])}

EOF = !.
double_quote = '"'
string = double_quote str:[^"]* double_quote {return str.join('')}
integer = a:[1-9] b:[0-9]* {return parseInt(a+b.join(''), 10)}
symbol = chars:[A-Za-z0-9_-]+ {return chars.join('')}
ws = ' ' / '\\f' / '\\t'
whitespace = ws / newline
newline = '\\n'

header = '[' hn:symbol ws+ hv:string ']' whitespace* { return make_header(hn,hv) }
headers = hs:header+ {return hs}

piece = [NKQRB]
rank = [a-h]
file = [1-8]
check = "+"
checkmate = "#"
capture = "x"
period = "."
result = "1-0" / "0-1" / "*" / "1/2-1/2"
move_number = mn:integer period? (period period)? {return mn}
square = r:rank f:file {return r+f}
promotion = "=" [QRBN]
nag = chars:("$" integer) {return chars.join('')}
nag_alts = "!!" / "??" / "!?" / "?!" / "!" / "?"
continuation = period period period

comment_chars = [^}]
comment = "{" cc:comment_chars* "}" {return cc.join('');}

pawn_half_move = (r:rank c:capture)? square promotion?
piece_half_move = piece capture? square
piece_disambiguation_half_move = piece (rank / file) capture? square
castle_half_move = ("O-O-O" / "O-O")

half_move = m:(continuation? 
    (castle_half_move / 
     piece_disambiguation_half_move / 
     piece_half_move / 
     pawn_half_move) 
    (check / checkmate)? 
    nag_alts?) {return flatten(m).join('');}

move = mn:move_number? 
       whitespace*
       m:half_move 
       nags:(whitespace+ n:nag {return n})*
       com:(whitespace+ c2:comment {return c2})?
       (whitespace+ comment)*
       ravs:(whitespace+ r:rav {return r})*
       {return make_move(mn, m, nags, ravs, com)}

movetext = first:move rest:(whitespace+ move)* {return first ? [first].concat(rest.map(function(m) {return m[1]})) : []}

rav = "(" 
    whitespace* 
    m:movetext 
    whitespace* 
    r:result?
    whitespace*
    ")" {return make_rav(m, r)}

`;

let parser = generate(grammar)

/*
    Returns a node of the form 
    { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' 
        move_number,
        comment,
        fen,
        idx,  // unique index
        parent,
        children:[], 
        played: []  //(for trainer)
    }

 */
export const  parsepgn = (pgn) => {
    let r1 = parser.parse(pgn)[0]  // simple array representation
    console.log("Base structure:", r1)
    // pprint(r1.moves, "")
    let game = Chess()
    return parseOneGame(r1, game)
}

function parseOneGame(baseGame, game) {
    game.reset()
    let root = { fen: game.fen(), children: [], played: new Set(), move_number:0}
    if (baseGame.moves.length > 0) {
        convert(baseGame.moves.slice(), game, root)
    }
    return root
}

function convert(moves, game, parent) {
    // console.log("Entering" + moves[0])
    let cmove = moves[0]
    let movestr = cmove.move.replace(/\./g, '')
    let node = game.move(movestr)
    // -> { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' }
    if (node == null) {
        console.log("Unknown move: ", cmove, parent.san)
        return;
    }
    node.fen = game.fen()
    addNode(node, parent, cmove.comment, cmove.nags, cmove.move_number)
    if (moves.length > 1) {
        // console.log(moves.length, "making rec call")
        moves.shift()
        convert(moves, game, node)
        if (cmove.ravs) {
            cmove.ravs.forEach(rav => {
                game.load(parent.fen)
                convert(rav.moves.slice(), game, parent)
            })
        }
    }


}

export const addNode = (node, parent, comment, nags, moveNum) => {
    node.children = []
    node.played = new Set()
    node.move_number = moveNum ? moveNum : 
        (parent == null ? 1 :
            (node.color == 'b' ? parent.move_number : 
                parent.move_number + 1))
    addCommentAndNags(node, comment, nags)
    node.parent = parent
    parent.children.push(node)
}

export const deleteNode = (node) => {
    if (node.parent) {
        let index = node.parent.children.indexOf(node);
        if (index !== -1) {
            node.parent.children.splice(index, 1);
        }
    }
}

export const promoteNode = (node) => {
    if (node.parent) {
        let index = node.parent.children.indexOf(node);
        if (index !== -1) {
            node.parent.children.splice(index, 1);
        }
        node.parent.children.unshift(node)
    }
}

export const addCommentAndNags = (node, comment, nags) => {
    if (comment && comment.indexOf('[%') < 0) {
        node.comment = comment
    }
    if (nags) {
        node.nags = nags
    }
}


export const updatePlayedStatus = (node) => {
    if (allChildrenPlayed(node)) {
        if (node.parent) {
            node.parent.played.add(node)
            updatePlayedStatus(node.parent)
        }
    }
}

export const allChildrenPlayed = (node) => {
    for (let i = 0; i < node.children.length; i++) {
        if (!node.played.has(node.children[i])) {
            return false
        }
    }
    return true
}

export const  parseMultiple = (multipgn) => {
    let games = parser.parse(multipgn)
    let game = Chess()
    let root = parseOneGame(games[0], game)
    for (let i = 1; i < games.length; i++) {
        let newRoot = parseOneGame(games[i], game)
        mergeTrees(root, newRoot)
    }
    return root
}

export const mergeTrees = (node1, node2) => {
    console.log(node1.san, node2.san)
    if (node1.fen === node2.fen) {
        for (let child2 of node2.children) {
            let matching = node1.children.filter(child => child2.fen === child.fen)
            if (matching.length === 0) {
                node1.children.push(child2)
            } else {
                mergeTrees(matching[0], child2)
            }
        }
    } else {
        throw "Positions do not match"
    }
}

export const findNext = (current, from, to) => {
    for (var i = 0; i < current.children.length; i++) {
        let node = current.children[i];
        if (node.from == from && node.to == to) {
            return node
        }
    }
    return null
}




