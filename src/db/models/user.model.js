import mongoose, { set } from "mongoose";
import { GenderEnum, ProviderEnum, encryptData, decryptData} from "../../common/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minLength: [2, "firstName can't be less than 2 characters"],
      maxLength: [25, "firstName can't be more than 25 characters"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "lastName is required"],
      minLength: [2, "lastName can't be less than 2 characters"],
      maxLength: [25, "lastName can't be more than 25 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    phone: {
      type: String,
      set: function (value) {
        if (!value) return value;
        return encryptData(value);
      },
      get: function (value) {
        return decryptData(value);
      },
    },

    gender: {
      type: String,
      emun: [GenderEnum.male, GenderEnum.female],
      default: GenderEnum.male,
    },

    profilePicture: String,

    coverProfilePictures: [String],

    provider: {
      type: Number,
      emun: [ProviderEnum.google, ProviderEnum.system],
      default: ProviderEnum.system,
    },
    confirmEmail: Date,
    chageCredentialTime: Date,
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    optimisticConcurrency: true,
    autoIndex: true,
    toJSON: {
      virtuals: true,
      getters: true,

    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  },
);

// Virtual for userName
userSchema
  .virtual("userName")
  .set(function (value) {
    const [firstName, lastName] = value?.split(" ") || [];
    this.set({ firstName, lastName });
  })
  .get(function () {
    return this.firstName + " " + this.lastName;
  });


export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
