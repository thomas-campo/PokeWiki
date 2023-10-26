import express from "express";
import handlebars  from "express-handlebars";

import ViewsRouter from "./router/views.router.js";

import __dirname from './utils.js';


const app = express();
const PORT = 8080;
app.listen(PORT,()=>console.log(`escuchando en el puerto ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/view`);
app.set('view engine','handlebars');
// app.use(passport.initialize());
// initializePassport();

app.use("/",ViewsRouter);