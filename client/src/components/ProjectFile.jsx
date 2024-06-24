import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ProjectFile({ projectData, projectType }) {
  const navigate = useNavigate();
  const username = useParams().username;
  const handleClick = (e) => {
    e.preventDefault();
    console.log(username);
    navigate(`/home/${username}/${projectType}/${projectData.projectName}`);

    window.location.reload();
    // navigate(`/home/${username}/${projectType}/${projectData.projectName}`);
  };
  return (
    <>
      <div className="project-file" onClick={handleClick}>
        <p className="project-name">
          {projectData ? projectData.projectName : "this is check"}
        </p>
      </div>
    </>
  );
}
