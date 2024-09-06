import { User } from "../models/user.model.js";

const generateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();

        await user.save({validateBeforeSave : false});
        return {accessToken};
    } catch (error) {
        return error
    }
}

const registerUser = async (req,res) => {

    try {
        const { userName, email, password } = req.body;
    
        if([userName, email, password].some(field => field?.trim() === "")){
            return res.status(400).json({
                status: "Failure",
                message : "All fields are required"
            })
        }
    
        const existedUser = await User.findOne({
            $or: [{ userName }, { email }]
        })
        if(existedUser){
            return res.status(409).json({
                status: "Failure",
                message : "User with userName or email already exists"
            })
        }
    
        const user = await User.create({
            userName,
            email,
            password
        });
        const createdUser = await User.findById(user?._id).select(
            "-password"
        )
        return res.status(201).json({   
                status : 200,
                data : createdUser,
                message: "User registered successfully",
            }
        )
    } catch (error) {
        res.status(500).json({
            status : "failure",
            message : "Something went wrong while registering the user !",
            error : error,
        })
    }   
}

const loginUser = async(req, res) => {

    const { userName, email, password } = req.body;

    if(!(userName || email)){
        return res.status(400).json({
            status: "Failure",
            message : "username or email is required!"
        })
    }

    const user = await User.findOne({
        $or : [{userName}, {email}]
    })

    if(!user){
        return res.status(404).json({
            status: "Failure",
            message : "User does not exist"
        });
    }

    const validateUser = await user.isPasswordCorrect(password);

    if(!validateUser){
        return res.status(404).json({
            status: "Failure",
            message : "Invalid password"
        });
    }

    const {accessToken} = await generateAccessToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        user : loggedInUser, 
        token: accessToken,
        message: "User logged In successfully"
    })
}

const logoutUser = async(req,res) => {
    await User.findById(req.user._id);

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .json({
        data : {},
        message: "User logged Out"
    })
}

export  {
    registerUser,
    loginUser,
    logoutUser,
}