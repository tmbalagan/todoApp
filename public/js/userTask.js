$(document).ready(function () {
    /*code for delete row tasks*/
    $('.delete_row').on('click', function (e) {
        e.preventDefault();
//        $(this).closest("tr").remove();
        var rowElement = $(this).closest("tr").remove();
        console.log('*** = ', $(this).val());
        var delete_id = $(this).val();
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/deleteTask/' + delete_id,
            data: {delete_id: delete_id},
            success: function (data) {
                rowElement.fadeOut(500);
            }
        });
    });
    /*end here */

    // new EJS({url: 'userTask.ejs'}).render(data);

    /*-------------------------------------------edit row--------------------------------------------*/
    $('.edit_row').on('click', function () {
        var val = $(this).val();
        console.log('val = ', val);
        $('.edit_btn').attr('value', val);
        var row_text = $(this).parent().siblings().first().text();
        $('#edit_text').text(row_text);
    });
    $('#edit_form').on("submit", function (e) {
        e.preventDefault();
        console.log('in edit ****');
        var update_id = $('.edit_btn').val();
        console.log('in edit ****', typeof update_id);
        var task = $("#edit_text").val();
        var formData = {"text": task, "update_id": update_id};
        console.log('formData = ', formData);
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8080/updateTask/' + update_id,
            data: formData,
            success: function (data) {
                $('#myModal').modal('hide');
                window.location.href = "http://localhost:8080/userTasks"
                console.log('error in edit success = ', data);
            }, error: function (err) {
                console.log('error in edit form update', err);
            }
        });
    });
    /*end edit row*/

});