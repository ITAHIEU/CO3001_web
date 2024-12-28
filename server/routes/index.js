
const LoginRoutes = require('./LoginRoutes');
const AdminRoutes = require('./AdminRoutes');
const PaymentRoutes = require('./paymentRoutes');



const routes = (app) => {
    
    
    app.use('/User', LoginRoutes);
    app.use('/Admin',AdminRoutes);
    app.use('/Payment', PaymentRoutes);
    

}

module.exports = routes;