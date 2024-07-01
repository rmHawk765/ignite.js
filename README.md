# ignite.js

A discord.js framework, designed to make sense.

**This is very much still WIP and I do not recommend using it until v1.0.0 as I am still experimenting with different ideas and things may drastically change.**

## Notes on installation

- Ignite is written in TypeScript and will work with it out of the box.
- You must install `discord.js` separately as a dependency of your own package. This is because `discord.js` is used by the user directly, not just internally. This allows you to manage the `discord.js` version yourself and update (or downgrade) to a desired version.
  - **Due to the breaking changes since v13, you must use `discord.js` v14 or newer.**
