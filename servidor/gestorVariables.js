const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();

module.exports.accessCLAVECORREO = async function (callback) {
    const name = "projects/321547850513/secrets/CLAVECORREO/versions/1";
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    //console.info(`Found secret ${version.name} with state ${version.state}`);
    const datos = version.payload.data.toString("utf8");
    //console.log("Datos "+datos);
    //callback(datos);
    return datos
  };
  
  module.exports.accessGMEMAIL = async function (callback) {
    const name = "projects/321547850513/secrets/GMEMAIL/versions/1";
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    //console.info(`Found secret ${version.name} with state ${version.state}`);
    const datos = version.payload.data.toString("utf8");
    //console.log("Datos "+datos);
    //callback(datos);
    return datos
  };
  
  module.exports.obtenerOptions = async function (callback) {
    let options = { user: "", pass: "" };
    let user = await this.accessCLAVECORREO();
    let pass = await this.accessGMEMAIL();
  
    options.user = user;
    options.pass = pass;
    callback(options);
  };
  