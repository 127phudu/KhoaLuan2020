// Trang quản lý Phòng thi
class RoomManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new RoomForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.Room.urlGetData,
                urlCreate: mappingApi.Room.urlCreate,
                urlUpdate: mappingApi.Room.urlUpdate,
                urlDelete: mappingApi.Room.urlDelete,
                urlCheckDuplicate: mappingApi.Room.urlCheckDuplicate
            },
            role: "Admin",
            entityName: "Rooms",
            formTitle:"Phòng thi"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Phòng thi
var roomManagerPage = new RoomManagerPage("#GridRoom", "#ToolbarGridRoom");
    // Tạo một form detail
    roomManagerPage.createFormDetail("#formRoom", 500, 185);
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    roomManagerPage.loadData(rooms);
    roomManagerPage.listFakeData = rooms;



