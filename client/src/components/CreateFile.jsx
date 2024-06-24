import { customStyles1 } from "../constants/customStyles1";
import { languageOptions } from "../constants/languageOptions";
import "../styles/CreateFile.css";
import Select from "react-select";

export default function CreateFile({
  fileName,
  setFileName,
  setFileType,
  fileType,
  addComponent,
  setLanguage,
  setSubLanguageId,
}) {
  const handleChange = (e) => {
    setFileType(e.extention);
    setLanguage(e.value);
    setSubLanguageId(e.id);
  };
  const checkInput = (e) => {
    e.preventDefault();
    if (fileName.includes(".")) {
      alert("Please enter Filename without extension");
      return;
    }
    if (!fileType) {
      alert("Select a language");
      return;
    }
    addComponent(fileName, fileType);
    // console.log(fileName + "  " + fileType);
  };
  return (
    <div className="create-file-window">
      <div className="create-file-form">
        <h1>Create File</h1>
        <form>
          <input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />

          <Select
            placeholder={"Select Language"}
            options={languageOptions}
            unstyled={true}
            styles={customStyles1}
            onChange={handleChange}
          />
          {/*<button <button onClick={joinRoom}>Join</button> */}
          <button onClick={checkInput}>Create Project</button>
        </form>
      </div>
    </div>
  );
}
