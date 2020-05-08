// Trang quản lý sinh viên
class StudentPage extends BaseGrid{

    // Hàm khởi tạo grid
    constructor(gridId, formID, fakeData){
        super(gridId);

        this.url = "Student/getData";
        this.param = "Snow";
        this.role = "Admin";
        this.formTitle = 'Sinh viên';
        this.entityName = "Student";
        this.fakeData = fakeData;
        this.formDetail = new FormDialog(this, formID, 500, 235, this.formTitle);
        this.loadAjaxData(this.fakeData);
    }
}

// Khởi tạo trang quản lý sinh viên
var studentPage = new StudentPage("#GridStudent", "#formStudent", students);

