// Preload and Preview Image
$("#foto").on("change",function(){
    var uploadFoto = document.getElementById("foto").value;
    var foto       = document.getElementById("foto").files;
    var nav = window.URL || window.webkitURL;

    if(uploadFoto !=''){
        var type = foto[0].type;
        var name = foto[0].name;
        if(type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png'){
            $("#img").remove();
            $(".delPhoto").addClass('notBlock');
            $('#foto').val('');
            return false;
        }else{
            $("#img").remove();
            $(".delPhoto").removeClass('notBlock');
            var objeto_url = nav.createObjectURL(this.files[0]);
            file = this.files[0];
            $(".prevPhoto").append("<img class='previewProduct' id='img' src="+objeto_url+">");
            $(".upimg label").remove();
        }
    }else{
        alert("No selecciono foto");
        $("#img").remove();
    }
});

/*
HTML Components

<!-- Preview Producto Image Contain -->
<div class="prevPhoto"></div>
<!-- Upload Image Button -->
<div class="upimg btn">
    <input style="width:70%" type="file" name="foto" id="foto">
</div>

*/
