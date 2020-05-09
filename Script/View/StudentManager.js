// Trang quản lý sinh viên
class StudentManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new StudentForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.Student.urlGetData,
                urlCreate: mappingApi.Student.urlCreate,
                urlUpdate: mappingApi.Student.urlUpdate,
                urlDelete: mappingApi.Student.urlDelete,
                urlCheckDuplicate: mappingApi.Student.urlCheckDuplicate
            },
            role: "Admin",
            entityName: "Students",
            formTitle:"Sinh viên"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý sinh viên
var studentManagerPage = new StudentManagerPage("#GridStudent");
    // Tạo một form detail
    studentManagerPage.createFormDetail("#formStudent", 500, 235);
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    studentManagerPage.loadData(students);
    studentManagerPage.listFakeData = students;




