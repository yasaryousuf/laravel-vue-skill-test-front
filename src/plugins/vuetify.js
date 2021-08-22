import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import theme from "@/plugins/theme";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme
});