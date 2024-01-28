// We're building a football betting app (soccer for my American friends �)!
// Suppose we get data from a web service about a certain game('game' variable on
// next page).In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team(variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players.For Bayern Munich(team 1) create one variable('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams(22
// players)
// 4. During the game, Bayern Munich(team 1) used 3 substitute players.So create a
// new array('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd(called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names(not an array) and prints each of them to the console, along with the
// number of goals that were scored in total(number of player names passed in)
// 7. The team with the lower odd is more likely to win.Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
//     Then, call the function again with players from game.scored

const game = {
    team1: 'Bayern Munich',
    team2: 'Borussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Maba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Conan',
            'Muller',
            'Gnarby',
            'Lewandowski',
        ],
        ['Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze',
        ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5,
    },
};

let [Players1, Players2] = game.players;
console.log('Players1: ', Players1);
console.log('Players2: ', Players2);
let [Gk, ...FieldPlayers] = Players1;
console.log('Gk: ', Gk);
console.log('FieldPlayers: ', FieldPlayers);
let allPlayers = [...Players1, ...Players2];
console.log('allPlayers: ', allPlayers);
let players1Final = [...Players1, 'Thiago', 'Coutinho', 'Perisic']
console.log('players1Final: ', players1Final);
const { odds: { team1, x: draw, team2 } } = game;
console.log(team1, draw, team2);
const printGoals = function (...players) {
    console.log(`${players.length} goals were scored`);
};
printGoals(...game.scored);
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');