import express, { application } from "express";
import pgPromise from "pg-promise";
import bodyParser from "body-parser";
import JewelleryData from "./jewelleryData.js";
import JewelleryApi from "./Api/jewellery-api.js";
import session from "express-session";
import flash from "express-flash";
// import * as dotenv from "dotenv";
// dotenv.config();
// import cookieParser from "cookie-parser";
 const pgp = pgPromise();

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgres://jewellery_store_user:i9UVQBYBpNVbakV8WkM3jzozPwBhG9HE@dpg-cir74odiuie930ks4b20-a/jewellery_store";

const config = {
  connectionString: DATABASE_URL,
};

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = pgp(config);

const app = express();
// app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(
  session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
// app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("public"));

const jewelleryData = JewelleryData(db);
const jewelleryApi = JewelleryApi(jewelleryData);
// const jewelleryRoutes = JewelleryRoutes(pizzaData);
app.get('/api/products',jewelleryApi.productsApi);
app.get('/api/products/:id',jewelleryApi.itemApi);
app.get('/api/products/category/:category',jewelleryApi.productsByCategoryApi);
app.get('/api/products/addToCart/:id/:qty',jewelleryApi.addToCatApi);
app.get('/api/cart',jewelleryApi.cartApi);
app.post('/api/cart/update/qty',jewelleryApi.updateApi);
app.get('/api/products/check/:id',jewelleryApi.itemCheckInCartApi)
const PORT = process.env.PORT || 3007

app.listen(PORT,function(){
  console.log('app started at port ' + PORT)
})