const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
  res.render('login', {
    layout: 'auth-layout',
    title: 'Login'
  });
};
 exports.login = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.redirect('/login');
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.redirect('/login');
  req.session.admin = admin;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};