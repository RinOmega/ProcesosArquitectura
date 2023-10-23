function ControlWeb()
{
    /*this.mostrarAgregarUsuario = function()
    {
        let cadena = 
        `
            <div class="form-group" id="mAU">
                <label for="usr">Introduce el nombre:</label>
                <input id="nick" type="text" class="form-control" id="usr">
                <button id="btnAU" type="submit" class="btn btn-primary">Confirmar</button>
            </div>
        `;*/
        this.mostrarAgregarUsuario=function(){
            $('#bnv').remove();
            $('#mAU').remove();
            let cadena='<div id="mAU">';
            cadena = cadena + '<div class="card"><div class="card-body">';
            cadena = cadena +'<div class="form-group">';
            cadena = cadena + '<label for="nick">Nombre:</label>';
            cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="Introduce un nick:"></p>';
            cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Confirmar</button>';
            cadena=cadena+'<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_pressed_web.png" style="height:40px;"></a></div>';
            cadena = cadena + '</div>';
            cadena = cadena + '</div></div></div>';

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

    this.comprobarSesion=function(){
        //let nick=localStorage.getItem("nick");
        //let cw=new ControlWeb();
        let nick=$.cookie("nick");
        if (nick){
            cw.mostrarMsg("Bienvenido al sistema, "+nick);
        //cw.mostrarMsg("Hola")
        }
        else{
            cw.mostrarAgregarUsuario();
            cw.init();
            }
        }
    
    this.salir=function(){
        //localStorage.removeItem("nick");
        $.removeCookie("nick");
        location.reload();
        }
           

}