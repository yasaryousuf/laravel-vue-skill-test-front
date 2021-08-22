import http from "@/plugins/axios";

export default {
    register: (credentials) => {
        return http.post("/auth/register", credentials)
    },
    login: (credentials) => {
        return http.post("/auth/login", credentials)
    },
    logout: () => {
        return http.post("auth/logout")
    },
}
