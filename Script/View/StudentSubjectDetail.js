// Trang danh sách sinh viên chi tiết
class StudentSubjectDetail extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.pageMaster = null;
        this.masterId = null;
        this.formImport = null;
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new StudentSubjectDetailForm(this, formID, width, height, this.config.formTitle);
    }

    // Tạo thêm mới form nhập khẩu
    createFormImport(idForm){
        this.formImport = new ImportForm(this, idForm);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "",
            formTitle:"Sinh viên"
        };

        return object;
    }

    //Hàm load dữ liệu
    loadAjaxData(masterData){
        let me = this,
            entityName = me.config.entityName,
            url = mappingApi[entityName].urlGetData,
            paramPaging = me.getParamPaging(),
            urlFull = url + Constant.urlPaging.format(paramPaging.Size, paramPaging.Page),
            periodExamId = localStorage.getItem("PeriodExamId"),
            listSubjectId = masterData ? masterData.Id : me.masterId,
            data = {
                PeriodExamId: periodExamId,
                ListSubjectId: listSubjectId
            };

        // Gán masterId lưu lại dùng 
        me.masterId = masterData ? masterData.Id : me.masterId;

        if(url && periodExamId){
            CommonFn.PostPutAjax("POST", urlFull, data, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.Data);
                    me.resetDisplayPaging(response.data.Page);
                    me.editMode = Enum.EditMode.View;
                }
            });
        }
    }

    // Hiển thị khi từ màn hình cha truyền vào
    show(masterData){
        let me = this;

        me.configTitlePage(masterData);

        me.loadAjaxData(masterData);
    }

    // Thiết lập tiêu đề cho trang
    configTitlePage(masterData){
        let me = this,
            subjectName = masterData.SubjectName,
            subjectCode = masterData.SubjectCode,
            titlePage = 'Danh sách sinh viên - ' + subjectName + ' (' + subjectCode + ')';

        $(".header-title[Layout='Detail']").text(titlePage.toLocaleUpperCase());
    }

    // Hàm dùng đối với từng loại toolbar đặc thù
    customToolbarItem(commandName){
        let me = this;

        switch(commandName){
            case "Back":
                me.back();
                break;
            case "Accept":
                me.accept();
                break;
            case "Reject":
                me.reject();
                break;
        }
    }

    // Khi bấm vào xem chi tiết
    back(){
        let me = this;

        $("[Layout='Master']").show();
        $("[Layout='Detail']").hide();
        
        me.pageMaster.loadAjaxData();
    }

    // Hàm dùng để cho phép thi
    accept(){
        let me = this,
            record = me.getSelection()[0],
            studentSubjectId = record.Id,
            data = {
                studentSubjectId: studentSubjectId,
                Status: 1
            };

        if(data){
            CommonFn.PostPutAjax("POST", me.config.configUrl.urlChangeStatus, data, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadAjaxData();
                }
            });
        }
    }

    // Hàm dùng để cấm thi
    reject(){
        let me = this,
            record = me.getSelection()[0],
            studentSubjectId = record.Id,
            data = {
                studentSubjectId: studentSubjectId,
                Status: 2
            };

        if(data){
            CommonFn.PostPutAjax("POST", me.config.configUrl.urlChangeStatus, data, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadAjaxData();
                }
            });
        }
    }

    // Nhập khẩu danh sách
    import(){
        this.formImport.show();
    }

    // Custom các button bị disable
    getCustomToolbarDisable(listItemDisable){
        let me = this,
            records = me.getSelection();

        if(records.length == 1 && records[0].Status == 1){
            listItemDisable.push("Accept");
        }else if(records.length == 1 && records[0].Status == 2){
            listItemDisable.push("Reject");
        }else{
            listItemDisable.push("Accept");
            listItemDisable.push("Reject");
        }

        return listItemDisable;
    }
}





