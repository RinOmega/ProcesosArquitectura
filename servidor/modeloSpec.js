const modelo = require("./modelo.js");
describe('El sistema...', function () {
    let sistema;
    beforeEach(function () {
        sistema = new modelo.Sistema(true);
    });

    it('inicialmente no hay usuarios', function () {
        expect(sistema.numeroUsuarios()).toEqual('0');
    });

    it('agregar usuario', function () {
        expect(sistema.numeroUsuarios()).toEqual('0');
        sistema.agregarUsuario("Pepe");
        expect(sistema.numeroUsuarios()).toEqual('1');
    });

    it('numero usuarios', function () {
        expect(sistema.numeroUsuarios()).toEqual('0');
        sistema.agregarUsuario("Pepe");
        expect(sistema.numeroUsuarios()).toEqual('1');
        sistema.agregarUsuario("Pepe1");
        expect(sistema.numeroUsuarios()).toEqual('2');
    })

    it('eliminar usuario', function () {
        expect(sistema.numeroUsuarios()).toEqual('0');
        sistema.agregarUsuario("Pepe");
        expect(sistema.numeroUsuarios()).toEqual('1');
        sistema.eliminarUsuario("Pepe");
        expect(sistema.numeroUsuarios()).toEqual('0');
    });

    it('obtener usuarios', function () {
        let lista = sistema.obtenerUsuarios();
        expect(Object.keys(lista).length).toEqual(0);
        sistema.agregarUsuario("Pepe");
        sistema.agregarUsuario("Pepe1");
        lista = sistema.obtenerUsuarios();
        expect(Object.keys(lista).length).toEqual(2);
    });

    it('usuario activo', function () {
        sistema.agregarUsuario("Pepe");
        expect(sistema.usuarioActivo("Pepe")).toEqual(true);

  });

})