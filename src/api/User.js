import http from "@/plugins/axios";

export default {
    login(credentials) {
        return http.post("/auth/login", credentials);
    },
    logout() {
        return http.post("/auth/logout");
    },
    change_password(credentials) {
        return http.post("/user/change-password", credentials);
    },
    index() {
        return http.post("/user/index");
    },
    list(page, search) {
        return http.get(`/user/list?page=${page}&search=${search}`);
    },
    get(id) {
        return http.get(`/user/get/${id}`);
    },
    update(id, data) {
        return http.post(`/user/update/${id}`, data);
    },
    profile_update(credentials) {
        return http.post("/user/profile-update", credentials);
    },
    to_root_user(credentials) {
        return http.post("/impersonate/to-root-user", credentials);
    },
    toggleTour(id) {
        return http.post(`/user/${id}/hide-tour`);
    },
    notification_trigger_update(credentials) {
        return http.post("/user/notification-trigger-update", credentials);
    },

};
