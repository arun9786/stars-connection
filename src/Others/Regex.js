const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const mobileRegex = /^[6-9]\d{9}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;


export {emailRegex, mobileRegex, passwordRegex}