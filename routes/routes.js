// import other routes
const userRoutes = require('./db');

const appRouter = (app, fs) => {
     debugger;
    // default route
    app.get('/', (req, res) => {
        console.log("res");
        res.send('welcome to the development api-server');
    });

    // // other routes
    userRoutes(app, fs);

};

module.exports = appRouter;