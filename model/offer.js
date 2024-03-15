const mongoose=require('mongoose');


const offerSchema=new mongoose.Schema({
    offerName:{
        type:String,
        required:true  
    },
    startingDate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    productId: {
        type:   mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Assuming your product model is named 'Product'
    }

})


const Offer=mongoose.model('Offer',offerSchema);

module.exports=Offer;