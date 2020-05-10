class BaseGrid extends Grid{
    // Hàm khởi tạo grid
    constructor(gridId, toolbarId){
        super(gridId, toolbarId);

        this.editMode = null;
        this.formDetail = null;
        this.recordCache = {};
        this.config = this.getConfig();
        this.listFakeData = null; // Sau này xóa bỏ
        //this.checkRoleUser(); Tạm thời comment
        this.initEvent();
    }

    // Kiểm tra quyền truy cập
    checkRoleUser(){
        let role = localStorage.getItem("Role");
        
        if(!this.config.role || this.config.role != role){
            window.location.replace(Constant.url["Login"]);
        }
    }

     // Khởi tạo các sự kiện
     initEvent(){
        super.initEvent();

        let me = this;
        
        // Khởi tạo sự kiện cho toolbar
        me.initEventToolbar();
        // Khởi tạo sự kiện cho phần tử khác
        me.initEventElement();
    }

    // Khởi tạo sự kiện cho toolbar
    initEventToolbar(){
        var me = this;

        me.toolbar.find("[CommanName]").off("click");
        me.toolbar.find("[CommanName]").on("click", function(){
            let commandName = $(this).attr("CommanName");
            switch(commandName){
                case "Add":
                    me.add();
                    break;
                case "Edit":
                    me.edit();
                    break;
                case "Delete":
                    me.delete();
                    break;
                case "Import":
                    me.import();
                    break;
                case "Export":
                    me.export();
                    break;
                default:
                    me.customToolbarItem(commandName);
            }
        });
    }

    // Khởi tạo các sự kiện cho các phần tử
    initEventElement(){
        let me = this;

        // Nếu chọn ô input thì mặc định bôi đen văn bản
        $("input").focus(function(){
            $(this).select();
        });

        // Thêm datepicker cho ô input chọn ngày tháng
        $(".datepicker").datepicker({ dateFormat: 'dd/mm/yy' });

        // Hiển thị các tooltip
        $(document).tooltip({track: true});

        // Khởi tạo combobox
        $(".combox-select").selectmenu();

        // Khi xóa
        $("#btn-Delete").off('click');
        $("#btn-Delete").on("click",function(){
            //me.executeDelete();
            me.executeDeleteFake(); // sau này xóa bỏ
        });
    }

    // Sau này xóa bỏ
    executeDeleteFake(){
        let me = $("#myModal").data("gridFocus"),
            listData = me.getSelection(),
            listId = [];

        listData.filter(function(item){
            listId.push(item.Id);
        });

        me.listFakeData = me.listFakeData.filter(function(item){
            return !listId.includes(item.Id);
        });

        $("#myModal").modal("hide");
        me.loadData(me.listFakeData);
    }

    // Hàm thực hiện xóa bản ghi
    executeDelete(){
        let me = this,
            listData = me.getSelection(),
            listId = [];

        listData.filter(function(item){
            listId.push(item.Id);
        });

        CommonFn.PostPutAjax("POST", me.config.configUrl.urlDelete, listId, function(response) {
            if(response.status == Enum.StatusResponse.Success){
                $("#myModal").modal("hide");
                me.loadAjaxData();
            }
        });
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this;

        if(me.config.configUrl.urlGetData){
            // Ajax load data
            CommonFn.GetAjax(me.config.configUrl.urlGetData, function (response) {
                me.loadData(response);
            });
        }
    }

    // Đổ dữ liệu vào grid
    loadData(data){
        super.loadData(data);
    }

    // Hàm tạo một số mặc định khi thêm mới
    initAddNew(){
        return {};
    }

    // Hàm thêm mới
    add(){
        this.editMode = Enum.EditMode.Add;

        if(this.formDetail){
            this.recordCache = this.initAddNew();
            this.formDetail.show();
        }
    }

    // Sửa giữ liệu
    edit(){
        this.editMode = Enum.EditMode.Edit;

        let data = this.getSelection()[0];
        if(data && this.formDetail){
            this.recordCache = data;
            this.formDetail.show(data);
        }
    }

    // Hàm xóa
    delete(){
        this.editMode = Enum.EditMode.Delete;
        $("#myModal").modal("show");
        $("#myModal").data("gridFocus",this);
    }
    
    // Hàm lấy config
    getConfig(){return null;}
    // Nhập khẩu
    import(){}
    // Xuất khẩu
    export(){}
    // Hàm dùng đối với từng loại toolbar đặc thù
    customToolbarItem(commandName){}
}