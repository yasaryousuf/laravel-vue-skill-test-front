import http from "@/plugins/axios";

export default {
    register: (credentials) => {
        return http.post("/auth/register", credentials)
    },
    login: (credentials) => {
        return http.post("/auth/login", credentials)
    },
    me: () => {
        return http.post("/auth/me")
    },
    logout: () => {
        return http.post("auth/logout")
    },
}
