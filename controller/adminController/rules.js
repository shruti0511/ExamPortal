const client = require('../../databaseCon')
const insert = require('../../insertData')
    //show rules
const rule = (req, res) => {
    sess = req.session
        // if (sess.userId && sess.admin) {
    client.query('SELECT * from "rules" ORDER BY id ASC ', (err, result) => {
            if (!err) {
                // console.log(result.rows);
                // res.render('user_rules', { rules: result.rows, success: req.flash('success'), error: req.flash('error'), info: req.flash('info') })
                res.send({ rules: result.rows, success: req.flash('success'), error: req.flash('error'), info: req.flash('info') })
            } else {
                console.log(err.stack);
            }
        })
        // } else { res.redirect('/') }

}

const ruleAdd = (req, res) => {
    let addrules = req.body;
    insert.insertRule(addrules.rule).then(result => {
        if (result) {
            console.log('rulpost inserted');
            req.flash('success', 'Rule successfully Added');
            // res.redirect('/rules')
            return res.status(201).json({ success: 'Rule successfully Added', status: 201 })
        } else {
            console.log('error')
            return res.status(401).json({ error: 'Rule not added', status: 401 })
        }
    });
    console.log(addrules);
}

const ruleUpdate = function(req, res) {
    console.log(req.body.rule)
    console.log(req.params.id);
    client.query('UPDATE "rules" SET rules = $1 WHERE id =$2', [req.body.rule, req.params.id], (err, result) => {
        if (!err) {
            console.log(result.rows);
            req.flash('info', 'Rule successfully Updated');
            // res.redirect('/rules')
            return res.status(201).json({ success: 'Rule successfully Updated', status: 201 })
        } else {
            console.log(err.stack);
            return res.status(401).json({ error: 'Rule not updated', status: 401 })
        }
    })

}

const ruleDelete = function(req, res) {

    console.log('req.params.id');
    console.log(req.params.id);
    client.query('DELETE from "rules" where id = $1', [req.params.id], (err, result) => {
        if (!err) {
            // console.log(result.rows);
            req.flash('error', 'Quiz successfully deleted');
            // res.redirect('/rules')
            return res.status(201).json({ success: 'Rule successfully Deleted', status: 201 })
        } else {
            console.log(err.stack);
            return res.status(401).json({ error: 'Rule not deleted', status: 401 })
        }
    })

}

module.exports = { rule: rule, ruleAdd: ruleAdd, ruleUpdate: ruleUpdate, ruleDelete: ruleDelete }