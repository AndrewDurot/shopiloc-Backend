const adminServices = require('../services/admin');

export default function routes(prefix, router) {
    router.get(prefix + '/', adminServices.getStore_Data);
    router.get(prefix + '/create', adminServices.create_form);
}
