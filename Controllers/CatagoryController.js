const {Category,Product} = require('../models');

class CategoryController{
    static async createCategory (req,res){
        try {
            const find = await Category.findOne({
                where: {tipe: req.body.tipe}
            })
            if(!find){
                const create = await Category.create(req.body);
                res.status(201).json({
                    category: create
                })
            }else{
                return res.status(400).json({
                    message: "Type is already registered!"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async getCategory (req,res){
        try {
            const get = await Category.findAll({
                include: [{
                    model: Product
                }]
            });
            if(get.length>0){
                res.status(200).json({
                    categories: get
                })
            }else{
                res.status(200).json({
                    message: "Category Not Found!"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async updateCategory (req,res){
        try {
            const find = await Category.findOne({
                attributes: ['id'],
                where: {id: req.params.id}
            })
            if(find){
                const update = await Category.update(req.body, {
                    where: {id: req.params.id},
                    returning: true,
                    plain: true
                });
                res.status(200).json({
                    category: update[1]
                })
            } else {
                res.status(400).json({
                    message: "There is No Such Category With ID "+req.params.id
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteCategory (req,res){
        try {
            const find = await Category.findOne({
                attributes: ['id'],
                where: {id: req.params.id}
            })
            if(find){
                await Category.destroy({
                    where: {id: req.params.id}
                })
                res.status(200).json({
                    message: "Category Has Been Successfully Deleted"
                })
            } else {
                res.status(400).json({
                    message: "There is No Such Category With ID "+req.params.id
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports= CategoryController;