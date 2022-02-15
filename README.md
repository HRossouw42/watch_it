# Watch_it

Working on webdev and having to constantly refresh the server to see small code changes is a pain the 🍑.
So use something like [Livepreview](https://github.com/microsoft/vscode-livepreview) or [Nodemon](https://github.com/remy/nodemon).

## Why does this exist?

I wanted to understand handling file system changes & child processes with node so... now this program exists that does a worse job than the above two!

## Instructions

1. Link project directory via `npm link`
2. `watchit foo.js` where `foo.js` is the `index.js` of the web project you want to refresh

- will default to `index.js` in the current directory if inputed `.js` file doesn't exist
- thanks to [Caporal](https://www.npmjs.com/package/caporal) you can use `watchit -h` to see the help menu
