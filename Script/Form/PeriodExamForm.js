// Form thêm , sửa, xóa kì thi
class PeriodExamForm extends BaseForm {

    // Hàm khởi tạo
    constructor(jsCaller, idForm, width, height, title){
        super(jsCaller, idForm, width, height, title);
    }

    // Validate từng phần tử
    validateItem(value, setField){
        let me = this;

        switch(setField){
            case "StartDate": // Ngày bắt đầu đăng ký
                return me.validateStartDate(value);
            default:
                return {isValid: true};
        }
    }

    // Validate ngày bắt đầu phải nhỏ hơn hoặc bằng kết thúc
    validateStartDate(value){
        let result = {},
            endDate = $("input[SetField='EndDate']").val();

        if(endDate && convertDate(value) > convertDate(endDate)){
            result.isValid = false;
            result.tooltip = "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!";
        }else{
            result.isValid = true;
        }

        return result;
    }

    // Tạo các combo dữ liệu
    buildEnumDynamic(){
        
    }
}





