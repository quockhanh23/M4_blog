function managerHouseUser(){
    let id = localStorage.getItem("idUser");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/findHomeStatus1ByUserId?idU=" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data)
            localStorage.setItem("manager","manager")
            let html1 = `
            <!-- FEATURED FLAT AREA START -->
            <div class="featured-flat-area pb-60">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title-2 text-center">
                                <h2>Danh sách nhà cho thuê</h2>
                            </div>
                        </div>
                    </div>
                    <div class="featured-flat">
                        <div class="row">
                            <!-- flat-item -->`
            for(let i = 0;i< data.length;i++) {
                let imgHome = "imgHome" + i;
                html1 += `
                    <div class="col-md-4 col-sm-6 col-xs-12">
                                <div class="flat-item">
                                    <div class="flat-item-image">
                                        <span class="for-sale">${data[i].statusHome.name}</span>
                                          <a href="#" id="${imgHome}"></a>
                                        <div class="flat-link">                                                                     
                                               <a onclick="goDetailsHome(${data[i].id})" href="#" >Xem chi tiết</a>
                                        </div>
                                        <ul class="flat-desc">
                                            <li>
                                                <img src="images/icons/4.png" alt="">
                                                <span>${data[i].description}</span>
                                            </li>
                                            <li>
                                                <img src="images/icons/5.png" alt="">
                                                <span>${data[i].bedroom}</span>
                                            </li>
                                            <li>
                                                <img src="images/icons/6.png" alt="">
                                                <span>${data[i].showerRoom}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="flat-item-info">
                                        <div class="flat-title-price">
                                            <h5><a href="#">${data[i].name}</a></h5>
                                            <span class="price">${data[i].price}Đ</span>
                                        </div>
                                        <div class="flat-item-info">
                                        <p><img src="images/icons/location.png" alt="">${data[i].address}</p>
                                        <button style="margin-left: 90px;width: 80px; border-radius: 7%" class="btn-primary" onclick="showEditHomeByUser(${data[i].id})">Sửa</button>
                                        <button class="btn-primary" style="width: 80px; border-radius: 7%" onclick="deleteHomeByUser(${data[i].id})">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    `;
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
                                <h3>SOME</h3>
                                <h2 class="h1">FUN FACTOR</h2>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <div class="booking-conternt  clearfix">
                                <div class="counter-content">
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-home" aria-hidden="true"></i>
                                            <span class="counter">999</span>
                                        </h2>
                                        <p>Complete Project</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-key" aria-hidden="true"></i>
                                            <span class="counter">555</span>
                                        </h2>
                                        <p>Property Sold</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-smile-o" aria-hidden="true"></i>
                                            <span class="counter">350</span>
                                        </h2>
                                        <p>Happy Clients</p>
                                    </div>
                                    <!-- counter-item -->
                                    <div class="counter-item">
                                        <h2>
                                            <i class="fa fa-trophy" aria-hidden="true"></i>
                                            <span class="counter">100</span>
                                        </h2>
                                        <p>Awards Win</p>
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
                                <h3>SUBSCRIBE</h3>
                                <h2 class="h1">NEWSLETTER</h2>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <div class="subscribe">
                                <form action="#">
                                    <input type="text" name="subscribe" placeholder="Enter yur email here...">
                                    <button type="submit" value="send">Send</button>
                                </form>
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
function deleteHomeByUser(id){
console.log(id);
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/homes?idH=" + id,
        // headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: managerHouseUser
    })
}
function showEditHomeByUser(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/homes/findAllImg?idH=" + id,
                headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
                success: function (data1) {
                    let html = `
    <div class="new-customers mb-50">
                                <div >                                  
                                    <div class="login-account p-30 box-shadow">
                                        <div class="row">
                                        <div class="col-sm-3"></div>
                                        <div class="col-sm-6"><br>
                                        <h5 class="mb-50 text-center f1">CHO THUÊ</h5>
                                         <div class="col-sm-6">
                                                <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;"  placeholder="Tên nhà" id="username" value="${data.name}">
                                            </div>
                                            <div class="col-sm-6">
                                                <input class="f1" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" type="text"  placeholder="Địa chỉ" id="address" value="${data.address}">
                                            </div>
                                            <div class="col-sm-6 f1"  id="category" >                                                                                                                                                                                                   
                                            </div>                                    
                                            <div class="col-sm-6">
                                            <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" placeholder="Số phòng ngủ" id="bedroom" value="${data.bedroom}">                                                                                                                        
                                            </div>                                       
                                            <div class="col-sm-6">
                                            <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" placeholder="Số phòng tắm" id="showerRoom" value="${data.showerRoom}"> 
                                            </div>                                       
                                            <div class="col-sm-6">
                                                <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;"  placeholder="Giá cho thuê" id="price" value="${data.price}">
                                            </div>
                                            <input class="f1" type="text"  placeholder="Diện tích" id="area" value="${data.area}"> 
                                            <input class="f1" type="text"  placeholder="Mô tả" id="description" value="${data.description}" >                                            
                                            <form enctype="multipart/form-data" id="form">
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Ảnh đại diện</p>
                                            <input type="file" name="files"  />                                          
                                            </div>
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng ngủ</p>
                                            <input type="file" name="files" />
                                            </div> 
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng khách</p>
                                            <input type="file" name="files" />
                                            </div>                                           
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng bếp</p>
                                            <input type="file" name="files"/>
                                            </div>
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng tắm</p>
                                            <input type="file" name="files"/>
                                            </div>                                            
                                            <button class="submit-btn-1 mt-20 f1" type="submit" onclick="saveHome(${id})">Lưu Lại</button>                                                                                 
                                            <button class="submit-btn-1 mt-20 f1" type="submit" onclick="managerHouseUser()" >Quay Lại</button>                                                                                 
                                            </form>                                        
                                         </div>
                                      <div class="col-sm-3"></div>                                  
                                        </div>                                                                                                                                                                                                                                         
                                    </div>
                                </div>
                            </div>
    `;
                    html +=`<!-- OUR AGENTS AREA START -->
                    <div class="our-agents-area pt-115 pb-55">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="section-title-2 text-center">
                                        <h2>Các đại lý của chúng tôi</h2>
                                        <p>Sheltek có một hệ thống đại lý phong phú và phủ sóng khắp cả nước</p>
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
                                                    <img src="images/agents/2.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name">
                                                        <h5><a href="agent-details.html">Nguyễn Quốc Khánh</a></h5>
                                                        <p>Đà Nẵng</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                                    <div class="agent-name">
                                                        <h5><a href="agent-details.html">Quốc Khánh</a></h5>
                                                        <p>Đại lý</p>
                                                    </div>
                                                    <ul class="agent-address">
                                                        <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img src="images/icons/mail-close.png" alt="">khanh@gmail.com </li>
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
                                                    <img src="images/agents/3.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name">Nguyễn Đình Ánh</a></h5>
                                                        <p>Đại lý</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                                    <div class="agent-name">
                                                        <h5><a href="agent-details.html">Đình Ánh</a></h5>
                                                        <p>Đại lý</p>
                                                    </div>
                                                    <ul class="agent-address">
                                                        <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img src="images/icons/mail-close.png" alt="">anh@gmail.com </li>
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
                                                    <img src="images/agents/4.jpg" alt="">
                                                </div>
                                                <div class="agent-info">
                                                    <div class="agent-name">
                                                        <h5><a href="agent-details.html">Lê Vũ Duy</a></h5>
                                                        <p>Đại lý</p>
                                                    </div>
                                                </div>
                                                <div class="agent-info-hover">
                                                    <div class="agent-name">
                                                        <h5><a href="agent-details.html">Vũ Duy</a></h5>
                                                        <p>Đại lý</p>
                                                    </div>
                                                    <ul class="agent-address">
                                                        <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                        <li><img src="images/icons/mail-close.png" alt="">duy@gmail.com </li>
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
            <!-- BRAND AREA END -->`
                    showCategory();
                    document.getElementById("body2").innerHTML = html;
                }
            })

        }
    })
}
function saveHome(id){
    let statusHome = 1;
    let numberOfTurns = 0;
    let userId = localStorage.getItem("idUser");
    let nameHouse = document.getElementById("username").value;
    let address = document.getElementById("address").value;
    let category = document.getElementById("cate").value;
    let bedroom = document.getElementById("bedroom").value;
    let showerRoom = document.getElementById("showerRoom").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let area = document.getElementById("area").value;
    let home = {
        name: nameHouse,
        address: address,
        category:{
            id: category
        },
        bedroom: bedroom,
        showerRoom: showerRoom,
        description: description,
        price: price,
        statusHome: {
            id: statusHome
        },
        user: {
            id: userId
        },
        numberOfTurns: numberOfTurns,
        area: area,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/homes?idH=" + id,
        data: JSON.stringify(home),
        success: function () {
            let form = $('#form')[0];
            let data = new FormData(form);
            $.ajax({
                type: "PUT",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/api/homes/saveImg?idH=" + id,
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 1000000,
                success:function (data){
                    console.log(data)
                    // loadData();
                    backHome();
                }
            })

        }
    })
}
