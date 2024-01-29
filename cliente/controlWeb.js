function ControlWeb() {
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
    /*this.mostrarAgregarUsuario = function () {
        $('#bnv').remove();
        $('#mAU').remove();
        let cadena = '<div id="mAU">';
        cadena = cadena + '<div class="card"><div class="card-body">';
        cadena = cadena + '<div class="form-group">';
        cadena = cadena + '<label for="nick">Nombre:</label>';
        cadena = cadena + '<p><input type="text" class="form-control" id="nick" placeholder="Introduce un nick:"></p>';
        cadena = cadena + '<button id="btnAU" type="submit" class="btn btn-primary">Confirmar</button>';
        cadena = cadena + '<div><a href="/auth/google"><img src="./cliente/img/btn_google_signin_light_pressed_web.png" style="height:40px;"></a></div>';
        cadena = cadena + '</div>';
        cadena = cadena + '</div></div></div>';

        $("#au").append(cadena);

        $("#btnAU").on("click", function () {
            let nick = $("#nick").val();
            rest.agregarUsuario(nick)
            $("#mAU").remove();
            console.log('Hola')
        })

    }*/

    this.mostrarMsg = function (msg) {
        $('#mMsg').remove();
        let cadena = '<h2 id ="mMsg">' + msg + '</h2>';
        $('#mMsg').append(cadena);
    }

    this.mostrarRegistro = function () {
        if ($.cookie("email")) {
          return true;
        }
        $("#fmRegistro").remove();
        $("#registro").load("./cliente/registro.html", function () {
          $("#btnRegistro").on("click", function () {
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            if (email && pwd) {
              rest.registrarUsuario(email, pwd);
              console.log(email + " " + pwd);
            }
          });
        });
      };

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

    this.init = function () {
        let cw = this;
        google.accounts.id.initialize({
            client_id: "321547850513-i1bi159aohmit421at3g47bu1fvqfdv1.apps.googleusercontent.com", //prod
            auto_select: false,
            callback: cw.handleCredentialsResponse
        });
        google.accounts.id.prompt();
    }

    this.comprobarSesion = function () {
        //let email=localStorage.getItem("email");
        let email = $.cookie("email");
        if (email) {
            cw.mostrarMsg("Bienvenido al sistema, " + email);
            cw.limpiar();
            cw.mostrarInicio();
        }
        else {
            cw.mostrarMsg("Bienvenido al sistema, debes iniciar sesión");
            // cw.mostrarAgregarUsuario();
            //cw.mostrarRegistro();
            cw.mostrarLogin();
            //cw.init();
        }
    }

    this.salir = function () {
        $.removeCookie("email");
        location.reload();
        rest.cerrarSesion();
      };

    this.limpiar = function () {
        $("#mAU").remove();
        $("#fmLogin").remove();
        $("#fmRegistro").remove();
    }


    this.handleCredentialsResponse = function (response) {
        let jwt = response.credential;
        let user=JSON.parse(atob(jwt.split(".")[1]));
        console.log(user.name);
        console.log(user.email);
        console.log(user.picture);
        rest.enviarJwt(jwt);
    }


    this.mostrarLogin = function () {
        if ($.cookie("email")) {
          return true;
        }
        $("#fmLogin").remove();
        $("#registro").load("./cliente/login.html", function () {
          $("#btnLogin").on("click", function () {
            let email = $("#email").val();
            let pwd = $("#pwd").val();
            console.log(email)
            if (email && pwd) {
              rest.loginUsuario(email, pwd);
              console.log(email + " " + pwd);
            }
          });
        });
      };

    this.mostrarModal = function (msg) {
        $("#msgModal").remove();
        let cadena = "<div id='msgModal'>" + msg + "</div>";
        $('#bModal').append(cadena);
        $('#miModal').modal();

    }

    this.mostrarInicio= function () {
      if ($.cookie("email")) {
        $("body").load("./cliente/inicio.html"
        );
        cw.limpiar();
    }else {
      cw.mostrarMsg("Tienes que iniciar sesión");
      this.mostrarLogin();
    }
  };

}