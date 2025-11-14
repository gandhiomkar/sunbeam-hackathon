const corsProvider=(req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5501')
    next();
}

module.exports = corsProvider;