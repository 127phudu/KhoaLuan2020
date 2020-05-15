// Form thêm , sửa, xóa lịch thi
class CreateExamForm extends BaseForm {

    // Hàm khởi tạo
    constructor(jsCaller, idForm, width, height, title){
        super(jsCaller, idForm, width, height, title);

        this.initEventOther();
    }

    // Khởi tạo một số sự kiện khác
    initEventOther(){
        let me = this;

        this.form.find("[ComboboxName]").on('selectmenuchange', this.checkStatusInput);
        
        // Thêm timepicker cho ô nhập giờ
        $('input.timepicker').timepicker({
            change: function(){
                $(this).parent().removeClass("error-validate");
            }
        });

    }

    // Tạo các combo dữ liệu
    buildEnumDynamic(){
        let me = this;

        // CommonFn.GetAjax(mappingApi.Subject.urlGetData, function (response) {
        //     me.renderComboboxExam(response, "#ChooseSubjectCombo", "SubjectName");
        // });

        // CommonFn.GetAjax(mappingApi.Room.urlGetData, function (response) {
        //     me.renderComboboxExam(response, "#ChooseRoomCombo", "RoomName");
        // });
        
        me.renderComboboxExam(subjects, "ChooseSubject", "SubjectName");
        me.renderComboboxExam(rooms, "ChooseRoom", "RoomName");
    }

    // Render dữ liệu combo
    renderComboboxExam(listData, comboboxName, fieldName){
        let me = this,
            combo = $("[ComboboxName='"+ comboboxName +"'");

        if(listData && listData.length > 0){

            combo.html("");

            listData.filter(function(item){
                let option = $("<option value='2'></option>");

                option.text(item[fieldName]);
                option.attr("value", item.Id);
                combo.append(option);
            });

            if(me.jsCaller.editMode == Enum.EditMode.Edit){
                let field = (fieldName == "RoomName") ? "RoomId" : "SubjectId",
                    value = me.jsCaller.recordCache[field];

                combo.val(value).selectmenu("refresh");
            }
        }
    }

    // Xóa dữ liệu form
    resetFormData(){
        this.form.find("[SetField]").each(function(){
            $(this).val("");
        });
        this.form.find(".error-validate").removeClass("error-validate");
        this.form.find("[ComboboxName]").selectmenu('destroy').selectmenu({ style: 'dropdown' });
    }
}





