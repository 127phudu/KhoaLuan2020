// Trang danh kết quả đăng ký thi
class ExamRegisterResult extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);

        this.pageDetail = null;
    }
    
    // Tạo page detail
    createPageDetail(gridId, toolbarId){
        this.pageDetail = new ExamRegisterResultDetail(gridId, toolbarId);
        this.pageDetail.pageMaster = this;
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            periodExamId = localStorage.getItem("PeriodExamId");

        if(me.config.configUrl.urlGetData && periodExamId){
            CommonFn.PostPutAjax("POST", me.config.configUrl.urlGetData, periodExamId, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.Data);
                }
            });
        }
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

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.ExamRegisterResult.urlGetData,
                urlCreate: mappingApi.ExamRegisterResult.urlCreate,
                urlDelete: mappingApi.ExamRegisterResult.urlDelete,
                urlGetDataDetail: mappingApi.ExamRegisterResult.urlGetDataDetail
            },
            role: "Admin",
            entityName: "ExamRegisterResults",
            formTitle:"Kết quả đăng ký thi"
        };

        return object;
    }

    // Hàm dùng đối với từng loại toolbar đặc thù
    customToolbarItem(commandName){
        let me = this;

        switch(commandName){
            case "ViewDetail":
                me.viewDetail();
        }
    }

    // Khi bấm vào xem chi tiết
    viewDetail(){
        let me = this,
            masterData = me.getSelection()[0];

        $("[Layout='Master']").hide();
        $("[Layout='Detail']").show();
        
        me.pageDetail.show(masterData);
    }
}

    // Khởi tạo trang
var examRegisterResult = new ExamRegisterResult("#GridExamRegisterResult", "#ToolbarGridExamRegisterResult");
    // Tạo trang chi tiết bên trong
    examRegisterResult.createPageDetail("#StudentSubjectDetail", "#ToolbarStudentSubjectDetail");

    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    examRegisterResult.loadData(createExams);
    examRegisterResult.listFakeData = createExams;




