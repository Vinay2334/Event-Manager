const jwt = require('jsonwebtoken');
const fetchuser=(req,res,next)=>{
    //Get the user from jwt token and add id to req object
    // const token=req.header('auth-token');
    const jwtkey = process.env.JWT_KEY;

    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).send({error:'Invalid! Login to access'})
    }
    try {
    const data=jwt.verify(token,jwtkey)
    req.user=data.id
    next();
    } catch (error) {
        res.status(401).send({error:'Invalid! Enter valid Token'})
    }
}
module.exports=fetchuser;