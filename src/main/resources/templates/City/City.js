function getAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/",
        success: function (data) {
            console.log(data)
            displayCity(data)
        }
    })
}

function displayCity(data) {
    let res = "<h2>List city</h2>" + "<table border='1px' width='100%'><tr>"
        + "<th>Name</th>" + "<th>Population</th>" + "<th>Acreage</th>" + "<th>Description</th>" + "<th>Nation</th>"
        + "<th style=\"color: rebeccapurple\">Detail</th>"
        + "<th style=\"color: rebeccapurple\">Edit</th>"
        + "<th style=\"color: rebeccapurple\">Delete</th></tr>"
    for (let i = 0; i < data.length; i++) {
        res += "<tr><td>" + data[i].name + "</td>" +
            "<td>" + data[i].population + "</td>" +
            "<td>" + data[i].acreage + "</td>" +

            "<td>" + data[i].description + "</td>" +
            "<td>" + data[i].nation.name + "</td>" +
            "<td align=\"center\">" + "<button onclick='getOne(" + data[i].id + ")'>Detail</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='showFormEdit(" + data[i].id + ")'>Edit</button>" + "</td>" +
            "<td align=\"center\">" + "<button onclick='deleteById(" + data[i].id + ")'>Delete</button>" + "</td></tr>";
    }
    document.getElementById("div1").innerHTML = res;
}

function deleteById(id) {
    if (confirm("Really want to delete?")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "DELETE",
            url: "http://localhost:8080/api/cities/" + id,
            success: getAllCity,
            error: function (error) {
                alert("ops!! Something wrong!")
            }
        });
    }
}

function showFormAdd() {
    let res = '<h2>Add city</h2><hr><div class="row"><div class="col-6"><h5>Name:</h5><h5>Population:</h5><h5>Acreage:</h5><h5>GDP:</h5><h5>Description:</h5><h5>Nation:</h5></div>' +
        '<div class="col-6"><input type="text" placeholder="name" id="name">' +
        '<input type="text" placeholder="population" id="population">' +
        '<input type="text" placeholder="acreage" id="acreage">' +
        '<input type="text" placeholder="GDP" id="GDP">' +
        '<input type="text" placeholder="description" id="description">' +
        "<select id=\"nation\"></div></div>;"
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/nation/",
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
    let name = $('#name').val()
    let population = document.getElementById("population").value;
    let acreage = document.getElementById("acreage").value;
    let GDP = document.getElementById("GDP").value;
    let description = document.getElementById("description").value;
    let nation = document.getElementById("nation").value;

    let city = {
        name: name,
        population: population,
        acreage: acreage,
        GDP: GDP,
        description: description,
        nation: {
            id: nation,
        }

    }
    console.log(city);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8080/api/cities/",
        data: JSON.stringify(city),
        success: function (city) {
            getAllCity(city)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showFormEdit(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/" + id,
        success: function (data) {
            console.log(data)
            let res = '<h2>Edit form</h2><hr><div class="row"><div class="col-6"><h5>Name:</h5><h5>Population:</h5><h5>Acreage:</h5><h5>GDP:</h5><h5>Dscription:</h5><h5>Nation:</h5></div>' +
                '<div class="col-6"><input type="text" placeholder="name" id="name" value="' + data.name + '">' +
                '<input type="text" placeholder="population" id="population" value="' + data.population + '">' +
                '<input type="text" placeholder="acreage" id="acreage" value="' + data.acreage + '">' +
                '<input type="text" placeholder="GDP" id="GDP" value="' + data.GDP + '">' +
                '<input type="text" placeholder="description" id="description" value="' + data.description + '">' +
                "<select id=\"nation\"></div></div>;"
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/cities/nation/",
                success: function (data1) {
                    console.log(data1)
                    for (let i = 0; i < data1.length; i++) {
                        res += `<option value="${data1[i].id}">${data1[i].name}</option>`

                    }
                    res += '</select>' + '<br><button onclick="saveEdit1(' + data.id + ')">Save</button>'
                    document.getElementById('div2').innerHTML = res;
                },
                error: function (error) {
                    alert("ops!! Something wrong!")
                }
            })
        }
    })
}

function saveEdit1(id) {
    let city = {
        name: document.getElementById("name").value,
        population: document.getElementById("population").value,
        acreage: document.getElementById("acreage").value,
        GDP: document.getElementById("GDP").value,
        description: document.getElementById("description").value,
        nation: {
            id: document.getElementById("nation").value,
        }
    }
    console.log(city)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/api/cities/" + id,
        data: JSON.stringify(city),

        success: function (city) {
            alert("success!!")
            getAllCity(city)

        },
        error: function (error) {
            alert("ops!! Something wrong!")
        }
    })
}

function getOne(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/" + id,
        success: function (data) {
            console.log(data)
            findOne(data)
        }
    })
}

function findOne(data) {
    let res = "<h2>Detail</h2>" + "<table border='1px' width='100%'><tr>"
        + "<th>Name</th>" + "<th>Population</th>" + "<th>Acreage</th>" + "<th>GDP</th>" + "<th>Description</th>" + "<th>Nation</th>"
    res += "<tr><td>" + data.name + "</td>" +
        "<td>" + data.population + "</td>" +
        "<td>" + data.acreage + "</td>" +
        "<td>" + data.GDP + "</td>" +
        "<td>" + data.description + "</td>" +
        "<td>" + data.nation.name + "</td>"
    document.getElementById("div2").innerHTML = res;

}




