const mongoose = require('mongoose');
const homeServices = require('../services/home');


export default function routes(prefix, app) {
    app.get(prefix + '/', homeServices.get_store);
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
