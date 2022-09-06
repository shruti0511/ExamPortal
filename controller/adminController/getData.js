const client = require('../../databaseCon')
const insert = require('../../insertData')

//show page
const getUser = (req, res) => {
    sess = req.session
    client.query('SELECT * from "user" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            res.send({
                user: result.rows[0]
            })
        } else {
            console.log(err.stack);
        }
    })
}
const getQuiz = (req, res) => {
    sess = req.session
    client.query('SELECT * from "que2" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            res.send({
                quiz: result.rows[0]
            })
        } else {
            console.log(err.stack);
        }
    })
}
const getRule = (req, res) => {
    sess = req.session
    client.query('SELECT * from "rules" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            console.log(result.rows)
            res.send({
                rule: result.rows[0]
            })
        } else {
            console.log(err.stack);
        }
    })
}
module.exports = {
    getUser: getUser,
    getQuiz: getQuiz,
    getRule: getRule
}