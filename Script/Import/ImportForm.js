// Form nhập khẩu
class ImportForm{

    // Hàm khởi tạo
    constructor(jsCaller, idForm){
        this.form = $(idForm);
        this.jsCaller = jsCaller;

        this.initEvent();
    }

    // Khởi tạo các sự kiện
    initEvent(){
        let me = this;

        me.form.draggable();

        me.form.find(".btn-save").off("click");
        me.form.find(".btn-cancel").off("click");
        
        me.form.find(".btn-save").on("click",me.save.bind(me));
        me.form.find(".btn-cancel").on("click",me.close.bind(me));
        me.form.find(".download-file").on("click", me.downloadFile.bind(me));

        me.form.find('input[type="file"]').change(function(e){
            var fileName = e.target.files[0].name;

            me.form.find(".file-name").text(fileName);
            me.form.find(".btn-save").removeClass("disable-button");
        });
    }

    // Hàm dùng tải file mẫu về
    downloadFile(){
        let me = this;

    }
    
    // Cất dữ liệu
    save(){
        let me = this;

        me.saveChangeData(); 
        me.close();
    }

    // Lưu dữ liệu vào DB
    saveChangeData(data){
        let me = this,
            entityName = me.jsCaller.config.entityName;

            CommonFn.PostPutAjax("POST", mappingApi[entityName].urlCreate, data, function(response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.showMessageSuccess();
                    me.jsCaller.loadAjaxData();
                }
            });
    }

    // Hiển thị thông báo cất thành công
    showMessageSuccess(customMessage){
        let message = customMessage || "Cất dữ liệu thành công!";

        $("#success-alert strong").text(message);

        $("#success-alert").fadeTo(1500, 500).slideUp(500, function(){
            $("#success-alert").slideUp(500);
        });
    }

    // Hàm hiển thị form
    show(){
        this.form.parent().show();
    }

    // Đóng form
    close(){
        this.resetFormData();
        $(".wrapper-form").hide();
    }

    // Xóa dữ liệu form
    resetFormData(){
        this.form.find(".file-name").text("");
        this.form.find('input[type="file"]').val(null);
        this.form.find(".btn-save").addClass("disable-button");
    }
}