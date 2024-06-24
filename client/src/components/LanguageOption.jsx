import { useState, useEffect } from "react";
export default function LanguageOptions({
  isSelected,
  onSelect,
  code,
  setCode,
  name,
  type,
}) {
  const [subCode, setsubCode] = useState("");
  useEffect(() => {
    // setCode("");
    if (isSelected) {
      setCode(subCode);
    }
  }, [isSelected]);
  useEffect(() => {
    if (isSelected) {
      setsubCode(code);
    }
  }, [code]);
  return (
    <>
      <p
        className={isSelected ? "selected-language" : ""}
        onClick={() => {
          onSelect();
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/${type}.png`}
          className="language-icon"
        />
        {name + "." + type}
      </p>
    </>
  );
}
