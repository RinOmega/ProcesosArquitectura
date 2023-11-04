const datos = require("./cad.js")
const correo = require("./email.js")


function Sistema(test) {
    this.usuarios = {}; //this.usuarios[]
    this.test = test;
    this.cad = new datos.CAD();
    this.agregarUsuario = function (nick) {
        let res = { nick: -1 };
        if (!this.usuarios[nick]) {
          this.usuarios[nick] = new Usuario(nick);
          res.nick = nick;
          console.log("Nuevo usuario en el sistema" + nick);
        } else {
          console.log("el nick " + nick + " está en uso");
        }
        return res;
      };
    
      this.usuarioGoogle = function (usr, callback) {
        this.cad.buscarOCrearUsuario(usr, function (res) {
          console.log(
            "El usuario " + res.email + " ya esta registrado en el sistema"
          );
          callback(res);
        });
      };
      this.obtenerUsuarios = function () {
        return this.usuarios;
      };
      this.usuarioActivo = function (nick) {
        if (this.usuarios[nick]) {
          return true;
        } else {
          return false;
        }
      };
    
      this.eliminarUsuario = function (nick) {
        if (this.usuarioActivo(nick)) {
          delete this.usuarios[nick];
          console.log("Usuario con nick" + nick + "borrado");
        }
      };
    
      this.numeroUsuarios = function () {
        if (Object.keys(this.usuarios).length > 0) {
          return Object.keys(this.usuarios).length + "";
        } else {
          return "0";
        }
      };
    
      if (!this.test) {
        this.cad.conectar(function () {
          console.log("Conectado a Mongo Atlas");
        });
      }
      this.registrarUsuario = function (obj, callback) {
        let modelo = this;
        if (!obj.nick) {
          obj.nick = obj.email;
        }
        this.cad.buscarUsuario(obj, function (usr) {
          if (!usr) {
            obj.key = Date.now().toString();
            obj.confirmada = false;
            modelo.cad.insertarUsuario(obj, function (res) {
              callback(res);
            });
            correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
            //correo.enviarEmail("correoParaPruebas2324@gmail.com","hola","Confirmar cuenta")
          } else {
            callback({ email: -1 });
          }
        });
      };
    
      this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario(
          { email: obj.email, confirmada: false, key: obj.key },
          function (usr) {
            if (usr) {
              usr.confirmada = true;
              modelo.cad.actualizarUsuario(usr, function (res) {
                callback({"email":res.email});//callback(res)
              });
            } else {
              callback({ email: -1 });
            }
          }
        );
      };
    
      this.loginUsuario = function (obj, callback) {
        this.cad.buscarUsuario(
          { email: obj.email, confirmada: true },
          function (usr) {
            if (usr && obj.pwd == usr.password) {
              callback(usr);
            } else {
              callback({ email: -1 });
            }
          }
        );
      };
    }
    function Usuario(nick) {
      this.nick = nick;
    }
    module.exports.Sistema = Sistema;
    