const searchServices = require('../services/search');

export default function routes(prefix, app) {
    app.get(prefix + '/', searchServices.get_store);
}