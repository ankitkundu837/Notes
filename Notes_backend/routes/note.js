const {Router} = require('express')
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
    return res.json({sucess:true,
                     noteid: Note._id,})
    // return res.redirect(`/note/${Note._id}`)
})

router.patch('/:id', async (req, res) => {    
    try {
        const Note = await note.findById(req.params.id).populate("createdBy");
        const {title, body, label} = req.body;
        if(Note){
            await note.updateOne({_id : req.params.id}, {$set : {
                "title" : req.body.title,
                "body" : req.body.body,
                "label" : req.body.label,
            }});
            return res.json({
                sucess:true,
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
            // return res.redirect('/');
            return res.json({message : 'note sent to bin'});
        }
        else{
            if(!Note.createdBy._id.equals(req.user._id)) {
                return res.redirect("/");
            }
            await note.findByIdAndDelete(req.params.id);
            // return res.redirect('/');
            return res.json({message : 'note deleted successfully'});
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        // res.status(500).send('Error deleting card.');
        return res.json({message : 'error'});
    }
});

router.get('/:id',async(req, res)=>{
    const Note = await note.findById(req.params.id).populate("createdBy");
    if(!Note.createdBy ||!req.user || !(Note.createdBy._id.equals(req.user._id))) {
        // return res.redirect("/");
        return res.json({message : "Cannot access"});
    }
    // return res.render('Note',{
    //     user: req.user,
    //     Note,
    // })
    return res.json(Note);
})



router.get("/labels",async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotes.forEach(lab => {
         labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    // console.log("hello");
    return res.json({"labels" : uniquelabels});
})


router.get("/labels",async(req,res)=>{
    const allNotes = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotes.forEach(lab => {
         labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    // console.log("hello");
    return res.json({"labels" : uniquelabels});
})

module.exports = router;
