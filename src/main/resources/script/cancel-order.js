function cancelOrder() {
    // let idU = localStorage.getItem("idUser");
    let idU = 2; // test
    // Tìm tất cả Order bằng user Id khách thuê
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/orders/searchOrder/user?q=" + idU,
        success: function (data) {
            console.log(data);

            // Hiển thị tất cả order sau đó để user chọn order hủy
            // Sau khi ấn chọn order sẽ hủy, lấy được orderId
            // Lấy ra Order by orderId

            // let idOrder = data.id;
            let idOrder = 5; //test idOrder = 2
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/orders/" + idOrder,
                success: function (data2) {
                    console.log(data2);
                    let date = new Date();
                    let startDate = new Date(data2.startDate)
                    let isBeforeOneDay = (date.getFullYear() === startDate.getFullYear() && date.getMonth() === startDate.getMonth() && date.getDay() >= (startDate.getDay() - 1))
                    if (isBeforeOneDay) {
                        alert('Không được hủy thuê trước 1 ngày');
                        // Xử lý giao diện load lại trang để hiển thị lại tất cả order của user
                    } else {
                        // Xóa Order
                        if (confirm("Really want delete Order??")) {
                            $.ajax({
                                type: "DELETE",
                                url: "http://localhost:8080/api/orders/" + idOrder,
                                success: function (data) {
                                    console.log(data)
                                    // Xử lý giao diện load lại trang sau khi xóa thành công order
                                },
                                error: function (error) {
                                    console.log(error)
                                    alert("ops!! Something wrong!")
                                }
                            })
                        }
                    }

                }
            })
        }
    })
}
