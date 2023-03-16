<h1 align="center">Welcome to filic 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/filic" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/filic.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/henil0604" target="_blank">
    <img alt="Twitter: henil0604" src="https://img.shields.io/twitter/follow/henil0604.svg?style=social" />
  </a>
</p>

> An Advance File System API

### 🏠 [Homepage](https://github.com/henil0604/filic#readme)

## Install

```sh
npm install filic
```

## Ideology

This library aims to simplify how applications access File System via `fs` API. The Filic API is really simple to use to make your experience great with File System API.

Filic uses object oriented approach to handle files and directories. 

Filic's First Priority is to make API type-safe and simple.


## Quick Start

```js
import Filic from 'filic';

const fs = Filic.create() // new Filic

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
import * as FilicTypes from 'filic/types/Filic.d';
import * as DirectoryTypes from 'filic/types/Directory.d';
import * as FileTypes from 'filic/types/File.d';
```

### `Filic`

- #### `static Filic.create`

    Allows to create Filic Instance
    ```js
        import Filic from 'filic'

        const fs = Filic.create(BasePath);
    ```

    - BasePath: `string`
        - Path of Directory from where every path will be resolved. defaults to `process.cwd()`

- #### `Filic.openDir`

    Opens Directory

    ```js
        const users = fs.openDir("users", options?);
    ```

    - dirname: `string`
        - Name of Directory that you want open
    - options: `FilicTypes.DirectoryOptions`

- #### `Filic.openFile`

    Opens File

    ```js
        const foo = fs.openFile("foo", options?);
    ```

    - filename: `string`
        - Name of File that you want open
    - options: `FilicTypes.FileOptions`

### `Directory`

```js
const dir = fs.openDir(dirname, options?);
```

- dirname: `string`
- options: `Filic.DirectoryOptions`

- #### `Directory.openDir`

    - opens a directory inside the directory

    ```js
        dir.openDir(path, options?) // returns Directory
    ```

    - path: `string`
        - path of the directory
    - options: `FilicTypes.DirectoryOptions`

- #### `Directory.openFile`

    - opens a file inside the directory

    ```js
        dir.openFile(path, options?) // returns Directory
    ```

    - path: `string`
        - path of the file
    - options: `FilicTypes.FileOptions`

- #### `Directory.create`

    - Create directory

    ```js
        const dir = fs.openDir("dir", { autoCreate: false });
        dir.createSync(options?) // creates directory
    ```

    - options: `DirectoryTypes.createSyncOptions`


- #### `Directory.delete`

    - Delete Directory

    ```js
        dir.deleteSelfSync(options?)
    ```
    
    - options: `DirectoryTypes.deleteSelfSyncOptions`

- #### `Directory.listRaw`

    - Raw Listing
    ```js
        dir.listRawSync();
    ```

- #### `Directory.list`

    - Listing as Entity Instances
    ```js
        dir.listSync(); // returns (Directory | File)[]
    ```

- #### `Directory.deleteFile`

    - delete File inside directory

    ```js
        dir.deleteFileSync(path, openFileOptions?, deleteOptions?);
    ```

    - path: `string | File`
        - Path/File Instance of the file you want to delete
    - openFileOptions: `FilicTypes.FileOptions`
    - deleteOptions: `FileTypes.deleteSyncOptions`

- #### `Directory.deleteDir`

    - delete Directory inside directory

    ```js
        dir.deleteDirSync(path, openDirOptions?, deleteSelfOptions?);
    ```

    - path: `string | Directory`
        - Path/Directory Instance of the file you want to delete
    - openDirOptions: `FilicTypes.DirectoryOptions`
    - deleteSelfOptions: `FileTypes.deleteSelfSyncOptions`

- #### `Directory.clear`

    - delete everything inside

    ```js
        dir.clearSync()
    ```

- #### `Directory.has`
    
    - checks if file or directory exists inside

    ```js
        dir.has(path) // returns boolean
    ```

    - path: `string`
        - path of file or directory

- #### `Directory.copyAll`

    - copies all file inside to destination directory

    ```js
        dir.copyAllSync(destination, copyFileOptions?)
    ```

    - destination: `Directory`
    - copyFileOptions: `FileTypes.copyFileOptions`

- #### `Directory.copy`

    - copies it self to destination directory

    ```js
        dir.copySync(destination)
    ```

    - destination: `Directory`

- #### `Directory.moveAll`

    - moves all file inside to destination directory

    ```js
        dir.moveAllSync(destination)
    ```

    - destination: `Directory`

- #### `Directory.move`

    - moves it self to destination directory

    ```js
        dir.moveSync(destination)
    ```

    - destination: `Directory`

- #### `Directory.secondCopy`

    - Creates second copy of self in parent directory

    ```js
        dir.secondCopySync(dirname)
    ```

    - dirname: `string`

- #### `Directory.toFilic`

    - creates `Filic` Instance of directory Path as `BasePath`

    ```js
        dir.toFilic() // returns Filic
    ```

- #### `get Directory.dirname`

    - returns directory name of directory

    ```js
        dir.dirname // returns string
    ```

### `File`

```js
const file = fs.openFile(filename, options?);
```

- dirname: `string`
- options: `Filic.FileOptions`

- #### `File.create`

    - Create File

    ```js
        const file = fs.openFile("file", { autoCreate: false });
        file.createSync(options?) // creates File
    ```

    - options: `FileTypes.createSyncOptions`


- #### `File.delete`

    - delete File

    ```js
        file.deleteSync(options?) // deletes File
    ```

    - options: `FileTypes.deleteSyncOptions`

- #### `File.readRaw`

    - reads content of file and returns as string

    ```js
        file.readRawSync(options?)
    ```

    - options: `FileTypes.readRawSyncOptions`

- #### `File.read`

    - reads content of file and returns custom string object

    ```js
        file.readSync(options?) // returns FileTypes.readSyncReturn
    ```

    - options: `FileTypes.readSyncOptions`

- #### `File.writeRaw`

    - writes string to file

    ```js
        file.writeRawSync(options?)
    ```

    - options: `FileTypes.writeRawSyncOptions`

- #### `File.write`

    - writes to file and tries to parse if not provided string
    - Parser tries to parse JSON, Buffer, number.

    ```js
        file.writeSync(options?)
    ```

    - options: `FileTypes.writeSyncOptions`

- #### `File.append`

    - Appends string at the end of the file

    ```js
        file.appendSync(content, readRawSyncOptions?, writeRawSyncOptions?) // returns new content
    ```

    - content: `string`
    - readRawSyncOptions: `FileTypes.readRawSyncOptions`
    - writeRawSyncOptions: `FileTypes.writeRawSyncOptions`


- #### `File.prepend`

    - Prepends string at the end of the file

    ```js
        file.prependSync(content, readRawSyncOptions?, writeRawSyncOptions?) // returns new content
    ```

    - content: `string`
    - readRawSyncOptions: `FileTypes.readRawSyncOptions`
    - writeRawSyncOptions: `FileTypes.writeRawSyncOptions`

- #### `File.delete`

    - deletes the file

    ```js
        file.deleteSync(options?)
    ```

    - options: `FileTypes.deleteSyncOptions`

- #### `File.copy`

    - copies the file to destination directory

    ```js
        file.copySync(destination, filename?, options?)
    ```

    - destination: `Directory`
    - filename: `string`
    - options: `FileTypes.copySyncOptions`

- #### `File.move`

    - moves the file to destination directory

    ```js
        file.moveSync(destination, filename?, options?)
    ```

    - destination: `Directory`
    - filename: `string`
    - options: `FileTypes.moveSyncOptions`


- #### `File.secondCopy`

    - Creates second copy of self in parent directory

    ```js
        file.secondCopySync(filename)
    ```

    - filename: `string`

- #### `File.rename`

    - rename the name of the file

    ```js
        file.renameSync(filename)
    ```

    - filename: `string`


- #### `File.replaceWith`

    - replace the file content with given File

    ```js
        file.replaceWithSync(file)
    ```

    - file: `File`

- #### `File.update`

    - updates file content with callback function

    ```js
        file.updateSync((content)=>{
            return newContent
        });
    ```

    - callback: `(content: FileTypes.readSyncReturn) => any`

- #### `get File.dirname`

    - returns name of file

    ```js
        file.dirname // returns string
    ```

- #### `File.createReadStream`

    - returns read stream of file

    ```js
        file.createReadStream(options?);
    ```

    - options: `FileTypes.createReadStreamOptions`

- #### `File.createWriteStream`

    - returns write stream of file

    ```js
        file.createWriteStream(options?);
    ```

    - options: `FileTypes.createWriteStreamOptions`

### Common Methods between `Directory` and `File`

- #### `get absolutePath`
    
    - returns absolute path of directory or file
    
    ```js
        dir.absolutePath // string
        // or
        file.absolutePath // string
    ```

- #### `get Filic`

    - returns parent filic instance

    ```js
        dir.Filic // Filic
        // or
        file.Filic // Filic
    ```

- #### `get exists`

    - returns if file or directory exists

    ```js
        dir.exists // boolean
        // or
        file.exists // boolean
    ```

- #### `get parentDir`

    - returns parent directory as `Directory` Instance

    ```js
        dir.parentDir // Directory
        // or
        file.parentDir // Directory
    ```

- #### `get dirPath`

    - returns parent directory absolute path

    ```js
        dir.dirPath // string
        // or
        file.dirPath // string
    ```



***

## Author

👤 **Henil Malaviya**

* E-mail: [henilmalaviya06@gmail.com](mailto:henilmalaviya06@gmail.com)
* Website: [henil.xyz](https://henil.xyz)
* Twitter: [@henil06](https://twitter.com/henil06)
* Github: [@henil0604](https://github.com/henil0604)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/henil0604/filic/issues). 

## Show your support

Give a ⭐️ if this project helped you!