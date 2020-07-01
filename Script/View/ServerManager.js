// Trang quản lý Máy chủ
class ServerManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.formImport = null;
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new ServerManagerForm(this, formID, width, height, this.config.formTitle);
    }


    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "Servers",
            formTitle:"Máy chủ"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Máy chủ
var serverManagerPage = new ServerManagerPage("#GridServer", "#ToolbarGridServer");
    // Tạo một form detail
    serverManagerPage.createFormDetail("#formServerDetail", 500, 185);
    // Load danh sách server
    serverManagerPage.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);






