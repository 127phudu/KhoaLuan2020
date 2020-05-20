// Form chọn học phần
class ChooseSubjectForm extends BaseDetail {

    // Hàm khởi tạo
    constructor(formId, gridId, toolbarId, jsCaller, width, height){
        super(formId, gridId, toolbarId, jsCaller, width, height);
    }

    //override: Thiết lập các config
    getConfig() {
        let object = {
            entityName: "Subjects"
        };

        return object;
    }
}





