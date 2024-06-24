export const customStyles1 = {
  control: (styles) => ({
    ...styles,
    borderRadius: "5px",
    // color: "#ded5d5",
    cursor: "pointer",
    color: "#57606f",
    fontFamily: "roboto",
    padding: "0.5rem",
    fontSize: "1rem",
    textAlign: "left",
    // fontWeight: "medium",
    backgroundColor: "white",
  }),
  option: (styles) => {
    return {
      ...styles,
      fontSize: "1rem",
      margin: "0",
      textAlign: "left",
      padding: "0.3rem",
      fontFamily: "roboto",
      //   fontWeight: "bold",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#ffffff",
      border: "2px solid #000000",
      borderRadius: "5px",
      height: "15rem",
      overflow: "hidden",
    };
  },
  menuList: (base) => ({
    ...base,
    heigth: "15rem",
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#57606f",
      fontFamily: "sans-serif",
      fontWeight: "bold",
      padding: "0.5rem",
      fontSize: "0.9rem",
    };
  },
};
