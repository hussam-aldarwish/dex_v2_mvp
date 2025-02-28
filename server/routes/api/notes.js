const express = require('express');
const router = express.Router();
const Note = require('../../models/Note');

const handleAsync = fn => (req, res) => {
    try {
        const result = fn(req, res);
        if (req.method === 'POST') {
            return res.status(201).json(result);
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

router.post('/', handleAsync((req) => Note.create(req.body)));
router.get('/', handleAsync(() => Note.findAll()));
router.get('/:id', handleAsync((req, res) => {
    const note = Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return note;
}));
router.put('/:id', handleAsync((req, res) => {
    const updatedNote = Note.update(req.params.id, req.body);
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    return updatedNote;
}));
router.delete('/:id', handleAsync((req, res) => {
    if (!Note.delete(req.params.id)) return res.status(404).json({ message: 'Note not found' });
    return { message: 'Note deleted successfully' };
}));

module.exports = router;
