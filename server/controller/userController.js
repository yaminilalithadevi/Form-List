const UserModel = require('../model/UserModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

// Define the destination folder for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/form-app/public/images');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded image
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

// Multer configuration using the storage options
const upload = multer({ storage: storage });

const createUser = async (req, res) => {

  try {
    // Assuming req.body contains the form data
    const name = req.body.name;
    const gender = req.body.gender;
    const skills = req.body.skills;
    const photo = req.file ? req.file.path : null;
    const dob = req.body.dob ? new Date(req.body.dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')) : null;

    const mobile = req.body.mobile;
    const terms = req.body.terms;

    // Create a new instance of UserModel
    const newUser = new UserModel({
      name: name,
      gender: gender,
      skills: skills,
      photo: photo,
      dob: dob,
      mobile: mobile,
      terms: terms
    });
    console.log(newUser,"newUser");

    // Save the user data to the database
    await newUser.save();

    res.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, gender, skills, dob,mobile, terms } = req.body;
    const photo = req.file;

    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update the product
    existingUser.name = name;
    existingUser.gender = gender;
    existingUser.skills = skills;
    existingUser.dob = dob;
    existingUser.mobile = mobile;
    existingUser.terms = terms;

    // If there's a new image, update the image data in the database
    if (photo) {
      existingUser.photo = photo.filename; // Assuming Multer stores  the image
    }

    await existingUser.save();

    res.status(200).json(existingUser);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
};




 


// const getProduct=async (req,res)=>{
  
//   const user = await productModel.findOne({_id:req.params.id});
//   console.log(req.params.id)
//   if(user){
//     res.json(user)
//   } else{
//     res.send({"result":"No Record found"})
//   }
  
// }





//print all the products which we add 
const getAllUsers = async (req, res) => {
try {
  const userlist = await UserModel.find();
  res.status(200).json(userlist);
} catch (error) {
  console.error('Error fetching users:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}
};



const deleteUser = async (req,res) =>{

let result= await UserModel.deleteOne({_id:req.params.id})
 res.send(result)
}








module.exports = { createUser,getAllUsers,updateUser,deleteUser ,upload};
