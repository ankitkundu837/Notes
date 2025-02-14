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
    return res.redirect(`/note/${Note._id}`)
    // return res.json({noteid: Note._id,})
})

router.patch('/:id', async (req, res) => {    
    try {
        const Note = await note.findById(req.params.id).populate("createdBy");
        const {title, body, label} = req.body;
        console.log(req.body)
        if(Note){
            console.log(await note.findOne({_id : req.params.id}));
            await note.updateOne({_id : req.params.id}, {$set : {
                "title" : req.body.title,
                "body" : req.body.body,
                "label" : req.body.label,
            }});
            return res.json({
                label_: label,
            });
        }
    } catch (error) {
        console.error('Error updating label:', error);
        res.status(500).send('Error patching card.');
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
    console.log("note: ",Note)
    if(!Note.createdBy || !Note.createdBy._id.equals(req.user._id)) {
        return res.redirect("/");
        // return res.json({message : "Cannot access"});
    }
    return res.render('Note',{
        user: req.user,
        Note,
    })
    // return res.json({message : "Success"});
})

module.exports = router;
