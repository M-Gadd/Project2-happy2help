const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String, 
  email: {type: String, required: true, unique: true},
  role:  {
    type: String, 
    enum: ["Admin", "User"],
    default: ["User"]
  },
  status: {
    type: String,
    enum: ["Active", "In-active"], 
    default: ["In-active"]
  },
  nationality: {type: String},
  prefered_Language: {
    type: String,
    default: ["EN"]
  },
  prefered_country: {
    type: String,
    // Schema.Types.ObjectId
    ref: "Country",
    // required: true
  },
  // pictureUrl: { type: String, default: ""} //>>>>>>>>>>>
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.virtual("isAdmin").get(function(){
  return this.role === "Admin";
})

userSchema.virtual("isntAdmin").get(function(){
  return this.role !== "Admin";
})

const User = mongoose.model('User', userSchema);
module.exports = User;
