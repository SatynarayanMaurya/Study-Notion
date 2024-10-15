const express = require("express");
const router = express.Router();

const {signup,login, sendOtp} = require("../Controller/auth")
const {resetPasswordToken, resetPassword} = require("../Controller/resetPassword");
const { auth, isInstructor } = require("../Middlewares/authMiddleware");
const {  updateProfile, getAllProfileData } = require("../Controller/profileController");
const {createCourse, getCourses, getAllCourses, getCourseWithCourseId} = require("../Controller/course");
const { createSection, getAllSection } = require("../Controller/sectionController");
const { createSubSection, getAllSubSections } = require("../Controller/subSectionController");
const { paidUser } = require("../Controller/PaidCourse");
const { capturePayment, verifySignature } = require("../Controller/Payment");
const { contactFormController } = require("../Controller/contactFormController");


router.post("/auth/signup", signup);
router.post("/auth/sendotp", sendOtp);
router.post("/auth/login", login);
router.post("/auth/reset-password-token", resetPasswordToken)
router.post("/auth/reset-password", resetPassword)

router.get("/all-courses", auth, getAllCourses)

router.post("/dashboard/edit-profile",auth,updateProfile)
router.get("/dashboard/profile-details", auth,   getAllProfileData)

router.post("/dashboard/create-course",auth,isInstructor,createCourse)
router.get("/dashboard/get-course",auth,getCourses)
router.get("/dashboard/get-single-course",auth,getCourseWithCourseId)


router.post("/dashboard/create-section", auth,isInstructor, createSection)
router.get("/dashboard/get-section", auth, getAllSection)

router.post("/dashboard/create-subSection", auth,isInstructor, createSubSection)
router.get("/dashboard/get-subSection", auth, getAllSubSections)

router.put("/dashboard/paid-user-course", auth, paidUser)

router.post("/capture-payment", auth, capturePayment)
router.post("/verify-signature", auth , verifySignature)

router.post("/contact-form", contactFormController)





module.exports = router