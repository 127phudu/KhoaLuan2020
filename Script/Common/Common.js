//////////////////////// Các hàm chung //////////////////////////////
// Hàm dùng để parse dữ liệu từ Jwt sang json
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Hàm dùng để chuyển một chuỗi Date dạng dd/MM/yyyy sang Date object
function convertDate(dateStr){
    let day = dateStr.substr(0,2),
        month = dateStr.substr(3,2),
        year = dateStr.substr(6,4),
        time = dateStr.substr(10,6),
        newDateStr = year + '-' + month + '-' + day + time;

    return new Date(newDateStr);
}

// Hàm dùng format chuỗi
String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
};

var CommonFn = CommonFn || {};

// Clone một đối tượng này sang đối tượng mới
CommonFn.Clone = function(source){
    var destination = {};

    for(var fieldName in source){
        destination[fieldName] = source[fieldName];
    }

    return destination;
}

// Hàm dùng login
CommonFn.LoginAjax = function(param, fnCallBack){
    let url = host + mappingApi.Master.urlLogin;

    $.ajax({
        url: url,
        data: JSON.stringify(param),
        type: "POST",
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
        }
    });
}

// Ajax gọi phương thức get
CommonFn.GetAjax = function(url, fnCallBack){
    var authorization = localStorage.getItem("Authorization");

    if(authorization){
        $.ajax({
            url: url,
            type: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                fnCallBack(response);
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }else{
        window.location.replace(Constant.url["Login"]);
    }
}

// ajax gọi phương thức post
CommonFn.PostPutAjax = function(type, url, param, fnCallBack, async = true){
    var authorization = localStorage.getItem("Authorization");

    if(authorization){
        $.ajax({
            url: url,
            data: JSON.stringify(param),
            async: async,
            type: type,
            headers: {
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            crossDomain: true,
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                fnCallBack(response);
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
        });
    }else{
        window.location.replace(Constant.url["Login"]);
    }
}

///////////////////////// Các hằng số ///////////////////////////////
var Constant = Constant || {};

// Các url để chuyển hướng
Constant.url = {
    Login: "file:///D:/KhoaLuan2020/Index.html",

    StudentManager: "file:///D:/KhoaLuan2020/View/StudentManager.html",
    SubjectManager: "file:///D:/KhoaLuan2020/View/SubjectManager.html",
    RoomManager:"file:///D:/KhoaLuan2020/View/RoomManager.html",
    PeriodExamManager: "file:///D:/KhoaLuan2020/View/PeriodExamManager.html",

    ListSubject: "file:///D:/KhoaLuan2020/View/ListSubject.html",
    SettingRoom: "file:///D:/KhoaLuan2020/View/RoomSetting.html",
    CreateExam: "file:///D:/KhoaLuan2020/View/CreateExam.html",
    ExamRegisterResult: "file:///D:/KhoaLuan2020/View/ExamRegisterResult.html"
}

// pagin phân trang
Constant.urlPaging = "?Size={0}&Page={1}";
Constant.urlPagingSearch = "?Query={0}&Size={1}&Page={2}";

///////////////////////// Các Enum //////////////////////////////////
var Enum = Enum || {};

// Enum các loại lỗi
Enum.TypeError = {
    RequireUserName: 0,
    RequirePassWord:1,
    LoginInvalid:2,
    RequireAll:3
}

// Các mode của thêm sửa xóa
Enum.EditMode = {
    Add: 1,
    Edit: 2,
    Delete: 3,
    View: 4
};

// Các trạng thái lỗi khi gọi ajax
Enum.StatusResponse = {
    Success: 200,
    NotFound: 404,
    BadRequest: 500
}

// Enum giới tính
Enum.Gender = ["Giới tính","Nam","Nữ","Khác"];
Enum.Status = ["Trạng thái phòng thi","Sử dụng", "Không sử dụng"];
Enum.StatusStudent = ["Trạng thái sinh viên","Đủ điều kiện", "Cấm thi"];
Enum.StatusPeriod = ["Trạng thái kì thi", "Chưa đăng ký", "Đang đăng ký", "Đã đăng ký"];

// Text thông báo lỗi
Enum.TypeErrorMessage = ["Tên đăng nhập không được để trống!","Mật khẩu không được để trống!","Tên đăng nhập hoặc mật khẩu không chính xác!",""];

