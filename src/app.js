const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./db/conn");
const UserModel = require("./models/user");
const ApplyModel = require("./models/apply")
const path = require("path");
const hbs = require("hbs");
const multer = require("multer");

const port = process.env.PORT || 8000

//setting path
const staticpath = path.join(__dirname, "../public");
const templates = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.use('../uploads', express.static('uploads'));
app.set("veiw engine", "hbs");
app.set("views", templates);
hbs.registerPartials(partials);


// app.get("/" , (req,res) => {
//     res.send("index");
// });

app.get("/", (req, res) => {
    res.render("index.hbs");
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     
  
      const filePath = path.join(__dirname, "../uploads");
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + file.originalname);
    },
  });
  
  
  
  const upload = multer({
    storage: storage,
    //    dest:"./uploads",
  });

app.post('/upload', upload.single("resume"), async(req, res) => {
    try {

        // res.status(200).send(req.body);
        const ApplyData = new ApplyModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            profile: req.body.profile,
            applyFor: req.body.applyFor,
            experienceYear: req.body.experienceYear,
            experienceMonth: req.body.experienceMonth,
            education: req.body.education,
            resume: req.file.path,
            detail: req.body.detail
        });
       await ApplyData.save();
       res.render("thanks.hbs")
        // res.status(200).get("/", {
        //     errorMsg: `Form Submited Successfully`
        // });

    } catch (error) {
        res.status(500).send(error);
    }
});



app.post("/contactUs", async (req, res) => {
    
    try {

        
        const UserData = new UserModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
           
            message: req.body.message
        });
        await UserData.save();
        res.render("thanks.hbs")
        //  res.status(200)//get("/",{
        //     errorMsg: `Form Submited Successfully`
        // });

    } catch (error) {
        res.status(500).send(error);
    }
});


app.get("*", (req, res) => {
    res.render("404.hbs", {
        errorMsg: `oops! page not found`
    });
});
//load config
dotenv.config({ path: "./config/config.env" });
connectDB();

app.listen(port, () => {
    console.log(`port live at ${port}`);
});

