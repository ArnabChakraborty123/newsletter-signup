const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static(__dirname + "/public/"));
// providing the path of our static files,then we should be refer to these static files by relative URL   , and that is relative to public folder.
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const emailId= req.body.email;

    console.log(firstName, lastName, emailId); 

const data = {
    members: [
        {
            email_address: emailId,
            status: "subscribed",
            "merge_fields": {
                "FNAME": firstName ,
                "LNAME": lastName
        
        }
    }
    ]
};

const jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/3412696327" ;

const options={
    method: "POST",
    auth: "arnab1:c1cc582002591be669a72298f14a8396-us18"
}

  const request = https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");
    } else{
        res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    });
    });
    request.write(jsonData);
    request.end();
}) ;

app.post("/failure",function(req,res){
    res.redirect("/")
});

 
app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
//const url = "https://us18.api.mailchimp.com/3.0/lists/3412696327/members" ;
 
// .