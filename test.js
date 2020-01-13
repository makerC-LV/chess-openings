
let pnp = require ('./pgnparser').parse

console.log(pnp)

const result = pnp('[White "me"]\n[Black "you"]\n1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 (3. ...Nf6 {is the two knights}) 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O Nge7 $1 *');

console.log(JSON.stringify(result, null, 2))