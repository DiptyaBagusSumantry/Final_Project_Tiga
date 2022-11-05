const { TransactionHistory } = require('../models');

class TransactionHistoryContoller{
 static async createTransaction (req,res){
    const {UserId, ProductId, quantity, total_price} = req.body;
    try {
        const create = await TransactionHistory.create({
            UserId, 
            ProductId, 
            quantity, 
            total_price
        });
        res.status(201).json({
            message: "Transaction Berhasil di buat",
            data: create
        })
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
 }

 static async getTransaction (req,res){
        try {
            const get = await TransactionHistory.findAll();
            if(get.length>0){
                res.status(200).json({
                    message: "Menampilkan Transaction",
                    data: get
                })
            }else{
                res.status(200).json({
                    message: "Tidak ada Transaction"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message 
            })
        }
    }


    static async updateTransaction (req,res){
        const {UserId, ProductId, quantity, total_price} = req.body;
        try {
            await TransactionHistory.update({
                UserId, 
                ProductId, 
                quantity, 
                total_price
            },{
                where: {
                    id: req.params.id
                }
            });

            res.status(200).json({
                message: "Transaction sudah di edit"
            })
            
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }

    static async deleteTransaction (req,res){
        try {
            await TransactionHistory.destroy({
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

module.exports = TransactionHistoryContoller;