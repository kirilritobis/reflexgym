// const express = require("express");
import express, { Request, Response, NextFunction } from 'express'

const {
  NotFound
} = require('./helpers/error-handling')

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const accountRoutes = require('./routes/account')
const cardRoutes = require('./routes/card')
const userRoutes = require('./routes/user')

// const productRoutes = require("./api/routes/products");
// const orderRoutes = require("./api/routes/orders");

// const mongodb = "mongodb+srv://kitodorovAdmin:100Kilatashaci@cluster0.6c3aq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// mongoose.connect(
//     mongodb
// );
// mongoose.Promise = global.Promise;

// const dbURI = 'mongodb+srv://kitodorovAdmin:100Kilatashaci@Cluster0.6c3aq.mongodb.net/Cluster0?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => console.log('connected to db'))
//     .catch((err)=>console.log(err))

app.use(cors());
app.set("view-engine", "ejs")
// app.use(express.urlencoded({ extended: false }))

app.use(morgan("dev"));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use((req: Request, res: Response, next: NextFunction) => {
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

app.get('/', (req: Request, res: Response)=>{
    res.render('register.ejs')
})

// app.get('/login', (req, res)=>{
//     res.render('register.ejs')
// })

// app.use('/api', routes)
// app.use('/api', activityLogRoutes)
app.use('/api', accountRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cards', cardRoutes)
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


app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new NotFound()
  // const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;