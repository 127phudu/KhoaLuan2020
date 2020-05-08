class BaseGrid extends Grid{
    // Hàm khởi tạo grid
    constructor(gridId){
        super(gridId);

        this.editMode = null;
        this.formDetail = null;
        this.recordCache = {};
        this.config = this.getConfig();
        this.listFakeData = null; // Sau này xóa bỏ
        //this.checkRoleUser(); Tạm thời comment
        this.initEvent();
        //this.loadAjaxData(); Tạm thời comment
    }

    // Kiểm tra quyền truy cập
    checkRoleUser(){
        let role = localStorage.getItem("Role");
        
        if(!this.config.role || this.config.role != role){
            window.location.href = "file:///D:/Project/View/ErrorPage.html";
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

        $(".toolbar-item").click(function(){
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
                case "View":
                    me.view();
                    break;
                case "Print":
                    me.print();
                    break;
                case "DownLoad":
                    me.downLoad();
                    break;
                case "Import":
                    me.import();
                    break;
                case "Export":
                    me.export();
                    break;
                case "Duplicate":
                    me.duplicate();
                    break;
                case "Use":
                    me.use();
                    break;
                case "NotUse":
                    me.notUse();
                    break;
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
        $(".datepicker" ).datepicker({ dateFormat: 'dd/mm/yy' });

        // Hiển thị các tooltip
        $(document).tooltip({track: true});

        // Khởi tạo combobox
        $(".combox-select").selectmenu();

        // Khi xóa
        $("#btn-Delete").click(function(){
            //me.executeDelete();
            me.executeDeleteFake(); // sau này xóa bỏ
        });
    }

    // Sau này xóa bỏ
    executeDeleteFake(){
        let me = this,
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
        let grid = this;

        if(this.config.urlGetData){
            // Ajax load data
            CommonFn.GetAjax(this.config.configUrl.urlGetData, function (response) {
                grid.loadData(response);
            });
        }
    }

    // Đổ dữ liệu vào grid
    loadData(data){
        super.loadData(data);
    }

    // Hàm lấy giá trị các bản ghi đang được chọn
    getSelection(){
        let data = [];
        this.grid.find(".row-focus").each(function(){
            let item = $(this).data("value");
            data.push(item);
        });

        return data;
    }

    // Hàm thêm mới
    add(){
        this.editMode = Enum.EditMode.Add;

        if(this.formDetail){
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
    }
    
    // Hàm lấy config
    getConfig(){
        return null;
    }

    // Hàm xem
    view(){}
    // Hàm in dữ liệu
    print(){}
    // Hàm download
    downLoad(){}
    // Hàm nhập khẩu
    import(){}
    // Hàm xuất khẩu
    export(){}
    // Hàm nhân bản
    duplicate(){}
    // Hàm sử dụng
    use(){}
    // Hàm không sử dụng
    notUse(){}
}