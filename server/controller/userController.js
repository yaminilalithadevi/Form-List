const UserModel = require('../model/UserModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/form-app/public/images');
  },
  filename: function (req, file, cb) {

    
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage });

const createUser = async (req, res) => {

  try {
    
    const name = req.body.name;
    const gender = req.body.gender;
    const skills = req.body.skills;
    const photo = req.file.filename 
    const dob = req.body.dob ? new Date(req.body.dob.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')) : null;

    const mobile = req.body.mobile;
    const terms = req.body.terms;

    
    const newUser = new UserModel({
      name: name,
      gender: gender,
      skills: skills,
      photo: photo,
      dob: dob,
      mobile: mobile,
      terms: terms
    });
    

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
    const { name, gender, skills, dob, mobile, terms } = req.body;
    const photo = req.file;

    const existingUser = await UserModel.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the old image if it exists
    if (existingUser.photo) {
      try {
        await fs.unlink(`../client/form-app/public/images/${existingUser.photo}`);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    // Update only the fields that are provided in the request body
    if (name) existingUser.name = name;
    if (gender) existingUser.gender = gender;
    if (skills) existingUser.skills = skills;
    if (dob) existingUser.dob = dob;
    if (mobile) existingUser.mobile = mobile;
    if (terms) existingUser.terms = terms;
    if (photo) existingUser.photo = photo.filename;

    await existingUser.save();

    res.status(200).json(existingUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
};



const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    console.log(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};






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








module.exports = { createUser,getAllUsers,updateUser,deleteUser,getUser ,upload};
