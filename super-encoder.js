// Import the encryptors functions here.
const {
  caesarCipher,
  symbolCipher,
  reverseCipher,
} = require("./encryptors.js");

// runs the message through all three ciphers, one after another
const encodeMessage = (str) => {
  // Use the encryptor functions here.
  const shifted = caesarCipher(str, 4);
  const symbols = symbolCipher(shifted);
  const reversed = reverseCipher(symbols);
  return reversed;
};

// undoes encodeMessage by running the ciphers backwards, last step first
const decodeMessage = (str) => {
  // Use the encryptor functions here.
  const unreversed = reverseCipher(str);
  const letters = symbolCipher(unreversed);
  const unshifted = caesarCipher(letters, -4);
  return unshifted;
};

// User input / output.

const handleInput = (userInput) => {
  const str = userInput.toString().trim();
  let output;
  if (process.argv[2] === "encode") {
    output = encodeMessage(str);
  }
  if (process.argv[2] === "decode") {
    output = decodeMessage(str);
  }

  process.stdout.write(output + "\n");
  process.exit();
};

// Run the program.
process.stdout.write("Enter the message you would like to encrypt...\n> ");
process.stdin.on("data", handleInput);
