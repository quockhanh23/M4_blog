function houseForRent() {
    localStorage.setItem("houseForRent","houseForRent")
    let html = `
    <div class="new-customers mb-50">
                                <div >                                  
                                    <div class="login-account p-30 box-shadow">
                                        <div class="row">
                                        <div class="col-sm-3"></div>
                                        <div class="col-sm-6"><br>
                                        <h5 class="mb-50 text-center f1 f5 f4">CHO THUÊ</h5>
                                         <div class="col-sm-6">
                                                <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;"  placeholder="Tên nhà" id="username">
                                            </div>
                                            <div class="col-sm-6">
                                                <input class="f1" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" type="text"  placeholder="Địa chỉ" id="address">
                                            </div>
                                            <div class="col-sm-6 f1"  id="category">                                                                                                                                                                                                   
                                            </div>                                    
                                            <div class="col-sm-6">
                                            <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" placeholder="Số phòng ngủ" id="bedroom">                                                                                                                        
                                            </div>                                       
                                            <div class="col-sm-6">
                                            <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;" placeholder="Số phòng tắm" id="showerRoom"> 
                                            </div>                                       
                                            <div class="col-sm-6">
                                                <input class="f1" type="text" style="font-family: 'Comforter', cursive;
                                                font-family: 'Open Sans', sans-serif;"  placeholder="Giá cho thuê" id="price">
                                            </div>
                                            <input class="f1" type="text" placeholder="Diện tích" id="area">
                                            <input class="f1" type="text"  placeholder="Mô tả" id="description"> 
                                            <form enctype="multipart/form-data" id="form">
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Ảnh đại diện</p>
                                            <input type="file" name="files"/>
                                            </div>
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng ngủ</p>
                                            <input type="file" name="files"/>
                                            </div> 
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng khách</p>
                                            <input type="file" name="files"/>
                                            </div>                                           
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng bếp</p>
                                            <input type="file" name="files"/>
                                            </div>
                                            <div class="col-sm-12">
                                            <p class="f1 f4">Phòng tắm</p>
                                            <input type="file" name="files"/>
                                            </div>                                            
                                            <button class="submit-btn-1 mt-20 f1" type="submit" onclick="createHome()" >Đăng Cho Thuê</button>                                                                                 
                                            <button class="submit-btn-1 mt-20 f1" type="submit" onclick="back()" >Quay Lại</button>                                                                                 
                                            </form>                                        
                                         </div>
                                      <div class="col-sm-3"></div>                                  
                                        </div>                                                                                                                                                                                                                                         
                                    </div>
                                </div>
                            </div>`;
    html +=`<!-- OUR AGENTS AREA START -->
               <hr>
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
function back(){
    backHome();
    location.reload();
}
function createHome(){
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
        type: "POST",
        url: "http://localhost:8080/api/homes/createHome",
        data: JSON.stringify(home),
        success: function () {
            let form = $('#form')[0];
            let data = new FormData(form);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "http://localhost:8080/api/homes/uploadFile",
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
function showCategory(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/findAllCategory",
        enctype: 'multipart/form-data',
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            let html = ``;
            html +=`<select class="custom-select-2 f1">`;
            html += `<option value="0">Loại nhà</option>`;
            for(let i = 0;i< data.length;i++){
                html +=`<option value="${data[i].id}" id="cate">${data[i].name}</option>`;
            }
            html +=`</select>`;
            document.getElementById("category").innerHTML = html;
        }
    })
}

