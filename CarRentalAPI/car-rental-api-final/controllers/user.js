const Token = require("../models/Token");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const fs = require("fs/promises");
const path = require("path");

// @url     GET /users
// @desc    list all users
// @access  Admin
exports.list = async (req, res) => {
  console.log(res.results);
  res.status(200).json(res.results);
};

// @url     POST /users
// @desc    list all users
// @access  public
exports.create = async (req, res) => {
  // Disallow set admin
  // req.body.isAdmin = false;
  const data = await User.create(req.body);

  // Send a varification email
  const tokenKey = generateToken(data._id + Date.now());
  const tokenData = await Token.create({ userId: data._id, token: tokenKey });
  let html = await fs.readFile(path.resolve(__dirname, "../utils/index.html"), {
    encoding: "utf-8",
  });
  html = html.replaceAll("{userId}", data._id);
  html = html.replaceAll("{verifyCode}", generateToken(data.email));

  const options = {
    email: data.email,
    subject: "Welcome to Car Renatal API",
    html: html,
  };
  sendEmail(options);
  res.status(201).json({
    error: false,
    data,
    token: tokenData.token,
  });
};

// @url     GET /users/:id
// @desc    Get the user information
// @access  private
exports.read = async (req, res) => {
  if (req.user._id.toString() != req.params.id || !req.user?.isAdmin) {
    res.errorStatusCode = 403;
    throw new Error("No permission: Not owner");
  } else {
    const data = await User.findById(req.params.id);
    res.status(200).json({
      error: false,
      data,
    });
  }
};

// @url     PUT /users/:id
// @desc    update user information
// @access  private
exports.update = async (req, res) => {
  if (req.user._id.toString() != req.params.id || !req.user?.isAdmin) {
    res.errorStatusCode = 403;
    throw new Error("No permission: Not owner");
  } else {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(202).json({
      error: false,
      data,
    });
  }
};

// @url     DELETE /users/:id
// @desc    Delete user
// @access  Admin
exports.delete = async (req, res) => {
  const data = await User.deleteOne({ _id: req.params.id });
  res.status(data.deletedCount ? 204 : 404).json({
    error: !data.deletedCount,
    data,
  });
};

// @url     GET /users/verify
// @desc    verify the user email
// @access  public
exports.verify = async (req, res) => {
  const { id: _id, verifyCode } = req.query;
  const user = await User.findOne({ _id });
  if (!user || verifyCode !== generateToken(user.email)) {
    res.errorStatusCode = 402;
    throw new Error("User not found");
  }
  await User.updateOne({ _id }, { emailVerified: true });
  let html = await fs.readFile(
    path.resolve(__dirname, "../utils/verified.html"),
    { encoding: "utf-8" }
  );
  const options = {
    email: user.email,
    subject: "Email verified",
    html: html,
  };
  sendEmail(options);
  res.status(200).json({
    error: false,
    message: "Email Verified",
  });
};
