const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController{
    static async register (req,res){
        try {
            const createUser = await User.create( req.body );
            const {id, full_name, email, gender, balance, createdAt} = createUser
            res.status(201).json({
                user:  { id, full_name, email, gender, balance: "Rp."+balance, createdAt }
            })
        } catch (error) {
            res.status(404).json({
                message: error.errors[0].message
            })
        }
    }

    static async login (req,res){
        const{email,password}=req.body;
        try {
            const user = await User.findOne({
                where: {email}
            });

            //cek Email
            if(!user){
                res.status(400).json({
                    message: "User Not Found"
                })
            }else{
                //cek password
                const correct = comparePassword(password, user.password);
                if(!correct){
                    res.status(400).json({
                        message: "Invalid Password!"
                    })
                }else{ 
                    const token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({token})
                }
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async getUserLogin(req,res){
        try {
            const AuthenticatedUser = res.locals.user;
            res.status(200).json({
                message: "Menampilkan Data User : ",
                data: AuthenticatedUser
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
            
        }
    }
    
    static async getUser(req,res){
        try {
            const user = await User.findAll();

            if (user.length > 0){
                res.status(200).json({
                    message: "Menampilkan Data User : ",
                    data: user
                })
            }else{
                res.status(200).json({
                    message: "Tidak Ada Data"
                })
            }
            
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
            
        }
    }

    static async updateUser(req,res){
        try {
            const user = await User.update( req.body, {
                where: {
                    id: req.params.id
                }
            });

            if(user){
                const getOne = await User.findOne({
                    where: {
                        id: req.params.id
                    },
                    attributes: ['id', 'full_name','email','createdAt','updatedAt']
                })
                res.status(200).json({
                    user: getOne,
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteUser (req,res){
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: "Your Account Has Been Successfully Deleted"
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    static async topupUser (req,res){
        try {
            const AuthenticatedUser = res.locals.user;
            const balanceUser = await User.findOne({
                attributes: ['balance'],
                where: {id: AuthenticatedUser.id}
            })

            const newBalance = balanceUser.balance+req.body.balance

            await User.update({
                balance: newBalance
            }, {
                where: {
                    id: AuthenticatedUser.id
                }
            });

            res.status(200).json({
                message : "Your Balance has been successfully updated to Rp."+newBalance
            })
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

module.exports = UserController;