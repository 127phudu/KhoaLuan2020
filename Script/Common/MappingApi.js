// Các api map với chương trình

var mappingApi = {
    Master:{
        urlLogin: "http://admin.dkt.vnu.edu.vn:8881/admin/auth/login",    // Done
        urlChangePassword: "",
    },
    Students:{ // Sinh viên
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/student/all", // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",      // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",      // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/student/list", // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/student/check_exist" // Done
    },
    Subjects:{ // Học phần
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/all", // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",      // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",      // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/list", // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/check_exist"
    },
    Rooms:{ // Phòng thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room/all",    // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",         // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",         // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room/list",    // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/room/check_exist"
    },
    Semesters:{ // Kì thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/all",// Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",     // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",     // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/list",// Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/check_exist",
        urlStartRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/active", // Done
        urlDoneRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/done"     // Done
    },

    ListSubject:{
        urlGetData: "",
        urlCreate: "",
        urlDelete: "",
        urlGetDataDetail: ""
    },
    StudentSubjectDetail: {
        urlGetData: "",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "",
        urlCheckDuplicate: ""
    },
    RoomSetting:{
        urlGetData: "",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "",
        urlCheckDuplicate: ""
    },
    CreateExam:{
        urlGetData: "",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "",
        urlCheckDuplicate: ""
    },
    ExamRegisterResult:{
        urlGetData: "",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "",
        urlCheckDuplicate: ""
    },
    ExamRegisterResultDetail: {
        urlGetData: "",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "",
        urlCheckDuplicate: ""
    }
}