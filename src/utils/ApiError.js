class ApiError extends Error{
    constructor(
        statuscode,
        error = [],
        stack="",
        message= "Something Went Wrong"
    )
    {
        super(message)
        this.statuscode = statuscode,
        this.error = error
        this.success = false,
        this.message = message
        this.data = null
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}
