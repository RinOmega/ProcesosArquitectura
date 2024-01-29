var mongo = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;

function CAD() {
    this.usuarios;

    //this.productos; --> depende de la aplicación
    //this.buscarOCrearProducto ...> se hace igual
    this.buscarOCrearUsuario = function (usr, callback) {
        //buscarOCrear(this.usuarios,{email:email},callback);
        buscarOCrear(this.usuarios, usr, callback);
    }

    function buscarOCrear(coleccion, criterio, callback) {
        coleccion.findOneAndUpdate(criterio, { $set: criterio }, { upsert: true, returnDocument: "after", projection: { email: 1 } }, function (err, doc) {
            if (err) { throw err; }
            else {
                console.log("Elemento actualizado");
                //console.log(doc.value.email);
                callback({ email: doc.value.email });
            }
        });
    }
    this.conectar = async function (callback) {
        let cad = this;
        let client = new mongo("mongodb+srv://vsr:vsr@cluster0.fmlnydw.mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database = client.db("sistema");
        cad.usuarios = database.collection("usuarios");
        callback(database);
    }

    this.buscarUsuario = function (obj, callback) {
        buscar(this.usuarios,obj, callback);
      };
    this.insertarUsuario = function (usuario, callback) {
        insertar(this.usuarios, usuario, callback);
    };

    this.actualizarUsuario=function(obj,callback){
        actualizar(this.usuarios,obj,callback);
    };

    function buscar(coleccion, criterio, callback) {
        let col = coleccion;
        coleccion.find(criterio).toArray(function (error, coleccion) {
            if (coleccion.length == 0) {
                callback(undefined);
            }
            else {
                callback(coleccion[0]);
            }
        });
    }
    function insertar(coleccion, elemento, callback) {
        coleccion.insertOne(elemento, function (err, result) {
            if (err) {
                console.log("error");
            }
            else {
                console.log("Nuevo elemento creado");
                console.log("Usuario creado: " + coleccion);
                callback(elemento);
            }
        });
    }
    

    function actualizar(coleccion,obj,callback){
        coleccion.findOneAndUpdate({_id:ObjectId(obj._id)}, {$set: obj}, {upsert: false,returnDocument:"after",projection:{email:1}}, function(err,doc) {
            if (err) { throw err; }
            else { 
                 console.log("Elemento actualizado"); 
                 //console.log(doc);
                 //console.log(doc);
                 callback({email:doc.value.email});
             }
          });   
    }



}

module.exports.CAD = CAD;