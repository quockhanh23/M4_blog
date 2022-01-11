function loadHomeContent() {
    if (localStorage.getItem("user") == null) {
        document.getElementById("login1").innerHTML = `
       <section id="page-content" class="page-wrapper">
            <div class="login-section pt-115 pb-70">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-xs-12"></div>
                        <div class="col-md-6 col-xs-12" id="formLog">
                            <div class="registered-customers mb-50">
                            <div id="messenger"></div>
                                <h5 class="mb-50 text-center f1 f5" style="font-size: 25px;">ĐĂNG NHẬP</h5>
                                <div action="#">
                                    <div class="login-account p-30 box-shadow">
                                        <p class="f1 f3">Bạn đã có tài khoản, hãy đăng nhập.</p>                                    
                                        <input class="f1" type="text" name="name" placeholder="Tên tài khoản" id="username">
                                        <input class="f1" type="password" name="password" placeholder="Mật khẩu" id="password">
                                        <p><small><a class="f3" href="#">Quên mật khẩu?</a></small></p>
                                        <button class="submit-btn-1 f1" onclick="login()" style="margin-right: 20px">Đăng nhập</button>
                                        <button class="submit-btn-1 f1" onclick="registration()" >Đăng ký</button>
                                    </div>
                                </div>
                            </div>
                        </div>                 
                        <div class="col-md-3 col-xs-12"></div>
                    </div>
                </div>
            </div>
            <div class="subscribe-area bg-blue call-to-bg plr-140 ptb-50">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <div class="section-title text-white">
                            
                                <h2 class="f1">Bản tin</h2>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <div class="subscribe">
                                <form action="#">
                                    <input type="text" name="subscribe" placeholder="Nhập email của bạn...">
                                    <button type="submit" value="send">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
   `;
        document.getElementById("logout").innerHTML = `<a class="f1" href="#">Đăng nhập</a>`;
        document.getElementById("div1").style.display = 'none';
        document.getElementById("div2").style.display = 'none';
        document.getElementById("body1").style.display = 'none';
        document.getElementById("slideLogout").style.display = 'none';
    } else if (localStorage.getItem("user") != null) {
        if (localStorage.getItem("user") === "ROLE_USER") {
            if (localStorage.getItem("seeRental") != null) {
                document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
                document.getElementById("slideLogin").style.display = 'none';
                seeRentalHouses();
            } else if (localStorage.getItem("manager") != null) {
                document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
                document.getElementById("slideLogin").style.display = 'none';
                managerHouseUser();
            } else if (localStorage.getItem("houseForRent") != null) {
                document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
                document.getElementById("slideLogin").style.display = 'none';
                houseForRent();
            } else {
                document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
                document.getElementById("div1").style.display = 'block';
                document.getElementById("div2").style.display = 'block';
                document.getElementById("slideLogin").style.display = 'none';
                document.getElementById("slideLogout").style.display = 'block';
                document.getElementById("body1").style.display = 'block';
                loadData();
            }

        } else if (localStorage.getItem("user") === "ROLE_ADMIN") {
            localStorage.setItem("token", data.accessToken)
            document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
            document.getElementById("div1").style.display = 'block';
            document.getElementById("div2").style.display = 'block';
            admin();
        }
    }

    // login();
}

function login() {
    let user = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data)
            console.log(data.roles[0])
            if (data.roles[0].authority === "ROLE_USER") {
                localStorage.setItem("token", data.accessToken)
                localStorage.setItem("nameUser", data.username)
                localStorage.setItem("user", data.roles[0].authority)
                localStorage.setItem("idUser", data.id)
                document.getElementById("div1").style.display = 'block';
                document.getElementById("div2").style.display = 'block';
                document.getElementById("slideLogout").style.display = 'block';
                document.getElementById("body1").style.display = 'block';
                document.getElementById("slideLogin").style.display = 'none';
                loadData();
                location.reload();
            } else if (data.roles[0].authority === "ROLE_ADMIN") {
                localStorage.setItem("token", data.accessToken)
                localStorage.setItem("user", data.roles[0].authority)
                document.getElementById("div1").style.display = 'block';
                document.getElementById("div2").style.display = 'block';
                document.getElementById("logout").innerHTML = `<a class="f1" href="#" onclick="logout()">Đăng Xuất</a>`;
                admin();
            }
        },
        error: function (error) {
            loadHomeContent();
            document.getElementById('messenger').innerHTML = `
                <p class="f1 f3">Sai tài khoản hoặc mật khẩu!</p>
                `;
        }
    });
}

function admin() {
    document.getElementById("body2").innerHTML = `<div id="page-content" class="page-wrapper">
            
            <!-- ELEMENTS AREA START -->
            <div class="elements-area ptb-115">
                <div class="container">
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-8">
                            <h5 class="mb-50 f1">Quản lý Khách Hàng</h5>
                            <table class="table f1">
                                <thead>
                                    <tr>
                                        <th >Stt</th>
                                        <th>Tên người dùng</th>
                                        <th>Các nhà đang cho thuê</th>
                                        <th>Sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tbody id="user">
                                    <tr class="active" >
                                        <th scope="row">1</th>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                        <td>Column content</td>
                                    </tr>                                  
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </div>
            </div>
            <!-- ELEMENTS AREA END -->
            
            <!-- SUBSCRIBE AREA START -->
            <div class="subscribe-area bg-blue call-to-bg plr-140 ptb-50">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <div class="section-title text-white">
                           
                                <h2 class="f1">Bản tin</h2>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <div class="subscribe">
                                <form action="#">
                                    <input type="text" name="subscribe" placeholder="Nhập email của bạn...">
                                    <button type="submit" value="send">Gửi</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- SUBSCRIBE AREA END -->
        </div>`;
    loadDataAdmin();
}

function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data);
            $("div#login1").remove();

            let html = `
                    <!-- SERVICES AREA START -->
                    <br><br><section class="services-area pb-60">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="section-title-2 text-center">
                                        <h2 class="f1 f5">DỊCH VỤ CỦA CHÚNG TÔI</h2>
                                        <p class="f1" style="font-size: 20px">Tìm kiếm sự lựa chọn của bạn !</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="service-carousel">
                                    <!-- service-item -->
                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                        <div class="service-item">
                                            <div class="service-item-image">
                                                <a href="service-details.html"><img src="images/service/2.jpg" alt=""></a>
                                            </div>
                                            <div class="service-item-info">
                                                <h5><a class="f1 f4 f5" onclick="seeRentalHouses()" href="#">Thuê nhà</a></h5>
                                                <p class="f1 f3">Nơi tập hợp những địa điểm thuê nhà lý tưởng bậc nhất Việt Nam</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- service-item -->
                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                        <div class="service-item">
                                            <div class="service-item-image">
                                                <a href="service-details.html"><img src="images/service/3.jpg" alt=""></a>
                                            </div>
                                            <div class="service-item-info">
                                                <h5><a class="f1 f4 f5" href="#" onclick="houseForRent()">Cho thuê nhà</a></h5>
                                                <p class="f1 f3">Cộng đồng người dùng đông đảo. Đặt uy tín lên hàng đầu</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- service-item -->
                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                        <div class="service-item">
                                            <div class="service-item-image">
                                                <a href="#"><img src="images/service/4.jpg" alt=""></a>
                                            </div>
                                            <div class="service-item-info">
                                                <h5><a class="f1 f4 f5" href="#" onclick="managerHouseUser()" >Quản lý</a></h5>
                                                <p class="f1 f3">Kiểm soát tài sản của bạn một cách hợp lý và thuận tiện</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- SERVICES AREA END -->
                    <!-- BOOKING AREA START -->
                    <div class="booking-area bg-1 call-to-bg plr-140 pt-75">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-3 col-sm-4 col-xs-12">
                                    <div class="section-title text-white">
                                        <h3 class="f1">Đặt chỗ của bạn</h3>
                                        <h2 class="f1">Tại trang chủ</h2>
                                    </div>
                                </div>
                                <div class="col-md-9 col-sm-8 col-xs-12">
                                    <div class="booking-conternt clearfix">
                                        <div class="book-house text-white">
                                            <h2 class="f1">ĐẶT CĂN HỘ HOẶC NHÀ CỦA CHÚNG TÔI </h2>
                                            <h2 class="h5 f1">Gọi cho chúng tôi : +0123  456  789  </h2>
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

                    <!-- FEATURED FLAT AREA START -->
                    <div class="featured-flat-area pt-115 pb-80">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="section-title-2 text-center">
                                        <h2 class="f1 f5">Một số Địa điểm nổi trội</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="featured-flat">
                                <div class="row">`;

            for (let i = 0; i < data.length; i++) {
                let imgHome = "imgHome" + i;
                html += `<!-- flat-item -->
                <div class="col-md-4 col-sm-6 col-xs-12">
                    <div class="flat-item">
                        <div class="flat-item-image">
                            <span class="for-sale f1">${data[i].statusHome.name}</span>                          
                            <a href="#" id="${imgHome}"></a>
                            <div class="flat-link">
                                <a class="f1" onclick="goDetailsHome(${data[i].id})" href="#" >gm chi tiết</a>
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
                                <h5  class="f1"><a href="properties-details.html">${data[i].name}</a></h5>
                                <span class="price f1">${data[i].price}VNĐ</span>
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
            html += `            </div>
                            </div>
                        </div>
                    </div>`;
            html += `<!-- FEATURES AREA START -->
                    <div class="features-area fix">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-7 col-md-offset-5">
                                    <div class="features-info bg-gray">
                                        <div class="section-title mb-30">
                                            <h3 class="f1 f5">Dưới đây</h3>
                                            <h3 class="f1 f5">Là một số tiện ích</h3>
                                        </div>
                                        <div class="features-desc">
                                            <p class="f1 f3"><span data-placement="top" data-toggle="tooltip" data-original-title="The name you can trust" class="tooltip-content">Sheltek</span> là một thế giới lý tưởng cho các bạn muốn tìm một ngôi nhà vừa ý. Một mơi lưu trân khi đi du lịch để tận hưởng cuộc sống, hay 1 ngôi nhà đầy đủ tiện nghi</p>
                                        </div>
                                        <div class="features-include">
                                            <div class="row">
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Đầy đủ nội thất</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Sơn Touch Paint</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Nội thất mới nhất</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Bảo mật thông tin</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Sống với thiên nhiên</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                                <div class="col-lg-4 col-md-6 col-sm-4">
                                                    <div class="features-include-list">
                                                        <h6><img src="images/icons/7.png" alt=""><a class="f1 f3">Phụ kiện sang trọng</a></h6>
<!--                                                        <p>Lorem is a dummy text do eiud tempor dolor sit amet dum</p>-->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- FEATURES AREA END -->

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
                    <!-- OUR AGENTS AREA END -->`;
            document.getElementById("service").innerHTML = html;
        }
    });
}

function seeRentalHouses() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            localStorage.setItem("seeRental", "seeRental")
            let html1 = `
            <!-- FEATURED FLAT AREA START -->
            <div class="featured-flat-area pb-60">
              
                <div class="container">
                  <button class="btn-primary" onclick="back()" style="width: 100px">Quay lại</button>
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
                            <span style=" font-family: 'Comforter', cursive;
                             font-family: 'Open Sans', sans-serif;" class="for-sale">${data[i].statusHome.name}</span>                          
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
                                <span class="price f1">${data[i].price}Đ</span>
                            </div>
                            <p class="f1"><img  src="images/icons/location.png" alt="">${data[i].address}</p>
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
                                        <li><a href="#">2</a></li>
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
                    <!-- OUR AGENTS AREA END -->\`;
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

function goDetailsHome(id) {
    window.location = "properties-details.html";
    localStorage.setItem("idHome", id);
}

function backHome() {
    localStorage.removeItem("seeRental");
    localStorage.removeItem("manager");
    localStorage.removeItem("houseForRent");
    location.reload();
}

function logout() {
    localStorage.clear();
    location.reload();
}

function registration() {
    document.getElementById("formLog").innerHTML = `<div class="new-customers mb-50">
                                <form action="#">
                                <div id="mess"></div>
                                    <h5 class="mb-50 text-center f1 f5" style="font-size: 25px">ĐĂNG KÝ</h5>
                                    <div class="login-account p-30 box-shadow">
                                        <div class="row">
                                            <div class="col-sm-6 f1">
                                                <input class="f1" type="text" placeholder="Họ" id="firstName">
                                            </div>
                                            <div class="col-sm-6">
                                                <input class="f1" type="text" placeholder="Tên" id="lastName">
                                            </div>                                                                                                                                                                                                                    
                                        </div>                                     
                                        <input class="f1" type="text"  placeholder="Nhập tài khoản..." id="userName1">
                                        <input class="f1"  type="password"  placeholder="Mật khẩu" id="password1">
                                        <input class="f1"  type="password"  placeholder="Nhập lại mật khẩu" id="conPassword1">
                                        <div class="checkbox">
                                            <label class="mr-10"> 
                                                <small>
                                                    <input class="f1" type="checkbox" name="signup">Đăng ký nhận bản tin của chúng tôi!
                                                </small>
                                            </label>
                                            <label> 
                                                <small>
                                                    <input class="f1" type="checkbox" name="signup">Nhận khuyến mại đặc biệt từ các đối tác của chúng tôi!
                                                </small>
                                            </label>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-6 col-xs-12">
                                                <button class="submit-btn-1 mt-20 f1" type="submit" value="register" onclick="register()">Đăng ký</button>
                                            </div>
                                            <div class="col-sm-6 col-xs-12 f1">
                                                <button class="submit-btn-1 mt-20 f-right" onclick="loadHomeContent()" >Quay lại</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>`
}

function register() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userName = document.getElementById("userName1").value;
    let pass = document.getElementById("password1").value;
    let conPass = document.getElementById("conPassword1").value;
    let status = 1;
    let user = {
        username: userName,
        password: pass,
        confirmPassword: conPass,
        status: status
    }
    console.log(user);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/register",
        data: JSON.stringify(user),
        success: function () {
            registration();
            document.getElementById("mess").innerHTML = `<p class="f1">Đăng ký thành công!Hãy đăng nhập !</p>`;
        }
    })
}