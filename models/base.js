const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);

module.exports = class BaseModel {

    constructor(filePath) {

        this.entries = require(filePath);
        this._filePath = filePath;
        const lastEntry = this.entries[this.entries.length - 1];
        this._lastEntryId = lastEntry ? lastEntry.id : 0;
    }

    insert(entry) {

        const newEntry = { ...entry, id: this._lastEntryId + 1 };
        const allEntries = [...this.entries, newEntry];

        return writeFile(this._filePath, JSON.stringify(allEntries, null, 2))
            .then(() => { this.entries = allEntries; })
    }
    findById(id) {

        const entry = this.entries.find(e => e.id === id);
        return Promise.resolve(entry);
    }

    getAll() {

        return Promise.resolve(this.entries);
    }

    queryBy(fn) {

        return Promise.resolve(this.entries.filter(fn))
    }
}