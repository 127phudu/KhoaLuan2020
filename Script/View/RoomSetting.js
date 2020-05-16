// Trang thiết lập phòng thi
class RoomSetting extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);

        this.editMode = Enum.EditMode.View;
    }
    
    // Tạo form detail
    createFormDetail(formId, gridId, toolbarId, width, height){
        this.formDetail = new ChooseRoomForm(formId, gridId, toolbarId, this, width, height);
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

    // Hiển thị thông báo cất thành công
    showMessageSuccess(customMessage){
        let message = customMessage || "Cất dữ liệu thành công!";

        $("#success-alert strong").text(message);

        $("#success-alert").fadeTo(1500, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
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

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "RoomSetting",
            formTitle:"Danh sách phòng thi"
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
            case "Save":
                me.save();
                break;
            case "Setting":
                me.setting();
                break;
        }
    }

    // Chọn danh sách phòng thi
    choose(){
        let me = this;

        me.formDetail.show();
    }

    // Hàm cất
    save(){
        let me = this,
            isValid = me.validatSave(),
            dataSubmit = null;

        if(isValid){
            dataSubmit = me.getSubmitData();

            // if(dataSubmit.length > 0){
            //     CommonFn.PostPutAjax("POST", me.config.configUrl.urlUpdateFullRecord, dataSubmit, function(response) {
            //         if(response.status == Enum.StatusResponse.Success){
            //             me.showMessageSuccess();
            //             me.loadAjaxData();
            //         }
            //     });
            // }

            me.showMessageSuccess();
            me.editMode = Enum.EditMode.View;
            me.grid.find("input").addClass("notEdit");
            me.setStatusToolbar();
        }
    }
  
    // Validate trước khi save
    validatSave(){
        let me = this,
            patt = new RegExp("^[0-9]*$"),
            isValid = true;

        me.grid.find("input").each(function(){
            let value = $(this).val();

            if(!patt.test(value) || !value){
                $(this).addClass("inputError");
                $(this).attr("title", "Dữ liệu không hợp lệ!");
                isValid = false;
            }else{
                $(this).removeClass("inputError");
                $(this).attr("title", "Vui lòng nhập số lượng máy!");
            }
        });

        return isValid;
    }

    // Lấy dữ liệu để cất
    getSubmitData(){
        let me = this,
            data = [];
        
        me.grid.find("tbody tr").each(function(){
            let id = $(this).data("value").Id,
                object = {Id: id};

            object.CountRoom = parseInt($(this).find("input").eq(0).val());
            object.CountRoomBackup = parseInt($(this).find("input").eq(1).val());
            data.push(object);
        });

        return data;
    }

    // Hàm thiết lập số máy
    setting(){
        let me = this;
            me.grid.find(".notEdit").removeClass("notEdit");

        me.editMode = Enum.EditMode.Edit;
        me.setStatusToolbar();
    }

    // Lấy các button bị disable
    getDisableToolbarItem(){
        let me = this,
            allRecord = me.getAllRecord(),
            selected = me.getSelection(),
            listItemDisable = [];

        if(selected.length == 0){
            listItemDisable.push("Delete");
        }

        if(allRecord.length == 0){
            listItemDisable.push("Export");
            listItemDisable.push("Save");
            listItemDisable.push("Setting");
        }

        if(me.editMode == Enum.EditMode.View){
            listItemDisable.push("Save");
        }

        if(me.editMode == Enum.EditMode.Edit){
            listItemDisable.push("Setting");
            listItemDisable.push("Delete");
        }

        return listItemDisable;
    }

    // Hàm chạy khi load data xong
    loadDataComplete(){
        let me = this;

        me.grid.find("input").off("blur");
        me.grid.find("input").on("blur",me.validatSave.bind(me));
    }

}

    // Khởi tạo trang quản lý Học phần
var roomSetting = new RoomSetting("#GridRoomSetting", "#ToolbarGridRoomSetting");
    // Tạo một form detail
    roomSetting.createFormDetail("#formRoom","#GridRoom", "#ToolbarChooseRoom", 800, 500);
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    roomSetting.loadData(roomSettings);
    roomSetting.listFakeData = roomSettings;




