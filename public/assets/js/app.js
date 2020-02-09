$(document).ready(function () {


    // Saves an article that can be displayed on a separate page
    $(".save").on("click", function () {

        let id = $(this).parent().data("id");

        $.ajax({
            method: "POST",
            url: "/saved/" + id,
            data: {
                saved: true
            }
        }).then(function (result) {
            window.location.reload();
        });

    });

    // Calls the modal to display and populates the note from the database
    $(".comment").on("click", function () {

        let id = $(this).attr("buttonID");

        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
            .then(function (data) {

                console.log(data)

                $(`#modal-${id}`).append(`
                <div class="text-center comment-title">
                    <h4>Title</h4>
                    <hr>
                    <p> ${data.note.title}</p>
                </div>`)
                $(`#modal-${id}`).append(`
                <div class="text-center comment-body">
                    <h4>Comment</h4>
                    <hr>
                    <p>${data.note.body}</p>
                </div`)

            })
    })

    // Adds user inputted comment to database
    $(".submitComment").on("click", function () {

        let id = $(this).attr("id");

        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                title: $(`#title-${id}`).val(),
                body: $(`#body-${id}`).val()
            }
        })
            .then(function (data) {
                console.log(data);
                window.location.reload();
            })


    })

    // Empties the database
    $(".clear").on("click", () => {

        $.ajax({
            method: "DELETE",
            url: "/clear"
        }).then(() => {
            window.location.reload();
        })
    })

    // Removes article from saved list
    $(".delete").on("click", function () {

        let id = $(this).parent().data("id");

        $.ajax({
            method: "POST",
            url: "/unsaved/" + id

        }).then((result) => {
            window.location.reload();
        });

    });
});