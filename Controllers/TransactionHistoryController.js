const { Category, User, Product, TransactionHistory } = require('../models');

class TransactionHistoryContoller{
 static async createTransaction (req,res){
    const { ProductId, quantity } = req.body
    try {
        //cek Produk
        // const findProduct = await Product.findOne({
        //     where: {id: productId}},{
        //         include: [{
        //             model: Category
        //         }]
        // })
        const findProduct = await Product.findOne({
            where: {id: ProductId}
        })

        if(findProduct){//decision cek produk
            if(findProduct.stock >= quantity){//decision cek stok cukup
                //cek saldo
                const cekSaldo = await User.findOne({
                    attributes: ['balance'],
                    where: {id: res.locals.user.id }
                })
                const total_price = quantity * findProduct.price

                if(cekSaldo.balance >= total_price){//decision cek saldo cukup
                    //update saldo user
                    await User.update({
                        balance: cekSaldo.balance-total_price},{
                            where: {id: res.locals.user.id}
                    })

                    // update stok produk
                    await Product.update({
                        stock: findProduct.stock-quantity},{
                            where: {id: ProductId}
                    })

                    //update sold amount category
                    const soldCategory = await Category.findOne({
                        where: ({id: findProduct.CategoryId}),
                        attributes: ['sold_product_amount']
                    })
                    await Category.update({
                        sold_product_amount: soldCategory.sold_product_amount+quantity},{
                            where: {id: findProduct.CategoryId}
                    })

                    //create data
                    await TransactionHistory.create({
                        ProductId, 
                        UserId: res.locals.user.id,
                        quantity,
                        total_price
                    });
                    res.status(201).json({
                        message: "You have successfully purchase the product",
                        transactionBill: { 
                            total_price: "Rp."+total_price, 
                            quantity, 
                            product_name: findProduct.title }
                    })
                } else {
                    res.status(400).json({
                        message: "Insufficient Balance"
                    })
                }
            } else {
                res.status(400).json({
                    message: "Stock Empty"
                })
            }
        }else{
            res.status(400).json({
                message: "There is No Such Product With ID "+productId
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
 }

 static async getUserTransaction (req,res){
        try {
            const get = await TransactionHistory.findAll({
                where: {UserId: res.locals.user.id},
                attributes: ['ProductId', "UserId", "quantity", 'total_price', 'createdAt', 'updatedAt'],
                include: [{
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'CategoryId']
                }]
            });
            if(get.length>0){
                for(const i in get){
                    get[i].total_price = "Rp."+get[i].total_price
                    get[i].Product.price = "Rp."+get[i].Product.price
                }
                res.status(200).json({
                    transactionHistories: get
                })
            }else{
                res.status(200).json({
                    message: "Transaction History is Empty!"
                })
            }
        } catch (error) {
            res.status(404).json({
                message: error.message 
            })
        }
    }

    static async getAdminTransaction (req,res){
        try {
            const get = await TransactionHistory.findAll({
                attributes: ['ProductId', "UserId", "quantity", 'total_price', 'createdAt', 'updatedAt'],
                include: [{
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'CategoryId']
                },{
                    model: User,
                    attributes: ['id', 'email', 'balance', 'gender', 'role']
                }]
            });
            if(get.length>0){
                for(const i in get){
                    get[i].total_price = "Rp."+get[i].total_price
                    get[i].Product.price = "Rp."+get[i].Product.price
                    get[i].User.balance = "Rp."+get[i].User.balance
                }
                res.status(200).json({
                    transactionHistories: get
                })
            }else{
                res.status(200).json({
                    message: "Transaction History is Empty!"
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

    static async getTransaction (req, res){
        try{
            const get = await TransactionHistory.findOne({
                where: {id: req.params.id},
                attributes: ['ProductId', "UserId", "quantity", 'total_price', 'createdAt', 'updatedAt'],
                include: [{
                    model: Product,
                    attributes: ['id', 'title', 'price', 'stock', 'CategoryId']
                }]
            })
            
            if(get){
                get.total_price = "Rp."+get.total_price
                get.Product.price = "Rp."+get.Product.price
                res.status(200).json({
                    transactionHistories : get
                })
            } else {
                res.status(400).json({
                    message: "There is No Such Transaction With ID "+req.params.id
                })
            }
        }catch (error){
            res.status(404).json({
                message: error.message
            })
        }
    } 
}

module.exports = TransactionHistoryContoller;