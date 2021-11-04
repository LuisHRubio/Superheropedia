const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express("app");

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set("view engine","ejs");

app.use(express.static("public"));
app.use("/js",express.static(__dirname + "public/js"));
app.use("/css",express.static(__dirname + "public/css"));
app.use("/fonts",express.static(__dirname + "public/fonts"));
app.use("/images",express.static(__dirname + "public/images"));

app.post("/search",urlencodedParser,function (req,res){
   console.log(req.body);
   axios.get("https://www.superheroapi.com/api.php/4516680161725331/search/"+req.body.nombre)
       .then(function (response){
           var datos = response.data.results[0];
           console.log(datos);
           res.render("hero",{datos:datos});
    })
       .catch(function (error){
           res.render("index");
    })

});

app.post("/id",urlencodedParser,function (req,res){
    console.log(req.body);
    var idCorr = req.body.id;
    if (parseInt(idCorr)<1){
        idCorr="732";
    }
    if (parseInt(idCorr)>732){
        idCorr="1";
    }
    axios.get("https://www.superheroapi.com/api.php/4516680161725331/"+idCorr)
        .then(function (response){
            var datos = response.data;
            console.log(datos);
            res.render("hero",{datos:datos});
        })
        .catch(function (error){
            res.render("index");
        });

});


app.get("/",async (req,res)=>{
    res.render("index");

});

app.listen(3000);