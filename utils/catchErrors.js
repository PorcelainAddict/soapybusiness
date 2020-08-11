function catchErrors(error, displayError) {
    let errorMsg;
    if(error.response) {
        //Outwith status code of 2xx 
        errorMsg = error.response.data;
        console.error("Error Response", errorMsg);
        //cloudinary error
        if(error.response.data.error) {
            errorMsg = error.response.data.error.message
        }
    } else if (error.request) {
        //The request was made, but no response
        errorMsg = error.request;
        console.error("Error Request", errorMsg)
    } else {
        //something else happened. Who knows? 
        errorMsg = error.message;
        console.error("Error Message", errorMsg)
    }
    displayError(errorMsg);
}

export default catchErrors;