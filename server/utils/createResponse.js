const { NOTFOUND } = require("dns");

const Status = Object.freeze({
    PENDING:"pending",
    SUCCESS:"success",
    FAILED:"failed",
    NOTFOUND: "not found"
})

createResponse = (status, data)=>{
    const res = {
        "success": status === Status.success ? true : false,
        "status": status,
        "data":data
    }
    return res;
}

module.exports = { Status, createResponse}

