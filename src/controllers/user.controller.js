import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponce} from "../utils/ApiResponce.js"

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user is already exists: Username and email
  //check for images and avatar
  //upload them into cloudinary, avatar
  //create user object - create entry in db
  //remove password and refrede token field from response
  //check user creation
  //return res
  const { username, email, fullName, password } = req.body;
  console.log("email: ", email);

  // if (fullName === "") {
  //   throw new ApiError(404, "Fullname is required");
  // }

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists!!");
  }

  const avatarLocalaPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalaPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalaPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", //Because we did not check any conditions fro cover image so if it is exists the cloudinary will give a url otherwise it is empty
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500,"Something went wrong while registering the user")
  }

  return res.status(201).json(
    {
      new ApiResponce(200,createdUser,"User registered successfully")
    }
  )

});

export { registerUser };
