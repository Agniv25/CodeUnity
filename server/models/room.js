const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the message schema
const MessageSchema = new Schema({
  timestamp: {
    type: String, // Assuming timestamp is an ObjectId
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const childComponentsSchema = new Schema({
  id: { type: String, required: true },
  language: { type: String, required: true },
  languageId: { type: Number, required: true },
  name: { type: String, required: true },
  roomId: { type: String, required: true },
  type: { type: String, required: true },
  code: { type: String },
});

// Define the room schema
const RoomSchema = new Schema({
  roomId: {
    type: String, // Assuming roomId is an ObjectId
    required: true,
    unique: true,
  },
  users: [
    {
      type: String,
    },
  ],
  messages: [MessageSchema], // Embed MessageSchema within the messages array
  childComponents: [childComponentsSchema],
  webSelected: { type: String },
  // Other room-related fields
});

const RoomModel = mongoose.model("Room", RoomSchema);

module.exports = RoomModel;
