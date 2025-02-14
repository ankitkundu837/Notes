const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const router = Router();
const note = require('../models/note');

router.get('/add-new', (req, res)=>{
    return res.render('addNote',{
        user: req.user,
    })
    // return res.json({message : "add-new"});
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
    return res.json({sucess:true,
                     noteid: Note._id,})
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
            // return res.json({message : 'label updated successfully'});
        }
    } catch (error) {
        console.error('Error updating label:', error);
        res.status(500).send('Error deleting card.');
        // return res.json({message : 'error encountered'});
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
            // return res.json({message : 'note sent to bin'});
        }
        else{
            if(!Note.createdBy._id.equals(req.user._id)) {
                return res.redirect("/");
            }
            await note.findByIdAndDelete(req.params.id);
            return res.redirect('/');
            // return res.json({message : 'note deleted successfully'});
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).send('Error deleting card.');
        // return res.json({message : 'error'});
    }
});

router.get('/:id',async(req, res)=>{
    const Note = await note.findById(req.params.id).populate("createdBy");
    console.log(Note)
    if(!Note.createdBy || !(Note.createdBy._id.equals(req.user._id))) {
        // return res.redirect("/");
        return res.json({message : "Cannot access"});
    }
    // return res.render('Note',{
    //     user: req.user,
    //     Note,
    // })
    return res.json(Note);
})

module.exports = router;
