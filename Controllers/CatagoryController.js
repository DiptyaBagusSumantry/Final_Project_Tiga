const {Category} = require('../models');

class CategoryController{
    static async createCategory (req,res){
        const {tipe, sold_product_amount} = req.body;
        try {
            const cekTipe = await Category.findOne({
                where: {tipe}
            });

            if(!cekTipe){
                const create = await Category.create({
                    tipe, 
                    sold_product_amount
                });

                res.status(201).json({
                    message: "Category Berhasil di tampilkan",
                    data: create
                })
            }else{
                res.status(400).json({
                    message: "Tipe tersebut sudah ada"
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
            const get = await Category.findAll();
            if(get.length>0){
                res.status(200).json({
                    message: "Menampilkan Data Category",
                    data: get
                })
            }else{
                res.status(200).json({
                    message: "Belum ada Category"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async updateCategory (req,res){
        const {tipe, sold_product_amount} = req.body;
        try {
            await Category.update({
                tipe, 
                sold_product_amount
            }, {
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: "Data berhasiil di update"
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteCategory (req,res){
        try {
            await Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: "Data Berhasil di Hapus"
            })
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}

module.exports= CategoryController;