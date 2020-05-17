class BaseGrid extends Grid{
    // Hàm khởi tạo grid
    constructor(gridId, toolbarId, pagingId){
        super(gridId, toolbarId);

        this.editMode = null;
        this.formDetail = null;
        this.recordCache = {};
        this.paging = pagingId ? $(pagingId) : pagingId;
        this.config = this.getConfig();

        this.exeInitFunction();
    }

    // Một số hàm được chạy lần đầu khi khởi tạo
    exeInitFunction(){
        let me = this;
        
        me.checkRoleUser(); 
        me.initEvent();
        me.getDataComboExam();
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
        $("input").on("focus",function(){
            $(this).select();
        });

        // Hiển thị các tooltip
        $(document).tooltip({track: true});

        // Khởi tạo combobox
        $(".combox-select").selectmenu();

        // Khi xóa
        $("#btn-Delete").off('click');
        $("#btn-Delete").on("click",function(){
            me.executeDelete();
        });

        if(me.paging){
            me.paging.find(".page-number").change(me.changePageNumber.bind(me));
            me.paging.find(".page-Size").change(me.changePageSize.bind(me));
            me.paging.find(".icon-paging").click(function(){
                me.buttonPagingClick($(this));
            });
        }
    }
    
    // Lấy dữ liệu combo kì thi
    getDataComboExam(){
        let me = this,
            comboExam = $("#chooseExam");

        if(comboExam.length){
            let url = mappingApi.Semesters.urlGetData,
                urlFull = url + Constant.urlPaging.format(1000, 1);

            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.renderComboExam(response.data.Semesters);
                }
            });
        }
    }

    // Render dữ liệu combo
    renderComboExam(listData){
        let me = this,
            comboExam = $("#chooseExam"),
            periodExamId = localStorage.getItem("PeriodExamId");

        if(listData && listData.length > 0){

            comboExam.html("");

            listData.filter(function(item){
                let option = $("<option value='1'></option>");

                option.text(item.SemesterName);
                option.attr("value", item.Id);
                comboExam.append(option);
            });

            if(!periodExamId){
                periodExamId = listData[0].Id;
                localStorage.setItem("PeriodExamId", periodExamId);
            }

            me.loadAjaxData();

            comboExam.val(periodExamId).selectmenu("refresh");
        }
    }

    // Hàm thực hiện xóa bản ghi
    executeDelete(){
        let me = $("#myModal").data("gridFocus"),
            entityName = me.config.entityName,
            records = me.getSelection(),
            data = [];

        records.filter(function(item){
            data.push(item.Id);
        });

        CommonFn.PostPutAjax("DELETE", mappingApi[entityName].urlDelete, data, function(response) {
            if(response.status == Enum.StatusResponse.Success){
                $("#myModal").modal("hide");
                me.editMode = Enum.EditMode.View;
                me.showMessageSuccess("Xóa dữ liệu thành công");
                me.loadAjaxData();
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

    // Thay đổi kích thước một trang
    changePageSize(){
        let me = this;
        
        me.paging.find(".page-number").val(1);
        me.loadAjaxData();
    }

    // Thay đổi giá trị của số trang
    changePageNumber(){
        let me = this,
            inputField = me.paging.find("input.page-number"),
            value = inputField.val(),
            total = parseInt(me.paging.find(".totalPage").text()),
            patt = new RegExp("^[0-9]*$");

            if(value && !patt.test(value)){
                inputField.val(1);
            }else if(total < parseInt(value)){
                inputField.val(total);
            }

        me.loadAjaxData();
    }

    //Hàm load dữ liệu
    loadAjaxData(){
        let me = this,
            entityName = me.config.entityName,
            url = mappingApi[entityName].urlGetData,
            paramPaging = me.getParamPaging(),
            urlFull = url + Constant.urlPaging.format(paramPaging.Size, paramPaging.Page);

        $(".grid-wrapper").addClass("loading");

        if(url && entityName){
            CommonFn.GetAjax(urlFull, function (response) {
                if(response.status == Enum.StatusResponse.Success){
                    me.loadData(response.data[entityName]);
                    me.resetDisplayPaging(response.data.Page);
                    me.editMode = Enum.EditMode.View;
                    $(".grid-wrapper").removeClass("loading");
                }
            });
        }
    }
    
    // Lấy tham số paging
    getParamPaging(){
        let me = this,
            pagingConfig = {Size: 1000, Page: 1},
            paging = me.paging;
        
        if(paging){
            let pageNumber = parseInt(paging.find("input").val()),
                pageSize = parseInt(paging.find("select").val());

            pagingConfig.Size = pageSize;
            pagingConfig.Page = pageNumber;
        }

        return pagingConfig;
    }

    // Đổ dữ liệu vào grid
    loadData(data){
        super.loadData(data);
    }

    // Reset thông tin phân trang
    resetDisplayPaging(data){
        let me = this,
            page = data.Page,
            size = data.Size,
            total = data.Total,
            sumPage = Math.round(total/size),
            start = 0,
            end = 0;

        if(me.paging){
            start = (page - 1)*size + 1;
            if(start > total){
                start = total;
            }
    
            end = start + size - 1;
            if(end > total){
                end = total;
            }
    
            sumPage = (sumPage*size < total) ? sumPage + 1 : sumPage;

            me.paging.find(".icon-paging").removeClass("iconPaging-disable");

            if(page == 1){
                me.paging.find(".icon-first, .icon-pre").addClass("iconPaging-disable");
            }
            
            if(page == sumPage){
                me.paging.find(".icon-next, .icon-last").addClass("iconPaging-disable");
            }

            me.paging.find(".startIndex").text(start);
            me.paging.find(".end-Index").text(end);
            me.paging.find(".total-record").text(total);
            me.paging.find(".totalPage").text(sumPage);
        }
    }

    // Xử lý khi click vào phân trang
    buttonPagingClick(button){
        let me = this,
            className = button.attr("class").replace("icon-paging ",""),
            pageNumer = parseInt(me.paging.find("input").val()),
            totalPage = parseInt(me.paging.find(".totalPage").text());

            switch(className){
                case "icon-first":
                    pageNumer = 1;
                    break;
                case "icon-pre":
                    pageNumer -= 1;
                    break;
                case "icon-next":
                    pageNumer += 1;
                    break;
                case "icon-last":
                    pageNumer = totalPage;
                    break;
            }

        me.paging.find("input").val(pageNumer);
        me.loadAjaxData();
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