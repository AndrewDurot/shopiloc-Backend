const mongoose = require('mongoose');
const homeServices = require('../services/home');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');


export default function routes(prefix, app) {
    i18n.configure({
        locales: ['en', 'ur', 'ar', 'fr'],
        cookie: 'lang',
        defaultLocale: 'en',
        directory: __dirname+'/locales'
    });
    app.use(i18n.init);
    app.use(cookieParser());
    app.get(prefix + '/', (req, res, next)=>{
        var lang = req.cookies.lang;
        if(lang) i18n.setLocale(lang);
        var lang = i18n.__('home');
        res.render('index',
        {
            title: 'Shopiloc',
            language : lang
        });
    });
    app.post(prefix + '/lang' , (req, res, next) =>{
        var lang = req.body.lang;
        res.cookie('lang',lang);
        res.send({language: lang});
    });
    app.post(prefix + '/', homeServices.get_Search);
    app.get(prefix + '/create', homeServices.create_store);
    app.get(prefix + '/about', (req, res) => {
        res.render('about');
    });
    // app.use('/admin', admin);
    // app.use('/user', users);
    // app.use('/store', store);
    // app.use('/search', search);
    app.get(prefix + '/country_List', homeServices.get_country);
    app.get(prefix + '/country', homeServices.get_all_country);
    app.get(prefix + '/state', homeServices.get_all_state);
    app.get(prefix + '/Check_Url', homeServices.Check_Url);
}
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to db!")
);
