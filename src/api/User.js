import http from "@/plugins/axios";

export default {
    login(credentials) {
        return http.post("/auth/login", credentials);
    },
    logout() {
        return http.post("/auth/logout");
    },
};
