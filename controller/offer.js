const usersDb = require("../model/users");
const Cart = require("../model/cart");
const Order = require("../model/ordersList");
const Product = require("../model/product");
const offers = require("../model/offer");
const Category = require("../model/category")

const moment = require('moment');
const Offer = require("../model/offer");











const loadOffers = async (req, res) => {
    try {
         const Offer = await offers .find()


        // console.log('Offers.....:', Offer)
        res.render('adminSide/offer',{Offer})
    } catch (error) {
        console.log(error.message);
    }
}

const loadAddOffers = async (req, res) => {
    try {
        const categories = await Category.find({ is_listed: 1 });
        console.log('categories....:', categories);

        const products = await Product.find({ is_listed: 1 })
        console.log('products......:', products);

        res.render('adminSide/addoffer', { categories, products })
    } catch (error) {
        console.log(error.message);
    }
}


const addOffers = async (req, res) => {
    try {
        const { offerName,percentage,startingDate,expiryDate,status } = req.body;
        console.log('addOffers......:', req.body);

        // Validate if required fields are provided
        if ( !offerName || !percentage || !startingDate || !expiryDate || !status) {
            return res.status(400).send("All fields are required");
        }

        // Create a new offer instance
        const newOffer = new  offers({ 
            offerName:offerName,          
            startingDate:startingDate,
            percentage: percentage,
            expiryDate:expiryDate,
            status:status
       });



       

       
      

   const saveData=await newOffer.save()


        console.log('New Offer added:', newOffer);

        // Redirect to the offers page after successfully adding the offer
        res.redirect('/admin/offer');
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};



// const postApplyOffer=async(req,res)=>{
//     try {

        
//         console.log('iam mohammed amjadalu',req.body)
//         const {productId,offerId}=req.body
//     console.log(req.body);

//        const proData= await Product.findOne({_id:productId})




//     //   console.log(proData)

//     const offerData=await  Offer.findOne({_id:offerId})

//       proData.offer=offerData._id


//       const result=await proData.save()


// if(result){

//     res.json({success:true})
// }


//     } catch (error) {
        
//     }
// }



const postApplyOffer = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { productId, offerId } = req.body;

        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        const offer = await Offer.findOne({ _id: offerId});
        if (!offer) {
            return res.status(404).json({ success: false, error: 'Offer not found' });
        }

        product.offer = offerId;
        const updatedProduct = await product.save();
        console.log(updatedProduct ,"yuyuyuyuyuyuyuyuyuyuyu");

        if (updatedProduct) {
            return res.json({ success: true });
        } else {
            return res.status(500).json({ success: false, error: 'Error applying offer' });
        }
    } catch (error) {
        console.error('Error applying offer:', error);
        return res.status(500).json({ success: false, error: 'Internal server error' });
    }
};



const removeOffer = async (req, res) => {
    try {
        const { offerId } = req.body; // Extract offerId from request body
        console.log(req.body,"ssssssssssssssssssssssssssssss");

        // Find the offer by its ID and remove it
        const deletedOffer = await Offer.deleteOne({_id:offerId});

        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        // Respond with success message
        return res.status(200).json({ message: "Offer removed successfully", offer: deletedOffer });
    } catch (error) {
        console.error("Error removing offer:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




// Assume you have an Offer model imported

const loadeditoffer = async (req, res) => {
    try {
        // Retrieve the offer ID from the request parameters
        const { offerId } = req.query;

        // Retrieve the offer details from the database based on the offer ID
        const offer = await Offer.findById( offerId);

        if (!offer) {
            // If offer not found, render an error page or redirect to another page
            return res.status(404).send('Offer not found');
        }

        // Render the edit page view with the offer data
        res.render('adminSide/editOffer', { offer });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error rendering edit page:', error);
        res.status(500).send('Internal Server Error');
    }
};

const editoffer= async(req,res)=>{
    try {
        // Retrieve the offer ID from the request parameters
        
        const { offerId } = req.body;

        // Retrieve the updated offer details from the request body
        const { offerName, percentage, startingDate, expiryDate, status } = req.body;

        // Update the offer in the database based on the offer ID
        await Offer.findByIdAndUpdate(offerId, {
            offerName,
            percentage,
            startingDate,
            expiryDate,
            status
        });

        // Redirect the user to the offers page after successful update
        res.redirect('/admin/offer');
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error updating offer:', error);
        res.status(500).send('Internal Server Error');
    }
};


































module.exports = {

    loadOffers,
    loadAddOffers ,
    addOffers,
    postApplyOffer,
    removeOffer,
    loadeditoffer,
    editoffer

   
   
  };