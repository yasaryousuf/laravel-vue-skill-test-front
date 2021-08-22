import user from "@/api/User";

export default {
    namespaced: true,
    state: {
        accessEmail: null,
        accessToken: localStorage.getItem("access_token") || null,
        user: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
    },
    getters: {
        accessToken(state) {
            return state.accessToken;
        },
        auth(state) {
            return state.user;
        },
    },
    mutations: {
        PUT_TOKEN(state, token) {
            state.accessToken = token;
        },
        LOG_IN(state, access_token) {
            state.accessToken = access_token;
        },
        LOG_OUT(state) {
            state.accessToken = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
        },
        SET_USER(state, user) {
            state.user = user;
        },
    },
    actions: {
        putToken(context, token) {
            localStorage.setItem("access_token", token);
            context.commit("PUT_TOKEN", token);
        },
        login(context, access_token) {
            localStorage.setItem("access_token", access_token);
            context.commit("LOG_IN", access_token);
        },
        logout(context) {
            context.commit("LOG_OUT");
        },
        setUser(context, user) {
            localStorage.setItem("user", JSON.stringify(user));
            context.commit("SET_USER", user);
        },
    },
}
