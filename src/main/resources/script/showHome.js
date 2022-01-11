function loadDataHome() {
    seeDetailsHome();
    showComment();
    showDetail();
    show5Home();
}

function seeDetailsHome() {
    let id = localStorage.getItem("idHome")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/findAllImg?idH=" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data)
            let arr1 = data;
            console.log(arr1)

            document.getElementById("pro-0").innerHTML = `
            <a href="images/${data[0].links}" data-lightbox="image-1" data-title="Sheltek Properties - 1">
                                                <img width="765px" height="389px" src="images/${data[0].links}" alt="">
                  </a>
            `;
            for(let i =1;i <= arr1.length;i++){
                if(arr1[i].status === 2){
                    let idx = "xx" + i;
                    let pro = "#pro-" + i;
                    document.getElementById(idx).innerHTML =`
            <a href="${pro}" data-toggle="tab">
                                            <img width="188px" height="120px" src="images/${arr1[i].links}" alt="">
                                        </a>
            `
                }
            }
        }

    })
}
function back1(){
    window.location="login.html";
    localStorage.removeItem("idHome");
}
function showDetail(){
    let id = localStorage.getItem("idHome")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/" + id,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            let html = `
    <ul class="condition-list">
                                                    <li><img src="images/icons/5.png" alt="">Diện tích ${data.area}</li>
                                                    <li><img src="images/icons/6.png" alt="">Số p.ngủ ${data.bedroom}</li>
                                                    <li><img src="images/icons/7.png" alt="">Số p.tắm ${data.showerRoom}</li>
                                                    <li><img src="images/icons/13.png" alt="">Nhà xe 2</li>
                                                    <li><img src="images/icons/14.png" alt="">Phòng bếp 2</li>
                                                    <li>${data.price}</li>
                                                </ul>
                                                <p><img src="images/icons/location.png" alt="">${data.address}</p>
    `;
            document.getElementById("detail").innerHTML = html;
        }
    })
}
function showComment(){
    let idHome = localStorage.getItem("idHome");
    let html = ``;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/comments?idH=" + idHome,
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data);
            html += `<h5 class="f1 f6">${data.length} Phản hồi</h5>`;
            for (let i = 0;i < data.length;i++){
                html += `   
                                <!-- media -->
                                <div class="media">
                                    <a class="media-left" href="#">
                                        <img width="81px" height="72px" src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-avatar-trang-cho-nam-va-con-than-lan.jpg" alt="">
                                    </a>
                                    <div class="media-body">
                                        <p class="media-heading"><a class="f1 f5" href="#" style="font-size: 20px"> Tài khoản: ${data[i].user.username} </a></p>
                                        <p class="f1"><span class="f1 f4" style="font-size: 20px">Lúc: ${data[i].time}</span>${data[i].content}</p>
                                    </div>
                                </div>`;
            }

            document.getElementById("comment").innerHTML = html;
        }
    })
}

function comment(){
    let content = document.getElementById("contentComment").value;
    let idUser = localStorage.getItem("idUser");
    let idHome = localStorage.getItem("idHome");
    let comment = {
        content: content,
        home:{
            id:idHome,
        } ,
        user: {
            id:idUser,
        },
    }
    console.log(comment)
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/comments" ,
        data: JSON.stringify(comment),
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token"),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        success: function () {
            showComment();
        }
    })
}
function show5Home(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/homes/find5HomeMostRated",
        headers: {"Authorization": 'Bearer ' + localStorage.getItem("token")},
        success: function (data) {
            console.log(data)
            let html = ``;
            for(let i = 0;i< data.length;i++) {
                let imgHome = "imgHome" + i;
                html += `
            <div class="col-md-12 col-sm-6 col-xs-12">
                   <div class="flat-item">
                        <div class="flat-item-image">
                            <span style="  font-family: 'Comforter', cursive;
                             font-family: 'Open Sans', sans-serif;"
                              class="for-sale">${data[i].statusHome.name}</span>                          
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
            document.getElementById("list5Home").innerHTML = html;
        }
    })
}
