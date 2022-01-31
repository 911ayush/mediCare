export class apperror extends Error{
    constructor(statusCode,message) {
        super(message);
    
        this.statusCode = statusCode;
}
}
