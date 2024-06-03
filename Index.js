const express = require("express");
const app = express();

const zod = require("zod"); 
const schema = zod.array(zod.number())// here we are describing the structure of schema


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
    // const kidneyLength=kidneys.length; //after uncommenting this line zod will not work because the undefined err of kidneylength
    const response = schema.safeParse(kidneys);
    res.send(response);
})

// this is the example of Exception handling midddle ware always write in the end and only once needed
// app.use(function(err,req,res,next){
//     res.json({
//         msg:"Sorry something is Wrong"
//     })
// })


app.listen(port);

//some zod practice
// function validateinput(obj){
//     const schema = zod.object({
//         email : zod.string().email(),
//         password : zod.string().min(6).max(12)
//     })
//     const response = schema.safeParse(obj);
//     console.log(response);
// }
// validateinput({
//     email:"Arvind@gmail.com",
//     password:"123"
// })