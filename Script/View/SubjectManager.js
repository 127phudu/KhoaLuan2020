// Trang quản lý Học phần
class SubjectManagerPage extends BaseGrid {

    // Hàm khởi tạo grid
    constructor(gridId) {
        super(gridId);
    }
    
    // Tạo form detail
    createFormDetail(formID, width, height){
        this.formDetail = new SubjectForm(this, formID, width, height, this.config.formTitle);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            configUrl: {
                urlGetData: mappingApi.Subject.urlGetData,
                urlCreate: mappingApi.Subject.urlCreate,
                urlUpdate: mappingApi.Subject.urlUpdate,
                urlDelete: mappingApi.Subject.urlDelete,
                urlCheckDuplicate: mappingApi.Subject.urlCheckDuplicate
            },
            role: "Admin",
            entityName: "Subjects",
            formTitle:"Học phần"
        };

        return object;
    }
}

    // Khởi tạo trang quản lý Học phần
var subjectManagerPage = new SubjectManagerPage("#GridSubject");
    // Tạo một form detail
    subjectManagerPage.createFormDetail("#formSubject", 500, 185);
    // Khởi tạo form thay đổi mật khẩu
var changePasswordForm = new ChangePasswordForm(null, "#formChangePassword", 500, 233, null);
    // Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    subjectManagerPage.loadData(subjects);
    subjectManagerPage.listFakeData = subjects;




