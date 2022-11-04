const {Category} = require('../models');

class CategoryController{
    static async createCategory (req,res){
        const {tipe, sold_product_amount} = req.body;
        try {
            const create = await Category.create({
                tipe, 
                sold_product_amount
            });

            res.status(201).json({
                message: "Category Berhasil di tampilkan",
                data: create
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports= CategoryController;