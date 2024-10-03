const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let secretNumber;
let numAttempts;

const askLimit = () => {
  rl.question(`\nEnter the number of attempts: `, attempts => {
    numAttempts = attempts;
    askRange();
  });

  return ``;
};

const askRange = () => {
  rl.question(`\nEnter a min number: `, min => {
    rl.question(`\nEnter a max number: `, max => {
      console.log(`\nI'm thinking of a number between ${min} & ${max}...`);
      secretNumber = randomInRange(min, max);
      askGuess();
    });
  });

  return ``;
};

const randomInRange = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled - 1) + minCeiled);
};

const askGuess = () => {
  if (numAttempts > 0) {
    rl.question(`\nEnter a guess: `, guess => {
      const answer = checkGuess(guess);
      if (answer === true) {
        console.log(`You win!`);
        rl.close();
      } else if (answer === false) {
        numAttempts--;
        askGuess();
      }
    });

    return ``;
  }

  console.log(`You lose.`);
  rl.close();
  return ``;
};

const checkGuess = num => {
  if (Number(num) > secretNumber) {
    console.log(`Too high.`);
    return false;
  } else if (Number(num) < secretNumber) {
    console.log(`Too low.`);
    return false;
  }

  console.log(`Correct!`);
  return true;
};

console.log(askLimit());
