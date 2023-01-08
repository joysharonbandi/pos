import axios from "axios";
import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

export default function Upload() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState(null);
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      setData(res);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  // console.log(data.data.data.nouns, "aaa");

  return (
    <div>
      {/* <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("file", e.target[0].files);
          formData.append("fileName", e.target[0].files.name);
          for (var [key, value] of formData.entries()) {
            console.log(key, value);
          }
          // console.log(e.target[0].files);
          // const formData = new FormData();
          // formData.append({ [e.target.name]: e.target.value });

          try {
            const res = await axios.post(
              "http://localhost:3000/api/upload",
              formData
            );
            console.log(res);
          } catch (ex) {
            console.log(ex);
          }

          // fetch("http://localhost:3000/api/upload", {
          //   method: "POST", // or 'PUT'
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(formData),
          // })
          //   .then((response) => response.json())
          //   .then((data) => {
          //     console.log("Success:", data);
          //   })
          //   .catch((error) => {
          //     console.error("Error:", error);
          //   });
          // axios
          //   .post({
          //     method: "POST",
          //     url: "api/upload",

          //     data: JSON.stringify(formData),
          //     config: {
          //       headers: {
          //         "Content-Type":
          //           "multipart/form-data, boundary=${form._boundary}",
          //       },
          //     },
          //   })
          //   .then((res) => console.log(res))
          //   .catch((err) => console.log("Error", err));
        }}
      >
        <input type="file" name="myFile" id="file" />
        <input type="submit" />
      </form> */}
      <input type="file" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
      {data && (
        <div>
          <PieChart
            data={[
              {
                title: "noun",
                value: data.data.data.nouns || 0,
                color: "#E38627",
              },
              {
                title: "adjectives",
                value: data.data.data.adjectives || 0,
                color: "#C13C37",
              },
              {
                title: "adverbs",
                value: data.data.data.adverbs || 0,
                color: "#6A2135",
              },
              {
                title: "verbs",
                value: data.data.data.verbs || 0,
                color: "blue",
              },
              { title: "rest", value: data.data.data.rest || 0, color: "red" },
            ]}
            style={{
              width: "250px",
              height: "250px",
              position: "absolute",
              left: 100,
              top: 50,
            }}
          />
          <div style={{ marginTop: 50 }}>
            <div style={{ width: 20, height: 20, backgroundColor: "#E38627" }}>
              <p style={{ marginLeft: 20 }}>noun</p>
            </div>
            <div style={{ width: 20, height: 20, backgroundColor: "#C13C37" }}>
              <p style={{ marginLeft: 20 }}>adjectives</p>
            </div>
            <div style={{ width: 20, height: 20, backgroundColor: "#6A2135" }}>
              <p style={{ marginLeft: 20 }}>adverbs</p>
            </div>
            <div style={{ width: 20, height: 20, backgroundColor: "blue" }}>
              <p style={{ marginLeft: 20 }}>verbs</p>
            </div>
            <div style={{ width: 20, height: 20, backgroundColor: "red" }}>
              <p style={{ marginLeft: 20 }}>rest</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
