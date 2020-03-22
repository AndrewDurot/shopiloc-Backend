const fs = require('fs');
const storeServices = require('../services/store');
const multer = require('multer');
const path = require('path');

export default function routes(prefix, app) {
    const storage = multer.diskStorage({
        destination: function (req, file, callback) {
            const dir = './uploads';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            callback(null, dir)
        },
        filename: function (req, file, callback) {
            console.log(file);
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });

    app.post(prefix + '/', upload.single('store_logo'), storeServices.create_store);
    app.get(prefix + '/', storeServices.get_store);
    app.get(prefix + '/Details', storeServices.get_single_store);
    //  router.put(prefix + '/', storeServices.create_store);
    app.post(prefix + '/update', storeServices.patch_store);
    //  router.delete(prefix + '/', storeServices.create_store);
}
