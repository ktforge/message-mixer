# Message Mixer

This is a project from the back-end section of Codecademy's Full-Stack Engineer path. Message Mixer is a small command-line program that scrambles a message using one of three ciphers. It started out as one big file, and my job was to pull the cipher functions into their own Node module and then reuse that module in a second program.

There's no live site for this one. It runs in the terminal with Node.

## What it does

`encryptors.js` is the module. It exports three functions:

`caesarCipher()` shifts every letter forward by a number you pick

`symbolCipher()` swaps some letters for lookalike symbols, like `e` for `3` and `s` for `$`

`reverseCipher()` flips each word but keeps the words in order

`message-mixer.js` imports those functions and lets you pick one cipher from the command line.

`super-encoder.js` imports the same module and chains all three ciphers together. `encode` runs a message through caesar, then symbol, then reverse. `decode` undoes it.

The cipher functions and the input/output code came with the project. The part I wrote is the module work: the exports in `encryptors.js`, the `require()` lines in both programs, and `encodeMessage()` and `decodeMessage()` in `super-encoder.js`.

## What I learned

My first bug was a typo. I exported `sybolCipher` instead of `symbolCipher`. The caesar and reverse options still worked, but symbol crashed with "encryptionMethod is not a function". JavaScript doesn't complain when you make a property with a misspelled name, so the import just came back as undefined. Printing out what the module actually exported is how I spotted the missing `m`.

Decoding only works if you undo the steps in the opposite order. Encode goes caesar, symbol, reverse, so decode has to go reverse, symbol, caesar, with the shift flipped to -4.

I also looked into how the programs read the command. Words like `encode` and `caesar` aren't special to Node. They're plain strings that land in `process.argv`, and the code checks index 2 for them.

One limit: `symbolCipher()` lowercases everything, so `Hello World` comes back from a decode as `hello world`.

## Running it

You'll need [Node.js](https://nodejs.org/). Then pick a cipher:

```bash
node message-mixer.js caesar 4
node message-mixer.js symbol
node message-mixer.js reverse
```

Example:

```
$ node message-mixer.js caesar 4
Enter the message you would like to encrypt...
> hello world

Here is your encrypted message:
> lipps asvph
```

To use all three ciphers at once:

```
$ node super-encoder.js encode
Enter the message you would like to encrypt...
> hello world
$pp!1 hpv$@

$ node super-encoder.js decode
Enter the message you would like to encrypt...
> $pp!1 hpv$@
hello world
```

Built by DeVante Bush
