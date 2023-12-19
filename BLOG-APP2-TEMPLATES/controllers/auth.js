const User = require('../models/User')

// @url     GET /auth/login
exports.getLogin = (req, res) => {
  // req.flash('error', 'Test Error Message');
  const errorMessage = req.flash("error") || null;
  const successMessage = req.query.success || req.flash('success') || null;
  console.log("errorMessage:", errorMessage);
  console.log("succesMessage :", successMessage );

  res.render("pages/login", { docTitle: "Login" ,errorMessage,successMessage});
};

// @url     POST /auth/login
exports.postLogin = async (req, res) => {
  const {email, password} = req.body;
  if(!email || !password){
     req.flash('error', 'Email or Password are incorrect');
    // console.log('Session in postLogin:', req.session);
    return res.redirect('/auth/login');
  }

  // Check if there is a user with that email 
  const user = await User.findOne({email})
  if(!user){
     req.flash('error', 'Email or Password are incorrect');

    return res.redirect('/auth/login');
  }
  // Check the password
  const isMatch = await user.matchPassword(password)
  console.log(user, isMatch)
  if(!isMatch){
     req.flash('error', 'Email or Password are incorrect');

    return res.redirect('/auth/login');
  }
  // if email & password are correct login the user 
  req.session.user = user;
  // Set cookie 
  if(req.body?.remberMe)
    req.sessionOption.maxAge = 3*24*60*60*1000  // 3Days

   req.flash('success', 'Logged In Successfully!')
  res.redirect('/')
};

// @url     GET /auth/register
exports.getRegister = (req, res) => {
  //  this error is coming from "postResgoster" 
  //  i hace created with "flash" which name is error
  //  which is firts paramater of "req.flash" then message 
  const errorMessage =req.flash('error')
  res.render("pages/register", { docTitle: "Register",errorMessage });
};

// @url     POST /auth/register
exports.postRegister = async (req, res) => {
//   console.log("post register")
  const { name, password, email, password2 } = req.body;

//   // Check the inputs
  if (!email || !password || !password2) {
    req.flash("error", "Email & Password are required!");
    return res.redirect("/auth/register");

    throw new Error('Email & Password are required!')
  }
//   // Check if the user is not registered in DB
  const user = await User.findOne({ email });
  if (user) {
    req.flash("error", "User is already Exists");
    return res.redirect("/auth/register");
  }
//   // password equals confirmed password
  if (password !== password2) {
    req.flash("error", "Password not matching");
    return res.redirect("/auth/register");
  }

  await User.create({email,name,password});
  req.flash("success", "Signed up successfully!");
  res.redirect("/auth/login");
};

// @url     GET /auth/logout
exports.getLogout = async (req, res) => {
  req.session = null;
  
  res.redirect(`/auth/login`); 
  
};
