$(document).ready(function(){

    if(localStorage.getItem("nickname")){
        $('#_nickname').val(localStorage.getItem("nickname"));
    }

    if($('#_nickname').val() === ""){
        $('#_nickname').removeAttr('disabled')
    } else {
        $('#_nickname').attr('disabled', true)
    }

    $('#toggle_cards').click(function(){
        $('.card').toggleClass('hide');
        if($('#toggle_cards').hasClass('fa-arrow-up')){
            $('#toggle_cards').addClass('fa-arrow-down').removeClass('fa-arrow-up');
        } else {
            $('#toggle_cards').addClass('fa-arrow-up').removeClass('fa-arrow-down');
        }
    });

    $('#_title').focusout(function(e){
        if($(this).val().length > 20) {
            $(this).val("")
            return Swal.fire({ 
                title: 'Title too long!',
                text: 'Title length should be below 13 characters.',
                icon: 'warning',
                confirmButtonColor: '#56290d'
            })
        }
    })

    $('#_nickname').focusout(function(e){
        if($(this).val().length > 18){
            //$('#form_storu').trigger('reset')
            $(this).val("");
            return Swal.fire({ 
                title: 'Nickname too long!',
                text: 'Nickname length should be below 20 characters.',
                icon: 'warning',
                confirmButtonColor: '#56290d'
            })
        }
    })


    $('#form_storu').submit(function(e){
        e.preventDefault();

        if($('#_story').val().length > 500){
            //$('#form_storu').trigger('reset')

            return Swal.fire({ 
                title: 'Nickname too long!',
                text: 'Story length should be below 350 characters.',
                icon: 'warning',
                confirmButtonColor: '#56290d'
            })
        }

        localStorage.setItem("nickname", $('#_nickname').val());

        let newStory = {
            title: $('#_title').val(),
            nickname: $('#_nickname').val(),
            story: $('#_story').val(),
            senderEmail: $('#_email').val(),
            storyType: $('#_storyType').val()
        };
        sendDataToCRUD('create-story', newStory)

    });
    $('.deleteStory').each(function(i){
        $(`.deleteStory:eq(${i})`).click(function(){
            console.log($(`.card:eq(${i})`).attr('data-id'));
            const senderEmail = $(`.card:eq(${i})`).attr('data-sender');
            const id = $(`.card:eq(${i})`).attr('data-id');

            let newStory = { senderEmail, id };
            Swal.fire({
                title: 'Are you sure to delete this story?',
                text: 'You are delecting it permanently.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#56290d',
                reverseButtons: true
            }).then(result => {
                if(result.isConfirmed){
                    sendDataToCRUD('delete-story',newStory)
                }
            })
        })
    })
    // $('#edit').click(function(){
    //     if($(this).text() ==="Edit"){
    //         $(this).text("Save");
    //     } else {
    //         $(this).text("Edit")
    //     }
    // });
});