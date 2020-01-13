
// let pegjs = require('pegjs');
// let Chess = require('./assets/libs/chess.min')

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

let parser = peg.generate(grammar)

function parsepgn(pgn) {
    let r1 = parser.parse(pgn)[0]  // simple array representation
    console.log("Base structure:", r1)
    // pprint(r1.moves, "")
    let game = Chess()
    let root = { fen: game.fen(), children: [], played: new Set()}
    if (r1.moves.length > 0) {
        convert(r1.moves.slice(), game, root)
        assignMoveNumbers(root, 1)
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
    node.children = []
    node.played = new Set()
    node.parent = parent
    parent.children.push(node)
    if (cmove.comment) {
        node.comment = cmove.comment
    }
    if (cmove.nags) {
        node.nags = cmove.nags
    }
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

// function findParent(cmove, parent) {
//     let isBlackMove = !cmove.move_number || cmove.move.includes("...")
//     if ((isBlackMove && parent && parent.color === 'b') ||
//         (!isBlackMove && parent && parent.color === 'w')) {
//         parent = parent.parent;
//     }
//     return parent

// }

// function getColor(cmove) {
//     let isBlackMove = !cmove.move_number || cmove.move.includes("...")
//     return isBlackMove ? 'b' : 'w'
// }

function assignMoveNumbers(node, depth) {
    node.move_number = depth
    if (node.color == 'b') {
        depth++;
    }
    node.children.forEach(child => {
        assignMoveNumbers(child, depth)
    })
}

// function pprint(moves, indent) {
//     if (moves.length > 0) {
//         console.log(indent, getColor(moves[0]), moves[0].move_number, moves[0].move)
//         if (moves[0].ravs) {
//             moves[0].ravs.forEach(rav => {
//                 pprint(rav.moves, indent + "    ")
//             })
//         }
//         pprint(moves.slice(1), indent)
//     }

// }

