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
        urlCheckDuplicate: ""
    },
    Subjects:{ // Học phần
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/all", // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",      // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",      // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/list", // Done
        urlCheckDuplicate: ""
    },
    Rooms:{ // Phòng thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room/all",    // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",         // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",         // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room/list",    // Done
        urlCheckDuplicate: ""
    },
    Semesters:{ // Kì thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/all",// Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",     // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",     // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/list",// Done
        urlCheckDuplicate: ""
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