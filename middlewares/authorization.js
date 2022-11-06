 const { User } =require('../models');

//User yang login yang bisa edit data user
async function authorizationUser(req, res, next) {
    try {
        const AuthenticatedUser = res.locals.user;
        const checkUser = await User.findOne({
            attributes: ['id'],
            // where: {id: req.params.id}}); // Check Params
            where: {id: AuthenticatedUser.id}});

        if(!checkUser){
            return res.status(400).json({
                message: "User Tidak Ada!"
            })
        }
        next();

        // Membandingkan Params dengan Local User
        // if(checkUser.id === AuthenticatedUser.id){
        //     next();
        // }else{
        //     res.status(403).json({
        //         message: "Not Allowed To Access!"
        //     })
        // }

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }   
}

async function authorizationAdmin(req, res, next) {
    try {
        const AuthenticatedUser = res.locals.user;
        const checkUser = await User.findOne({
            attributes: ['id','role'],
            // where: {id: req.params.id}}); // Check Params
            where: {id: AuthenticatedUser.id}});

        if(!checkUser){
            return res.status(400).json({
                message: "User Tidak Ada!"
            })
        }
        if(checkUser.role === 1){
            next();
        }else{
            res.status(403).json({
                message: "Not Allowed To Access!"
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }   
}

module.exports = {authorizationUser,authorizationAdmin};
