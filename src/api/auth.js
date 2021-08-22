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
    terms: (credentials) => {
        return http.post("auth/terms", credentials)
    },
    termsData: () => {
        return http.get("auth/termsData")
    },

    forgot_password: (credentials) => {
        return http.post("auth/password/email", credentials)
    },
    reset_password: (credentials) => {
        return http.post("auth/password/reset", credentials)
    },
    reset_password_for_portal_user: (credentials) => {
        return http.post("auth/password/reset-for-portal-user", credentials)
    },
    resend_email_verification: (credentials) => {
        return http.post("auth/verify/resend-email-verification", credentials)
    }
}
