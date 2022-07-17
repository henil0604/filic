# Filic

An Advanced File System API for NodeJs

- Filic Provides a way to Interact with your File System in a very Structural Way.
- Filic has an API for handling everything that you might think of doing with your File System.
- Filic Provides Extra Features `Downloading A File from URL`, `Detailed File Content Analysis`, etc...

## Installation

```bash
npm i filic
```
Or With `Yarn`
```bash
yarn add filic
```

## Usage

- Importing Filic Object
```js
const Filic = require("filic");
```

- Creating Filic Instance
```js
const fs = new Filic(BasePath);
// Or With Filic.create
const fs = Filic.create(BasePath);
```

- `params`
    - `BasePath`: Base Path from where every file will be resolved

------------------
 
## Opening A File

- Filic Instance has a method `Filic.open` from where you can open the file based on the `BasePath` that you have Provided

```js
fs.open(path, options);
```

- `params`
    - `path`: The path of the file/directory you want to open
    - `options`: Options of the `Directory/File` Instance

- `Filic.open` will return an instance of `Directory` or `File`


#### `static Filic.open` method

- You have have to pass the exact path of the file/directory that you want to open as it does not use any `BasePath` to resolve the absolute path of the file/directory

```js
Filic.open(path, options)
```

- `params`
    - `path`: The path of the file you want to open
    - `options`: Options of the `Directory/File` Instance

- `Filic.open` will return an instance of `Directory` or `File`


#### Passing the Type of the Path

- This feature allows you to tell to Filic that the path you want to open is Directory or a File.

```js
fs.open("dir:<path>");
```
- Here the passed path will result into accessed as a directory

```js
fs.open("file:<path>");
```
- Here the passed path will result into accessed as a file

**If the path you tried to open with a `type` already exists with other `type` the returned instance will be that of the `type`**


-------------


## `File Instance`

### `File.write`

- `File.write` allows to Write on a file.

```js
...
const file1 = fs.open("Greeting.txt");
file1.write("Hello! Good Morning!");
```

- It also supports JSON

```js
...
file1.write({
    name: "foo",
    age: 17
})
```

- It also supports Byte Array

```js
file1.write([
   72, 101, 108, 108,
  111,  32,  87, 111,
  114, 108, 100
])
```

### `File.read`

- `File.read` allows to read the content of the file

```js
...
const file1 = fs.open("Greeting.txt");
const content = file1.read()

console.log(content) // "Hello World"
```

### `File.content`

- `File.content` is an extended form of `File.read`

- It detects if the content of the file is parsable to JSON, if it is then it will use `JSON.parse` to parse it.

- It also Converts the content of the file to Byte Array.

```js
...
const file1 = fs.open("Greeting.txt");
const content = file1.content;

console.log(content) // "Hello World"
console.log(content.json) // null (because the content is not JSON parsable)
console.log(content.ByteArray) // [ByteArray]
```


### `File.detailedContent`

- It splits the content with `\n` and returns the lines, Number of Lines and Number of characters.

```js
...
const detailedContent = file1.detailedContent;

console.log(detailedContent.lines) // 1
console.log(detailedContent.chars) // 11
console.log(detailedContent.content) // [Lines]
```

### `File.isDirectory`

- Returns `false` (Self Explaining)

### `File.filename`

- Returns the name of the File

### `File.dirPath`

- Returns the path of the directory

### `File.Directory`

- Returns the instance of parent directory

### `File.writeStream`

- Returns `fs.createWriteStream(path)`;

### `File.readStream`

- Returns `fs.createReadStream(path)`;

### `File.create`

- Creates the file if does not exists

### `File.Delete`

- It allows to delete the file


### `File.copy`

- Copies the File

```js

...
const Dir1 = fs.open("dir:dir1");
const f1 = Dir1.open("File1.txt");

f1.copy("File2.txt")
```

- `params`
    - `directory`: It expects String or a Directory Instance
    - `filename`: By default the name of the file it self

- With Directory Instance

```js
const Dir1 = fs.open("dir:dir1");
const Dir2 = fs.open("dir:dir2");
const f1 = Dir1.open("File1.txt");

f1.copy(Dir2, "ImCopiedFile1.txt");
```

### `File.secondCopy`

- It allows to create second copy of the file in the same directory

```js
...
f1.secondCopy("ImSecondCopyOfFile1.txt");
```

### `File.move`

- It allows to Move File around.

```js
const Dir1 = fs.open("dir:dir1");
const Dir2 = fs.open("dir:dir2");
const f1 = Dir1.open("File1.txt");

f1.move(Dir2);
```

### `File.rename`

- It allows to rename the file

```js
const f1 = fs.open("foo.txt");
f1.rename("bar.txt");
```

### `File.replace`

- It allows to replace the file with some new file

```js
const f1 = fs.open("foo.txt").write("Im foo");
const f2 = fs.open("bar.txt").write("Im Bar");

f1.replace(f2);
```

- `params`
    `file`: Instance of File or a path string
    `rename`: If `true` the name of the file will be replaced with the provided file

### `File.downloadFrom`

- It allows to fetch data from url and writes it on the file

```js
const f1 = fs.open("foo.txt");

await f1.downloadFrom("https://example.com/api/data");
```

- However this method returns a Promise.

- If the Request or Write Fails, original content of the file will be re-written


-------------------

## `Directory Instance`

*Soon...*


