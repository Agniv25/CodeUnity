import { customStyles } from "../constants/customStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import CreateNewProjectWindow from "./CreateNewProjectWindow";
import axios from "axios";
import {
  faBars,
  faEarthAmericas,
  faHome,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { useState } from "react";
export default function Header({
  setLanguageId,
  compile,
  setLanguage,
  handleThemeChange,
  theme,
  isProcessing,
  childComponents,
  userName,
  projectName,
  idValue,
}) {
  const themeValue = {
    value: "VS-Dark",
    name: "VS-Dark",
    label: "VS-Dark",
  };
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [createNewProject, setCreateNewProject] = useState(false);

  const handleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };
  const handleCreateNewProject = () => {
    setCreateNewProject((prev) => !prev);
  };
  const HeadBack = () => {
    console.log("clicked");
    window.location.reload();
  };
  const SaveDocument = () => {
    console.log(childComponents);
    axios
      .post("http://localhost:3001/saveDocument", {
        userName,
        childComponents,
        idValue,
        projectName,
      })
      .then((request) => alert("changes Saved"))
      .catch((error) => alert("Unable to save"));
  };
  return (
    <div className="header">
      {createNewProject && (
        <CreateNewProjectWindow
          username={userName}
          setDropDownOpen={setDropDownOpen}
          setCreateNewProject={setCreateNewProject}
        />
      )}
      {dropDownOpen && (
        <div className="dropdown-content">
          <a onClick={HeadBack}>
            <FontAwesomeIcon className="dropdown-icon" icon={faHome} />
            Home
          </a>
          <a onClick={handleCreateNewProject}>
            <FontAwesomeIcon className="dropdown-icon" icon={faFolder} />
            New Project
          </a>

          <a href="#">
            <FontAwesomeIcon
              className="dropdown-icon"
              icon={faArrowRightFromBracket}
            />
            Logout
          </a>
        </div>
      )}
      <h1>
        <FontAwesomeIcon
          className="faBar"
          icon={faBars}
          onClick={handleDropDown}
        />
        <span>Code</span>Unity
      </h1>

      <Select
        className="language-dropdown"
        placeholder={`Select Theme`}
        unstyled={true}
        defaultValue={theme || themeValue}
        options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
          label: themeName,
          value: themeId,
          key: themeId,
        }))}
        styles={customStyles}
        onChange={handleThemeChange}
      />
      <button onClick={SaveDocument}>Save</button>
    </div>
  );
}
