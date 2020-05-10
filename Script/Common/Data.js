// Danh sách sinh viên
var students = [
    {
        Id: "2cec8038-7b92-425f-a47e-1665e69c374a",
        FullName: "Nguyễn Tiến Xuân",
        StudentCode: "STU00001",
        Gender: 1,
        DateOfBirth: "16/08/1998 03:02:09",
        Email: "tienxuantt@gmail.com",
        Course: "K61"
    },
    {
        Id: "67574e8d-d5bc-4ed8-8a70-fa7a2a7608e4",
        FullName: "Nguyễn Mạnh Tùng",
        StudentCode: "STU00002",
        Gender: 1,
        DateOfBirth: "21/01/1997 03:02:09",
        Email: "manhtung@gmail.com",
        Course: "K61"
    },
    {
        Id: "104161c8-8017-4eef-a70f-68a73458739d",
        FullName: "Cao Đức Mạnh",
        StudentCode: "STU00003",
        Gender: 2,
        DateOfBirth: "27/01/1999 03:02:09",
        Email: "caoducmanh@gmail.com",
        Course: "K61"
    },
    {
        Id: "e5c3a07d-22df-4d74-a08b-36d057a6212d",
        FullName: "Đỗ Hoài Thu",
        StudentCode: "STU00004",
        Gender: 2,
        DateOfBirth: "29/02/1998 03:02:09",
        Email: "dohoaithu@gmail.com",
        Course: "K61"
    },
    {
        Id: "a0c6575c-332c-4637-be39-088734e92265",
        FullName: "Nguyễn Đức Tiến",
        StudentCode: "STU00005",
        Gender: 1,
        DateOfBirth: "19/04/1994 03:02:09",
        Email: "ductien@gmail.com",
        Course: "K61"
    }
];

// Danh sách học phần
var subjects = [
    {
        Id:"a0c6575c-332c-4637-be39-088734e92265",
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Description: "Học phần mới"
    },
    {
        Id:"e5c3a07d-22df-4d74-a08b-36d057a6212d",
        SubjectName: "Đại số",
        SubjectCode: "INT1303",
        NumberCredit: 2,
        Description: ""
    },
    {
        Id:"104161c8-8017-4eef-a70f-68a73458739d",
        SubjectName: "Phát triển ứng dụng web",
        SubjectCode: "INT3305 4",
        NumberCredit: 3,
        Description: "Môn học bắt buộc"
    },
    {
        Id:"a0c6575c-332c-4637-be39-088734e92265",
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Description: "Học phần mới"
    },
    {
        Id:"e5c3a07d-22df-4d74-a08b-36d057a6212d",
        SubjectName: "Đại số",
        SubjectCode: "INT1303",
        NumberCredit: 2,
        Description: ""
    },
    {
        Id:"104161c8-8017-4eef-a70f-68a73458739d",
        SubjectName: "Phát triển ứng dụng web",
        SubjectCode: "INT3305 4",
        NumberCredit: 3,
        Description: "Môn học bắt buộc"
    },
    {
        Id:"a0c6575c-332c-4637-be39-088734e92265",
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Description: "Học phần mới"
    },
    {
        Id:"e5c3a07d-22df-4d74-a08b-36d057a6212d",
        SubjectName: "Đại số",
        SubjectCode: "INT1303",
        NumberCredit: 2,
        Description: ""
    },
    {
        Id:"104161c8-8017-4eef-a70f-68a73458739d",
        SubjectName: "Phát triển ứng dụng web",
        SubjectCode: "INT3305 4",
        NumberCredit: 3,
        Description: "Môn học bắt buộc"
    },
    {
        Id:"a0c6575c-332c-4637-be39-088734e92265",
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        Description: "Học phần mới"
    },
    {
        Id:"e5c3a07d-22df-4d74-a08b-36d057a6212d",
        SubjectName: "Đại số",
        SubjectCode: "INT1303",
        NumberCredit: 2,
        Description: ""
    },
    {
        Id:"104161c8-8017-4eef-a70f-68a73458739d",
        SubjectName: "Phát triển ứng dụng web",
        SubjectCode: "INT3305 4",
        NumberCredit: 3,
        Description: "Môn học bắt buộc"
    }
];

// Dữ liệu các phòng thi
var rooms = [
    {
        Id: 1,
        RoomName: "309G2",
        RoomCode: "PT0001",
        Place: "Đại học ngoại ngữ",
        Description: "Khu vực đại học quốc gia"
    },
    {
        Id: 2,
        RoomName: "303G2",
        RoomCode: "PT0002",
        Place: "Đại học gtvt",
        Description: ""
    },
    {
        Id: 3,
        RoomName: "304G3",
        RoomCode: "PT0003",
        Place: "Khu vực ký túc xá",
        Description: "Gần kí túc"
    },
    {
        Id: 3,
        RoomName: "304G3",
        RoomCode: "PT0003",
        Place: "Khu vực ký túc xá",
        Description: "Gần kí túc"
    },
    {
        Id: 1,
        RoomName: "309G2",
        RoomCode: "PT0001",
        Place: "Đại học ngoại ngữ",
        Description: "Khu vực đại học quốc gia"
    },
    {
        Id: 2,
        RoomName: "303G2",
        RoomCode: "PT0002",
        Place: "Đại học gtvt",
        Description: ""
    },
    {
        Id: 3,
        RoomName: "304G3",
        RoomCode: "PT0003",
        Place: "Khu vực ký túc xá",
        Description: "Gần kí túc"
    }
];

// Dữ liệu các kì thi
var periodExams = [
    {
        Id: 1,
        PeriodName: "Kì thi học kì I",
        PeriodCode: "PT0001",
        Year: 2019,
        StartDate: "19/03/2020 02:03:05",
        EndDate: "19/04/2020 02:03:05",
        Status: 1
    },
    {
        Id: 2,
        PeriodName: "Kì thi học kì II",
        PeriodCode: "PT0002",
        Year: 2018,
        StartDate: "12/03/2020 02:03:05",
        EndDate: "14/04/2020 02:03:05",
        Status: 2
    },
    {
        Id: 3,
        PeriodName: "Kì thi học kì phụ",
        PeriodCode: "PT0003",
        Year: 2020,
        StartDate: "05/03/2020 02:03:05",
        EndDate: "03/04/2020 02:03:05",
        Status: 3
    }
];

// Dữ liệu các học phần thuộc kì thi
var listSubjects = [
    {
        Id:"a0c6575c-332c-4637-be39-088734e92265",
        SubjectName: "Giải tích 1",
        SubjectCode: "INT3305",
        NumberCredit: 3,
        NumberStudent: 100,
        Description: "Học phần mới"
    },
    {
        Id:"e5c3a07d-22df-4d74-a08b-36d057a6212d",
        SubjectName: "Đại số",
        SubjectCode: "INT1303",
        NumberCredit: 2,
        NumberStudent: 200,
        Description: ""
    },
    {
        Id:"104161c8-8017-4eef-a70f-68a73458739d",
        SubjectName: "Phát triển ứng dụng web",
        SubjectCode: "INT3305 4",
        NumberCredit: 3,
        NumberStudent: 250,
        Description: "Môn học bắt buộc"
    }
];

// Danh sách sinh viên thuộc học phần
var studentSubjects = [
    {
        Id: "2cec8038-7b92-425f-a47e-1665e69c374a",
        FullName: "Nguyễn Tiến Xuân",
        StudentCode: "STU00001",
        Gender: 1,
        DateOfBirth: "16/08/1998 03:02:09",
        Email: "tienxuantt@gmail.com",
        Course: "K61",
        Status: 1
    },
    {
        Id: "67574e8d-d5bc-4ed8-8a70-fa7a2a7608e4",
        FullName: "Nguyễn Mạnh Tùng",
        StudentCode: "STU00002",
        Gender: 1,
        DateOfBirth: "21/01/1997 03:02:09",
        Email: "manhtung@gmail.com",
        Course: "K61",
        Status: 2
    },
    {
        Id: "104161c8-8017-4eef-a70f-68a73458739d",
        FullName: "Cao Đức Mạnh",
        StudentCode: "STU00003",
        Gender: 2,
        DateOfBirth: "27/01/1999 03:02:09",
        Email: "caoducmanh@gmail.com",
        Course: "K61",
        Status: 1
    }
];

// Danh sách phòng thi thuộc kì thi
var roomSettings = [
    {
        Id: 1,
        RoomName: "309G2",
        RoomCode: "PT0001",
        Place: "Đại học ngoại ngữ",
        Description: "Khu vực đại học quốc gia",
        CountRoom: 20,
        CountRoomBackup: 2
    },
    {
        Id: 2,
        RoomName: "303G2",
        RoomCode: "PT0002",
        Place: "Đại học gtvt",
        Description: "",
        CountRoom: 30,
        CountRoomBackup: 2
    },
    {
        Id: 3,
        RoomName: "304G3",
        RoomCode: "PT0003",
        Place: "Khu vực ký túc xá",
        Description: "Gần kí túc",
        CountRoom: 25,
        CountRoomBackup: 2
    }
];