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
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/student/find",            // Done
        urlDownloadFileTemplate: "http://admin.dkt.vnu.edu.vn:8881/admin/student/template", // Done
        urlUploadFile: "http://admin.dkt.vnu.edu.vn:8881/admin/student/import",             // Done
        urlExport: "http://admin.dkt.vnu.edu.vn:8881/admin/student/export"                  // Done
    },

    Subjects:{ // Học phần
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/all",                   // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",                        // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject",                        // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/list",                   // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/check_exist",    // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/find",            // Done
        urlGetDataNotInSemester: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_not_in_semester/{0}", // Done
        urlDownloadFileTemplate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/template", // Done
        urlUploadFile: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/import",             // Done
        urlExport: "http://admin.dkt.vnu.edu.vn:8881/admin/subject/export"                  // Done
    },

    Rooms:{ // Phòng thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room/all",                      // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",                           // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room",                           // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room/list",                      // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/room/check_exist" ,      // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/room/find",               // Done
        urlGetDataNotInSemester: "http://admin.dkt.vnu.edu.vn:8881/admin/room_not_in_semester/{0}", // Done
        urlDownloadFileTemplate: "http://admin.dkt.vnu.edu.vn:8881/admin/room/template",     // Done
        urlUploadFile: "http://admin.dkt.vnu.edu.vn:8881/admin/room/import",             // Done
        urlExport: "http://admin.dkt.vnu.edu.vn:8881/admin/room/export"                  // Done
    },

    Semesters:{ // Kì thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/all",                  // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",                       // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester",                       // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/list",                  // Done
        urlCheckDuplicate: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/check_exist",   // Done
        urlGetDataSearch: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/find",           // Done
        urlStartRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/active",     // Done
        urlDoneRegister: "http://admin.dkt.vnu.edu.vn:8881/admin/semester/{0}/done"        // Done
    },

    SubjectSemesters:{ // Danh sách học phần - Sinh viên
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/semester/{0}",  // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/list",           // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/subject_semesters/list",           // Done
    },

    StudentSubjects: { // Danh sách sinh viên trong học phần
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/student_in_subject/{0}",// Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/add_one",        // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/list",           // Done
        urlCheckExistItem: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/check_create", // Done
        urlReject: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/status",         // Done
        urlDownloadFileTemplate: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/template",      // Done
        urlUploadFile: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/import/subject_semester/{0}",    // Done  
        urlExport: "http://admin.dkt.vnu.edu.vn:8881/admin/student_subject/export/subject_semester/{0}"       
    },

    RoomSetting:{ // Thiết lập phòng thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/semester/{0}", // Done
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list", // Done
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list", // Done
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/list", // Done
        urlExport: "http://admin.dkt.vnu.edu.vn:8881/admin/room_semesters/export/semester/{0}"
    },

    CreateExams:{ // Tạo lịch thi
        urlGetData: "http://admin.dkt.vnu.edu.vn:8881/admin/exam/semester/{0}",
        urlCreate: "http://admin.dkt.vnu.edu.vn:8881/admin/exam/list/semester/{0}",
        urlUpdate: "http://admin.dkt.vnu.edu.vn:8881/admin/exam",
        urlDelete: "http://admin.dkt.vnu.edu.vn:8881/admin/exam/list"
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