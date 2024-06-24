import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProjectLeftSideBar from "../components/ProjectLeftSideBar";
import ProjectFile from "../components/ProjectFile";
import { useNavigate } from "react-router-dom";
import "../styles/Projects.css";
export default function Projects() {
  const userName = useParams().username;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   const handleBackButton = (event) => {
  //     event.preventDefault();
  //     console.log("backButton is clicked");
  //     // Redirect to a specific route
  //     navigate("/home/${userName.username}");
  //   };

  //   window.addEventListener("popstate", handleBackButton);

  //   return () => {
  //     window.removeEventListener("popstate", handleBackButton);
  //   };
  // }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getProjects", {
        params: { username: userName },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* {console.log(data.PersonalProjects)} */}
      <div className="project-container">
        <ProjectLeftSideBar />
        <div className="projects">
          <div className="personal-projects">
            <h1>PERSONAL PROJECTS</h1>
            <div className="personal-project-items">
              {data.PersonalProjects &&
                data.PersonalProjects.map((projectData, index) => {
                  return (
                    <ProjectFile
                      key={index}
                      projectData={projectData}
                      projectType="PersonalProjects"
                    />
                  );
                })}
            </div>
          </div>
          <div className="personal-projects">
            <h1>SHARED PROJECTS</h1>
            <div className="personal-project-items">
              {data.SharedProjects &&
                data.SharedProjects.map((projectData, index) => {
                  return (
                    <ProjectFile
                      key={index}
                      projectData={projectData}
                      projectType="SharedProjects"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import ProjectLeftSideBar from "../components/ProjectLeftSideBar";
// import ProjectFile from "../components/ProjectFile";

// import "../styles/Projects.css";

// export default function Projects() {
//   const userName = useParams().username;
//   const [data, setData] = useState({});

//   useEffect(() => {
//     refreshPage(); // Call the refreshPage function when the component mounts
//   }, []);

//   const refreshPage = () => {
//     // Refresh the page
//     window.location.reload();
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/getProjects", {
//         params: { username: userName },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setData(response.data);
//       })
//       .catch((err) => console.log(err));
//   }, [userName]); // Add userName as a dependency to useEffect

//   return (
//     <>
//       <div className="project-container">
//         <ProjectLeftSideBar />
//         <div className="projects">
//           <div className="personal-projects">
//             <h1>PERSONAL PROJECTS</h1>
//             <div className="personal-project-items">
//               {data.PersonalProjects &&
//                 data.PersonalProjects.map((projectData, index) => {
//                   return (
//                     <ProjectFile
//                       key={index}
//                       projectData={projectData}
//                       projectType="PersonalProjects"
//                     />
//                   );
//                 })}
//             </div>
//           </div>
//           <div className="personal-projects">
//             <h1>SHARED PROJECTS</h1>
//             <div className="personal-project-items">
//               {data.SharedProjects &&
//                 data.SharedProjects.map((projectData, index) => {
//                   return (
//                     <ProjectFile
//                       key={index}
//                       projectData={projectData}
//                       projectType="SharedProjects"
//                     />
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
