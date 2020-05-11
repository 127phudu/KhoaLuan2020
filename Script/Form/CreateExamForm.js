// Form thêm , sửa, xóa lịch thi
class CreateExamForm extends BaseForm {

    // Hàm khởi tạo
    constructor(jsCaller, idForm, width, height, title){
        super(jsCaller, idForm, width, height, title);

        this.initEventOther();
    }

    // Kiểm tra xem đã đúng validate chưa
    checkStatusInput(){
    }

    // Khởi tạo một số sự kiện khác
    initEventOther(){
        let me = this;

        $('input.timepicker').timepicker({});
    }
}





