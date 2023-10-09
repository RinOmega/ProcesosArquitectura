function Sistema() {
    this.usuarios = {};
    /*
    this.agregarUsuario = function (nick) {
        this.usuarios[nick] = new Usuario(nick);
        //agregar que si el usuario existe, se lo avisa
    }
    */

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

    /*
    this.obtenerUsuarios = function () {
        return this.usuarios;
    }
    */

    this.obtenerUsuarios = function () {
        let res = {};
        if (this.usuarios != {}){
            res = this.usuarios;
        }
        return res;
    }

    /*
    this.usuarioActivo = function (nick) { // otro -> "x" in sistema.usuarios
        return this.usuarios[nick] != undefined;
        //if (this.usuarios[nick] != undefined) return true;
        //else return false;
    }
    */
    this.usuarioActivo = function (nick) {
        let res = false;
        res = nick in Sistema.usuarios;
        return res;
    }

    /*
    this.eliminarUsuario = function (nick) {
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
        }
        else {
            console.log("El usuario no existe")
        }

    }
    */

    this.eliminarUsuario = function (nick) {
        if (this.usuarios[nick]) {
            delete this.usuarios[nick];
            console.log("El usuario ha sido eliminado")
            return true;
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
    

    /*this.numeroUsuarios = function () {
        let res = 0;
        if (Object.keys(this.usuarios)) {
            res = Object.keys(this.usuarios).length;
        }
        return res;
    }*/

}
function Usuario(nick) {
    this.nick = nick;
}

module.exports.Sistema = Sistema;
