import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import FetchURL from "./FetchURL";

function Upload() {
  const [fileState, setFileState] = useState({
    selectedFile: null,
    imgUrl: "",
    imgName: "",
    url: "",
  });

  const [apiState, setApiState] = useState({
    up: false,
    infCall: false,
    gender: "",
    clothType: "",
    color: "",
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setFileState((prevState) => ({
      ...prevState,
      selectedFile: file,
      imgUrl: URL.createObjectURL(file),
    }));
  };

  const uploadFile = (e) => {
    e.preventDefault();
    setApiState((prevState) => ({ ...prevState, up: true }));
  };

  const getInference = (e) => {
    e.preventDefault();
    setApiState((prevState) => ({ ...prevState, infCall: true }));
  };

  useEffect(() => {
    if (apiState.up) {
      FetchURL().then((data) => {
        setFileState((prevState) => ({ ...prevState, url: data }));
        setApiState((prevState) => ({ ...prevState, up: false }));
      });
    }
  }, [apiState.up]);

  useEffect(() => {
    if (fileState.url) {
      fetch(fileState.url, {
        method: "PUT",
        headers: { "Content-Type": "multipart/form-data" },
        body: fileState.selectedFile,
      }).catch((error) => console.error("Upload Error:", error.message));
    }
  }, [fileState.url]);

  useEffect(() => {
    if (apiState.infCall) {
      const imgname = fileState.url.split("?")[0].split("/")[3];
      console.log(imgname);
      fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imgname),
      })
        .then((res) => res.json())
        .then((data) => {
          setApiState({
            ...apiState,
            gender: data.gender,
            clothType: data.cloth_type,
            color: data.color,
            infCall: false,
          });
        })
        .catch((error) => console.error("Inference Error:", error.message));
    }
  }, [apiState.infCall]);

  useEffect(() => {
    console.log("Returned Gender:", apiState.gender);
    console.log("Returned Cloth Type:", apiState.clothType);
    console.log("Returned Color:", apiState.color);
  }, [apiState.color]);

  return (
    <div className="container">
      <div className="row">
        <form>
          <h3>Fashion Identifier</h3>
          <div className="form-group">
            <input type="file" onChange={handleFileInput} />
            <img
              src={fileState.imgUrl}
              width="300"
              height="300"
              alt="Upload file will be displayed here"
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(e) => uploadFile(e, fileState.selectedFile)}
            >
              Upload
            </button>
            <button
              className="btn btn-secondary"
              type="submit"
              onClick={(e) => getInference(e)}
            >
              Get Inference Result
            </button>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Gender</th>
                  <th scope="col">Cloth Type</th>
                  <th scope="col">Color</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{apiState.gender}</td>
                  <td>{apiState.clothType}</td>
                  <td>{apiState.color}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Upload;
