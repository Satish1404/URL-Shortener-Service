const {nanoid} = require('nanoid')
const URL = require('../models/url')



async function handleGenerateNewUrl(req,res){
   const body = req.body
  
   if(!body.url) return res.status(400).json({eroor: 'URL is riqured'})
    const shortID = nanoid(8) 
   
    await URL.create({
     shortId: shortID,
     redireactURL: body.url,
    createdBy: req.user._id
    })
    return res.render('home',{
        id: shortID
    })
}

async function gandleGenerateByid(req,res){
    const shortId = req.params.id
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
        
            $push:{
                visiteHistory:{
                   timestamp: Date.now()
                }
            
        },

    })
    return res.redirect(entry.redireactURL)
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.id;
    const result =  await URL.findOne({shortId})
    
    if(!result) return res.status(404).send("Short URL is Found")

    return res.json({
        Clicks: result.visiteHistory.length,
        redirectURL: result.redireactURL,
        Anlytics: result.visiteHistory,
    })
}

module.exports = {
    handleGenerateNewUrl,
    gandleGenerateByid,
    handleGetAnalytics
}