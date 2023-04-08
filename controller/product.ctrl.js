const data = require('../fillerdata')
const router = require('express').Router()


exports.getAllData = async (req, res)=>{
    try{
        
        const {name,price, rating, size, color, category, page ,sort , inStock} = req.query

       
         let preData = data?.data
        
         if(name){
            preData = preData.filter((x)=> x.name.toLowerCase().includes(name.toLowerCase()))
         }
        if(category){
            preData = preData.filter((x)=> x.category.toLowerCase() == category.toLowerCase())
        }
        if(price){
            preData = preData.filter((x)=> x.price <= price)
        }
        if(rating){
            preData = preData.filter((x)=> x.rating >= rating)
        }
        if(size){
            preData = preData.filter((x)=> x.size.includes(size))
        }
        if(inStock){
            preData = preData.filter((x)=> x.inStock == true)
        }
        if(color){
            preData = preData.filter((x)=> x.color.toLowerCase() == color.toLowerCase())
        }
       
        let initLength = preData?.length

        if(page && Number(page) > 0){
            let skip = Number(page - 1) * 10
            let limit = skip + 10
            preData = preData.slice(skip,limit)
        }

        if(sort && sort.toLowerCase() === 'lowtohigh'){
            preData = preData.sort((a,b)=> a.price - b.price)
        }
        if(sort && sort.toLowerCase() === 'hightolow'){
            preData = preData.sort((a,b)=> b.price - a.price)
        }

        

        res.status(200).json({success:true, data:preData, total:initLength})
    }catch(err){
        console.log('err',err)
        res.status(500).json({success:false, message:'Error getting products'})
    }
}

exports.getSinglePorduct = async(req, res)=>{
    try{
        let preData = data?.data?.filter((x)=>x.id == req.params.id)
        res.status(200).json({success:true, data:preData})
    }catch(err){
        console.log('err',err)
        res.status(500).json({success:false, message:'Error getting product'})
    }
}

router.get('/', this.getAllData)
router.get('/:id', this.getSinglePorduct)


module.exports = router;