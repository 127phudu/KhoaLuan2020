// Trang quản lý Mapping
class MappingManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);

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
            url = mappingApi.Mapping.urlGetData.format(semesterId),
            urlFull = url + Constant.urlPaging.format(1000, 1);

        if(url && semesterId){
            $(".grid-wrapper").addClass("loading");

            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data["Mapping"]);
                    me.editMode = Enum.EditMode.View;
                    $(".grid-wrapper").removeClass("loading");
                    me.setStatusToolbar();
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

    // Hàm dùng đối với từng loại toolbar đặc thù
    customToolbarItem(commandName){
        let me = this;

        switch(commandName){
            case "Save":
                me.save();
                break;
            case "Setting":
                me.setting();
                break;
            case "AutoSet":
                me.autoSet();
                break;
            default:
                break;
        }
    }

    // Hàm thiết lập máy chủ
    setting(){
        let me = this;
        me.grid.find(".notEdit").removeClass("notEdit");

        me.editMode = Enum.EditMode.Edit;
        me.setStatusToolbar();
    }

    // Hàm cất
    save(){
        let me = this,
            isValid = me.validatSave(),
            dataSubmit = null;

        if(isValid){
            dataSubmit = me.getSubmitData();

            if(dataSubmit.length > 0){
                CommonFn.PostPutAjax("PUT", mappingApi.Mapping.urlUpdate, dataSubmit, function(response) {
                    if(response.status == Enum.StatusResponse.Success){
                        me.showMessageSuccess();
                        me.editMode = Enum.EditMode.View;
                        me.grid.find("input").addClass("notEdit");
                        me.setStatusToolbar();
                        serverDetail.loadAjaxData();
                        me.evictCacheMappingServer();
                    }
                });
            }
        }
    }

    // Validate trước khi save
    validatSave(){
        let me = this,
            patt = new RegExp("^[0-9]*$"),
            isValid = true,
            listServerId = serverDetail.listServerId;

        me.grid.find("input").each(function(){
            let value = $(this).val();


            if(!patt.test(value) || !value){
                $(this).addClass("inputError");
                $(this).attr("title", "Dữ liệu không hợp lệ!");
                isValid = false;
            } else if (listServerId.indexOf(parseInt(value)) == -1) {
                $(this).addClass("inputError");
                $(this).attr("title", "Định danh không tồn tại");
                isValid = false;
            } else {
                $(this).removeClass("inputError");
            }

        });

        return isValid;
    }

    //Tự động thiết lập máy chủ
    autoSet() {
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            url = mappingApi.Mapping.autoSetMapping.format(semesterId);

        CommonFn.PostPutAjax("PUT", url, null, function(response) {
            if(response.status == Enum.StatusResponse.Success){
                me.showMessageSuccess();
                me.editMode = Enum.EditMode.View;
                me.grid.find("input").addClass("notEdit");
                serverDetail.loadAjaxData();
                me.loadAjaxData();
                me.setStatusToolbar();
                me.evictCacheMappingServer();
            }
        });
    }

    // Lấy dữ liệu để cất
    getSubmitData(){
        let me = this,
            data = [];

        me.grid.find("tbody tr").each(function(){
            let id = $(this).data("value").SubjectSemesterId,
                object = {SubjectSemesterId: id};

            object.ServerId = parseInt($(this).find("input").eq(0).val());
            data.push(object);
        });

        return data;
    }

    //evict cache cho MappingServer
    evictCacheMappingServer() {
        CommonFn.PostPutAjax("Delete", mappingApi.Mapping.evictCache, null, function () {});
    }

    // Lấy các button bị disable
    getDisableToolbarItem(){
        let me = this,
            listItemDisable = [];

        if(me.editMode == Enum.EditMode.View){
            listItemDisable.push("Save");
        }

        if(me.editMode == Enum.EditMode.Edit){
            listItemDisable.push("Setting");
        }

        return listItemDisable;
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "Mapping",
        };

        return object;
    }

    // Hàm chạy khi load data xong
    loadDataComplete(){
        let me = this;
        me.grid.find("input").on("blur",me.validatSave.bind(me));
    }
}

    // Khởi tạo trang quản lý Mapping
var mappingManagerPage = new MappingManagerPage("#GridMapping", "#ToolbarGridMapping");
    // Load danh sách mapping


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);



