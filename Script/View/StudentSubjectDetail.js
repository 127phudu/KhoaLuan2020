// Trang danh sách sinh viên chi tiết
class StudentSubjectDetail extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId) {
        super(gridId, toolbarId);

        this.pageMaster = null;
        this.masterId = null;
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new StudentSubjectDetailForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.StudentSubjectDetail.urlGetData,
                urlCreate: mappingApi.StudentSubjectDetail.urlCreate,
                urlUpdate: mappingApi.StudentSubjectDetail.urlUpdate,
                urlDelete: mappingApi.StudentSubjectDetail.urlDelete,
                urlCheckDuplicate: mappingApi.StudentSubjectDetail.urlCheckDuplicate,
                urlChangeStatus: null,
                urlCheckExistItem: null
            },
            role: "Admin",
            entityName: "Rooms",
            formTitle:"Sinh viên"
        };

        return object;
    }

    //Hàm load dữ liệu
    loadAjaxData(masterData){
        let me = this,
            periodExamId = localStorage.getItem("PeriodExamId"),
            listSubjectId = masterData ? masterData.Id : me.masterId,
            data = {
                PeriodExamId: periodExamId,
                ListSubjectId: listSubjectId
            };

        // Gán masterId lưu lại dùng 
        me.masterId = masterData ? masterData.Id : me.masterId;

        if(me.config.configUrl.urlGetData && periodExamId){
            CommonFn.PostPutAjax("POST", me.config.configUrl.urlGetData, data, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.Data);
                }
            });
        }
    }

    // Hiển thị khi từ màn hình cha truyền vào
    show(masterData){
        let me = this;

        me.configTitlePage(masterData);

        //me.loadAjaxData(masterData);
        me.loadAjaxDataFake();
    }

    // Thiết lập tiêu đề cho trang
    configTitlePage(masterData){
        let me = this,
            subjectName = masterData.SubjectName,
            subjectCode = masterData.SubjectCode,
            titlePage = 'Danh sách sinh viên - ' + subjectName + ' (' + subjectCode + ')';

        $(".header-title[Layout='Detail']").text(titlePage.toLocaleUpperCase());
    }

    // Sau này xóa
    loadAjaxDataFake(){
        let me = this;

        me.loadData(studentSubjects);
        me.listFakeData = studentSubjects;
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
        
        //me.pageMaster.loadAjaxData();
        me.pageMaster.loadData(listSubjects); // sau này xóa
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





