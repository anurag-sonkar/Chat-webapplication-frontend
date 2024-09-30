export const getConfig = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user-info")
    ? JSON.parse(localStorage.getItem("user-info")).token
    : "";

  // console.log("Token from localStorage:", getTokenFromLocalStorage);

  return {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage}`,
      Accept: "application/json",
    },
  };
};
