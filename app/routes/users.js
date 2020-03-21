const userServices = require('../services/user');

export default function routes(prefix, router) {
    router.get(prefix + '/', function (req, res, next) {
        res.send(prefix + 'respond with a resource');
    });
    router.get(prefix + '/signin', userServices.get_sign_in);
    router.post(prefix + '/signin', userServices.sign_in);
    router.post(prefix + '/register', userServices.register);
    router.get(prefix + '/logout', async (req, res, next) => {
        res.clearCookie(prefix + 'auth');
        res.redirect(prefix + '/users/signin');
    });
}
