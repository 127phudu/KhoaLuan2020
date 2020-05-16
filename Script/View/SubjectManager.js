// Trang quản lý Học phần
class SubjectManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new SubjectForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "Subjects",
            formTitle:"Học phần"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var subjectManagerPage = new SubjectManagerPage("#GridSubject", "#ToolbarGridSubject", "#paging-GridSubject");
    // Tạo một form detail
    subjectManagerPage.createFormDetail("#formSubjectDetail", 500, 185);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    subjectManagerPage.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
   




