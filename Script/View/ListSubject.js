// Trang danh sách học phần - sinh viên
class ListSubject extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.pageDetail = null;
    }
    
    // Tạo form detail
    createFormDetail(formId, gridId, toolbarId, width, height){
        this.formDetail = new ChooseSubjectForm(formId, gridId, toolbarId, this, width, height);
    }

    // Tạo page detail
    createPageDetail(gridId, toolbarId, pagingId){
        this.pageDetail = new StudentSubjectDetail(gridId, toolbarId, pagingId);
        this.pageDetail.createFormDetail("#formStudentSubjectDetail", 400, 133);
        this.pageDetail.pageMaster = this;
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            paramPaging = me.getParamPaging(),
            periodExamId = localStorage.getItem("PeriodExamId"),
            url = mappingApi.ListSubject.urlGetData.format(periodExamId),
            urlFull = url + Constant.urlPaging.format(paramPaging.Size, paramPaging.Page);

        $(".grid-wrapper").addClass("loading");

        if(url && periodExamId){
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data["subjectSemesterResponses"]);
                    me.resetDisplayPaging(response.data.Page);
                    me.editMode = Enum.EditMode.View;
                    $(".grid-wrapper").removeClass("loading");
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
var listSubject = new ListSubject("#GridListSubject", "#ToolbarGridListSubject", "#paging-GridListSubject");
    // Tạo một form detail
    listSubject.createFormDetail("#formSubject","#GridSubject", "#ToolbarChooseSubject", 800, 500);
    // Tạo trang chi tiết bên trong
    listSubject.createPageDetail("#StudentSubjectDetail", "#ToolbarStudentSubjectDetail", "#paging-StudentSubjectDetail");


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);





