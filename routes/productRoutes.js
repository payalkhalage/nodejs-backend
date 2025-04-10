const express =require('express')
const router =express.Router()
const Product =require('../models/Product')


router.post('/add',async(req,res)=>{
    try {
            const { productName,productPrice,productUnit,productDescription } = req.body
            const productExit = await Product.findOne({ productName })
            if (productExit) {
                return res.json({
                    status: false,
                    message: 'Product already exit'
                })
            }
            const productObj = new Product({ productName,productPrice,productUnit,productDescription  })
            await productObj.save()
    
            res.json({
                status: true,
                message: "Product added successfully !!"
    
            })
        } catch (error) {
            res.json({
                status: false,
                message: `Error:${error}`
            })
        }
})

router.get('/get',async(req,res)=>{
    try{
        const result=await Product.find()
        res.json({
            status:true,
            message:result
        })

    }catch(error){
        res.json({
            status: false,
            message: `Error:${error}`
        })

    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        const id =req.params.id
        await Product.findByIdAndDelete(id)
        res.json({
            status:true,
            message:"Product deleted successfully !!"
        })

    }catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})

router.put('/update/:id',async(req,res)=>{

    try{
        const id=req.params.id
        const updated=await Product.findByIdAndUpdate(id,req.body,{'new':true})
        res.json({
            status:true,
            message:"Product updated successfully !!"
        })

    }catch(error){
        res.json({
            status:false,
            message:error
        })
    }
})

module.exports=router


