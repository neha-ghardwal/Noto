require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

//connecting to mongodb
const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require('express');
const cors = require('cors');

const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require("./utilities");

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",             // for local dev
  "https://notonote.vercel.app"       // your live frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.get("/", (req, res) => {
    res.json({data:"Hello World"});
});



    //   {/* Authentication & user */}
//create account
app.post("/create-account",async (req, res) => {
    const {fullName, email, password} = req.body;

    if(!fullName){
        return res
            .status(400)
            .json({error:true, message:"Full name is required"});
    }
    if(!email){
        return res
            .status(400)
            .json({error:true, message:"Email is required"});
    }
    if(!password){
        return res
            .status(400)
            .json({error:true, message:"Password is required"});
    }

    const isUser = await User.findOne({email:email});

    if(isUser){
        return res.json({
            error:true,
            message:"User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();
    const accessToken = jwt.sign({user
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m',
    });

    return res.json({
        error:false,
        user,
        accessToken,
        message:"User created successfully",
    });

});

//login user
app.post("/login", async (req,res)=>{
    const {email,password}  = req.body;
{/* Checking validation */}
    if(!email){
        return res
            .status(400)
            .json({error:true, message:"Email is required"});
    }
    if(!password){
        return res
            .status(400)
            .json({error:true, message:"Password is required"});
    }
//checks if user exists
    const userInfo = await User.findOne({email:email});

    if(!userInfo){
        return res.json({
            error:true,
            message:"User does not exist",
        });
    }

    if(userInfo.email ==email && userInfo.password ==password){
        const user = {user:userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m',
        });

        return res.json({
            error:false,
            user:userInfo,
            accessToken,
            message:"Login successfully",
        });
        console.log(response.data);

    }
    else{
        return res.status(400).json({
            error:true,
            message:"Invalid credentials",
        });
    }


})

//get user
app.get("/get-user",authenticateToken, async (req, res) => {
    const {user} = req.user;

    const isUser = await User.findOne({_id:user._id});

    if(!isUser){
        return res.sendStatus(401);
    }
    return res.json({
        user:{fullName:isUser.fullName, email:isUser.email,"_id":isUser._id,createdOn:isUser.createdOn},
        message:"User fetched",
    });
});

        // {/* Notes work below*/}

//Add note
app.post("/add-note", authenticateToken, async (req, res) => {
    const {title,content, tags} = req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({
            error:true,
            message:"Title is required",
        });
    }
    if(!content){
        return res.status(400).json({
            error:true,
            message:"Content is required",
        });
    }
    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        });
    }

});

//edit note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {title, content, tags,isPinned} = req.body;

    const {user} = req.user;

    if(!title && !content && !tags){
        return res
            .status(400)
            .json({error:true, message:"No changes made"});
    }

    try{
        const note = await Note.findOne({_id:noteId, userId:user._id});

        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found",
            });
        }
        if(title){
            note.title = title;
        }
        if(content){
            note.content = content;
        }
        if(tags){
            note.tags = tags;
        }
        if(isPinned){
            note.isPinned = isPinned;
        }

        await note.save();
    //sab check hone ke baad response bhejna hai
        return res.json({
            error:false,
            note,
            message:"Note updated successfully",
        });
    } catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        })
    }
});

//get all notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;

    try{
        const notes = await Note.find({userId:user._id
        }).sort({isPinned: -1
        });

        return res.json({
            error:false,
            notes,
            message:"Notes fetched successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        });
    }
});

//delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {user} = req.user;

    try{
        const note = await Note.findOne({_id:noteId, userId:user._id});

        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found",
            });
        }

        await Note.deleteOne({_id:noteId, userId:user._id});

        return res.json({
            error:false,
            message:"Note deleted successfully",
        });
    } catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        });
    }
});

//update pinned status
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const {isPinned} = req.body;

    const {user} = req.user;

    try{
        const note = await Note.findOne({_id:noteId, userId:user._id});

        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found",
            });
        }

        note.isPinned = isPinned;
        

        await note.save();
    //sab check hone ke baad response bhejna hai
        return res.json({
            error:false,
            note,
            message:"Note pinned successfully",
        });
    } catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        })
    }
});

//search note
app.get("/search-notes/", authenticateToken, async (req, res) => {
    const {user} = req.user;
    const {query} = req.query;

    if(!query){
        return res  
            .status(400)
            .json({error:true, message:"Search query is required"});
    }

    try{
        const matchingNotes = await Note.find({
            userId:user._id,
            $or:[
                {title: { $regex:new RegExp(query,"i")}},
                {content: { $regex:new RegExp(query,"i")}},
            ],
        });
        return res.json({
            error:false,
            notes:matchingNotes,
            message:"Notes fetched successfully",
        });
    } catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal server error",
        });
    }
});
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server on port ${PORT}`));
module.exports = app;