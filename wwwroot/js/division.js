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
                    return `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="detailDiv('${data.id}')">Details</button> 
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editDiv('${data.id}')">Edit</button>
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="deleteDiv('${data.id}')">Delete</button>`;
                }
            },
        ],
        dom: 'Bfrtip',
        butttons: ['colvis', 'excel', 'pdf']
    });
});

function detailDiv(id) {
    $.ajax({
        url: `https://localhost:7156/api/Divisions/${id}`,
        type: "GET"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="divName" class="form-control" readonly placeholder="${res.data.name}" value="${res.data.name}">
                `;
        // console.log(temp);
        $("#detailDivision").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function deleteDiv(id) {
    $.ajax({
        url: `https://localhost:7156/api/Divisions/${id}`,
        method: "DELETE"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="divName" class="form-control" readonly placeholder="${res.data.name}" value="${res.data.name}">
                `;
        // console.log(temp);
        $("#deleteDivision").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

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
    }).fail((err) => {
        console.log(err);
    });
}

function createDiv() {
    $.ajax({
        url: `https://localhost:7156/api/Divisions`,
        type: "POST"
    }).done((res) => {
        //console.log(res.results);
        let temp = "";
        temp += `
                <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                <h6>Id          : <h6><input type="text" id="divId" class="form-control" readonly placeholder="${res.data.id}" value="${res.data.id}">
                <h6>Name        : <h6><input type="text" id="divName" class="form-control" placeholder="${res.data.name}" value="${res.data.name}">
                `;
        // console.log(temp);
        $("#createDivision").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}
