const client = require('../databaseCon')
const insert = require('../insertData')
    ///Register
const register = (req, res) => {
    let d = req.body;
    console.log(d);
    client.query('SELECT email from "user" where email = $1', [d.email], (err, respons) => {
        if (!err) {
            if (respons.rows.length == 0) {
                insert.insertUser(d.name, d.email, d.username, d.password, d.qualification, false).then(result => {
                    if (result) {
                        req.flash('success', 'User Scuccesfully Signed In');
                        console.log('User inserted');
                        return res.status(201).json({ success: 'User Scuccesfully Signed In', status: 201 })
                    } else {
                        console.log('error')
                    }
                });
            } else {
                req.flash('errorSignup', 'Given Email Id alredy used.');
                console.log('user already existed');
                return res.status(422).json({ error: 'user already existed', status: 422 })
            }
        } else {
            console.log(err)
        }
    })
}

//Login
const login = (req, res) => {

    console.log(req.body)
    client.query('SELECT email,password,bit,id from "user" where email = $1', [req.body.email], (err, result) => {
        if (!err) {
            if (result.rowCount > 0) {
                let r = result.rows[0];
                if ((r.email == req.body.email) && (r.password == req.body.password)) {
                    let sess = req.session;
                    sess.userId = r.id
                    console.log(sess.userId)
                    if (r.bit == true) {

                        console.log('admin logged')
                        sess.admin = r.bit
                        req.flash('success', 'Admin successfully loggedIn');
                        return res.status(201).json({ success: 'Admin successfully loggedIn', status: 201 })
                    } else {
                        if (sess.admin) {
                            sess.admin = false
                        }
                        console.log('login user')
                        req.flash('success', 'User successfully loggedIn');
                        // res.redirect('/terms')
                        return res.status(202).json({ success: 'User successfully loggedIn', status: 202 })
                    }
                } else {
                    console.log('invalid password ')
                    req.flash('error', 'Invalid password ');
                    // res.redirect('/')
                    return res.status(421).json({ error: 'Invalid password', status: 421 })
                }
            } else {
                req.flash('error', 'User not registered');
                console.log('user not registered')
                    // res.redirect('/')
                return res.status(422).json({ error: 'user not registered', status: 422 })

            }
        } else {
            console.log(err.stack)
        }
    })


}
module.exports = { register: register, login: login };