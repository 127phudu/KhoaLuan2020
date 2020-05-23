// Trang quản lý Phòng thi
class RoomManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.formImport = null;
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new RoomForm(this, formID, width, height, this.config.formTitle);
    }
    
    // Tạo thêm mới form nhập khẩu
    createFormImport(idForm){
        this.formImport = new ImportForm(this, idForm);
    }

    // Nhập khẩu danh sách
    import(){
        this.formImport.show();
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "Rooms",
            formTitle:"Phòng thi"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Phòng thi
var roomManagerPage = new RoomManagerPage("#GridRoom", "#ToolbarGridRoom", "#paging-GridRoom");
    // Tạo một form detail
    roomManagerPage.createFormDetail("#formRoomDetail", 500, 185);
    // Tạo một form nhập khẩu
    roomManagerPage.createFormImport("#formImportRoom");
    roomManagerPage.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)





