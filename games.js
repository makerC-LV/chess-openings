let test_game = `
[White "me"]
[Black "you"]
1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 
(3. ...Nf6 {is the two knights}) 
4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *`;

let budapest_gambit =`
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "Budapest"]
[Black "Gambit"]
[Result "?"]

 1.d4 Nf6 2.c4 e5 3.dxe5
     ( 3.d5 Bc5 4.Bg5 Bxf2+ 5.Kxf2 Ne4+ {This is a mistake, with precise play white can get a better position.}
         ( 5...Ng4+ 6.Kf3 Qxg5)
     6.Ke3 Nxg5 7.h4 {The knight is trapped.})
 3...Ng4
     ( 3...Ne4 4.Qc2 Bb4+ 5.Nd2 d6 6.exd6
         ( 6.Qxe4 O-O)
     6...Bf5 7.Qa4+ Nc6 8.a3 Nc5 9.Qb5 a6 10.dxc7 Qxc7 11.axb4 axb5 12.Rxa8+ Bc8 13.bxc5 O-O 14.cxb5 Nb4 15.c6 {Better
    for white.})
 4.Nf3
     ( 4.Qd4 d6 5.exd6 Nc6
         ( 5...Bxd6 6.Qxg7
             ( 6.Qe4+ Be6 7.Qxb7 Nd7 {Black is down two pawns, but is much better developed} 8.e3 O-O 9.Nf3 Nc5 10.Qb5
            Rb8 11.Qc6
                 ( 11.Qa5 Nd3+ 12.Bxd3
                     ( 12.Ke2 Nxc1+ 13.Kd1 Nxf2+)
                 12...Bb4+ {Losing the queen})
             11...Rb6 {Traps the queen})

             ( 6.Nf3 O-O 7.Nc3
                 ( 7.h3 Nc6 8.Qe4 Re8 9.Qc2 Nb4 10.Qc3 Nd3+ 11.Qxd3
                     ( 11.Kd2 Bb4)
                 11...Bb4+ {Any blocking move can be met by capturing the queen.} 12.Bd2
                     ( 12.Nc3 Qxd3)

                     ( 12.Kd1 Nxf2+)
                 12...Qxd3 13.Bxb4 Qc2)
             7...Nc6 8.Qd1 Bc5 9.Qxd8
                 ( 9.e3 Qxd1+ 10.Nxd1 Nb4 {Attacking c2} 11.Rb1
                     ( 11.Ke2 Bf5)

                     ( 11.Kd2 Rd8+ 12.Nd4 Bxd4 13.exd4 Rxd4+)
                 11...Bf5)
             9...Bxf2+ 10.Kd1 Rxd8+)

             ( 6.h3 Nc6)
         6...Be5 7.Qg5 Qxg5 8.Bxg5 Bxb2 {Black is a rook ahead.})
     6.Qe4+ Be6 7.dxc7 Qd1+ 8.Kxd1 Nxf2+ 9.Ke1 Nxe4 {Black is better})

     ( 4.Qd5 Nc6 5.f4
         ( 5.Nf3 d6 6.Bg5
             ( 6.exd6 Be6 7.Qd1
                 ( 7.Qe4 Qxd6 8.Bf4 Qd1+ 9.Kxd1 Nxf2+)

                 ( 7.Qd3 Nb4 8.dxc7 Nxd3+)
             7...Bxd6 8.h3 Nxf2 9.Kxf2 Bg3+ 10.Kxg3 Qxd1)
         6...Be7 7.Bxe7 Nxe7 8.Qe4 dxe5 9.Nxe5 Qd1+ 10.Kxd1 Nxf2+)
     5...Nb4 6.Qe4 {Mistake by white} 6...Bc5 7.e3 Bxe3 8.Bxe3 Nxe3 9.Qxe3 Nc2+)

     ( 4.e6 Bb4+ 5.Bd2 Qf6 6.Nf3 Qxb2 7.Bxb4 Qxb4+)

     ( 4.Bf4 Bb4+ 5.Nd2 d6 6.exd6 Qf6)
 4...Nc6
     ( 4...Bc5 {This move forces white to play e3, blocking his dark square bishop. Black can then continue to go
    after the pawn} 5.e3 Nc6 6.Qd5
         ( 6.Be2 {White gives the pawn back. How should black play for a good middle game?} 6...Ngxe5 7.Nxe5 Nxe5 8.a3
        a5 {Stopping b4} 9.O-O O-O 10.Nc3 Re8 {Have the option for the dark square bishop to fall back to f8} 11.b3 Ra6
         12.Bb2 Rh6 13.Nd5 d6 14.b4 {At this point black can launch an attack.} 14...Qh4 15.h3 Bxh3 16.g3 Qe4 17.f3
        Bxe3+ 18.Nxe3 Qxe3+ 19.Rf2 Qg5 20.g4 Qh4 {With mate to follow soon.})
     6...Qe7)
 5.Bf4 Bb4+ 6.Nbd2 Qe7 7.a3 Ngxe5 8.axb4
     ( 8.Nxe5 Nxe5 9.Bxe5 Bxd2+ 10.Qxd2 Qxe5 {With a normal game})
 8...Nd3# {Checkmate} *`;

 let scotch_gambit =`
 [White "me"]
[Black "you"]
 1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Bc4  {  If you had seen this, i hope you enjoy the scotch gambit. And if you like this and find it useful, pls leave a like and share this study. If it goes well i would do another one, i hope you enjoy this!  } Bc5  {  Black protects the pawn  } 
 (Bb4+ 5.c3 dxc3 6.bxc3 Bc5  {  we can attack the same way  } 
   (6...Ba5 7.O-O 
  ) 
   (6...Bd6 7.O-O 
  ) 
   (6...Bf8  {  blunder, black failed to develop pieces  } 
  ) 7.Bxf7+ Kxf7 8.Qd5+  {  the king would be chased all over  } 
) 
 (Be7 5.c3 
   (5.O-O  {  white is ready to develop pieces  } 
  ) 5...dxc3 
   (5...Nf6 6.e5 Ne4 
     (6...d5  {  this is a blunder  } 7.exf6 dxc4 8.fxe7 
    ) 7.Bd5 
  ) 6.Qd5 Nh6  {  best way to defend  } 7.Bxh6 O-O  {  best move for black yet losing material  } 8.Nxc3 gxh6 9.Qh5  {  the bishop can be sacrificed for aggressive advantage, black can't hold on for long  } 
) 
 (Nf6 5.e5 Ng4  {  the strongest defence for black  } 
   (5...Ne4 
  ) 6.O-O Ngxe5 7.Nxe5 Nxe5 8.Re1  {  this pins the knight  } d6  {  protects  } 9.f4  {  the knight is now lost, leading to material advantage  } 
) 5.Ng5  {  Attacks f7  } 
 (5.c3 dxc3 
   (5...Nf6 6.e5 Ng8  {  causing lost of momentum  } 
  ) 6.Bxf7+ Kf8 
   (6...Kxf7 7.Qd5+ Kg6  {  worst move  } 
     (7...Kf6 8.Bg5+ Kg6 9.Qf5+ Kh5 10.g4# 
    ) 
     (7...Ke8  {  safest move  } 8.Qxc5 
    ) 8.Qf5# 
  ) 7.Nxc3  {  White has better development  } 
) 5...Nh6 6.Qh5  {  Aggressive but easily stabilised  } * `

// let gamemap = {
//     "Select a game" : {
//         'pgn': '[White "me"]\n[Black "you"]\n *',
//         'engineColor': 'black'
//     },
//     "Budapest gambit" : {
//         'pgn': budapest_gambit,
//         'engineColor': 'white'
//     },
//     "Scotch gambit" : {
//         'pgn': scotch_gambit,
//         'engineColor': 'black'
//     },
//     "Test game": {
//         'pgn': test_game,
//         'engineColor': 'black'
//     }
// }

let gamemap = {
    "Select a game" : {
        'pgn': 'empty-game.pgn',
        'engineColor': 'black'
    },
    "Budapest gambit" : {
        'pgn': 'budapest-gambit.pgn',
        'engineColor': 'white'
    },
    "Scotch gambit" : {
        'pgn': 'scotch-gambit.pgn',
        'engineColor': 'black'
    },
    "Test game": {
        'pgn': 'test-game.pgn',
        'engineColor': 'black'
    }
}
exports.gamemap = gamemap
