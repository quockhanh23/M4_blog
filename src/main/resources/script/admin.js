function loadDataAdmin(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users",
        success: function (data) {
            console.log(data)
            let html = ``;
            for(let i = 0;i< data.length;i++){
                html += `<tr class="active" >                                   
                                        <th scope="row">${i + 1}</th>
<!--                                        <td><input type="hidden" value="${data[i].id}" ></td>-->
                                        <td>${data[i].username}</td>
                                        <td><a href="#" onclick="seeHouseUser(${data[i].id})">Xem</a></td>
                                        <td><button>Sửa</button></td>
                                        <td><button onclick="deleteUser(${data[i].id}) ">Xóa</button></td>
                                    </tr>  `;
            }
            document.getElementById("user").innerHTML = html;
        }
    })
}
function seeHouseUser(id){
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
                <button onclick="admin()" >Back</button>
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
                        document.getElementById(imgHome).innerHTML = `<img src="images/${data1[0].links}" alt="" class="img-fluid">`;
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
            <div class="our-agents-area pt-115 pb-60">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-title-2 text-center">
                                <h2>OUR AGENTS</h2>
                                <p>Sheltek is the best theme for  elit, sed do eiusmod tempor dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et lorna aliquatd minim veniam, quis nostrud</p>
                            </div>
                        </div>
                    </div>
                    <div class="our-agents">
                        <div class="row">
                            <div class="agents-carousel">
                                <!-- single-agent -->
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-agent">
                                        <div class="agent-image">
                                            <img src="images/agents/1.jpg" alt="">
                                        </div>
                                        <div class="agent-info">
                                            <div class="agent-name">
                                                <h5><a href="#">Shah M Nawaz</a></h5>
                                                <p>Real Estate Agent</p>
                                            </div>
                                        </div>
                                        <div class="agent-info-hover">
                                            <div class="agent-name">
                                                <h5><a href="#">Shah M Nawaz</a></h5>
                                                <p>Real Estate Agent</p>
                                            </div>
                                            <ul class="agent-address">
                                                <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                <li><img src="images/icons/mail-close.png" alt="">eva@gmail.com </li>
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
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-agent">
                                        <div class="agent-image">
                                            <img src="images/agents/2.jpg" alt="">
                                        </div>
                                        <div class="agent-info">
                                            <div class="agent-name">
                                                <h5><a href="#">Eva Sharlin</a></h5>
                                                <p>Real Estate Broker</p>
                                            </div>
                                        </div>
                                        <div class="agent-info-hover">
                                            <div class="agent-name">
                                                <h5><a href="#">Eva Sharlin</a></h5>
                                                <p>Real Estate Broker</p>
                                            </div>
                                            <ul class="agent-address">
                                                <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                <li><img src="images/icons/mail-close.png" alt="">eva@gmail.com </li>
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
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <div class="single-agent">
                                        <div class="agent-image">
                                            <img src="images/agents/3.jpg" alt="">
                                        </div>
                                        <div class="agent-info">
                                            <div class="agent-name">
                                                <h5><a href="#">Momen Bhuyan</a></h5>
                                                <p>Real Estate Broker</p>
                                            </div>
                                        </div>
                                        <div class="agent-info-hover">
                                            <div class="agent-name">
                                                <h5><a href="#">Momen Bhuyan</a></h5>
                                                <p>Real Estate Broker</p>
                                            </div>
                                            <ul class="agent-address">
                                                <li><img src="images/icons/phone-2.png" alt="">+1245  785  659 </li>
                                                <li><img src="images/icons/mail-close.png" alt="">eva@gmail.com </li>
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
function deleteUser(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/delete?idU=" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: admin
    })
}