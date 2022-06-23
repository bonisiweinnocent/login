// module.exports = function (app, db) {
const router = require("express").Router();
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const { users } = require("../db")
const jwt = require("jsonwebtoken")
const script = require('../script')
const PgPromise = require('pg-promise')

const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);


// (async () => {
//     console.log(await db.many('select * from love_user'));

// })();


router.post('/signup', [
    check("email", "Please provide a valid email")
        .isEmail(),
    check("password", "Please provide a password that is greater than 5 charectors")
        .isLength({
            min: 6
        })
], async (req, res) => {
    const { password, email } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({
            errors: errors.array()
        })
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    // *********
    let user = await db.oneOrNone(`select * from love_user where username = $1`, [email]);
console.log(user);
    const token = await jwt.sign({
        email
    }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCK2jum", {
        expiresIn: 86400000
    })
    if (user) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "This user already exists",
                    token
                }
            ]
        })
    } else {

        await db.none(`insert into love_user(username,password,love_count) values ($1,$2, 0)`, [email,hashedPassword]);

        res.json({
            "msg": "New user created!",
            token
        })
    }


})


router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    let user = users.find((user) => {

        return user.email === email

    });

    if (!user) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "Oooops,looks like you're not registered!",

                }
            ]
        })
    }
    // const token = await jwt.sign({
    //     email
    // }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCK2jum", {
    //     expiresIn: 86400000
    // })
    let matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
        res.status(400).json({
            "errors": [
                {
                    "msg": "Oooops,looks like you're not registered!",
                    token
                }
            ]
        })
    }
    const token = await jwt.sign({
        email
    }, "2b$10$sKJ0mzanWwudGhOers1HkOGH2XfZ19dU64fs1E8P6RX1QvpCK2jum", {
        expiresIn: 86400000
    })

    res.json({
        "msg": "you have logged in"
    })

})


router.get('/all', (req, res) => {
    res.json(users)
})
// }
module.exports = router
// }

