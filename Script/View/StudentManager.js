// Trang quản lý sinh viên
class StudentManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new StudentForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "Students",
            formTitle:"Sinh viên"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý sinh viên
var studentManagerPage = new StudentManagerPage("#GridStudent", "#ToolbarGridStudent", "#paging-GridStudent");
    // Tạo một form detail
    studentManagerPage.createFormDetail("#formStudent", 500, 235);
    // Load dữ liệu cho grid 
    studentManagerPage.loadAjaxData();

    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
   




