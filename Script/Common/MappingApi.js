// Các api map với chương trình

var mappingApi = {
    Master:{
        urlLogin: "http://admin.dkt.vnu.edu.vn:8881/admin/auth/login",                      // Done
        urlChangePassword: "",
    },
    Students:{ // Sinh viên
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/student/all",                   // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",                        // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/student",                        // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/student/list",                   // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/student/check_exist",    // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/student/find"             // Done
    },
    Subjects:{ // Học phần
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/all",                   // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",                        // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",                        // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/list",                   // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/check_exist",    // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/find",            // Done
        urlGetDataNotInSemester: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_not_in_semester/{0}" // Done
    },
    Rooms:{ // Phòng thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room/all",                      // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",                           // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",                           // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room/list",                      // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/room/check_exist" ,      // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/room/find",               // Done
        urlGetDataNotInSemester: "http://admin.dkt.vnu.edu.vn:8881/admin/room_not_in_semester/{0}" // Done
    },
    Semesters:{ // Kì thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/all",                  // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",                       // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",                       // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/list",                  // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/check_exist",   // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/find",           // Done
        urlStartRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/active",     // Done
        urlDoneRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/done"         // Done
    },

    ListSubjects:{ // Danh sách học phần - Sinh viên
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/semester/{0}",  // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/list",           // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/list",           // Done
        urlGetDataDetail: ""
    },
    StudentSubjectDetail: {
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/semester/{0}",
        urlCreate: "",
        urlUpdate: "",
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list",
        urlCheckDuplicate: ""
    },
    RoomSetting:{
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/semester/{0}", // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list", // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters",
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list",  // Done
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