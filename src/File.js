const fs = require("fs");
const Path = require("path");
const Filic = require("./Filic");


class File {

    constructor (FilicInstance, path, options) {

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

        if (this.exists && fs.lstatSync(this.path).isDirectory()) {
            console.log(`[FILIC][WARNING] The File you are trying to open is actually a directory`)
            return this.FilicInstance.open(`dir:${this.providedPath}`)
        }

        if (this.options.autoCreate === true) {
            this.create();
        }

    }

    create() {
        if (this.exists) return this;

        try {
            fs.writeFileSync(this.path, "");
        } catch (e) {
            this.Directory?.open("file:" + this.path)
        }

        return this;
    }

    read() {
        if (!this.exists) return null;

        return fs.readFileSync(this.path, "utf-8");
    }

    write(content, options) {
        if (!this.exists && this.options.autoCreate) this.create();

        content = File.ParseWrite(content);

        fs.writeFileSync(this.path, content, options);
        return this;
    }

    append(content, options) {
        if (!this.exists && this.options.autoCreate) this.create();

        const toAppendContent = File.ParseWrite(content);

        const newContent = `${this.content}${toAppendContent}`;

        return this.write(newContent, options);
    }

    prepend(content, options) {
        if (!this.exists && this.options.autoCreate) this.create();

        const toAppendContent = File.ParseWrite(content);

        const newContent = `${toAppendContent}${this.content}`;

        return this.write(newContent, options);
    }
    update(callback, options) {
        const content = this.content;

        const newContent = callback(content);

        return this.write(newContent, options)
    }
    delete() {
        if (!this.exists) { return this };
        fs.unlinkSync(this.path)
        return this;
    }

    copy(directory, filename = this.filename) {
        const Directory = require("./Directory");

        if (directory instanceof Directory === false) {
            directory = Filic.open(directory);
        }

        fs.copyFileSync(this.path, directory.ResolvePath(filename));

        return directory.open(filename);
    }

    move(directory, filename = this.filename) {
        const Directory = require("./Directory");

        if (directory instanceof Directory === false) {
            directory = Filic.open(directory);
        }

        fs.renameSync(this.path, directory.ResolvePath(filename));

        return directory.open(filename);
    }

    rename(filename) {
        if (typeof filename !== 'string') {
            throw new Error("\"filename\" must be string");
        }

        return this.move(this.Directory, filename);
    }

    secondCopy(filename) {
        if (!filename) {
            throw new Error("\"filename\" must be string");
        }

        return this.copy(this.Directory, filename);
    }

    replace(file, rename = false) {
        if (file instanceof File === false) {
            file = Filic.open(file);
        }
        let newFile = this;

        this.write(file.content);

        if (rename) {
            newFile = this.rename(file.filename);
        }

        return newFile;
    }

    downloadFrom(url) {
        return new Promise(async resolve => {

            const OriginalContent = this.content.ByteArray;

            const http = require("http");
            const https = require("https");

            const pkg = url.toLowerCase().startsWith('https:') ? https : http
            const stream = this.writeStream;

            stream.on("finish", () => {
                stream.close();
                return resolve(this);
            })

            stream.on("error", (error) => {
                console.error(`[FILIC][ERROR] ${error.message}`);
                this.write(OriginalContent);
                return resolve(this);
            })

            const request = pkg.get(url, (res) => {
                if (res.statusCode !== 200) {
                    console.error(`[FILIC] [ERROR] Failed to reach provided url`);
                    this.write(OriginalContent);
                    return resolve(this)
                }

                res.pipe(stream);
            });

            request.on("error", (error) => {
                console.error(`[FILIC][ERROR] ${error.message}`);
                this.write(OriginalContent);
                return resolve(this);
            })

        })
    }

    get writeStream() {
        return fs.createWriteStream(this.path);
    }

    get readStream() {
        return fs.createReadStream(this.path);
    }

    get content() {
        const content = this.read();

        content.__proto__.json = null;
        content.__proto__.ByteArray = null;

        const Try = (callback) => {
            return (...args) => {
                try {
                    return callback?.(...args)
                } catch (e) {
                    return null
                }
            }
        }

        content.__proto__.json = Try(() => JSON.parse(content))

        content.__proto__.ByteArray = Try(() => Filic.StringToByteArray(content))

        return content;
    }

    get detailedContent() {
        const content = this.content;
        let splitted = content.split("\n");

        const lines = splitted.length;
        const chars = content.split('').length;

        let detailedContent = [];

        for (let i = 0; i < splitted.length; i++) {
            const line = splitted[i];
            detailedContent.push({
                lineNumber: i + 1,
                content: line
            })
        }

        return {
            lines,
            chars,
            content: detailedContent
        }
    }

    get exists() {
        return fs.existsSync(this.path);
    }

    get isDirectory() {
        return false;
    }

    get filename() {
        return Path.basename(this.path);
    }

    get dirPath() {
        return Path.dirname(this.path);
    }

    get Directory() {
        const parentPath = Path.dirname(this.path);

        if (fs.existsSync(parentPath) === false) {
            return null;
        }

        return Filic.open(Path.dirname(this.path));
    }

    static ParseWrite(content) {
        if (Array.isArray(content)) {
            content = Filic.ByteArrayToString(content);
        }

        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }

        if (typeof content === 'number' && isNaN(content) === false) {
            content = content.toString()
        }

        return content;
    }

}

module.exports = File;