import user from "@/api/User";

export default {
    namespaced: true,
    state: {
        list: [],
        accessEmail: null,
        accessToken: localStorage.getItem("access_token") || null,
        user: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
        single_user: {}
    },
    getters: {
        list() {
            return state.list;
        },
        accessToken(state) {
            return state.accessToken;
        },
        isEmailAuthenticated(state) {
            return state.accessEmail ? true : false;
        },
        isAuthenticated(state) {
            return state.accessToken ? true : false;
        },
        auth(state) {
            return state.user;
        },
        single_user(state) {
            return state.single_user;
        },
    },
    mutations: {
        set_list(state, list) {
            state.list = list;
        },
        SET_EMAIL(state, email) {
            state.accessEmail = email;
        },
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
        SET_SINGLE_USER(state, single_user) {
            state.single_user = single_user;
        },
    },
    actions: {
        setList(context, list) {
            context.commit("set_list", list);
        },
        setEmail(context, email) {
            context.commit("SET_EMAIL", email);
        },
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
        async setSingleUser(context, payload) {
            await user.get(payload).then(response => {
                context.commit("SET_SINGLE_USER", response.data.data);
                context.commit('MUTATION_SET_LOADING', false);
                context.commit('MUTATION_SET_FIRST_LOAD', false);
            })
                .catch(exception => {
                    if (exception.response && exception.response.status === 422) {
                        context.commit('MUTATION_SET_DIALOG', { dialog: true, class: "dialog-error", message: exception.response.data.message});
                    }
                });
        },
    },
}
