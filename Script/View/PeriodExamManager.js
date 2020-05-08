// Trang quản lý kì thi
class PeriodExamManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new PeriodExamForm(this, formID, width, height, this.config.formTitle);
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
            entityName: "PeriodExams",
            formTitle:"Kì thi"
        };

        return object;
    }
}

// Khởi tạo trang quản lý Kì thi
var periodExamManagerPage = new PeriodExamManagerPage("#GridPeriodExam");
// Tạo một form detail
    periodExamManagerPage.createFormDetail("#formPeriodExam", 500, 235);
// Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    periodExamManagerPage.loadData(periodExams);
    periodExamManagerPage.listFakeData = periodExams;




