const router = require('express').Router();
const passport = require('passport');
const {register,authenticate,profile} = require('../controllers/userControllers')

router.route("/register").post(register)
router.route("/authenticate").post(authenticate)
router.route("/profile").get(passport.authenticate('jwt',{session:false}),profile,profile)
module.exports = router;

//passport.authenticate('jwt',{session:false}),profile