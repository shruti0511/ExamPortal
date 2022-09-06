const client = require('../databaseCon')

//Question exam
const question = (req, res) => {
    sess = req.session

    console.log(sess.userId)
        // if (sess.userId) {
        // console.log('yeah')
    console.log('id', req.params.id)
        // console.log(req.params.id)
        // console.log(sess.userId)
        // client.query('SELECT * from "que2" limit 25', (err, result) => {
    client.query('SELECT * from "que2" where language = $1 limit 25', [req.params.id], (err, result) => {
            if (!err) {
                // console.log(result.rows);
                answer = []
                result.rows.forEach((val) => {
                    answer.push(val.answer)
                        // console.log(val.answer)
                })
                console.log(answer)

                let sess = req.session
                sess.answer = answer
                sess.subject = req.params.id
                res.send({ question: result.rows, answer: sess.answer, id: req.params.id })
                    // res.render('question', { question: result.rows, answer: sess.answer, id: req.params.id })

            } else {
                console.log(err.stack);
            }
        })
        // } else {
        //     res.redirect('/')
        // }

}

module.exports = { question: question }