const forbiddenMessages = [
  "You thought you were smart 😂......LOL",
  "HAHAHAHAHAHAHA bro confidently tried to hack through LOL",
  "Nice try. but we arent kicking our feet up and eating chips.....",
  "You're not him, bro. dont think we havent thought of that.....",
  "Put the fries in the bag. You're not him. stop trying to enter unlawfully...",
];

export function getRandomForbiddenMessage() {
  const randomIndex = Math.floor(
    Math.random() * forbiddenMessages.length
  );

  return forbiddenMessages[randomIndex];
}