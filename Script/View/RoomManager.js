// Trang quản lý phòng thi
class RoomManagerPage extends BaseGrid{

    // Hàm khởi tạo grid
    constructor(gridId, formID, fakeData){
        super(gridId);

        this.config = this.getConfig();
        this.param = "Snow";
        this.fakeData = fakeData;
        this.formDetail = new FormDialog(this, formID, 500, 235, this.config.formTitle);
        this.loadAjaxData(this.fakeData);
    }

     // Thiết lập các config
     getConfig() {
        let object = {
            configUrl: {
                urlGetData: "",
                urlCreate: "",
                urlUpdate: "",
                urlDelete: ""
            },
            role: "Admin",
            entityName: "Room",
            formTitle:"Phòng thi"
        };

        return object;
    }
}

// Khởi tạo trang quản lý phòng thi
var roomManagerPage = new RoomManagerPage("#GridRoom", "#formRoom", rooms);

