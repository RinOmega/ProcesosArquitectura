function ClienteRest() {
    this.agregarUsuario = function (nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function (data) {
            let msg = "El nick " + nick + " está ocupado";
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado");
                msg = "Bienvenido al sistema, " + nick;
                $.cookie("nick", nick);
            } else {
                console.log("El nick ya está ocupado");
            }
            cw.mostrarMsg(msg);
        });
    };
    this.agregarUsuario2 = function (nick) {
        $.ajax({
            type: "GET",
            url: "/agregarUsuario/" + nick,
            success: function (data) {
                if (data.nick != -1) {
                    console.log("Usuario " + nick + " ha sido registrado");
                } else {
                    console.log("El nick ya está ocupado");
                }
                cw.mostrarMsg(msg);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };
    this.obtenerUsuarios = function () {
        $.getJSON("/obtenerUsuarios/", function (data) {
            return this.usuarios;
        });
    };
    this.usuarioActivo = function (nick) {
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (this.usuarios[nick]) {
                return true;
            } else {
                return false;
            }
        });
    };

    this.eliminarUsuario = function (nick) {
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (this.usuarioActivo(nick)) {
                delete this.usuarios[nick];
                console.log("Usuario con nick" + nick + "borrado");
            }
        });
    };

    this.numeroUsuarios = function () {
        var cli = this;
        var res = 0;
        $.getJSON("/numeroUsuarios", function (data) {
            console.log("Numero de usuarios es " + data);
        });
    };

    this.enviarJwt = function (jwt) {
        $.ajax({
            type: "POST",
            url: "/enviarJwt",
            data: JSON.stringify({ jwt: jwt }),
            success: function (data) {
                let msg = "El nick " + data.nick + " está ocupado";
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    msg = "Bienvenido al sistema, " + data.nick;
                    $.cookie("nick", data.nick);
                } else {
                    console.log("El nick ya está ocupado");
                }
                //cw.limpiar();
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
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    //$.cookie("nick",data.nick);
                    cw.limpiar();
                    //cw.mostrarMensaje("Bienvenido al sistema, "+data.nick);
                    //cw.mostrarLogin();
                } else {
                    console.log("El nick está ocupado");
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
                if (data.nick != -1) {
                    console.log("Usuario " + data.nick + " ha sido registrado");
                    $.cookie("nick", data.nick);
                    cw.limpiar();
                    cw.mostrarMensaje("Bienvenido al sistema, " + data.nick);
                    //cw.mostrarLogin();
                } else {
                    console.log("El nick está ocupado");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
            },
            contentType: "application/json",
        });
    };
}