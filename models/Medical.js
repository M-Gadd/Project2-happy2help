const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicSchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String },  
  location: {
    type: { type: String },
    coordinates: [
      { type: Number }
    ]
  },
  status: {
    type: String,
    enum: ["Active", "In-active"],
    default: ["In-active"]
  }
}, {
  timestamps: true
});

medicSchema.virtual("Active").get(function(){
  return this.status === "Active";
})

medicSchema.virtual("InActive").get(function(){
  return this.status === "In-active";
})

medicSchema.index({ location: "2dsphere" });

const Medical = mongoose.model("Medical", medicSchema);

module.exports = Medical;