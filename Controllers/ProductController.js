const {Product} = require('../models');

class ProductController{
    static async createProduct (req,res){
        try {
            const product = await Product.create(req.body);
            product.price = "Rp."+product.price
            res.status(201).json({
                product: product
            })
        } catch (error) {
            const { name } = error
            if(name === "SequelizeForeignKeyConstraintError"){
                return res.status(400).json({
                    message: "There is No Such Category With ID "+ req.body.CategoryId
                })
            }
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async getProduct (req,res){
        try {
            const get = await Product.findAll();
            if(get.length>0){
                for(const i in get){
                    get[i].price = "Rp."+get[i].price
                }
                res.status(200).json({
                    Product: get
                })
            }else{
                res.status(200).json({
                    message: "No products listed!"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message 
            })
        }
    }


    static async updateProduct (req,res){
        try {
            const find = await Product.findOne({
                attributes: ['id'],
                where: {id: req.params.id}
            })
            if(find){
                const update = await Product.update(req.body,{
                    where: {id: req.params.id},
                    returning: true,
                    plain: true
                });
                update[1].price = "Rp."+update[1].price
                res.status(200).json({
                    product: update[1]
                })
            } else {
                res.status(400).json({
                    message: "There is No Such Product With ID "+req.params.id
                })
            }
        } catch (error) {
            const { name } = error
            if(name === "SequelizeForeignKeyConstraintError"){
                return res.status(400).json({
                    message: "There is No Such Category With ID "+ req.body.CategoryId
                })
            }
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteProduct (req,res){
        try {
            const find = await Product.findOne({
                attributes: ['id'],
                where: {id: req.params.id}
            })
            if(find){
                await Product.destroy({
                    where: {id: req.params.id}
                });
    
                res.status(200).json({
                    message: "Product Has Been Successfully Deleted"
                })
            } else {
                res.status(400).json({
                    message: "There is No Such Product With ID "+req.params.id
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports = ProductController;