// Lớp dùng cho layout chung các màn hình
class Layout{
    constructor(){
        // Khởi tạo các sự kiện
        this.initEvent();
        this.bindindFullName();
    }

    // Hiển thị tên người dùng đăng nhập
    bindindFullName(){
        let fullName = localStorage.getItem("FullName");

        if(fullName){
            $(".fullName-user").text(fullName);
        }
    }

    // Khởi tạo các sự kiện
    initEvent(){
        // Khi click vào thu gọn menu
        $(".header-left").click(this.showMenuBar);

        // Khi bấm đăng xuất
        $(".logout").click(this.logout.bind(this));
    }

    // Hàm xử lý khi đăng xuất
    logout(){
        // Xóa thông tin đăng nhập
        localStorage.removeItem("Authorization");
        localStorage.removeItem("Role");
        // Chuyển tới trang đăng nhập
        window.location.href = "file:///D:/Project/Index.html";
    }

    // Hiển thị và thu gọn menubar
    showMenuBar(){
        $(".body-left").toggleClass("display-none");
    }
}

// Khởi tạo một trang layout
var layout = new Layout();