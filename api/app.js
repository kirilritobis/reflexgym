const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const accountRoutes = require('./routes/account')

// const productRoutes = require("./api/routes/products");
// const orderRoutes = require("./api/routes/orders");
// const userRoutes = require('./api/routes/user');

// const mongodb = "mongodb+srv://kitodorovAdmin:100Kilatashaci@cluster0.6c3aq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose.connect(
//     mongodb
// );
// mongoose.Promise = global.Promise;

// const dbURI = 'mongodb+srv://kitodorovAdmin:100Kilatashaci@Cluster0.6c3aq.mongodb.net/Cluster0?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => console.log('connected to db'))
//     .catch((err)=>console.log(err))


app.set("view-engine", "ejs")
// app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);
// app.use("/user", userRoutes);

app.get('/', (req, res)=>{
    res.render('register.ejs')
})

// app.get('/login', (req, res)=>{
//     res.render('register.ejs')
// })

// app.use('/api', routes)
// app.use('/api', activityLogRoutes)
app.use('/api', accountRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/meters', metersRoutes)
// app.use('/api/locations', locationRoutes)
// app.use('/api/groupmembers', groupMemberRoutes)
// app.use('/api/platforms', platformRoutes)
// app.use('/api/clients', clientRoutes)
// app.use('/api/client-groups', clientGroupRoutes)
// app.use('/api/products', productRoutes)
// app.use('/api/contracts', contractRoutes)
// app.use('/api/securitydevices', securityDeviceRoutes)
// app.use('/api/dataimport', dataImport)
// app.use('/api/statistics', statisticsRoutes)
// app.use('/api/components', componentsRoutes)
// app.use('/api/authorizations', authorizationsRouters)
// app.use('/api/cybercat', cybercatRoutes)
// app.use('/api/roles', roleRoutes)
// app.use('/api/ucas-coverage', ucasCoverageRoutes)


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;