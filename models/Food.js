const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restoSchema = new Schema({
  name: { type: String },
  description: { type: String },
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

restoSchema.virtual("Active").get(function(){
  return this.status === "Active";
})

restoSchema.virtual("InActive").get(function(){
  return this.status === "In-active";
})

restoSchema.index({ location: "2dsphere" });

const Food = mongoose.model("Restaurant", restoSchema);

module.exports = Food;