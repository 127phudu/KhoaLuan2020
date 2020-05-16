// Các api map với chương trình
var host = "http://admin.dkt.vnu.edu.vn:8881";

var mappingApi = {
    Master:{
        urlLogin: "/admin/auth/login", // Done
        urlChangePassword: null,
    },
    Students:{ // Sinh viên
        urlGetData: "/admin/student/all", // Done
        urlCreate: null,
        urlUpdate: null,
        urlDelete: "/admin/student/list", // Done
        urlCheckDuplicate: null
    },
    Subjects:{ // Học phần
        urlGetData: "/admin/subject/all", // Done
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    Rooms:{ // Phòng thi
        urlGetData: "/admin/room/all", // Done
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    Semesters:{ // Kì thi
        urlGetData: "/admin/semester/all",
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },

    ListSubject:{
        urlGetData: null,
        urlCreate: null,
        urlDelete: null,
        urlGetDataDetail: null
    },
    StudentSubjectDetail: {
        urlGetData: null,
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    RoomSetting:{
        urlGetData: null,
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    CreateExam:{
        urlGetData: null,
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    ExamRegisterResult:{
        urlGetData: null,
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    },
    ExamRegisterResultDetail: {
        urlGetData: null,
        urlCreate: null,
        urlUpdate: null,
        urlDelete: null,
        urlCheckDuplicate: null
    }
}