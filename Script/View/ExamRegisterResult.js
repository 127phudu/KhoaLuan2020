// Trang danh kết quả đăng ký thi
class ExamRegisterResult extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.pageDetail = null;
    }
    
    // Tạo page detail
    createPageDetail(gridId, toolbarId, pagingId){
        this.pageDetail = new ExamRegisterResultDetail(gridId, toolbarId, pagingId);
        this.pageDetail.pageMaster = this;
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            semesterId = localStorage.getItem("SemesterId");

        if(me.config.configUrl.urlGetData && semesterId){
            CommonFn.PostPutAjax("POST", me.config.configUrl.urlGetData, semesterId, function(response) {
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
            semesterId = parseInt($(this).val());

        localStorage.setItem("SemesterId", semesterId);
        me.loadAjaxData();
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
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
var examRegisterResult = new ExamRegisterResult("#GridExamRegisterResult", "#ToolbarGridExamRegisterResult", "#paging-GridExamRegisterResult");
    // Tạo trang chi tiết bên trong
    examRegisterResult.createPageDetail("#StudentSubjectDetail", "#ToolbarStudentSubjectDetail", "#paging-StudentSubjectDetail");
    // Load dữ liệu cho grid 
    examRegisterResult.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);





