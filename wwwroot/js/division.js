$(document).ready(function () {
    $('#tableDivision').DataTable({
        ajax: {
            url: 'https://localhost:7156/api/Divisions',
            datasrc: 'data',
            type: "GET",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
            },
            { data: "id", },
            { data: "name", },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal"
                            onclick="detailDiv('${data.id}')">Details</button>

                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"
                            onclick="editDiv('${data.id}')">Edit</button>

                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                            onclick="deleteId('${data.id}', '${data.name}')">Delete</button>`;
                }
            },
        ],
        dom: 'Bfrtip',
        butttons: ['colvis', 'excel', 'pdf']
    });
});

// Create
function createDiv() {
    var createItem = {};
    createItem.name = $('#divisionName').val();
    if (createItem) {
        $.ajax({
            url: `https://localhost:7156/api/Divisions`,
            type: "POST",
            data: JSON.stringify(createItem),
            contentType: 'application/ json; charset=utf-8',
            success: function () {
                Swal.fire("Added!", "Your Data Added Successfully!", "success")
                    .then(function () {
                        location.reload();
                    });
            },
            error: function () {
                Swal.fire("Oops!", "Your data is not saved!", "error")
            }
        });
    }
}

// Delete
function deleteId(id, name) {
    let deleteButton = "";
    deleteButton = `<button class="btn btn-danger" onclick="deleteDiv('${id}')">Delete</button>`

    let deleteDivision = "";
    deleteDivision = `<p>Are you sure want to delete this data ${name}?</p>`

    $("#btn-delete").html(deleteButton)
    $("#btn-delete-division").html(deleteDivision)
}

function deleteDiv(id) {
    $.ajax({
        url: `https://localhost:7156/api/Divisions/${id}`,
        method: "DELETE",
        dataType: 'json',
        success: function () {
            Swal.fire("Deleted!", "Your Data Delete Successfully!", "success")
                .then(function () {
                    location.reload();
                });
        },
    })
}

// Detail

function detailDiv(id) {
    $.ajax({
        url: `https://localhost:7156/api/Divisions/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.id}"
                    value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="divName" class="form-control" readonly placeholder="${res.data.name}"
                    value="${res.data.name}">
                `;
        // console.log(temp);
        $("#detailDivision").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

// Edit
function editDiv(id) {
    $.ajax({
        url: `https://localhost:7156/api/Divisions/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="divName" class="form-control" placeholder="${res.data.name}" value="${res.data.name}">
                `;
        // console.log(temp);
        $("#editDivision").html(temp);
    });
}

function saveEdit() {
    var createSave = {};
    createSave.id = $('#divId').val();
    createSave.name = $('#divName').val();
    if (createSave) {
        $.ajax({
            url: `https://localhost:7156/api/Divisions/`,
            type: "PUT",
            data: JSON.stringify(createSave),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                Swal.fire("Updated!", "Your Data Updated Successfully!", "success")
                    .then(function () {
                        location.reload();
                    });
            },
            error: function () {
                Swal.fire("Oops", "Your data is not saved!", "error");
            }
        });
    }
}

