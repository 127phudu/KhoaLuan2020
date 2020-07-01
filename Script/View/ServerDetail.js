//Class quản lý server detail
class ServerDetail extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);

        this.formImport = null;
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new ServerManagerForm(this, formID, width, height, this.config.formTitle);
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.ServerDetail.urlGetData.format(semesterId),
            urlFull = url + Constant.urlPaging.format(1000, 1);

        if(url && semesterId){
            $(".grid-wrapper").addClass("loading");
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data["ServerDetail"]);
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

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "ServerDetail",
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Mapping
var serverDetail = new ServerDetail("#GridListServer");

    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);



