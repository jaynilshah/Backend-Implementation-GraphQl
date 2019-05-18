
const fetch = require("node-fetch");


var dice = 3;
var sides = 6;
var query = ` {
  rollDice(numDice: 5, numSides: 4)
}`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides,ice:3 },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));