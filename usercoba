const {User} = require('../models');
const { Op } = require("sequelize");
const { comparePassword } = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt')

class UserController{
    static async register (req,res){
        const {full_name, email, username,password,profil_image_url,age,phone_number}=req.body;
        try {
            //cek email sudah ada blm
            const getUser = await User.findOne({
                where: {email}
            });
            //cek username sudah ada blm
            const cekUsername = await User.findOne({
                where: {username}
            });
            // const phone = (phone_number)
            // console.log(typeof phone_number)
            // console.log(phone + typeof phone)
            if(getUser){
                res.status(404).json({
                    message: "Email Already Registered!"
                })
            }else if(cekUsername){
                res.status(404).json({
                    message: "Username Already Registered!"
                })
            }else{
                //insert data ke user
                const user = await User.create({
                    full_name,
                    email,
                    username,
                    password,
                    profil_image_url,
                    age,
                    phone_number
                })
                res.status(201).json({
                    user: {email, full_name, username, profil_image_url, age, phone_number}
                })
            }
            
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async login(req,res){
        const {email,password}= req.body;
        try {
            const user = await User.findOne({
                where: {email}
            });

            //check user with email
            if(!user){
                res.status(404).json({
                    message: "User Not Found"
                })
            }else {
                //check password
                const isCorrect = comparePassword(password, user.password);
                if(!isCorrect){
                    res.status(404).json({
                        message: "Invalid Password"
                    })
                }else {
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

    static async getUser(req,res){
        try {
            const AuthenticatedUser = res.locals.user;

            if (AuthenticatedUser){
                res.status(200).json({
                    message: "Menampilkan Data User : ",
                    data: AuthenticatedUser
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
        const {full_name, email, username,profil_image_url,age,phone_number}=req.body;
        try {
            const getId = res.locals.user.id;
            // cek email sudah ada blm
            const cekEmail = await User.findOne({
                where: {
                    id : {[Op.ne]: getId},
                    email
                }
            });
            
            //cek username sudah ada blm
            const cekUsername = await User.findOne({
                where: {
                    id : {[Op.ne]: getId},
                    username
                }
            });
            if(cekEmail){
                res.status(404).json({
                    message: "Email Tidak Tersedia!!"
                })
            }else if(cekUsername){
                res.status(404).json({
                    message: "Username Tidak Tersedia!"
                })
            }else{
                // update data ke user
                const user = await User.update({
                    full_name,
                    email,
                    username,
                    profil_image_url,
                    age,
                    phone_number
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    user: {email, full_name, username, profil_image_url, age, phone_number}
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
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: "Akun Anda Berhasil Di Hapus"
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports = UserController