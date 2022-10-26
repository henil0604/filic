<h1 align="center">Welcome to filic 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/filic" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/filic.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/henil06" target="_blank">
    <img alt="Twitter: henil06" src="https://img.shields.io/twitter/follow/henil06.svg?style=social" />
  </a>
</p>

> An Advance File System API

### 🏠 [Homepage](https://github.com/henil0604/filic#readme)

## Install

```sh
npm install filic
```

## Ideology

This library aims to simplify how applications access File System via `fs` API. The FIlic API is really simple to use to make your experience great with File System API.

Filic uses object oriented abroach to handle files and directories. 

Filic's First Priority is to make API type-safe and simple.


## Quick Start

```js
import Filic from 'filic';

const fs = Filic.create("/home") // new Filic

const greetings = fs.openFile("greetings.json")

greetings.writeSync([
    "Good Morning",
    "Good Afternoon",
    "Good Night"
])

console.log(greetings.readSync()); // ["Good Morning","Good Afternoon","Good Night"]

```


## API

### Types

```js
import * as FilicTypes from 'filic/types/Filic';
import * as DirectoryTypes from 'filic/types/Directory';
import * as FileTypes from 'filic/types/File';
```

### `Filic`

- #### `static Filic.create`

    Allows to create Filic Instance
    ```js
        import Filic from 'filic'

        const fs = Filic.create(BasePath);
    ```

    - BasePath: `string`
        - Path of Directory from where every path will be resolved

- #### `Filic.openDir`

    Opens Directory

    ```js
        const users = fs.openDir("users", options?: FilicTypes.DirectoryOptions);
    ```

    - dirname: `string`
        - Name of Directory that you want open

- #### `Filic.openFile`

    Opens File

    ```js
        const foo = fs.openFile("foo", options?: FilicTypes.FileOptions);
    ```

    - filename: `string`
        - Name of File that you want open


👤 **Henil Malaviya <henilmalaviya06@gmail.com>**

* Website: henil.xyz
* Twitter: [@henil06](https://twitter.com/henil06)
* Github: [@henil0604](https://github.com/henil0604)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/henil0604/filic/issues). 

## Show your support

Give a ⭐️ if this project helped you!