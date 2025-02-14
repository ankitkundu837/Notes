const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const router = Router();
const note = require('../models/note');

router.get('/add-new', (req, res)=>{
    return res.render('addNote',{
        user: req.user,
    })
})

router.post('/',async(req, res)=>{
    const {title , body, label} = req.body;
    const Note = await note.create({
        body,
        title,
        createdBy: req.user._id,
        label
    })
    console.log("added note")
    return res.json({sucess:true})
    // return res.redirect(`/note/${Note._id}`)
})

router.patch('/:label/:id', async (req, res) => {    
    try {
        const Note = await note.findById(req.params.id).populate("createdBy");
        if(Note){
            await note.updateOne(
                {_id : req.params.id},
                {$set : {"label" : req.params.label}}
            );
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Error updating label:', error);
        res.status(500).send('Error deleting card.');
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        const Note = await note.findById(req.params.id).populate("createdBy");
        if(Note.label !== 'bin'){
            await note.updateOne(
                {_id : req.params.id},
                {$set : {"label" : "bin"}}
            );
            return res.redirect('/');
        }
        else{
            if(!Note.createdBy._id.equals(req.user._id)) {
                return res.redirect("/");
            }
            await note.findByIdAndDelete(req.params.id);
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).send('Error deleting card.');
    }
});

router.get('/:id',async(req, res)=>{
    const Note = await note.findById(req.params.id).populate("createdBy");
    console.log("note: ",Note)
    if(!Note.createdBy || !Note.createdBy._id.equals(req.user._id)) {
        return res.redirect("/");
    }
    return res.render('Note',{
        user: req.user,
        Note,
    })
})

module.exports = router;