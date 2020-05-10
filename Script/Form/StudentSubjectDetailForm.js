// Form thêm , sửa, xóa sinh viên thuộc học phần
class StudentSubjectDetailForm extends BaseForm {

    // Hàm khởi tạo
    constructor(jsCaller, idForm, width, height, title){
        super(jsCaller, idForm, width, height, title);
    }

    // Thực hiện check trùng
    executeCheckDuplicate(value, setField){
        let me = this,
            isDuplicate = false,
            data = {
                value: value,
                id: me.jsCaller.masterId
            };

        CommonFn.PostPutAjax("POST", me.jsCaller.config.configUrl.urlCheckDuplicate, data, function(response) {
            if(response.status == Enum.StatusResponse.Success){
                isDuplicate = response.data;
            }
        }, false);
        
        return isDuplicate;
    }

    // Validate từng phần tử
    validateItem(value, setField){
        let me = this;

        switch(setField){
            case "StudentCode": // Mã sinh viên
                return me.validateStudentCode(value);
            default:
                return {isValid: true};
        }
    }

    // Validate Mã sinh viên kiểm tra xem tồn tại không hệ thống không
    validateStudentCode(value){
        let me = this,
            isExist = false;

        CommonFn.PostPutAjax("POST", me.jsCaller.config.configUrl.urlCheckExistItem, data, function(response) {
            if(response.status == Enum.StatusResponse.Success){
                isExist = response.data;
            }
        }, false);

        if(!isExist){
            result.isValid = false;
            result.tooltip = "Mã sinh viên không tồn tại!";
        }else{
            result.isValid = true;
        }

        return result;
    }

    // Dùng để mapping dữ liệu
    mappingData(source, destination){
        let me = this;

        source.MasterId = me.jsCaller.masterId;

        return source;
    }
}





