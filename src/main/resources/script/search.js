// Tìm kiếm nhà theo địa chỉ, phòng ngủ, phòng tắm, mức giá, diện tích
function searchHome() {
    let address = $("#location").val();
    let bedroom = $("#bedroom").val();
    let showerRoom = $("#showerRoom").val();
    let minArea = $("#min-area").val();
    let maxArea = $("#max-area").val();
    let minPrice = $("#slider-range").slider("values", 0);
    let maxPrice = $("#slider-range").slider("values", 1);
    //
    console.log(address);
    // console.log(bedroom);
    // console.log(showerRoom);
    console.log(minPrice);
    console.log(maxPrice);

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes",
        success: function (data) {
            console.log(data);
            let arr = [];
            if (address != "") {
                for (let i = 0; i < data.length; i++) {
                    let isCorrectAddress = data[i].address.toLowerCase().indexOf(address.toLowerCase()) != -1;
                    if (isCorrectAddress) arr.push(data[i]);
                }
            } else {
                arr = data;
            }
            data = arr;
            arr = [];
            if (bedroom != "") {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].bedroom == bedroom) arr.push(data[i]);
                }
            } else {
                arr = data;
            }
            data = arr;
            arr = [];
            if (showerRoom != "") {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].showerRoom == showerRoom) arr.push(data[i]);
                }
            } else {
                arr = data;
            }
            data = arr;
            arr = [];
            let isTrue = (minPrice != "") && (maxPrice != "")
            if (isTrue) {
                for (let i = 0; i < data.length; i++) {
                    if ((minPrice <= data[i].price) && (data[i].price <= maxPrice)) arr.push(data[i]);
                }
            } else {
                arr = data;
            }
            data = arr;
            arr = [];
            if ((minArea != "") && (maxArea != "")) {
                for (let i = 0; i < data.length; i++) {
                    if ((minArea <= data[i].area) && (data[i].area <= maxArea)) arr.push(data[i]);
                }
            } else {
                arr = data;
            }
            data = arr;
            arr = [];
            console.log(data);
            localStorage.setItem("seeRental", "seeRental")
            let html1 = `
            <!-- FEATURED FLAT AREA START -->
            <div class="featured-flat-area pb-60">
              <button class="f1 f4 submit-btn-1 " onclick="back()">Quay lại</button>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title-2 text-center"><br>
                                <h2 class="f1 f5">Các Căn Có Thể Thuê</h2>
                            </div>
                        </div>
                    </div>
                    <div class="featured-flat">
                        <div class="row">
                            <!-- flat-item -->`
            for (let i = 0; i < data.length; i++) {
                let imgHome = "imgHome" + i;
                html1 += `
                    <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="flat-item">
                        <div class="flat-item-image">
                            <span style="  font-family: 'Comforter', cursive;  font-family: 'Open Sans', sans-serif;" class="for-sale">${data[i].statusHome.name}</span>                          
                            <a href="#" id="${imgHome}"></a>
                            <div class="flat-link">
                                <a class="f1" onclick="goDetailsHome(${data[i].id})" href="#" >Xem chi tiết</a>
                            </div>
                            <ul class="flat-desc">
                                <li>
                                    <img src="images/icons/4.png" alt="">
                                        <span class="f1">${data[i].description}</span>
                                </li>
                                <li>
                                    <img src="images/icons/5.png" alt="">
                                        <span class="f1">${data[i].bedroom}</span>
                                </li>
                                <li>
                                    <img src="images/icons/6.png" alt="">
                                        <span class="f1">${data[i].showerRoom}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="flat-item-info">
                            <div class="flat-title-price">
                                <h5><a class="f1" href="properties-details.html">${data[i].name}</a></h5>
                                <span class="f1 price">${data[i].price}VNĐ</span>
                            </div>
                            <p class="f1"><img src="images/icons/location.png" alt="">${data[i].address}</p>
                        </div>
                    </div>
                </div>`;
                $.ajax({
                    type: "GET",
                    url: "http://localhost:8080/api/homes/listImg?idH=" + data[i].id,
                    headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
                    success: function (data1) {
                        console.log(data1)
                        document.getElementById(imgHome).innerHTML = `<img width="368px" height="235px" src="images/${data1[0].links}" alt="" class="img-fluid">`;
                    }
                })
            }
            html1 += `<div class="col-xs-12">
                                <div class="pagination-area mb-60">
                                    <ul class="pagination-list text-center">
                                        <li><a href="#"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>
                                        <li><a href="#">1</a></li>
                                     
                                        <li><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- FEATURED FLAT AREA END -->
            
            <!-- BOOKING AREA START -->
            <div class="booking-area bg-1 call-to-bg plr-140 pt-75">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <div class="section-title text-white">
                                <h3 class="f1">Một vài</h3>
                                <h2 class="h1 f1">Nhân tố vui vẻ</h2>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <div class="booking-conternt  clearfix">
                                <div class="counter-content">
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-home" aria-hidden="true"></i>
                                            <span class="counter f1">999</span>
                                        </h2>
                                        <p class="f1">Hoàn thành dự án</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-key" aria-hidden="true"></i>
                                            <span class="counter f1">555</span>
                                        </h2>
                                        <p class="f1">Bất động sản đã bán</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-smile-o" aria-hidden="true"></i>
                                            <span class="counter f1">350</span>
                                        </h2>
                                        <p class="f1">Khách hàng vui vẻ</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-trophy" aria-hidden="true"></i>
                                            <span class="counter f1">100</span>
                                        </h2>
                                        <p class="f1">Giành giải thưởng</p>
                                    </div>
                                </div>
                                <div class="booking-imgae">
                                    <img src="images/others/booking.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- BOOKING AREA END -->
            
            <!-- OUR AGENTS AREA START -->
             <div class="our-agents-area pt-115 pb-55">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="section-title-2 text-center">
                                        <h2 class="f1 f5">Các đại lý của chúng tôi</h2>
                                        <p class="f1 f4">Sheltek có một hệ thống đại lý phong phú và phủ sóng khắp cả nước</p>
                                    </div>
                                </div>
                            </div>
                            <div class="our-agents">
                                <div class="row">
                                    <div class="agents-carousel">
                                        <!-- single-agent -->
                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="single-agent">
                                                <div class="agent-image">
                                                     <img src="/templates/sheltek/images/admin/1.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name">
                                                        <h5 class="f1 f5"><a href="agent-details.html">Nguyễn Quốc Khánh</a></h5>
                                                        <p class="f1">Đà nẵng</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                                
                                                    <ul class="agent-address">
                                                        <li><img class="f1" src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img class="f1" src="images/icons/mail-close.png" alt="">khanh@gmail.com </li>
                                                    </ul>
                                                    <ul class="social-media">
                                                        <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- single-agent -->
                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="single-agent">
                                                <div class="agent-image">
                                                     <img src="/templates/sheltek/images/admin/2.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name"><h5 class="f1 f5"><a>Nguyễn Đình Ánh</a></h5>
                                                        <p class="f1">Hà Nội</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                                
                                                    <ul class="agent-address">
                                                        <li><img class="f1" src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img class="f1" src="images/icons/mail-close.png" alt="">anh@gmail.com </li>
                                                    </ul>
                                                    <ul class="social-media">
                                                        <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- single-agent -->
                                        <div class="col-md-4 col-sm-6 col-xs-12">
                                            <div class="single-agent">
                                                <div class="agent-image">
                                                    <img src="/templates/sheltek/images/admin/3.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name">
                                                        <h5 class="f1 f5"><a href="agent-details.html">Lê Vũ Duy</a></h5>
                                                        <p class="f1">Thành Phố HCM</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                               
                                                    <ul class="agent-address">
                                                        <li><img class="f1" src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img class="f1" src="images/icons/mail-close.png" alt="">duy@gmail.com </li>
                                                    </ul>
                                                    <ul class="social-media">
                                                        <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                                        <li><a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <!-- OUR AGENTS AREA END -->

            <!-- BRAND AREA START -->
            <div class="brand-area pb-115">
                <div class="container">
                    <div class="row">
                        <div class="brand-carousel">
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/1.png" alt="">
                                </div>
                            </div>
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/2.png" alt="">
                                </div>
                            </div>
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/3.png" alt="">
                                </div>
                            </div>
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/4.png" alt="">
                                </div>
                            </div>
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/5.png" alt="">
                                </div>
                            </div>
                            <!-- brand-item -->
                            <div class="col-md-2 col-sm-4 col-xs-12">
                                <div class="brand-item">
                                    <img src="images/brand/1.png" alt="">
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <!-- BRAND AREA END -->
            
            <!-- SUBSCRIBE AREA START -->
                <div class="subscribe-area bg-blue call-to-bg plr-140 ptb-50">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <div class="section-title text-white">

                                <h2 class="h1">Bản tin</h2>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <!-- SUBSCRIBE AREA END -->
        </section>
        <!-- End page content -->`;
            document.getElementById("body2").innerHTML = html1;
        }
    })
}


