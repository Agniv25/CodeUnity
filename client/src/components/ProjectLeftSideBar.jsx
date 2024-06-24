import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  faBars,
  faEarthAmericas,
  faHome,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import CreateNewProjectWindow from "../components/CreateNewProjectWindow";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectLeftSideBar() {
  const [createNewProject, setCreateNewProject] = useState(false);
  const userName = useParams().username;
  const navigate = useNavigate();
  const handleCreateNewProject = () => {
    setCreateNewProject((prev) => !prev);
  };
  const refresh = () => {
    window.location.reload();
  };
  const backToHomePage = () => {
    navigate("/login");
  };
  return (
    <>
      {createNewProject && (
        <CreateNewProjectWindow
          username={userName}
          // setDropDownOpen={setDropDownOpen ? setDropDownOpen : false}
          setCreateNewProject={setCreateNewProject}
        />
      )}
      <div className="project-left-side-bar">
        <div className="header-1">
          <h1>
            <span>Code</span>Unity
          </h1>
        </div>
        <div className="project-links">
          <a onClick={refresh}>
            <FontAwesomeIcon className="dropdown-icon" icon={faHome} />
            Home
          </a>
          <a onClick={handleCreateNewProject}>
            <FontAwesomeIcon className="dropdown-icon" icon={faFolder} />
            New Project
          </a>

          <a onClick={backToHomePage}>
            <FontAwesomeIcon
              className="dropdown-icon"
              icon={faArrowRightFromBracket}
            />
            Logout
          </a>
        </div>
      </div>
    </>
  );
}
