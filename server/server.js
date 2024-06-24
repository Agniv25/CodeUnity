const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const User = require("./models/user.js");
const Room = require("./models/room.js");
const db = require("./db.js");
db();

const memberArray = [];

app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.post("/signup", async (req, res) => {
//   // console.log(req.body.username);
//   const { username, password, email } = req.body;
//   try {
//     const userDoc = await User.create({ username, password, email });
//     res.send(userDoc);
//   } catch (err) {
//     res.send(err);
//   }
// });
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(500).send("Username Already Exists");
    return;
  }
  try {
    const userDoc = await User.create({ username, password, email });
    res.send(userDoc);
  } catch (err) {
    res.send(err);
  }
});
app.get("/login", async (req, res) => {
  const { username, password } = req.query;
  const userDoc = await User.findOne({
    username: username,
    password: password,
  });
  if (!userDoc) {
    res.status(500).send("Username Not Found");
    return;
  }
  res.status(200).send("signin");
});
app.post("/joinroom", async (req, res) => {
  try {
    const { roomId, users } = req.body;
    const existingRoom = await Room.findOne({ roomId: roomId });
    if (existingRoom) {
      const updatedRoom = await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        { $addToSet: { users: users } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "user added to room", room: updatedRoom });
    } else {
      // console.log({ ujsers });
      const newRoom = new Room({
        roomId: roomId,
        users: users, // Add the provided users to the new room
      });
      const savedRoom = await newRoom.save();
      res
        .status(200)
        .json({ message: "New room created with users", room: savedRoom });
    }
  } catch (error) {
    console.error("Error joining room:", error);
    res.status(500).json({ error: "Error joining room" });
  }
});

app.post("/sendmessage", async (req, res) => {
  try {
    const { username, message, roomId, timeStamp } = req.body;
    // const timestamp=new Date();

    const newMessage = {
      timestamp: timeStamp,
      sender: username,
      content: message,
    };
    const updateMessage = await Room.findOneAndUpdate(
      { roomId: roomId },
      {
        $push: { messages: newMessage },
      },
      { new: true }
    );
    res.status(200).json({ updateMessage });
  } catch {
    res.status(500).json({ error: "Error sending message" });
  }
});

app.get("/getchats", async (req, res) => {
  try {
    const { roomId } = req.query;
    const getChats = await Room.findOne({ roomId });
    console.log(getChats);
    res.send(getChats);
  } catch {
    res.status(500).json({ error: "Unable to retrieve chats" });
  }
});
app.post("/addChildComponents1", async (req, res) => {
  try {
    const { childComponents, idValue } = req.body;
    const room = await Room.findOneAndUpdate(
      { roomId: idValue },
      { childComponents: childComponents },
      { new: true }
    );
    res.send(room);
  } catch (err) {
    res.send(err);
  }
});
app.post("/addChildComponents", async (req, res) => {
  try {
    const { obj, idValue } = req.body;
    // console.log(req.body);

    // console.log("the room id is");
    // console.log(idValue);
    // const room1 = await Room.findOne({ roomId: idValue });
    // console.log("the child components are ");
    // console.log(room1);
    console.log("the child components are");
    console.log(obj);
    const room = await Room.findOneAndUpdate(
      { roomId: idValue },
      { $push: { childComponents: obj } },
      { new: true }
    );
    // console.log(room);
    res.status(200).json({ room });
  } catch (err) {
    res.send(err);
  }
});
app.get("/getChildComponents", async (req, res) => {
  try {
    const roomId = req.query.roomId;
    const room = await Room.findOne({ roomId: roomId });
    if (room) {
      // console.log("the child components are ");
      // console.log(room.childComponents);
      res.send(room.childComponents);
    } else {
      res.send("first");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/getProjects", async (req, res) => {
  try {
    const username = req.query.username;
    const project = await User.findOne({ username: username });
    res.status(200).send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

// app.post("/saveDocument", async (req, res) => {
//   try {
//     const { userName, childComponents, idValue, projectName } = req.body;

//     let updateField;

//     // Determine which field to update based on idValue
//     if (idValue.length > 0) {
//       updateField = {
//         $push: {
//           SharedProjects: {
//             projectName: projectName,
//             projects: childComponents,
//           },
//         },
//       };
//     } else {
//       updateField = {
//         $push: {
//           PersonalProjects: {
//             projectName: projectName,
//             projects: childComponents,
//           },
//         },
//       };
//     }

//     // Find the user by username
//     const user = await User.findOne({ username: userName });

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Update the user document
//     // Example query to find a user by username and project name

//     const updatedUser = await User.findOneAndUpdate(
//       { username: userName },
//       updateField,
//       { new: true }
//     );

//     // Send response
//     res.status(200).send("Document saved successfully");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal server error");
//   }
// });

app.post("/saveDocument", async (req, res) => {
  try {
    const { userName, childComponents, idValue, projectName } = req.body;

    // Find the user by username
    const user = await User.findOne({ username: userName });

    if (!user) {
      return res.status(404).send("User not found");
    }

    let updateField;

    // Determine which field to update based on idValue
    if (idValue.length > 0) {
      // Check if projectName already exists in SharedProjects array
      const existingProjectIndex = user.SharedProjects.findIndex(
        (project) => project.projectName === projectName
      );

      if (existingProjectIndex !== -1) {
        // Replace existing project content
        user.SharedProjects[existingProjectIndex].projects = childComponents;
      } else {
        // Push new project
        user.SharedProjects.push({
          projectName: projectName,
          projects: childComponents,
        });
      }
      updateField = { SharedProjects: user.SharedProjects };
    } else {
      // Check if projectName already exists in PersonalProjects array
      const existingProjectIndex = user.PersonalProjects.findIndex(
        (project) => project.projectName === projectName
      );

      if (existingProjectIndex !== -1) {
        // Replace existing project content
        user.PersonalProjects[existingProjectIndex].projects = childComponents;
      } else {
        // Push new project
        user.PersonalProjects.push({
          projectName: projectName,
          projects: childComponents,
        });
      }
      updateField = { PersonalProjects: user.PersonalProjects };
    }

    // Update the user document
    const updatedUser = await User.findOneAndUpdate(
      { username: userName },
      updateField,
      { new: true }
    );

    // Send response
    res.status(200).send("Document saved successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error);
  }
});

app.get("/getFiles", (req, res) => {
  const { username, projectName, projectType } = req.query; // Using req.query to access URL query parameters
  console.log("the username is " + username);

  // Find the user by username
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let project;
      // Check projectType and search in the appropriate array
      if (projectType === "PersonalProjects") {
        project = user.PersonalProjects.find(
          (proj) => proj.projectName === projectName
        );
      } else if (projectType === "SharedProjects") {
        project = user.SharedProjects.find(
          (proj) => proj.projectName === projectName
        );
      } else {
        return res.status(400).json({ message: "Invalid project type" });
      }

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Assuming files are stored in the project object, adjust this based on your schema
      const files = project.projects;
      console.log(files);

      // Send the files information back to the frontend
      res.json(files);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    });
});

io.on("connection", (socket) => {
  console.log("Socket is connected");

  socket.on("joinroom", ({ userName, idValue: id }) => {
    socket.join(id);
    console.log("Socket is connected with id value ", id);
    socket.on("code", (code) => {
      console.log("the code is", code);
      socket.broadcast.to(id).emit("receive", code);
    });
    socket.on("message", ({ message, userName, timeStamp }) => {
      // console.log("the message is" + message + "by" + userName.username);
      console.log("the message is sent", id);
      const user = userName.username;
      io.to(id).emit("chat", { user, message, timeStamp });
    });
    socket.on("sendFiles", (obj) => {
      // io.to(id).emit("receiveComponents", childComponents);
      console.log("files received");
      console.log(obj);
      socket.broadcast.to(id).emit("receiveFiles", obj);
    });
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
