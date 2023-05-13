export interface Usuario {
    n_idseg_userprofile: number;
    c_username: String;
    c_nombre1:String; 
    c_nombre2:String; 
    c_appaterno:String;
    c_apmaterno: String;
    c_dni:String;
    c_clave:String;
    c_reclave:String;
    n_idseg_rol:number;
    n_id_usermodi: number
    /*n_idgen_entidad:number*/
}

export interface Role{
    n_idseg_rol:number,
    c_nombre:String,
    n_nivel: String,
    n_id_usermodi: number
}

/*export interface Entidad{
    n_idgen_entidad: number,
    c_nombre1: String
}*/

export interface ResetarClave {
    data: Usuario,
    titulo: string,
    esresetpassword: boolean
}

export interface UsuarioEditar{
    usuario:Usuario,
    roles:Role[],
    /*entidades:Entidad[],*/
}

export interface Roleditar{  
    rol: Role,   
}

