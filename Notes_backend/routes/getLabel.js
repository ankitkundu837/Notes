const {Router} = require('express')
const router = Router();
const note = require('../models/note');

router.get('/show',async(req,res)=>{
    if(!req.user){
        return res.json({});
    }
    const allNotesWithBin = await note.find({ createdBy : req.user }); 
    let labels=[];
    allNotesWithBin.forEach(lab => {
        labels.push(lab.label);
    });
    const uniquelabels = [...new Set(labels)];
    return res.json({
        "labels" : uniquelabels
    });
})

module.exports = router;