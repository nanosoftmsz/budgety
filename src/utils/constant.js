export const mediumRegex = new RegExp("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{4,}");
export const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,}$");
export const validatePhoneNumber = new RegExp("(?:\\+88|88)?(01[3-9]\\d{8})");
export const bearerToken = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
  },
};
