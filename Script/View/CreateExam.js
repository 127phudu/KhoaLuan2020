// Trang tạo lịch thi
class CreateExamPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new CreateExamForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.CreateExam.urlGetData,
                urlCreate: mappingApi.CreateExam.urlCreate,
                urlUpdate: mappingApi.CreateExam.urlUpdate,
                urlDelete: mappingApi.CreateExam.urlDelete,
                urlCheckDuplicate: mappingApi.CreateExam.urlCheckDuplicate
            },
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
        //me.loadAjaxData();
    }
}

    // Khởi tạo trang quản lý Phòng thi
var createExamPage = new CreateExamPage("#GridCreateExam", "#ToolbarGridCreateExam");
    // Tạo một form detail
    createExamPage.createFormDetail("#formCreateExam", 500, 233);
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    createExamPage.loadData(createExams);
    createExamPage.listFakeData = createExams;




