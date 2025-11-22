const getUserDetails = () => JSON.parse(localStorage.getItem("user") || "{}");
export { getUserDetails };
