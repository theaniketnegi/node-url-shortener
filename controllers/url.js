const shortid = require('shortid')
const URL = require('../models/url.js');

async function generateNewShortUrl(req, res){
    const body = req.body;
    console.log(body);
    const shortId = shortid();
    if(!body)   return res.status(400).json({status:"URL is required"});

    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitHistory:[]
    })

    return res.json({id:shortId});
}
module.exports = {generateNewShortUrl}

