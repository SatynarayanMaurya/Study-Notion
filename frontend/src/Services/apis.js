

// const BASE_URL = "http://localhost:4000"
const BASE_URL = "https://study-notion-backend-hsn7.onrender.com"



// Auth endPoints
export const endPoints = {
    SIGNUP_API : BASE_URL + "/api/v1/auth/signup",
    LOGIN_API : BASE_URL + "/api/v1/auth/login",
    SENDOTP_API : BASE_URL + "/api/v1/auth/sendotp",
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/api/v1/auth/reset-password-token",
    RESET_PASSWORD_API : BASE_URL + "/api/v1/auth/reset-password",
}

export const profileEndpoints = {
    EDIT_PROFILE_API : BASE_URL + "/api/v1/dashboard/edit-profile",
    GET_PROFILE_DETAILS_API : BASE_URL + "/api/v1/dashboard/profile-details"
}

export const instructorEndpoints = {
    CREATE_COURSE_API : BASE_URL + "/api/v1/dashboard/create-course",
    GET_COURSES_API : BASE_URL + "/api/v1/dashboard/get-course",  
    CREATE_SECTION_API : BASE_URL + "/api/v1/dashboard/create-section",
    GET_SECTION_API : BASE_URL + "/api/v1/dashboard/get-section",
    CREATE_SUB_SECTION_API : BASE_URL + "/api/v1/dashboard/create-subSection",
    GET_SUB_SECTION_API : BASE_URL + "/api/v1/dashboard/get-subSection",


}

export const studentEndpoints = {
    GET_ALL_COURSES_API : BASE_URL + "/api/v1/all-courses",
    GET_SINGLE_COURSE_WITH_COURSEID_API : BASE_URL + "/api/v1/dashboard/get-single-course",
    PAID_COURSE_API : BASE_URL + "/api/v1/dashboard/paid-user-course"
}

export const paymentIntegration = {
    CAPTURE_PAYMENT : BASE_URL + "/api/v1/capture-payment",
    VERIFY_SIGNATURE : BASE_URL + "/api/v1/verify-signature"
}

export const contact_formEndpints = {
    CONTACT_FORM_API : BASE_URL + "/api/v1/contact-form"
}
