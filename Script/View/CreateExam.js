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

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            paramPaging = me.getParamPaging(),
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.CreateExams.urlGetData.format(semesterId),
            urlFull = url + Constant.urlPaging.format(paramPaging.Size, paramPaging.Page);

        if(url && semesterId){
            $(".grid-wrapper").addClass("loading");

            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data["ExamResponses"]);
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

        $("#chooseExam").on('selectmenuchange', function(){
            let  semesterId = parseInt($(this).val());

            localStorage.setItem("SemesterId", semesterId);
            me.loadAjaxData();
        });
    }
}

    // Khởi tạo trang quản lý Phòng thi
var createExamPage = new CreateExamPage("#GridCreateExam", "#ToolbarGridCreateExam", "#paging-GridCreateExam");
    // Tạo một form detail
    createExamPage.createFormDetail("#formCreateExam", 500, 233);


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);





