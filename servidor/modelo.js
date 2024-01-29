const datos = require("./cad.js");
const correo = require("./email.js");
const  bcrypt= require("bcrypt");


function Sistema(test) {
    this.usuarios = {}; //this.usuarios[]
    this.test = test;
    this.cad = new datos.CAD();


    /*this.agregarUsuario = function (usr, callback) {
      let email = usr.email;
      let res = { email: -1 };
      if (!this.usuarios[email]) {
        this.usuarios[email] = new Usuario(usr);
        res.email = email;
  
        if (callback) callback(usr);
  
        console.log("Nuevo usuario en el sistema: " + email);
      } else {
        console.log("el email " + email + " está en uso");
      }
      return res;
    };*/
    this.agregarUsuario = function (usr) {
      let res = { "email": -1 };
      if (usr && usr.email) {
          let email = usr.email;

          if (!this.usuarios[email]) {
              this.usuarios[email] = new Usuario(usr);
              res.email = email;
              console.log("Nuevo usuario en el sistema: " + email);
          } else {
              console.log("El email " + email + " está en uso");
          }
      }

      return res;
  };
      this.usuarioGoogle = function (usr, callback) {
        let modelo = this;
        this.cad.buscarOCrearUsuario(usr, function (res) {
          console.log(
            "El usuario " + res.email + " ya esta registrado en el sistema"
          );
          //modelo.agregarUsuario(res, callback);
          callback(res);
          modelo.agregarUsuario();
        });
      };

      this.obtenerUsuarios = function () {
        return this.usuarios;
      };
      this.usuarioActivo = function (email) {
        if (this.usuarios[email]) {
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
    //correo.conectar(function(){
    //  console.log("Variables secretas obtenidas");
  //})
  
      if (!this.test) {
        this.cad.conectar(function () {
          console.log("Conectado a Mongo Atlas");
        });
      }

      this.registrarUsuario = function (obj, callback) {
        let modelo = this;
    
        if (!obj.email) {
          obj.email = obj.email;
        }
    
        this.cad.buscarUsuario({ email: obj.email }, async function (usr) {
          if (!usr) {
            obj.key = Date.now().toString();
            obj.confirmada = false; //false
    
            bcrypt.hash(obj.password, 10, function (err, hash) {
              obj.password = hash;
    
              modelo.cad.insertarUsuario(obj, function (res) {
                callback(res);
              });
    
              if (!modelo.test) {
                correo.enviarEmail(obj.email, obj.key, "Confirmar cuenta");
              }
            });
          } else {
            callback({ email: -1, mensaje: "Usuario no encontrado" });
          }
        });
      };
//    this.confirmarUsuario=function(obj,callback){
//      let modelo=this;
//      this.cad.buscarUsuario({"email":obj.email, "confirmada": false, "key":obj.key},
//      function(usr){
//          if (usr){
//             usr.confirmada=true;
//                 modelo.cad.actualizarUsuario(usr, function(res){
//                  callback({"email": res.email}); //callback(res)
//              });
//
//         }
//          else
//          {
//             callback({"email":-1});
//          }
 //     });
//  }
    
      this.confirmarUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario(
          { email: obj.email, confirmada: false, key: obj.key },
          function (usr) {
            if (usr) {
              usr.confirmada = true;
              modelo.cad.actualizarUsuario(usr, function (res) {
                callback({email:res.email});//callback(res)
              });
            } else {
              callback({ email: -1 });
            }
          }
        );
      };
    
      this.loginUsuario = function (obj, callback) {
        let modelo = this;
        this.cad.buscarUsuario(
          { email: obj.email, confirmada: true },
          function (usr) {
            if (!usr) {
              callback({ email: -1 });
              return -1;
            } else {
              bcrypt.compare(obj.password, usr.password, function (err, result) {
                if (err) {
                  console.error("Error al comparar contraseñas:", err);
                  callback({
                    email: -1,
                    mensaje: "Error al comparar contraseñas",
                  });
                } else if (result) {
                  callback(usr); // Contraseña válida
                  //modelo.agregarUsuario(usr);
                } else {
                  callback({ email: -1, mensaje: "Contraseña incorrecta" }); // Contraseña incorrecta
                }
              });
            }
          }
        );
      };
    }
    function Usuario(usr) {
      this.nick = usr.nick;
      this.email = usr.email;
      this.clave;
      this.apellidos;
      this.nombre;
    }
    module.exports.Sistema = Sistema;
    