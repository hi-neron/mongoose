const $ = require('jquery')

$('#edit-form')
  .find('form')
  .submit(function(ev) {
    ev.preventDefault()
    if ( $('.required').val().length === 0 ){
      alert('Hay un campo necesario vacio')
    } else {
      var formData = new FormData($(this)[0]);
      console.log(formData);

      $.ajax({
        url: "/admin",
        type: "post",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData:false,
        success: (data) => {
          // !! need to add one modal window
          console.log(data)
        }
      })
    }
  });


