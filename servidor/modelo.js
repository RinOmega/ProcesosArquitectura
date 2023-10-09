function Sistema() {
    this.usuarios = {};
    this.agregarUsuario = function (nick) {
        let res = { "nick": -1 };
        if (!this.usuarios[nick]) {
            this.usuarios[nick] = new Usuario(nick);
            res.nick = nick;
        }
        else {
            console.log("el nick " + nick + " está en uso");
        }
        return res;
    }

    this.obtenerUsuarios = function () {
        return this.usuarios;
    }

    this.usuarioActivo = function (nick) { // otro -> "x" in sistema.usuarios
        return this.usuarios[nick] != undefined;
        //if (this.usuarios[nick] != undefined) return true;
        //else return false;
    }

    this.eliminarUsuario = function (nick) {
        if(this.usuarios[nick]){
            delete this.usuarios[nick];
            console.log("Usuario eliminado")
        }
        else {
            console.log("El usuario no existe")
        }

    }

    this.numeroUsuarios = function () {
        if (Object.keys(this.usuarios).length > 0) {
            return Object.keys(this.usuarios).length + "";
        }
        else {
            return "0";
        }
    }

}
function Usuario(nick) {
    this.nick = nick;  
}

module.exports.Sistema=Sistema