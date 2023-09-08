
async function FetchURL(){
    console.log("FetchURL called.");
    return await fetch("/s3Url", {
        headers:{
            "accepts": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((response) => {
        // console.log("response received.")
        return response.json()
    })
    .then((responseData) => {
        console.warn(responseData.url)
        return responseData.url;
    })
    .catch((error) => {console.warn(error);})
}

export default FetchURL;
