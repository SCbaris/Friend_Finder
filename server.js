var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 4000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var userList=require("./data/friends.js"); // takes data from friends.js (data storage) and puting userList. 
var htmlRoutes = require("./routing/htmlRoutes.js"); // Html initialing function taking with this. 
                                                 // this part takes app(express function, module) and path(url extention)
                                                 // and change html pages.
var apiRoutes = require("./routing/apiRoutes.js"); // This part takes app(express extention) and gives userlist. 
                                               // Userlist descibe on friend.js. apiRoutes use friend.js.



/*var arrayDifs=[]
function difAllObj(difArr){
    for(let i=0 ; i<userList.length ; i++){
        for(let x=0; x<userList.length ; x++){
            if(i!=x){
                //console.log("i " + i + " x " + x);//Works!!
                var eq=0;
                for(let y=0; y<10 ; y++){
                    eq= eq + Math.abs(userList[i].scores[y]-userList[x].scores[y])
                }
                difArr.push(
                    { 
                        firstObj: userList[x].name,
                        seconsObj: userList[i].name,
                        dif: eq
                    }
                );
            }             
        }  
    }
}
//difAllObj(arrayDifs);
//console.log(arrayDifs);*/ // This fuction for test purpose.
                            // this function compare 2 array member's scores and takes every members difs.
                            // and sum total dif. after these adding another object with object names (first and second)

function myArrayMin(arr) {
    var len = arr.length
    var min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
} // This fuction scan array that we put in.
  // and give us min member of this array.


function nearestUser(newUser){
    var eq=0;
    var finals=[];
    for(let x=0; x<userList.length ; x++){
        if(newUser!=userList[x]){
            //console.log("i " + i + " x " + x);//Works!!
            for(let y=0; y<10 ; y++){
                eq= eq + Math.abs(newUser.scores[y]-userList[x].scores[y])
                  
            }finals.push(eq);
            eq=0;
        }                 
    }
    //console.log("finals " + finals); // Works!
    //console.log(myArrayMin(finals)); // Works!
    for(let x=0; x<userList.length ; x++){
        if(newUser!=userList[x]){
            //console.log("i " + i + " x " + x);// Works!
            for(let y=0; y<10 ; y++){
                eq= eq + Math.abs(newUser.scores[y]-userList[x].scores[y])
            }
            if(myArrayMin(finals)==eq){ return x };             
            eq=0;
        }                     
    } 
} //This function taking an specified object (special for this code)
  //compare all scores with other object elements scores. 
  //give us nearest object element's array number.

htmlRoutes(app,path);
apiRoutes(app);


app.post("/api/surveydone", function(req, res) {

    var user = req.body;
    console.log(req.body);
    
    userList.push(user);
    var c = nearestUser(user);
    res.json(userList[c]);

  });


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });