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
                urlGetData: null,
                urlCreate: null,
                urlUpdate: null,
                urlDelete: null,
                urlCheckDuplicate: null
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
// Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    studentManagerPage.loadData(students);
    studentManagerPage.listFakeData = students;




