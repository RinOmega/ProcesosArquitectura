function ControlWeb()
{
    this.mostrarAgregarUsuario = function()
    {
        let cadena = 
        `
            <div class="form-group" id="mAU">
                <label for="usr">Introduce el nombre:</label>
                <input id="nick" type="text" class="form-control" id="usr">
                <button id="btnAU" type="submit" class="btn btn-primary">Confirmar</button>
            </div>
        `;

        $("#au").append(cadena);
        
        $("#btnAU").on("click",function(){ 
            let nick=$("#nick").val(); 
            rest.agregarUsuario(nick)
            $("#mAU").remove();
            console.log('Hola')
        })
    }

    this.mostrarMsg=function(msg){
        $('#mMsg').remove();
        let cadena='<h2 id ="mMsg">'+msg+'</h2>';
        $('#mMsg').append(cadena);
    }
}