// import axios from "axios";

// export const api = axios.create({
//     baseURL: import.meta.env.VITE_APP_API_PATH,
//     withCredentials: true,
// });


import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_APP_API_PATH,
    timeout: 30000,
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
    },
});
