const Path = require("path");
const fs = require("fs");

function getCallerFilePath() {
    let stack = new Error().stack.split('\n')
    return stack[3].slice(
        stack[3].lastIndexOf('(') + 1,
        stack[3].lastIndexOf('.js') + 3
    )
}


class Filic {

    constructor (BasePath) {
        if (!BasePath) {
            this.BasePath = getCallerFilePath();
        } else {
            this.BasePath = BasePath;
        }

        if (!fs.existsSync(this.BasePath)) {
            fs.mkdirSync(this.BasePath);
        }

        if (fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error(`${this.BasePath} is not a directory`)
        }

    }

    open(path, options) {
        const File = require("./File");
        const Directory = require("./Directory");
        const purePath = path.replace("dir:", "").replace("file:", "");
        const self = this;

        if (path.indexOf("/") > -1) {
            let parentFilicInstance = null;
            let toReturn = null;
            let type = path.startsWith("dir:") ? "dir" : path.startsWith("file:") ? "file" : this.determinePathType(purePath);

            purePath.split("/").map((e, index) => {
                if (index >= purePath.split("/").length - 1) {
                    if (type === 'dir') {
                        toReturn = new Directory(parentFilicInstance, e)
                    } else {
                        toReturn = new File(parentFilicInstance, e)
                    }
                    return toReturn;
                }

                let newSelf = parentFilicInstance === null ? self : parentFilicInstance;

                let dir = new Directory(newSelf, e);

                parentFilicInstance = new Filic(dir.path);

            })

            return toReturn;
        }


        if (!path) {
            throw new Error("\"path\" is required");
        }

        if (path.startsWith("dir:")) {
            path = path.slice(4);
            return new Directory(self, Path.basename(path), options);
        }

        if (path.startsWith("file:")) {
            path = path.slice(5);
            return new File(self, Path.basename(path), options);
        }

        const type = this.determinePathType(purePath);

        if (Path.basename(path) === "") {
            return new Directory(self, '.', options)
        } else {
            path = Path.basename(path)
        }

        if (type === "dir") {
            return new Directory(self, path, options)
        } else {
            return new File(self, path, options)
        }
    }

    toDirectory(options) {
        const Directory = require("./Directory");
        const path = Path.dirname(this.BasePath);
        if (!fs.existsSync(path)) {
            return null
        }

        const filicInstance = new Filic(path);

        return new Directory(filicInstance, Path.basename(this.BasePath), options);
    }

    ResolvePath(path) {
        return Path.resolve(this.BasePath, path);
    }

    determinePathType(path) {
        const File = require("./File");

        const absolutePath = this.ResolvePath(path);
        const exists = fs.existsSync(absolutePath);

        const isDirectory = exists === true ? fs.lstatSync(absolutePath).isDirectory() : false;

        return exists && isDirectory ? "dir" : "file";
    }

    static open(path, options) {
        const File = require("./File");
        const Directory = require("./Directory");
        const purePath = path.replace("dir:", "").replace("file:", "");

        const self = new Filic(Path.dirname(purePath));

        if (!path) {
            throw new Error("\"path\" is required");
        }

        if (path.startsWith("dir:")) {
            path = path.slice(4);
            return new Directory(self, Path.basename(path), options);
        }

        if (path.startsWith("file:")) {
            path = path.slice(5);
            return new File(self, Path.basename(path), options);
        }

        const absolutePath = self.ResolvePath(path);
        const exists = fs.existsSync(absolutePath);

        const isDirectory = exists === true ? fs.lstatSync(absolutePath).isDirectory() : false;

        const type = exists && isDirectory ? "dir" : "file";

        if (Path.basename(path) === "") {
            return new Directory(self, '.', options)
        } else {
            path = Path.basename(path)
        }

        if (type === 'dir') {
            return new Directory(self, path, options)
        } else {
            return new File(self, path, options)
        }
    }

    static ByteArrayToString(byteArray) {
        let string = '';

        for (const code of byteArray) {
            string += String.fromCharCode(code);
        }

        return string
    }

    static StringToByteArray(string) {
        let ByteArray = [];
        for (var i = 0; i < string.length; i++) {
            var code = string.charCodeAt(i);
            ByteArray.push(code);
        }
        return ByteArray;
    }

    static create(...args) {
        return new Filic(...args)
    }

}

module.exports = Filic;