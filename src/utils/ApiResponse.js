class ApiResponse extends Error{
    constructor(
        message ="Success",
        statuscode,
        data,
    ){
        super(message)
        this.statuscode= statuscode,
        this.data = data
        this.success = statuscode < 400
        this.message = message
    }
}
