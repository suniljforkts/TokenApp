const express=require('express')
const cors=require('cors')
const bp=require('body-parser')
const jwt=require('jsonwebtoken')
const cp=require('cookie-parser')
const usersCollection=require('./DbCon')
const SECRET_KEY="jKr2@19eF32&"

const PORT=9000

const App=new express()
var token;
App.use(cors({origin:"*"}))
App.use(bp.json())
App.use(cp())


App.post("/api/register", async (req,resp)=>{

  const user=req.body  // Username, pwd and emailid
  var result;
  try{

    const result=await usersCollection.insertOne(user)
    
    console.log(`User inserted with _id: ${result.insertedId}`);
    const expiryTime=1
      token=jwt.sign(user,SECRET_KEY, { expiresIn: `${expiryTime}m` })
        
       // resp.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=None; Max-Age=3600`);
        resp.cookie('authToken', token, {
            httpOnly: true,   // For security, prevents JS from accessing the cookie
            secure: false,  // Ensures cookies are only sent over HTTPS in production
            sameSite:'lax',
            maxAge: 60  // Cookie expiry (60 seconds in this example)
          });
          const response="Register Succesful.."
          // Respond to the client
          //resp.json({token,message:response})
     
      // Respond to the client
      resp.json({token,message:"Welcome User"});
    
  }
  catch(err){
    console.log(err)
  }
  
  //user={username:"Ajay",passwod:"abc",email:"ajay@gmail.com"}
  /*const expiryTime=3
  token=jwt.sign(user,SECRET_KEY, { expiresIn: `${expiryTime}m` })
    
   // resp.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=None; Max-Age=3600`);
    resp.cookie('authToken', token, {
        httpOnly: true,   // For security, prevents JS from accessing the cookie
        secure: false,  // Ensures cookies are only sent over HTTPS in production
        sameSite:'lax',
        maxAge: 180   // Cookie expiry (60 seconds in this example)
      });
      const response="Inserted Data"
      // Respond to the client
      resp.json({token,response});*/

    //  resp.json({message:"User Registered.."})
})

App.post("/api/authenticate_user",async(req,resp)=>{
    const user=req.body
    //user={login:"Ajay",password:"abc"}
    try{
    const users=await usersCollection.find({username:user.login}).toArray()
    console.log(users)
    if(user.login===users[0].username && user.password===users[0].password){
    
     /* const expiryTime=1
      token=jwt.sign(user,SECRET_KEY, { expiresIn: `${expiryTime}m` })
        
       // resp.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=None; Max-Age=3600`);
        resp.cookie('authToken', token, {
            httpOnly: true,   // For security, prevents JS from accessing the cookie
            secure: false,  // Ensures cookies are only sent over HTTPS in production
            sameSite:'lax',
            maxAge: 60  // Cookie expiry (60 seconds in this example)
          });
          */
          const response="Login Succesful.."
          // Respond to the client
          //resp.json({token,message:response})
     
      // Respond to the client
      resp.json({message:"Welcome User"});
    }
    
    else
       resp.send({message: 'Invalid credentials' });
      }catch(err){
        console.log(err)
      
      }
    
})

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    // Extract token from Authorization header (in the format 'Bearer <token>')
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.sendStatus(401);  // If no token, return Unauthorized
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);  // If token invalid/expired, return Forbidden
      }

      
      // Attach the user to the request (user object is what was signed in the token)
      req.user = user;
      next();  // Proceed to the next middleware/route handler
    });
  };

const employees=[{eid:100,ename:'Ajay1',email:'ajayk@gmail.com'},{eid:101,ename:'Shweta',email:'swta@gmail.com'}]

App.get("/api/getInfo",authenticateToken,(req,resp)=>{
    resp.send(employees)
})

App.listen(PORT,err=>{
    if(err) console.log(err)
        else console.log("Server started at PORT "+PORT)
})