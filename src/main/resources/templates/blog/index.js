function getAllBlog() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/",
        success: function (data) {
            console.log(data)
            displayBlog(data)
        }
    })
}

function displayBlog(data) {
    let res = "<h2>List blog</h2>" + "<table border='1px' width='100%'><tr>"
        + "<th>Title</th>" + "<th>Content</th>" + "<th>Time</th>" + "<th>Status</th>"
        + "<th style=\"color: rebeccapurple\">Detail</th>"
        + "<th style=\"color: rebeccapurple\">Edit</th>"
        + "<th style=\"color: rebeccapurple\">Delete</th></tr>"
    for (let i = 0; i < data.length; i++) {
        res += "<tr><td>" + data[i].title + "</td>" +
            "<td>" + data[i].content + "</td>" +
            "<td>" + data[i].time + "</td>" +
            "<td>" + data[i].status.name + "</td>" +
            "<td align=\"center\">" + "<button onclick='getOne(" + data[i].id + ")'>Detail</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='showFormEdit(" + data[i].id + ")'>Edit</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='deleteById(" + data[i].id + ")'>Delete</button>" + "</td></tr>";
    }
    document.getElementById("div1").innerHTML = res;
}

function getAllStatus() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/statuses",
        success: function (data) {
            console.log(data)
            displayStatus(data)
        }
    })
}

function displayStatus(data) {
    let str = "";
    for (let i = 0; i < data.length; i++) {
        str += "<br>" + data[i].name
    }
    document.getElementById("div1").innerHTML = str;
}

function deleteById(id) {
    if (confirm("Really want to delete?")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "DELETE",
            url: "http://localhost:8080/api/blogs/" + id,
            success: getAllBlog,
            error: function (error) {
                alert("ops!! Something wrong!")
            }
        });
    }
}

function showFormAdd() {
    let res = '<h2>Add blog</h2><hr><div class="row"><div class="col-6"><h5>Title:</h5><h5>content:</h5></div>' +
        '<div class="col-6"><input type="text" placeholder="title" id="title">' +
        '<input type="text" placeholder="content" id="content">' +
        "<select id=\"status\"></div></div>;"
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/blogs/statuses/",
            success: function (data) {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    res += `<option value="${data[i].id}">${data[i].name}</option>`
                }
                res += "</td></tr></select></table>" + '<button onclick="save()">Add</button>'
                document.getElementById('div2').innerHTML = res;
            }
        })
}

function save() {
    let title = $('#title').val()
    let content = document.getElementById("content").value;
    let status = document.getElementById("status").value;
    let blog = {
        title: title,
        content: content,

        status: {
            id: status
        }
    }
    console.log(blog);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8080/api/blogs/",
        data: JSON.stringify(blog),
        success: function (data) {
            getAllBlog(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showFormEdit(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/" + id,
        success: function (data) {
            console.log(data)
            let res = '<h2>Edit form</h2><hr><div class="row"><div class="col-6"><h5>Title:</h5><h5>content:</h5></div>' +
                '<div class="col-6"><input type="text" placeholder="title" id="title" value="' + data.title + '">' +
                '<input type="text" placeholder="content" id="content" value="' + data.content + '">' +
                '<input type="text" placeholder="time" id="time" value="' + data.time + '">' +
                "<select id=\"status\"></div></div>;"
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/blogs/statuses/",
                success: function (data1) {
                    console.log(data1)
                    for (let i = 0; i < data1.length; i++) {
                        res += `<option value="${data1[i].id}">${data1[i].name}</option>`

                    }
                    res += '</select>' + '<br><button onclick="saveEdit(' + data.id + ')">Save</button>'
                    document.getElementById('div2').innerHTML = res;
                },
                error: function (error) {
                    alert("ops!! Something wrong!")
                }
            })
        }
    })
}

function saveEdit(id) {
    let blog = {
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        time: document.getElementById("time").value,
        status: {
            id: document.getElementById("status").value,
        }
    }
    console.log(blog)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/blogs/" + id,
        data: JSON.stringify(blog),

        success: function (blog) {
            alert("ok")
            getAllBlog(blog)

        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}


function status1() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/search1",
        success: function (data) {
            console.log(data)
            let str = "<h2>Find all status public</h2>" + "<table border='1px'  width='100%'><tr>" + "<th>Title</th>" + "<th>Content</th>"
                + "<th>Status</th></tr>"
            for (let i = 0; i < data.length; i++) {
                str += "<tr><td>" + data[i].title + "</td>" +
                    '<td>' + data[i].content + "</td>" +
                    '<td>' + data[i].status.name + "</td>"
            }
            str += "</table>"
            document.getElementById("div1").innerHTML = str;
        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}
function getOne(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/blogs/find/" + id,
        success: function (data) {
            console.log(data)
            findOne(data)
        }
    })
}
function findOne(data) {
    let res = ""
    res+= '<h2>Detail</h2><hr>' +'<h4>Title: ' +data.title + '</h4>'
        + '<h4>Content: ' + data.content +'</h4>' +
        '<h4>Status: '+ data.status.name+'</h4>'
    document.getElementById("div2").innerHTML = res;
}

