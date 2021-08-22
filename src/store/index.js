import Vue from "vue"
import Vuex from "vuex"
import userModule from "./modules/user";
// import portal from "./modules/portal";

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        userModule : userModule,
    },
    state: {
        accessToken: localStorage.getItem("access_token") || null,
        user: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
        loading: true,
        firstLoad: true,
        searchLoad: false,
        dialog: {
            dialog: false,
            class: "",
            message: ""
        },
        pagination: {
            page: 1,
            itemsPerPage: 10,
            pageClickedFromList:1,
            pageIClicked: 1,
            numberOfPages: 1
        },
    },
    getters: {
        GET_USER(state) {
            return state.user.user;
        },
    },
    mutations: {
        MU_LOG_OUT(state) {
            state.accessToken = null;
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
        },
    },
    actions: {
        setLang(context, lang) {
            context.commit("SET_LANG", lang);
        },
        AC_LOGOUT(context) {
            context.commit("MU_LOG_OUT");
        },
    },

})
