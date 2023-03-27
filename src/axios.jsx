import axios from "axios";

const API =axios.create({
    baseURL:"https://bigbros.link/api/v1",
})

export default API;