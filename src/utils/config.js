// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// export const config = {
//   headers: {
//     Authorization: `Bearer ${
//       getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.result.token : ""
//     }`,
//     Accept: "application/json",
//   },
// };

// const getTokenFromLocalStorage = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user")).result.token
//   : "";

// console.log("Token from localStorage:", getTokenFromLocalStorage);

// export const config = {
//   headers: {
//     Authorization: `Bearer ${getTokenFromLocalStorage}`,
//     Accept: "application/json",
//   },
// };


export const getConfig = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).result.token
    : "";

  // console.log("Token from localStorage:", getTokenFromLocalStorage);

  return {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      Accept: "application/json",
    },
  };
};
