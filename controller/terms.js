const client = require('../databaseCon')
    //terms
const terms = (req, res) => {
    sess = req.session
        // if (sess.userId) {
    client.query('SELECT * from "rules"  ORDER BY id ASC', (err, result) => {
            if (!err) {
                // console.log(result.rows);
                let id = sess.userId;

                console.log(sess.userId)
                    // console.log(id)
                client.query('SELECT * from "result" where sid=$1 ', [sess.userId], (err, result1) => {
                    if (!err) {
                        // console.log(result.rows);

                        // res.render('terms', { terms: result.rows, id: id, result: result1.rows, success: req.flash('success') })
                        res.send({ terms: result.rows, id: id, result: result1.rows, success: req.flash('success') })
                    } else {
                        console.log(err.stack);
                    }
                })
            } else {
                console.log(err.stack);
            }
        })
        // } else {
        //     res.redirect('/')
        // }
}


module.exports = { terms: terms }