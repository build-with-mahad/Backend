class ApiResponse extends Error{
    constructor(
        statuscode,
        data,
        message ="Success",
    ){
        super(message)
        this.statuscode= statuscode,
        this.data = data
        this.success = statuscode < 400
        this.message = message
    }
}
export {ApiResponse}