// Trang tạo lịch thi
class CreateExamPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new CreateExamForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "CreateExams",
            formTitle:"Lịch thi"
        };

        return object;
    }

    // Khởi tạo một số sự kiện
    initEventElement(){
        super.initEventElement();
        let me = this;

        $("#chooseExam").on('selectmenuchange', me.chooseExamChange);
    }

    // Xử lý khi thay đổi kì thi trên combo
    chooseExamChange(){
        let me = this,
            periodExamId = parseInt($(this).val());

        localStorage.setItem("PeriodExamId", periodExamId);
        me.loadAjaxData();
    }
}

    // Khởi tạo trang quản lý Phòng thi
var createExamPage = new CreateExamPage("#GridCreateExam", "#ToolbarGridCreateExam", "#paging-GridCreateExam");
    // Tạo một form detail
    createExamPage.createFormDetail("#formCreateExam", 500, 233);
    // Load dữ liệu cho grid
    createExamPage.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);





