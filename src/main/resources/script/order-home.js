function orderHome() {
    let idU = localStorage.getItem("idUser");
    let idH = localStorage.getItem("idHome");

    let strStartDate = document.getElementById("monthStart").value; // kiểm tra giá trị nhập vào có rỗng hay không
    let strEndDate = document.getElementById("monthEnd").value;
    let startDate = new Date(strStartDate);
    let endDate = new Date(strEndDate);
    let oneDay = 86400000;
    let now = new Date();
    console.log(now);
    // Check ngày tháng nhập vào
    if ((endDate < now) || (startDate < now)) alert("Bạn đã chọn ngày nhỏ hơn ngày hiện tại, Xin mời nhập lại!")
    else if (endDate <= startDate) alert("Bạn đã chọn ngày nhận phòng nhỏ hơn hoặc bằng ngày trả phòng, Xin mời nhập lại!");
    else if (endDate > startDate) {
        console.log("true");
        // Kiểm tra nhà đã được cho thuê trong 1 khoảng thời gian
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/homeTimes/searchByHome/" + idH,
            success: function (data) {
                console.log(data)
                if (data.length > 0) {
                    let flag = true;
                    for (let i = startDate.getTime(); i <= endDate.getTime(); i += oneDay) {
                        let orderDate = new Date(i);
                        console.log(orderDate);
                        for (let j = 0; j < data.length; j++) {
                            let bookingDate = (new Date(data[j].date));
                            console.log(bookingDate)
                            if ((orderDate.getDate() === bookingDate.getDate()) && (orderDate.getMonth() === bookingDate.getMonth()) && (orderDate.getFullYear() === bookingDate.getFullYear())) {
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        // let orderStartDate = new Date(data[0].date);
                        // let orderEndDate = new Date(data[data.length - 1].date);
                        alert("Nhà đang được cho thuê !! Xin mời nhập lại ! "
                            // + orderStartDate.getDate() + " / " +
                            // orderStartDate.getMonth() + " / " +
                            // orderStartDate.getFullYear() + " đến ngày " +
                            // orderEndDate.getDate() + " / " +
                            // orderEndDate.getMonth() + " / " +
                            // orderEndDate.getFullYear()
                        );
                    }else {
                        alert("Thuê thoải mái đeee");
                        // Tạo order
                        let order = {
                            startDate: startDate,
                            endDate: endDate,
                            user: {
                                id: idU
                            },
                            home: {
                                id: idH
                            }
                        }
                        console.log(order);
                        $.ajax({
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            type: 'POST',
                            url: "http://localhost:8080/api/orders/",
                            data: JSON.stringify(order),
                            success: function (data) {
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        })
                    }
                } else {
                    alert("Thuê thoải mái đeee !!!")
                    // Tạo Order
                    let order = {
                        startDate: startDate,
                        endDate: endDate,
                        user: {
                            id: idU
                        },
                        home: {
                            id: idH
                        }
                    }
                    console.log(order);
                    $.ajax({
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        type: 'POST',
                        url: "http://localhost:8080/api/orders/",
                        data: JSON.stringify(order),
                        success: function (data) {
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    })
                }
            }
        })
    }
}
