function Sistema(){
    this.usuarios={};
    this.agregarUsuario=function(nick){
        if (!this.usuarios[nick]){
            console.log("Bienvenido usuario: ",nick);
            this.usuarios[nick]=new Usuario(nick);
        }
        else{
            console.log("Ese nick está en uso");
        }
        
    } 
    this.obtenerUsuarios=function(){
        return this.usuarios;
    }   
    this.usuarioActivo=function(nick){
        if(this.usuarios[nick]){
            return true;
        }
        else{
            return false;
        }

    }
    this.eliminarUsuario =function(nick){
        if(this.usuarios[nick]){
            
        }
    }

  
}
function Usuario(nick){
    this.nick=nick;
}