const {Product} = require('../models');

class ProductController{
    static async createProduct (req,res){
        const {title,price,stock, CatagoryId} = req.body;
        try {
            const product = await Product.create({
                title,
                price,
                stock, 
                CatagoryId
            });

            res.status(201).json({
                message: "Data Berhasil di tambahkan",
                data: product
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async getProduct (req,res){
        try {
            const get = await Product.findAll();
            if(get.length>0){
                res.status(200).json({
                    message: "Menampilkan Product",
                    Product: get
                })
            }else{
                res.status(200).json({
                    message: "Tidak ada Product"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message 
            })
        }
    }


    static async updateProduct (req,res){
        const {title,price,stock, CatagoryId} = req.body;
        try {
            await Product.update({
                title,
                price,
                stock, 
                CatagoryId
            },{
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: "Product sudah di edit"
            })
            
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteProduct (req,res){
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: "Data berhasil di hapus"
            })
            
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports = ProductController;