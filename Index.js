const express = require("express");
const app = express();

const zod = require("zod"); 


const port = 3001;
app.use(express.json());//this is for reading the inputs from body while send the request

//This is exampe of Query parametre and ugly way of doing Authentication and input validations
app.get("/health-checkup",function (req, res){
     const kidneyId = req.query.kidneyId;
     const username= req.headers.username;
     const password= req.headers.pass;    

    if(username !="Arvind" && password !="pass"){
        res.status(400).json({"msg":"Somethings up with your UserName or Password"});
        return
    }  

    if(kidneyId != 1 && kidneyId != 2){
        // Do something with with the logic
        res.status(400).json({"msg":"Somethings up with your KidneyId"});
        return  
    }
    res.json({
        "msg": "Your Kidney is fine"
    });
});

// this is the Example of taking the input using the body
//always use app.use(express.json()) to read the input within the body
app.post("/kidneylength",function(req,res){
    const kidneys = req.body.kidneys;
    const kidneyLength=kidneys.length;
    res.send("you have "+ kidneyLength+ " Kidneys")
})

// this is the example of Exception handling midddle ware 
app.use(function(err,req,res,next){
    res.json({
        msg:"Sorry something is Wrong"
    })
})

// this is the example of zod where we are 
app.listen(port);