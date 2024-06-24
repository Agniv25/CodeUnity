export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    // maxWidth: "14rem",
    // minWidth: "12rem",
    borderRadius: "5px",
    color: "#ded5d5",
    fontSize: "0.8rem",
    fontFamily: "railway",
    lineHeight: "1.75rem",

    backgroundColor: "#202123",
    // backgroundColor: "#FFFFFF",
    cursor: "pointer",
    // margin: "0.5rem",
    padding: "3px",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#57606f",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: " #0f1218;",
      margin: "0",

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
      backgroundColor: "#fff",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
    };
  },
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#0f1218;",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
