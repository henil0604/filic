const fs = require("fs");
const Path = require("path");
const Filic = require("./Filic")


class Directory {

    constructor(FilicInstance, path, options) {

        if (!FilicInstance) {
            throw new Error("\"FilicInstance\" is required")
        }

        if (!path) {
            throw new Error("\"path\"  required")
        }

        this.FilicInstance = FilicInstance;

        this.providedPath = path;
        this.path = this.FilicInstance.ResolvePath(this.providedPath);
        this.options = options || {
            autoCreate: true
        };

        if (this.exists && fs.lstatSync(this.path).isDirectory() === false) {
            console.log(`[FILIC][WARNING] The Directory you are trying to open is actually a File`)
            return this.FilicInstance.open(`file:${this.providedPath}`)
        }

        if (this.options.autoCreate === true) {
            this.create();
        }

    }

    create() {
        if (fs.existsSync(this.path) === true) return this;

        try {
            fs.mkdirSync(this.path);
        } catch (e) {
            this.Directory?.open("dir:" + this.path)
        }

        return this;
    }

    createFilicInstance() {
        return new Filic(this.path)
    }

    open(...args) {
        return this.createFilicInstance().open(...args);
    }

    list(options) {
        return fs.readdirSync(this.path).map(e => {
            return this.open(e, options)
        });
    }

    delete(path) {
        this.createFilicInstance().open(path).delete(path);
        return this;
    }

    deleteItSelf() {
        this.list().map(e => {
            e.deleteItSelf?.()
            e.delete?.()
        })
        fs.rmdirSync(this.path)
        return this;
    }

    clear() {
        this.list().map(e => {
            e.deleteItSelf()
        })
        return this;
    }

    existsInside(path) {
        return fs.existsSync(this.ResolvePath(path));
    }

    ResolvePath(path) {
        path = path.replace("dir:", "");
        path = path.replace("file:", "");
        return Path.resolve(this.path, path);
    }

    copy(directory, insidesOnly = false) {
        if (directory instanceof Directory === false) {
            directory = Filic.open(directory);
        }

        directory = insidesOnly === false ? directory.open("dir:" + this.dirname) : directory;

        this.list().map(e => {
            e.copy(directory);
        })

        return directory;
    }

    move(directory, insidesOnly = false) {
        if (directory instanceof Directory === false) {
            directory = Filic.open(directory);
        }

        directory = insidesOnly === false ? directory.open("dir:" + this.dirname) : directory;

        this.list().map(e => {
            e.move(directory);
        })

        return directory;
    }

    get exists() {
        return fs.existsSync(this.path);
    }

    get isDirectory() {
        return true;
    }

    get dirname() {
        return Path.basename(this.path);
    }

    get Directory() {
        const parentPath = Path.dirname(this.path);

        if (fs.existsSync(parentPath) === false) {
            return null;
        }

        return Filic.open(parentPath);
    }

    static exists(path) {
        return fs.existsSync(path);
    }

}

module.exports = Directory; 