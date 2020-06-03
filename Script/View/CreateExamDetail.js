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

        // Sự kiện khi click vào tab 2
        $("#tabPanelTime").click(function(){
            me.renderSubjectMinus();
            me.renderPeriodTime();
        });
    }

    // Chạy hàm sau khi load xong dữ liệu
    executeBeforeLoadAjax(){
        let me = this;

        me.createCacheList();
        me.renderRooms();
        me.updateColorSubject();
        me.renderSubject();
        me.renderPeriod();
    }
    
    // load dữ liệu từ DB
    loadAjaxData() {
        let me = this;

        me.listRooms = listRooms;
        me.listSubjects = listSubjects;
        
        me.executeBeforeLoadAjax();
    }
    
    // Hiển thị trang detail
    show() {
        let me = this;

        $("#tabPanelRoom").click();
        me.loadAjaxData();
    }

    // Cất dữ liệu
    save() {
        let me = this;

        me.pageMaster.loadAjaxData();
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
                    let elementBox = $("<li class='backgound-brown item-number'></li>");
                    elementBox.text(item.NumberComputer);
                    elementBox.data("room", item);
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

        listSubjects.filter(function (subject) {
            var numberStudent = subject.NumberStudent,
                sumBox = 0;

            for (var j = index; j < elementBoxs.length; j++) {
                let numberComputer = parseInt($(elementBoxs[j]).text());

                sumBox += numberComputer;

                $(elementBoxs[j]).css("background-color", subject.Color);
                $(elementBoxs[j]).data("subject", subject);
                index++;

                if (sumBox >= numberStudent) {
                    break;
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
            element.find(".square-color").css("background-color", item.Color);

            element.data("value", item);

            $(".listSubject").append(element);
        });
    }

    // Render danh sách các học phần có thời gian phút
    renderSubjectMinus() {
        let me = this,
            listSubjects = me.listSubjects;

        $(".listSubject2").html("");

        listSubjects.filter(function (item) {
            let element = $(".subject-clone2 .itemSubject2").clone(true);

            element.find(".item-name").text(item.SubjectName);
            element.find(".numberMinus").val(item.Minus);

            element.data("value", item);

            $(".listSubject2").append(element);
        });
    }

    // Render bảng thời gian của các ca thi
    renderPeriodTime(){
        let me = this;

        $(".listRoom2").html("");

        $(".content-header .item-rooms").each(function(index, value){
            let itemRoom = $(this).find(".item-number").eq(0),
                data = itemRoom.data("subject");

            if(data){

                let element = $(".roomTime-clone2 .itemRoom2").clone(true),
                    periodIndex = index + 1;

                element.find(".item-name").text("Ca " + periodIndex);
                element.find("input").attr("class","classDatepicker" + periodIndex);
                element.find("input").data("periodIndex", periodIndex);
                element.find("input").val(me.listTimeCache[periodIndex].StartTime);
                element.find(".item-endTime").text(me.listTimeCache[periodIndex].EndTime);

                $(".listRoom2").append(element);

                $(".classDatepicker" + periodIndex).datetimepicker({
                    format:'d/m/Y H:i',
                    defaultTime:'07:00',
                    step:30,
                    timeFormat: 'HH:mm'
                });
            }
        });
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