module.exports = function(req,res,next){
    const clientIP = req.ip || req.socket.remoteAddress;
    console.log(clientIP)
    if(clientIP === '::1' || clientIP === '127.0.0.1'){
        next();
    } else {
        res.status(403).json({error: 'Forbidden Error'});
    }
}