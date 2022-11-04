const {User} = require('../models');
const {verifyToken} =  require('../helpers/jwt');

async function authentication(req,res,next){
    try {
        const token = req.headers["x-access-token"]
        const userDecoded = verifyToken(token)
        
        User.findOne({
            where: {
                id: userDecoded.id,
                email: userDecoded.email
            }
        })

        .then(user=>{
            if(!user){
                res.status(404).json({
                    name: "Authenticaton Error",
                    devMessage: `User with id ${userDecoded.id} and email ${userDecoded.email} NOT FOUND `
                });
            }
            res.locals.user = user;
            return next();
        })
        .catch((error)=>{
            res.status(404).json({
                message: error.message
            });
        });
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
        
    }
}

module.exports = authentication