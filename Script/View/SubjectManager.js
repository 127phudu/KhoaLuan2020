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
                urlGetData: null,
                urlCreate: null,
                urlUpdate: null,
                urlDelete: null,
                urlCheckDuplicate: null
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
// Load dữ liệu cho grid ( sau này sẽ bỏ đi để dùng ajax)
    subjectManagerPage.loadData(subjects);
    subjectManagerPage.listFakeData = subjects;




