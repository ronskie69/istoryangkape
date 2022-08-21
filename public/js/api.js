function sendDataToCRUD(route, data){
    $('#btnCreateStory').attr('disabled', true).val("Saving...");
    $.ajax({
        url:'https://istoryangkape.herokuapp.com/crud/'+route,
        method: 'POST',
        async: true,
        headers: { 'Content-type':'application/json' },
        data: JSON.stringify(data)
    }).then(data => {
        Swal.fire({ title: data, icon: 'success',confirmButtonColor: '#56290d' })
        setTimeout(window.location.reload(), 2000); return; 
    }).catch(err => {
        if(!err.responseText) {
            Swal.fire({ text: 'Please upgrade your browser or use PC for better experience. Sorry.', icon: 'error', confirmButtonColor: '#56290d' })
            return;
        }
        Swal.fire({ title: err.responseText, icon: 'error', confirmButtonColor: '#56290d' })
    })
}