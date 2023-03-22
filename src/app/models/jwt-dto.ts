export class JwtDto {
    token: string;
    type: string;
    username: string;
    email: string;
    authorities: string[];

    constructor(token: string, type: string, username: string, email:string,authorities:string[]) {
       this.authorities = authorities;
       this.username = username;
       this.email = email;
       this.token = token;
       this.type = type;
    }
}
