export const setUserInfo = (email, name, isReg) => {
  console.log("isreg",isReg)
  if (email) localStorage.setItem("email", email);
  if (name) localStorage.setItem("name", name);
  if (true) localStorage.setItem("isReg", isReg);
};
export const getUserInfo = () => {
  return {
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    isReg: localStorage.getItem("isReg"),
  };  
};
