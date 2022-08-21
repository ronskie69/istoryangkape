$(document).ready(function(){
    $('#form_login').submit(function(e){
        e.preventDefault()
        let login = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.ajax({
            url:'https://istoryangkape.herokuapp.com/api/login',
            method: 'POST',
            async: true,
            headers: { 'Content-type':'application/json' },
            data: JSON.stringify(login)
        }).then(data => {
            Swal.fire({
                title: data,
                icon:'success',
                confirmButtonColor: '#56290d'
            });
            $('#submitBtn').attr('disabled', true);
            setTimeout(() => {
                if(data === "Success!"){
                    window.location.href = "/istorya/account"
                }
            }, 1500)
        }).catch(err => {
            if(!err.responseText){
                Swal.fire({ confirmButtonColor: '#56290d',text: 'Please upgrade your browser or use PC for better experience. Sorry.', icon: 'error' })
                return;
            }
            Swal.fire({
                title: err.responseText,
                icon:'error' 
            })
            $("#password").val("");
        });
    });
    $('#form_register').submit(function(e){
        e.preventDefault()
        if($("#password").val() !== $("#password2").val()){
            $("#password2").val("");
            return Swal.fire({
                        title: 'Passwords did not matched!',
                        icon:'error',
                        confirmButtonColor: '#56290d'
                    });
        }
        if($("#password").val().length < 6){
            $("#password2").val("");
            console.log($("#password").val().length)
            return Swal.fire({
                        title: 'Password too short!',
                        icon:'warning',
                        confirmButtonColor: '#56290d'
                    });
        }
        let registerAccount = {
            email: $("#email").val(),
            password: $("#password").val()
        };
        $.ajax({
            url:'https://istoryangkape.herokuapp.com/api/register',
            method: 'POST',
            async: true,
            headers: { 'Content-type':'application/json' },
            data: JSON.stringify(registerAccount)
        }).then(data => {
            Swal.fire({
                title: data,
                icon:'success' ,
                confirmButtonColor: '#56290d'
            });
            $('#registerBtn').attr('disabled', true);
            setTimeout(() => {
                if(data === "Success!"){
                    window.location.href = "/istorya/login"
                }
            }, 1500)
        }).catch(err => {
            if(!err.responseText){
                return Swal.fire({ confirmButtonColor: '#56290d',text: 'Please upgrade your browser or use PC for better experience. Sorry.', icon: 'error' })
            }
            Swal.fire({
                title: err.responseText,
                icon:'error',
                confirmButtonColor: '#56290d' 
            })
            $("#password2").val("");
        });
    });
});