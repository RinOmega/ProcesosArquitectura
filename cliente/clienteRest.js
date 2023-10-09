/*function ClienteRest() {
    
    this.agregarUsuario = function (nick) {
        var cli = this;
        $.getJSON("/agregarUsuario/" + nick, function (data) {
            if (data.nick != -1) {
                console.log("Usuario " + nick + " ha sido registrado ")
            }
            else {
                console.log("El nick ya está ocupado")
            }
        });
    }

    this.obtenerUsuarios= function () {
        var cli = this;
        $.getJSON("/obtenerUsuarios/", function (data) {
            console.log(data)
        });
    }
    this.usuarioActivo = function (nick) {
        var cli = this;
        $.getJSON("/usuarioActivo/" + nick, function (data) {
            if (data) {
                console.log(data+ "-> Usuario " + nick + " está activo ")
            }
            else {
                console.log(data+"-> El nick no está activo")
            }
        });
    }
    this.eliminarUsuario = function (nick) {
        var cli = this;
        $.getJSON("/eliminarUsuario/" + nick, function (data) {
            if (data) {
                console.log('Usuario eliminado');
            } else {
                console.log("El usuario no existe");
            }
        });
    }

    this.numeroUsuarios = function () {
        var cli = this;
        $.getJSON("/numeroUsuarios/", function (data) {
            var res = 0;
            if (Object.keys(data)) {
                res = Object.keys(data).length;
            }
            return res;
        });

    
        
    }
}*/

/*
Agregar usuario: no registra usuarios repetidos pero muestra el mensaje como si lo registrara
*/
function ClienteRest(){
    this.agregarUsuario=function(nick){
        var cli=this;
        $.getJSON("/agregarUsuario/"+nick,function(data){
        if (data.nick!=-1){
            console.log("Usuario "+nick+" ha sido registrado")
        }
        else{
            console.log("El nick ya está ocupado");
        }
        })
    }
    this.agregarUsuario2=function(nick){
    $.ajax({
        type:'GET',
        url:'/agregarUsuario/'+nick,
        success:function(data){
        if (data.nick!=-1){
        console.log("Usuario "+nick+" ha sido registrado")
        }
        else{
        console.log("El nick ya está ocupado");
        }
        },
        error:function(xhr, textStatus, errorThrown){
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
        },
        contentType:'application/json'
        })
    }
    this.obtenerUsuarios= function () {
        var cli = this;
        $.getJSON("/obtenerUsuarios/", function (data) {
            console.log(data)
        });
    }
    this.usuarioActivo=function(nick){
        $.getJSON("/usuarioActivo/"+nick,function(data){
            if (data) {
                console.log(data+ "-> Usuario " + nick + " está activo ")
            }
            else {
                console.log(data+"-> El nick no está activo")
            }
    })

    }
        
        this.eliminarUsuario=function(nick){
            $.getJSON("/eliminarUsuario/"+nick,function(data){
                if (data) {
                    console.log('Usuario eliminado');
                } else {
                    console.log("El usuario no existe");
                }
            })
    
            }



    this.numeroUsuarios=function()
    {
            var cli = this;
            var res = 0;
            $.getJSON("/numeroUsuarios", function (data) {
                console.log("Numero de usuarios es "+data);
            });
    }
}