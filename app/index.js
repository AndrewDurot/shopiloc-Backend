import './common/env';
import Server from './common/server';
import index from './routes/index';
import admin from './routes/admin';
import store from './routes/store';
import search from './routes/search';
import users from './routes/users';

export default new Server()
    .router('/', index)
    .router('/users', users)
    .router('/admin', admin)
    .router('/store', store)
    .router('/search', search)
    .listen(process.env.PORT);
