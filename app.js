var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Controller
const authRoute = require('./controller/authRoute')
const termRoute = require('./controller/terms')
const queRoute = require('./controller/queRoute')
const adminRoute = require('./controller/adminController/admin')
const userRoute = require('./controller/adminController/user')
const ruleRoute = require('./controller/adminController/rules')
const quizRoute = require('./controller/adminController/quiz')
const resultRoute = require('./controller/adminController/result')
const submitRoute = require('./controller/submitRoute')
const getData = require('./controller/adminController/getData');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'SecretStringForSession',
    cookie: { maxAge: 60000 * 60 },
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

/// PUBLIC FOLDERS
app.use(express.static('public'));
app.use(express.static('Admin'));

// app.use('/', indexRouter);
app.use('/users', usersRouter);


////// ------START FILE RENDER---------//////
app.get('/', function(req, res) {
    res.send({
        error: req.flash('error'),
        success: req.flash('success'),
        errorSignup: req.flash('errorSignup')
    })
});

////// ------AUTH ROUTE ---------//////
app.post('/userPost', authRoute.register)
app.post('/loginPost', authRoute.login)

////// ------FOR TERMS GET---------//////
app.get('/terms', termRoute.terms);

////// ------FOR GET QUESTION AS PER SELECTED EXAM ---------//////
app.get('/question/:id', queRoute.question);

////// ------THANK YOU PAGE ---------//////
app.post('/submitPost', submitRoute.submit);

////// ------ADMIN ROUTES---------//////
app.get('/admin', adminRoute.admin);

////// ------USER ROUTES ---------//////
app.get('/user', userRoute.user);
app.post('/addUser', userRoute.userAdd);
app.put('/user/update/:id', userRoute.userUpdate);
app.delete('/user/delete/:id', userRoute.userDelete);
app.get('/user/get/:id', getData.getUser);


////// ------RULES ROUTES---------//////
app.get('/rules', ruleRoute.rule);
app.post('/rulpost', ruleRoute.ruleAdd);
app.put('/rule/update/:id', ruleRoute.ruleUpdate);
app.delete('/rule/delete/:id', ruleRoute.ruleDelete);
app.get('/rule/get/:id', getData.getRule);

////// ------QUIZ ROUTE ---------//////
app.get('/quiz_table', quizRoute.quiz);
app.post('/quiz', quizRoute.quizAdd);
app.put('/quiz/update/:id', quizRoute.quizUpdate);
app.delete('/quiz/delete/:id', quizRoute.quizDelete);
app.get('/quiz/get/:id', getData.getQuiz);


////// ------RESULT ROUTE ---------//////
app.get('/result', resultRoute.result);

////----------Logout------------///
app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log('logout')
    res.redirect('/')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;