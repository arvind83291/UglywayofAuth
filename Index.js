const express = require("express");
const app = express();
const port = 3001;

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

app.listen(port);