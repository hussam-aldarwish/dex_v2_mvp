// Note.js - In-memory store for notes

class Note {
    constructor() {
        this.notes = [];
        this.nextId = 1;
    }

    create({ title = 'Untitled', content = '' }) {
        const note = {
            id: this.nextId++,
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.notes.push(note);
        return { ...note };
    }

    findAll() {
        return [...this.notes];
    }

    findById(id) {
        return this.notes.find(note => note.id === Number(id)) || null;
    }

    update(id, { title, content }) {
        const note = this.findById(id);
        if (!note) return null;
        
        Object.assign(note, {
            ...(title !== undefined && { title }),
            ...(content !== undefined && { content }),
            updatedAt: new Date()
        });
        return { ...note };
    }

    delete(id) {
        const initialLength = this.notes.length;
        this.notes = this.notes.filter(note => note.id !== Number(id));
        return initialLength !== this.notes.length;
    }
}

module.exports = new Note();