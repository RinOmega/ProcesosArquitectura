const modelo = require("./modelo.js");

describe("El sistema", function () {
  let sistema;
  let usr1 = { email: "test@test.es", nick: "test" };

  beforeEach(function () {
    sistema = new modelo.Sistema(true);
  });

  it("inicialmente no hay usuarios", function () {
    expect(sistema.numeroUsuarios()).toEqual("0");
  });

  //escribe un bloque it() por cada método (agregarUsuario, obtenerUsuarios, usuarioActivo y eliminarUsuario).

  it("numero usuarios", function () {
    sistema.agregarUsuario(usr1);
    expect(sistema.numeroUsuarios()).toEqual("1");
  });

  it("agregar usuario", function () {
    let num = Object.keys(sistema.usuarios).length;
    expect(num).toEqual(0);
    sistema.agregarUsuario(usr1);
    num = Object.keys(sistema.usuarios).length;
    expect(num).toEqual(1);
    expect(sistema.usuarioActivo("test@test.es")).toEqual(true);
  });

  it("obtener usuarios", function () {
    expect(sistema.usuarios).toEqual(sistema.obtenerUsuarios());
  });

  it("usuario activo", function () {
    sistema.agregarUsuario(usr1);
    expect(sistema.usuarioActivo("test@test.es")).toEqual(true);
  });

  it("eliminar usuario", function () {
    sistema.agregarUsuario(usr1);
    expect(sistema.usuarioActivo(usr1.email)).toEqual(true);
    expect(sistema.numeroUsuarios()).toEqual("1");
    sistema.eliminarUsuario(usr1.email);
    expect(sistema.usuarioActivo(usr1.email)).toEqual(false);
    expect(sistema.numeroUsuarios()).toEqual("0");
  });

  describe("Metodos que acceden a datos", function () {
    let usrTest = { email: "test@test.es", password: "test", nick: "test" };

    beforeEach(function (done) {
      sistema.cad.conectar(function () {
        sistema.registrarUsuario(usrTest, function () {
          //     sistema.confirmarCuenta(usrTest.email, function(){
          done();
        });
        //});
        // done();
      });
    });

    xit("Inicio de sesión correcto", function (done) {
      sistema.loginUsuario(usrTest, function (res) {
        expect(res.email).toEqual(usrTest.email);
        expect(res.email).toNotEqual(-1);
        done();
      });
    });

    xit("Inicio de sesión incorrecto", function (done) {
      let usr1 = {
        email: "test@test.es",
        password: "testq23498",
        nick: "test",
      };

      sistema.loginUsuario(usr1, function (res) {
        expect(res.email).toEqual(-1);
        done();
      });
    });
  });

});
