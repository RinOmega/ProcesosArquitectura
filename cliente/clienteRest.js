function ClienteRest() {
    /*  this.agregarUsuario = function (email) {
          var cli = this;
          $.getJSON("/agregarUsuario/" + email, function (data) {
              let msg = "El email " + email + " está ocupado";
              if (data.email != -1) {
                  console.log("Usuario " + email + " ha sido registrado");
                  msg = "Bienvenido al sistema, " + email;
                  $.cookie("email", email);
              } else {
                  console.log("El email ya está ocupado");
              }
              cw.mostrarMsg(msg);
          });
       };*/
    this.agregarUsuario2 = function (email) {
        $.ajax({
            type: "GET",
            url: "/agregarUsuario/" + email,
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + email + " ha sido registrado");
                } else {
                    console.log("El email ya está ocupado");
                    cw.mostrarModal("El email ya está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.obtenerUsuarios = function () {
        var cli = this;
        $.getJSON("/obtenerUsuarios", function (data) {
            if (data.usuarios != -1) {
                console.log(data);
            } else {
                console.log("No hay usuarios");
            }

            msg = "";
            for (usuario in obtenerUsuarios) {
                msg = msg + "\n Nombre: " + usuario;
            }

            if (msg == null) msg = "No hay usuarios";

            cw.mostrarMsg(msg);
        });
    };

    this.numeroUsuarios = function () {
        var cli = this;
        $.getJSON("/numeroUsuarios", function (data) {
            console.log("Numero de usuarios: " + data.usuarios);
        });
    };

    this.usuariosActivo = function (email) {
        var cli = this;
        $.getJSON("/usuarioActivo/" + email, function (data) {
            if (data.activo != false) {
                console.log("Usuario " + email + " existe");
            } else {
                console.log("Usuario " + email + " no existe");
            }
        });
    };

    this.eliminarUsuario = function (email) {
        var cli = this;
        $.getJSON("/usuarioActivo/" + email, function (data) {
            if (data.usuarios != -1) {
                console.log(
                    "Usuario " +
                    email +
                    " ha sido borrado. La lista de usuarios es " +
                    data.usuarios
                );
            } else {
                console.log("No se ha podido ese usuario");
            }
        });
    };

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: "POST",
            url: "/enviarJwt",
            data: JSON.stringify({ jwt: jwt }),
            success: function (data) {
                let msg = "El email " + data.email + " está ocupado";
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha sido registrado");
                    //mostrar un mensaje
                    msg = "Bienvenido al sistema, " + data.email;
                    $.cookie("email", data.email);
                } else {
                    console.log("El email ya está ocupado");
                }
                cw.limpiar();
                cw.mostrarMsg(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(JSON.parse(xhr.responseText));
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
            //dataType:'json'
        });
    };

    this.registrarUsuario = function (email, password) {
        $.ajax({
            type: "POST",
            url: "/registrarUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha sido registrado");
                    // mostrar un mensaje diciendo: consulta tu email
                    //$.cookie("email",data.email);
                    cw.limpiar();
                    //cw.mostrarMensaje("Bienvenido al sistema, "+data.email);
                    cw.mostrarLogin();
                } else {
                    cw.mostrarMsg("El email está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.loginUsuario = function (email, password) {
        $.ajax({
            type: "POST",
            url: "/loginUsuario",
            data: JSON.stringify({ email: email, password: password }),
            success: function (data) {
                //console.log(data);
                if (data.email != -1) {
                    console.log("Usuario " + data.email + " ha sido registrado");
                    $.cookie("email", data.email);
                    //cw.mostrarMsg("Bienvenid@ al sistema, " + data.email);
                    cw.limpiar();
                    cw.comprobarSesion();
                    //cw.mostrarInicio();
                    //cw.obtenerUsuarios();
                    //cw.numeroUsuarios();
                    //cw.usuarioActivo();
                    //cw.eliminarUsuario();
                } else {
                    console.log("No se puede iniciar sesión");
                    cw.mostrarModal("No se puede iniciar sesión");
                    cw.limpiar();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };

    this.cerrarSesion = function () {
        $.getJSON("/cerrarSesion", function () {
            console.log("Sesión cerrada");
            $.removeCookie("email");
        });
    };
}
