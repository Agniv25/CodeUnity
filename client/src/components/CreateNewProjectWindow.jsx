import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateNewProjectWindow({
  username,
  // setDropDownOpen,
  setCreateNewProject,
}) {
  const [projectName, setProjectName] = useState("");
  const navigate = useNavigate();
  const createProject = (e) => {
    e.preventDefault();
    // setDropDownOpen(false);
    setCreateNewProject(false);
    navigate(`/home/${username}/PersonalProjects/${projectName}`);
    // navigate(`/home`)
    window.location.reload();
  };
  return (
    <>
      <div className="inactive-window">
        <div className="join-room-form join-room-form-1">
          <h1>Create New Project</h1>
          <form>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              required
            />
            <button onClick={createProject}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
