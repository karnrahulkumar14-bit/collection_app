const User = require('../model/user-model');
const Detail = require('../model/collection');
const Expenses = require('../model/expenses');
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send('Welcome to the homepage');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Register
const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = {
        status:400,
        message:"Email already exists",
      }
      return next(error);
    }
    // create new user
    const newUser = await User.create({
        name, 
        email,
        phone,
        password
    });

    res.status(201).json({
      msg: "User registered successfully",
      token: newUser.generateToken(),
      userID: newUser._id.toString(),
    });
  } catch (error) {
    // console.error(error);
    const err = {
      status:500,
      message:"Internal server error",
    }
    next(err);
  }
};

// Login

const login = async (req, res, next) =>{
  try{
    const { email, password } = req.body;
    const userExist = await User.findOne({email});
    console.log("Found user:", userExist);

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentails" });
    }

    const user = await bcrypt.compare(password, userExist.password);
    // console.log("Password valid:", user);

    if(user){
      res.status(200).json({
        msg:"Login sucessfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });

    }else{
      res.status(401).json({ msg: "Invalid email or passwrod"});
    }
  }catch(error){
    // console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
} 

// Collection
// CREATE
const createDetail = async (req, res) => {
  try {
    const detail = new Detail(req.body);
    await detail.save();
    res.status(201).json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all
const getDetails = async (req, res) => {
  try {
    const details = await Detail.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateDetail = async (req, res) => {
  try {
    const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteDetail = async (req, res) => {
  try {
    await Detail.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Expenses
// CREATE
const createExpenses = async (req, res) => {
  try {
    const detail = new Expenses(req.body);
    await detail.save();
    res.status(201).json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all
const getExpenses = async (req, res) => {
  try {
    const details = await Expenses.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateExpenses = async (req, res) => {
  try {
    const detail = await Expenses.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(detail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteExpenses = async (req, res) => {
  try {
    await Expenses.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  home,
  register,
  login,
  createDetail,
  getDetails, 
  updateDetail,
  deleteDetail,
  createExpenses,
  getExpenses,
  updateExpenses,
  deleteExpenses,
};
