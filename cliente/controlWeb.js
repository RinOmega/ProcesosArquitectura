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
    
   /* this.mostrarEliminarUsuario = function()
    {
        let cadena1 = 
        `
            <div class="form-group" id="mRU">
                <label for="usr">Introduce el nombre:</label>
                <input id="nickRU" type="text" class="form-control" id="usr">
                <button id="btnRU" type="submit" class="btn btn-primary">Borrar</button>
            </div>
        `;

        $("#eu").append(cadena1);
        
        $("#btnRU").on("click",function(){ 
            let nick=$("#nickRU").val(); 
            rest.eliminarUsuario(nick)
            $("#mRU").remove();
            console.log('Adiós')
        })
    }*/

}