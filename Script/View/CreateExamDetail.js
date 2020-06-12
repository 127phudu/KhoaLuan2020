// Trang tạo lịch thi tự động
class CreateExamDetail {
    constructor(pageMaster) {
        this.pageMaster = pageMaster;

        this.listSubjects = [];
        this.listRooms = [];
        this.listRoomCache = [];
        this.listTimeCache = [];
        this.periodFocusNow = 0;

        this.initEvent();
    }

    // Khởi tạo các sự kiện
    initEvent() {
        let me = this;

        // Cho phép sắp xếp phòng thi
        $(".listRoom").sortable({
            update: function (event, ui) {
                me.updateCacheRoom();
                me.renderPeriod();
            }
        }).disableSelection();

        // Cho phép sắp xếp học phần
        $(".listSubject").sortable({
            update: function (event, ui) {
                me.updateCacheSubject();
                me.renderPeriod();
            }
        }).disableSelection();

        $(".period-sortable").sortable().disableSelection();

        // Sự kiện khi bấm chuột xuống
        $(".period-sortable").mousedown(function () {
            $(".period-focus").removeClass("period-focus");
            $(this).addClass("period-focus");

            me.periodFocusNow = $(this).data("indexPeriod");
            me.renderRooms();
            me.renderPeriod();
        });

        // Sự kiện khi bấm vào icon mắt
        $(".comboSortable").on("click", ".icon-eye span", function () {
            let className = $(this).attr("class"),
                data = $(this).parents(".itemRoom").data("value"),
                isShow = true;

            if (className.indexOf("glyphicon-eye-open") != -1) {
                isShow = false;
            }

            let index = me.getIndexByID(data.RoomId, me.listRoomCache[me.periodFocusNow]);
            me.listRoomCache[me.periodFocusNow][index].IsShow = isShow;
            me.renderPeriod();
            me.renderRooms();
        });

        // Thay đổi giá trị phút
        //me.setEventChangeMinusSubject();
        // Thay đổi giá trị ngày tháng
        //me.setEventChangeTimePeriod();
    }

    // Thực hiện reset dữ liệu
    resetData(){
        let me = this;

        me.listSubjects = [];
        me.listRooms = [];
        me.listRoomCache = [];
        me.listTimeCache = [];
        me.periodFocusNow = 0;
    }

    // Thay đổi giá trị phút
    // setEventChangeMinusSubject(){
    //     let me = this;

    //     $(".listSubject2").on("blur", "input",function(){
    //         let value = $(this).val(),
    //             index = $(this).data("index"),
    //             valuePre = me.listSubjects[index].Minus,
    //             realValue = TryParseInt(value, valuePre);
            
    //             me.listSubjects[index].Minus = realValue;
    //             $(this).val(realValue);

    //         //me.changeAllValueMinus();
    //     });
    // }

    // Thay đổi hàng loạt thời gian
    // changeAllValueMinus(){
    //     let me = this;

    //     $(".listRoom2 input").each(function(index1, va){
    //         let value = $(this).val(),
    //             index = $(this).data("index"),
    //             minutes = me.getMaximunMinus(index),
    //             valuePre = me.listTimeCache[index].StartTime;

    //             if(value){
    //                 me.listTimeCache[index].StartTime = value;
    //                 me.listTimeCache[index].EndTime = addMinutes(value, minutes);
    //                 $(this).parent().next().text(me.listTimeCache[index].EndTime);
    //             }else{
    //                 $(this).val(valuePre);
    //             }
    //     });
    // }

    // Thay đổi giá trị ngày tháng
    // setEventChangeTimePeriod(){
    //     let me = this;

    //     $(".listRoom2").on("change", "input",function(){
    //         let value = $(this).val(),
    //             index = $(this).data("index"),
    //             minutes = me.getMaximunMinus(index),
    //             valuePre = me.listTimeCache[index].StartTime;

    //             if(value){
    //                 me.listTimeCache[index].StartTime = value;
    //                 me.listTimeCache[index].EndTime = addMinutes(value, minutes);
    //                 $(this).parent().next().text(me.listTimeCache[index].EndTime);
    //             }else{
    //                 $(this).val(valuePre);
    //             }
    //     });
    // }

    // Chạy hàm sau khi load xong dữ liệu
    executeBeforeLoadAjax(){
        let me = this;

        me.createCacheList();
        me.renderRooms();
        me.updateColorSubject();
        me.renderSubject();
        me.renderPeriod();
    }

    // Lấy dữ liệu học phần và phòng thi
    buildListDataCache(){
        let me = this,
            semesterId = parseInt(localStorage.getItem("SemesterId")),
            urlDetail = Constant.urlPaging.format(1000, 1),
            urlSubjects = mappingApi.SubjectSemesters.urlGetData.format(semesterId) + urlDetail,
            urlRooms = mappingApi.RoomSetting.urlGetData.format(semesterId) + urlDetail;

        // Render danh sách học phần
        CommonFn.GetAjax(urlSubjects, function (response) {
            if(response.status == Enum.StatusResponse.Success){
                me.listSubjects =  response.data["SubjectSemesters"];
            }
        },false);

        // Render danh sách phòng thi
        CommonFn.GetAjax(urlRooms, function (response) {
            if(response.status == Enum.StatusResponse.Success){
                me.listRooms = response.data["RoomSemesters"];
            }
        },false);

        // Convert dữ liệu
        me.convertData();
    }

    // Thực hiện chuyển đổi dữ liệu
    convertData(){
        let me = this,
            listSub = [],
            listRoom = [];

        // Convert danh sách học phần
        me.listSubjects.filter(function(item, index){
            let obj = {
                SubjectID: item.Id,
                SubjectName: item.SubjectName,
                SubjectCode: item.SubjectCode,
                NumberStudent: item.NumberStudent,
                SortOrder: index,
                Color: null,
                Minus: 60
            };

            listSub.push(obj);
        });

        // Convert danh sách phòng thi
        me.listRooms.filter(function(item, index){
            let obj = {
                RoomId: item.Id,
                RoomName: item.RoomName,
                Location: item.Location,
                NumberComputer: item.NumberOfComputer,
                SortOrder: index,
                IsShow: true
            };

            listRoom.push(obj);
        });

        me.listSubjects = listSub;
        me.listRooms = listRoom;
    }
    
    // load dữ liệu từ DB
    loadAjaxData() {
        let me = this;

        me.buildListDataCache();
        me.executeBeforeLoadAjax();
    }
    
    // Hiển thị trang detail
    show() {
        let me = this;

        me.loadAjaxData();
    }

    // Cất dữ liệu
    save() {
        let me = this,
            isValid = me.validateBeforeSave();

        if(isValid){
            me.doSaveData();
        }
    }

    // Thực hiện cất dữ liệu
    doSaveData(){
        let me = this,
            data = me.geSubmitData();

        if(data.length > 0){
            let semesterId = parseInt(localStorage.getItem("SemesterId")),
                url = mappingApi.CreateExams.urlCreate.format(semesterId);

                CommonFn.PostPutAjax("POST",url, data, function(response) {
                    if(response.status == Enum.StatusResponse.Success){
                        me.showMessageSuccess("Cất dữ liệu thành công");
                    }
                });
        }
    }

    // Lấy dữ liệu trước khi lưu
    geSubmitData(){
        let me = this,
            listDataSubmit = [];

        $(".content-header .item-number").each(function(inde, val){
            let sumStudent = $(this).data("sumStudent"),
                room = $(this).data("room"),
                subject = $(this).data("subject"),
                indexPeriod =  $(this).data("indexPeriod");

            if(sumStudent){
                let obj = {
                    NumberOfStudent: sumStudent,
                    StartTime: me.listTimeCache[indexPeriod].StartTime,
                    EndTime: me.listTimeCache[indexPeriod].EndTime,
                    SubjectSemesterId: subject.SubjectID,
                    RoomSemesterId: room.RoomId,
                    Date: me.listTimeCache[indexPeriod].StartTime.substr(0,10)
                };

                listDataSubmit.push(obj);
            }
        });

        return listDataSubmit;
    }

    // Hàm sau khi save thành công
    affterSaveCallBack(){
        let me = this.pageMaster;

        $("[Layout='Master']").show();
        $("[Layout='Detail']").hide();
        me.editMode = Enum.EditMode.View;
        me.setStatusToolbar();
        me.loadAjaxData();
    }

    // Cập nhật các phòng thi
    updateCacheRoom() {
        let dataArr = [],
            me = this;

        $(".listRoom .itemRoom").each(function (index, item) {
            let dataRow = $(this).data("value");
            dataRow.SortOrder = index + 1;
            dataArr.push(dataRow);
            $(this).data("value", dataRow);
        });

        me.listRoomCache[me.periodFocusNow] = dataArr;
    }

    // Render các ca thi
    renderPeriod() {
        let me = this,
            listSubjects = me.listSubjects,
            sumStudent = sumArrObject(listSubjects, "NumberStudent"),
            sumComputer = me.getSumRoomBlank(sumStudent),
            sumPeriod = Math.round(sumStudent / sumComputer) + 2;

        me.renderPeriodBlank(sumPeriod);
        me.fillStudentInPeriod();
    }

    // Lấy tổng phòng trống
    getSumRoomBlank(sumStudent) {
        let me = this,
            sumRoom = 0,
            listRoomCache = me.listRoomCache,
            index = 0;

        for (var i = 0; i < listRoomCache.length; i++) {
            index++;

            for (var j = 0; j < listRoomCache[i].length; j++) {
                let room = listRoomCache[i][j];

                if (room.IsShow) {
                    sumRoom += room.NumberComputer;
                }
            }

            if (sumRoom >= sumStudent) {
                break;
            }
        }

        return Math.round(sumRoom / index);
    }

    // Render các phòng rỗng
    renderPeriodBlank(sumPeriod) {
        let me = this,
            listRoomCache = me.listRoomCache,
            periodFocusNow = me.periodFocusNow;

        $(".content-header").html("");

        for (var i = 0; i < sumPeriod; i++) {
            let element = $(".period-clone .item-rooms").clone(true);

            listRoomCache[i].filter(function (item) {
                if (item.IsShow) {
                    let elementBox = $("<li class='backgound-brown item-number'><span class='numberReal'></span><span class='numberBlank'></span></li>");
                    elementBox.find(".numberBlank").text(item.NumberComputer);
                    elementBox.find(".numberReal").text(0);
                    elementBox.data("room", item);
                    elementBox.data("indexPeriod", i);
                    element.find(".item-period").append(elementBox);
                }
            });

            element.find(".item-period").data("indexPeriod", i);
            element.find(".periodNumber").text(i + 1);

            $(".content-header").append(element);
        }

        $(".content-header .period-sortable").eq(periodFocusNow).addClass("period-focus");
    }

    // Điền đầy đủ sinh viên vào từng phòng
    fillStudentInPeriod() {
        let index = 0,
            me = this,
            listSubjects = me.listSubjects,
            elementBoxs = $(".content-header .item-number");

        listSubjects.filter(function (subject, subjectIndex) {
            var numberStudent = subject.NumberStudent,
                sumBox = 0;

            for (var j = index; j < elementBoxs.length; j++) {
                let numberComputer = parseInt($(elementBoxs[j]).find(".numberBlank").text());

                sumBox += numberComputer;

                $(elementBoxs[j]).css("background-color", subject.Color);
                $(elementBoxs[j]).data("subject", subject);
                $(elementBoxs[j]).data("subjectIndex", subjectIndex);
                
                index++;

                if (sumBox >= numberStudent) {
                    $(elementBoxs[j]).data("sumStudent",numberComputer - (sumBox - numberStudent));
                    $(elementBoxs[j]).find(".numberReal").text(numberComputer - (sumBox - numberStudent));
                    break;
                }else{
                    $(elementBoxs[j]).data("sumStudent",numberComputer);
                    $(elementBoxs[j]).find(".numberReal").text(numberComputer);
                }
            }
        });
    }

    // Render danh sách các phòng thi
    renderRooms() {
        let me = this,
            listRoomCache = me.listRoomCache,
            periodFocusNow = me.periodFocusNow,
            listRooms = listRoomCache[periodFocusNow];

        $(".listRoom").html("");

        listRooms.filter(function (item) {
            let element = $(".room-clone .itemRoom").clone(true);

            element.find(".item-name").text(item.RoomName);
            element.find(".item-location").text(item.Location);
            element.find(".item-count").text(item.NumberComputer);
            element.data("value", item);

            if (!item.IsShow) {
                element.find(".glyphicon").attr("class", "glyphicon glyphicon-eye-close");
                element.find(".glyphicon").parents(".itemRoom").addClass("disable-item");
            }

            $(".listRoom").append(element);
        });
    }

    // Render danh sách các học phần
    renderSubject() {
        let me = this,
            listSubjects = me.listSubjects;

        $(".listSubject").html("");

        listSubjects.filter(function (item) {
            let element = $(".subject-clone .itemSubject").clone(true);

            element.find(".item-name").text(item.SubjectName);
            element.find(".item-code").text(item.SubjectCode);
            element.find(".item-count").text(item.NumberStudent);
            element.find(".numberMinus").val(item.Minus);
            element.find(".square-color").css("background-color", item.Color);

            element.data("value", item);

            $(".listSubject").append(element);
        });
    }

    // Kiểm tra hai khoảng thời gian xem có bị giao nhau không
    checkValidTwoDateRange(Range1, Range2){
        let start1 = convertDate(Range1.StartTime),
            end1 = convertDate(Range1.EndTime),
            start2 = convertDate(Range2.StartTime),
            end2 = convertDate(Range2.EndTime);

        if(start1 > end2 || end1 < start2){
            return true;
        }

        return false;
    }

    // Validate trước khi cất
    validateBeforeSave(){
        let me = this,
            isValid = me.validateSubject(); // Validate học phần

        if(isValid){
            isValid = me.validateTime(); // Validate thời gian
        }

        if(isValid){
            isValid = me.validateDateRequire(); // Validate thời gian cần nhập đủ
        }

        if(isValid){
            isValid = me.validateTimeRange(); // Validate khoảng thời gian cần hợp lệ
        }

        return isValid;
    }

    // Validate list time
    // validateTimeRange(){
    //     let me = this,
    //         isValid = true,
    //         check = true,
    //         length = $(".listRoom2 .itemRoom2").length;

    //     for(var i = 0; i < length - 1; i++){
    //         for(var j = i + 1; j < length; j++){
    //             check = me.checkValidTwoDateRange(me.listTimeCache[i], me.listTimeCache[j]);

    //             if(check == false){
    //                 isValid = false;
    //                 me.showMessageError("Thời gian không hợp lệ!");
    //                 break;
    //             }
    //         }
    //     }

    //     return isValid;
    // }

    // Validate cần phải thiết lập thời gian
    validateTime(){
        let me = this,
            isValid = true;

        if(me.listTimeCache[0].StartTime == ""){
            isValid = false;
            me.showMessageError("Vui lòng thiết lập thời gian!");
        }

        return isValid;
    }

    // Validate học phần
    validateSubject(){
        let me = this,
            isValid = true;

        if(me.listSubjects.length == 0){
            isValid = false;
            me.showMessageError("Không có học phần nào cho kì thi!");
        }

        return isValid;
    }

    // Hiển thị thông báo cất thành công
    showMessageSuccess(customMessage){
        let message = customMessage || "Cất dữ liệu thành công!";

        $("#success-alert strong").text(message);

        $("#success-alert").fadeTo(2500, 800).slideUp(800, function(){
            $("#success-alert").slideUp(800);
        });
    }

    // Hiển thị thông báo cất thành công
    showMessageError(customMessage){
        let message = customMessage || "Đã có lỗi xảy ra!";

        $("#error-alert strong").text(message);

        $("#error-alert").fadeTo(2500, 800).slideUp(800, function(){
            $("#error-alert").slideUp(800);
        });
    }

    // Validate các thông tin thời gian
    // validateDateRequire(){
    //     let me = this,
    //         isValid = true;

    //     $(".listRoom2 input").each(function(index, value){
    //         let val = $(this).val();

    //         if(!val){
    //             isValid = false;
    //             me.showMessageError("Vui lòng điền đầy đủ thời gian!");
    //         }
    //     });

    //     return isValid;
    // }

    // Render bảng thời gian của các ca thi
    // renderPeriodTime(){
    //     let me = this;

    //     $(".listRoom2").html("");

    //     $(".content-header .item-rooms").each(function(index, value){
    //         let itemRoom = $(this).find(".item-number").eq(0),
    //             data = itemRoom.data("subject");

    //         if(data){

    //             let element = $(".roomTime-clone2 .itemRoom2").clone(true),
    //                 periodIndex = index + 1;

    //             element.find(".item-name").text("Ca " + periodIndex);
    //             element.find("input").attr("class","classDatepicker" + periodIndex);
    //             element.find("input").data("index", index);
    //             element.find("input").val(me.listTimeCache[index].StartTime);
    //             element.find(".item-endTime").text(me.listTimeCache[index].EndTime);

    //             $(".listRoom2").append(element);

    //             $(".classDatepicker" + periodIndex).datetimepicker({
    //                 format:'d/m/Y H:i',
    //                 defaultTime:'07:00',
    //                 step:30,
    //                 timeFormat: 'HH:mm'
    //             });
    //         }
    //     });
    // }

    // Hàm lấy số phút tối đa
    getMaximunMinus(index){
        let me = this,
            maxValue = 0;

        $(".content-header .item-period").eq(index).find(".item-number").each(function(indexItem, value){
            let subjectIndex = $(this).data("subjectIndex");

            if(subjectIndex != null){
                let valueMinus = me.listSubjects[subjectIndex].Minus;

                if(valueMinus > maxValue){
                    maxValue = valueMinus;
                }
            }
        });

        return maxValue;
    }

    // Cập nhật cache học phần
    updateCacheSubject(){
        let me = this,
            dataArr = [];
    
        $(".listSubject .itemSubject").each(function(index, item){
            let dataRow = $(this).data("value");
            dataRow.SortOrder = index + 1;
            dataArr.push(dataRow);
            $(this).data("value", dataRow);
        });
    
        me.listSubjects = dataArr;
    }

    // Tạo cache lưu phòng
    createCacheList(){
        let me = this,
            listRooms = me.listRooms;

        me.listRoomCache = [];
    
        for(var i = 0; i < listRooms.length*2 ; i++){
            var obj = JSON.parse(JSON.stringify(listRooms)),
                objTime = {
                    StartTime: "",
                    EndTime: ""
                };
            
            me.listTimeCache.push(objTime);
            me.listRoomCache.push(obj);
        }
    }

    // Lấy object theo ID
    getIndexByID(ID, list){
        let index = 0;
    
        for(var i = 0; i < list.length; i++){
            if(list[i].RoomId == ID){
                index = i;
                break;
            }
        }
        
        return index;
    }

    // Hàm cập nhật màu sắc cho học phần
    updateColorSubject(){
        let me = this;

        me.listSubjects = me.listSubjects.filter(function(item, index){
            if(index >= 10){
                item.Color = getRandomColor();
            }else{
                item.Color = listCorlor[index];
            }
           
            return item;
        });
    }

}