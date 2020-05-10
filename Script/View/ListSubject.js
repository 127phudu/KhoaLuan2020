// Trang danh sách học phần - sinh viên
class ListSubject extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);

        this.pageDetail = null;
    }
    
    // Tạo form detail
    createFormDetail(formId, gridId, toolbarId, width, height){
        this.formDetail = new ChooseSubjectForm(formId, gridId, toolbarId, this, width, height);
    }

    // Tạo page detail
    createPageDetail(gridId, toolbarId){
        this.pageDetail = new StudentSubjectDetail(gridId, toolbarId);
        this.pageDetail.createFormDetail("#formStudentSubjectDetail", 400, 133);
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
                urlGetData: mappingApi.ListSubject.urlGetData,
                urlCreate: mappingApi.ListSubject.urlCreate,
                urlDelete: mappingApi.ListSubject.urlDelete,
                urlGetDataDetail: mappingApi.ListSubject.urlGetDataDetail
            },
            role: "Admin",
            entityName: "ListSubjects",
            formTitle:"Danh sách học phần"
        };

        return object;
    }

    // Hàm dùng đối với từng loại toolbar đặc thù
    customToolbarItem(commandName){
        let me = this;

        switch(commandName){
            case "Choose":
                me.choose();
                break;
            case "ViewDetail":
                me.viewDetail();
        }
    }

    // Chọn danh sách học phần
    choose(){
        let me = this;

        me.formDetail.show();
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

    // Khởi tạo trang quản lý Học phần
var listSubject = new ListSubject("#GridListSubject", "#ToolbarGridListSubject");
    // Tạo một form detail
    listSubject.createFormDetail("#formSubject","#GridSubject", "#ToolbarChooseSubject", 800, 500);
    // Tạo trang chi tiết bên trong
    listSubject.createPageDetail("#StudentSubjectDetail", "#ToolbarStudentSubjectDetail");
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    listSubject.loadData(listSubjects);
    listSubject.listFakeData = listSubjects;




