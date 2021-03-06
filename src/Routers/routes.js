const express = require('express');
const router = express.Router();

const userController = require("../Controllers/userController")
const bookController = require("../Controllers/bookController")
const reviewController = require("../Controllers/reviewController")
const middleware = require("../Middlewares/auth")
const aws = require("aws-sdk")
const connection = require("../aws/connect")


//User & Login API
router.post("/register", userController.userData);
router.post("/login", userController.loginUser);

//Book API
router.post("/books", /*middleware.mid1*/bookController.createBook)
router.get("/books", middleware.mid1, bookController.getBooks)
router.get("/books/:bookId", middleware.mid1, bookController.getReviewDetails)
router.put("/books/:bookId", middleware.mid1, bookController.updatebook)
router.delete("/books/:bookId", middleware.mid1, bookController.deleteBook)

//Review API
router.post("/books/:bookId/review", reviewController.createReview)
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)
//configuration of AWS3 link
/*aws.config.update({
    accessKeyId: "AKIAY3L35MCRUJ6WPO6J",
    secretAccessKeyId: "7gq2ENIfbMVs0jYmFFsoJnh/hhQstqPBNmaX9Io1+08tQrIkFVyDFqSft4J",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
    }


    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})*/

module.exports = router