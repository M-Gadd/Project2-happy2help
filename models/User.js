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
    enum: ["Active", "Off"], 
    default: ["Off"]
  },
  nationality: {type: String},
  prefered_Language: {
    type: String,
    enum:["FR","PL","HU","NE","DE","SW","DK","NR","AR","EN","IT","SP","GR"],
    default: ["EN"]
  },
  // prefered_country: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Country",
  //   // required: true
  // },
  // pictureUrl: { type: String, default: ""} //>>>>>>>>>>>
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
