// importing mongoose
const mongoose = require("mongoose");

// importing bcrypt from bcryptjs to hash passwords
const bcrypt = require("bcryptjs");

// importing jwt from jsonwebtoke for generating authentication tokens
const jwt = require("jsonwebtoken");

const Document = require("./bike-document-model");

// schema for user model

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      lowercase: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      // unique: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    verified: {
      type: Boolean,
      default: true,
    },
    verificationToken: {
      type: String,
      expire: 600,
      default: "",
    },
    booking_history: [
      {
        bookingId: {
          type: mongoose.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("user-documents", {
  ref: "UserDocument",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "userId",
});

// defining custom function on objects of user-schema for generating authentication tokens
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// defining custom function on user-schema for checking user credentials
userSchema.statics.findByCredentials = async ({
  email,
  password,
  mobileNumber,
}) => {
  // console.log(password, email, mobileNumber)
  var user = email
    ? await User.findOne({ email })
    : await User.findOne({ mobileNumber });
  if (!user) {
    throw "User not found";
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw "Wrong credentials";
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.verificationToken;
  delete user.verified;

  return user;
};

// do not use arrow function after 'save'
userSchema.pre("save", async function (next) {
  const user = this;

  // password will be modified when the user is created and when the user updates their password
  if (user.isModified("password")) {
    // console.log('password modified so re-hashing')
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// middleware for deleting tasks when a user is deleted
userSchema.pre("remove", async function (next) {
  // const user = this
  await Document.deleteMany({ owner: this._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
