const mongoose = require('mongoose');
const creekSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    img: [{ type: String }],
    province: { type: String, require: true },
    type: { type: String, require: true },
    description: { type: String, require: true },
    // comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const Creek = mongoose.model('Creeks', creekSchema);

module.exports = Creek;
