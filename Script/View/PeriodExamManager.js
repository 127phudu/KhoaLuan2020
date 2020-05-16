// Trang quản lý kì thi
class PeriodExamManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId) {
        super(gridId, toolbarId, pagingId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new PeriodExamForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            role: "Admin",
            entityName: "PeriodExams",
            formTitle:"Kì thi"
        };

        return object;
    }

    //override: Tạo một số thuộc tính mặc định khi thêm mới
    initAddNew(){
        return {
            Status: 1
        };
    }

    // Custom các button bị disable
    getCustomToolbarDisable(listItemDisable){
        let me = this,
            records = me.getSelection();

        if(records.length == 1 && records[0].Status == 1){
            listItemDisable.push("DoneRegister");
        }else if(records.length == 1 && records[0].Status == 2){
            listItemDisable.push("StartRegister");
        }else{
            listItemDisable.push("DoneRegister");
            listItemDisable.push("StartRegister");
        }

        return listItemDisable;
    }
}

    // Khởi tạo trang quản lý Kì thi
var periodExamManagerPage = new PeriodExamManagerPage("#GridPeriodExam", "#ToolbarGridPeriodExam", "#paging-GridPeriodExam");
    // Tạo một form detail
    periodExamManagerPage.createFormDetail("#formPeriodExam", 500, 235);
    // Load dữ liệu cho grid 
    periodExamManagerPage.loadAjaxData();


    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);





