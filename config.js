exports.port = process.argv[2] || process.env.PORT || 8080;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/bqnode';
exports.secret = process.env.JWT_SECRET || 'xxxxxxxx'; // JWT secret
exports.adminEmail = process.env.ADMIN_EMAIL || 'dianamunoz86@gmail.com';
exports.adminUserName = process.env.ADMIN_USERNAME || 'dmunozp';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'burgerqueen';
