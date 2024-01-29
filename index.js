const fs = require("fs");
const express = require("express");
const app = express();
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./servidor/passport-setup.js");
const modelo = require("./servidor/modelo.js");
const bodyParser = require("body-parser");

const httpServer = require("http").Server(app);
//const { Server } = require("socket.io");
//const moduloWS = require("./servidor/servidorWS.js");

//let ws = new moduloWS.ServidorWS();
//let io = new Server();

const PORT = process.env.PORT || 3000;
const args = process.argv.slice(2);
const haIniciado = function (request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect("/");
  }
};

let test = false;
test = eval(args[0]); //test=true

app.use(express.static(__dirname + "/"));

app.use(
  cookieSession({
    name: "Batalla Naval",
    keys: ["key1", "key2"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      sistema.loginUsuario(
        { email: email, password: password },
        function (user) {
          //if (user.email != -1) {
          return done(null, user);
          //} else {
          //return done(-1);
          //}
        }
      );
    }
  )
);

let sistema = new modelo.Sistema(test);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/", function (request, response) {
  var contenido = fs.readFileSync(__dirname + "/cliente/index.html");
  response.setHeader("Content-type", "text/html");
  response.send(contenido);
});

httpServer.listen(PORT, () => {
  console.log("App está escuchando en el puerto" + PORT);
  console.log("Ctrl+C para salir");
});

/*app.get("/agregarUsuario/:email", function (request, response) {
  let email = request.params.email;
  let res = sistema.agregarUsuario(email);
  response.send(res);
});*/

app.get("/usuarioActivo/:email", haIniciado, function (request, response) {
  let email = request.params.email;
  let res = sistema.usuarioActivo(email);
  response.send(res);
});

app.get("/numeroUsuarios", haIniciado, function (request, response) {
  let res = sistema.numeroUsuarios();
  response.send(res);
});

app.get("/obtenerUsuarios", haIniciado, function (request, response) {
  let res = sistema.obtenerUsuarios();
  response.send(res);
});

app.get("/eliminarUsuario/:email", haIniciado, function (request, response) {
  let email = request.params.email;
  let res = sistema.eliminarUsuario(email);
  response.send(res);
});

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fallo" }),
  function (req, res) {
    res.redirect("/good");
  }
);

app.post(
  "/oneTap/callback",
  passport.authenticate("google-one-tap", { failureRedirect: "/fallo" }),
  function (req, res) {
    res.redirect("/good");
  }
);

app.get("/good", function (request, response) {
  let email = request.user.emails[0].value;
  sistema.usuarioGoogle({ email: email }, function (usr) {
    response.cookie("email", usr.email);
    response.redirect("/");
  });
});

app.get("/fallo", function (request, response) {
  response.send({ email: "-1" });
});

app.post("/enviarJwt", function (request, response) {
  let jwt = request.body.jwt;
  let user = JSON.parse(global.atob(jwt.split(".")[1]));
  let email = user.email;
  sistema.usuarioGoogle({ email: email }, function (obj) {
    response.send({ email: obj.email });
  });
});

app.post("/registrarUsuario", function (request, response) {
  sistema.registrarUsuario(request.body, function (res) {
    response.send({ email: res.email });
  });
});

// app.post("/loginUsuario", function (request, response) {
//   sistema.loginUsuario(request.body, function (res) {
//     response.send({ email: res.email });
//   });
// });

app.post(
  "/loginUsuario",
  passport.authenticate("local", {
    failureRedirect: "/fallo",
    successRedirect: "/ok",
  })
);

app.get("/ok", function (request, response) {
  response.send({ email: request.user.email });
});

app.get("/confirmarUsuario/:email/:key", function (request, response) {
  let email = request.params.email;
  let key = request.params.key;
  sistema.confirmarUsuario({ email: email, key: key }, function (usr) {
    if (usr.email != -1) {
      response.cookie("email", usr.email);
    }
    response.redirect("/");
  });
});

app.get("/cerrarSesion", haIniciado, function (request, response) {
  let email = request.user.email;
  request.logout();
  response.redirect("/");
  if (email) {
    sistema.eliminarUsuario(email);
  }
});

//io.listen(httpServer);
//ws.lanzarServidor(io, sistema);