$(document).ready(function () {

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
    $(".clear").on("click", () => {

        $.ajax({
            method: "DELETE",
            url: "/clear"
        }).then(() => {
            window.location.reload();
        })
    })

    $(".article").on("click", function () {

        let id = $(this).data("id");
    });

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