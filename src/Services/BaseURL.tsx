import axios from "axios";

export const baseURL = axios.create({
    baseURL: ' https://phimapi.com/v1/api/'
})