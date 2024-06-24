const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  language: { type: String, required: true },
  roomId: { type: String, required: true },
  languageId: { type: String, required: true },
  code: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  PersonalProjects: [
    {
      projectName: { type: String, required: true },
      projects: [projectSchema],
    },
  ],
  SharedProjects: [
    {
      projectName: { type: String, required: true },
      projects: [projectSchema],
    },
  ],
});

const UserModel = model("User", userSchema);
module.exports = UserModel;
