$(document).ready(function () {
    $('#tableDivision').DataTable({
        ajax: {
            url: 'https://localhost:7156/api/Divisions',
            datasrc: '',
            type: "GET",
        },
        columns: [
            {
                data: null,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            { data: "id", },
            { data: "name", },
            {
                data: null,
                render: function (data, type, row, meta) {
                    return `<a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">Details</a> 
                        <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal"> Edit</a > 
                        <a type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</a>`;
                }
            }
        ]
    });
});