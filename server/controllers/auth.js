const express = require("express");
const validator = require("validator");
const passport = require('passport');
const router =  new express.Router();

router.post("/register", (req, res, next) => {
    return passport.authenticate("local-signup", (err) => {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Check the form for errors",
                    errors: {
                        username: "This username is already taken"
                    }
                });
            }
            return res.status(400).json({
                success: false,
                message: "Could not process the form"
            })
        }
        return res.status(200).json({
            success: true,
            message: "You have successfully signed up. You can now login"
        });
    })(req, res, next);
});

router.post("/login", (req, res, next) => {

    return passport.authenticate("local-login", (err, token, accountData) => {
        if (err) {
            if (err.username === "IncorrectCredentialsError") {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }

            return res.status(400).json({
                success: false,
                message: "Could not process the form."
            })
        }
        return res.json({
            success: true,
            message: "You have successfully logged in!",
            token,
            account: accountData
        });
    })(req, res, next);
});

module.exports = router;