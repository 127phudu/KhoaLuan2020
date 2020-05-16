// Trang danh sách sinh viên chi tiết - kết quả đăng ký thi
class ExamRegisterResultDetail extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);

        this.pageMaster = null;
        this.masterId = null;
    }
    
    //override: Thiết lập các config
    getConfig() {
        let object = {
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

        me.loadAjaxData(masterData);
    }

    // Thiết lập tiêu đề cho trang
    configTitlePage(masterData){
        let me = this,
            subjectName = masterData.SubjectName,
            subjectCode = masterData.SubjectCode,
            roomName = masterData.RoomName,
            titlePage = 'Danh sách sinh viên - ' + roomName + ' : ' + subjectName + ' (' + subjectCode + ')';

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
        }
    }

    // Khi bấm vào xem chi tiết
    back(){
        let me = this;

        $("[Layout='Master']").show();
        $("[Layout='Detail']").hide();
        
        me.pageMaster.loadAjaxData();
    }
}





