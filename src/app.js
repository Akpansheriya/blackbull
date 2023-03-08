const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./db/conn");
const UserModel= require("./models/user");
const path = require("path");
const hbs = require("hbs");


const port = process.env.PORT || 8000

//setting path
  const staticpath = path.join(__dirname, "../public");
  const templates = path.join(__dirname, "../templates/views");
  const partials = path.join(__dirname, "../templates/partials");
  
   
//console.log(path.join(__dirname, "../templates/partials"));

//middleware for bootsrap,js,jquery
// app.use("/css", express.static(path.join(__dirname,"../node_modules/bootsrap/dist/css")));
// app.use("/js", express.static(path.join(__dirname,"../node_modules/bootsrap/dist/js")));
// app.use("/jq", express.static(path.join(__dirname,"../node_modules/jquery/dist")));

//middleware
app.use(express.urlencoded({extended : false}));
app.use(express.static(staticpath));
app.set("veiw engine", "hbs");
 app.set("views" , templates);
hbs.registerPartials(partials);


// app.get("/" , (req,res) => {
//     res.send("index");
// });

app.get("/" , (req,res) => {
    res.render("index.hbs");
});



// app.get("/about" , (req,res) => {
//     res.render("about.hbs");
// });

// app.get("/services" , (req,res) => {
//     res.render("services.hbs");
// });

// app.get("/portfolio" , (req,res) => {
//     res.render("portfolio.hbs");
// });

//  app.get("/contact" , (req,res) => {
//      res.render("contactus.hbs");
//  });

app.post("/contactus", async(req,res) => {
            //  course : req.body.course, 
            //  console.log(req.body);
    try {
        
        // res.status(200).send(req.body);
        const UserData = new UserModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
             course : req.body.course, 
            message: req.body.message
        });
       await UserData.save();
       res.status(200).render("complete.hbs", {
        errorMsg :`Form Submited Successfully`
       });
       
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("*", (req,res) => {
    res.render("404.hbs",{
        errorMsg :`oops! page not found`
    });
});
//load config
dotenv.config({path : "./config/config.env"});
connectDB();

app.listen(port, () =>{
    console.log(`port live at ${port}`);
});

