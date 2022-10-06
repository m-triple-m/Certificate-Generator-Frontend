import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import app_config from "../config";

const TemplateAddForm = ({ fetchTemplates }) => {
  const api_url = app_config.api_url + "/";
  const [selFile, setSelFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleFormSubmit = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    let fd = new FormData();
    fd.append("myfile", file);
    setUploading(true);
    await fetch(api_url + "util/uploadfile", {
      method: "POST",
      body: fd,
    })
    fetch(api_url + "template/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: file.name,
        file: file.name,
        thumbnail: "",
        createdAt: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUploading(false);
        fetchTemplates();
        toast.success("Template added successfully");
      });
  };

  return (
    <div className="">
      <div className="">
        <label htmlFor="template-file" className="big-upload-btn">
          {" "}
          <i className="fas fa-plus"></i>{" "}
        </label>
        <input
          id="template-file"
          hidden
          type="file"
          onChange={handleFormSubmit}
        />
      </div>
    </div>
  );
};

const TemplateManager = () => {
  const api_url = app_config.api_url + "/";
  const [templateList, setTemplateList] = useState([]);

  const fetchTemplates = () => {
    fetch(api_url + "template/getall")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemplateList(data);
      });
  };

  const deleteTemplate = (id) => {
    fetch(api_url + "template/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Template deleted successfully");
        fetchTemplates();
      });
  };

  const displayTemplates = () => {
    if (templateList.length)
      return templateList.map(({ _id, title }) => (
        // <div className="col-md-2">
        <div className="card" key={_id}>
          <button
            className="btn btn-danger"
            onClick={(e) => deleteTemplate(_id)}
          >
            <i className="fas fa-trash"></i>
          </button>
          <img
            src="https://cdn.pixabay.com/photo/2017/03/08/21/20/pdf-2127829_1280.png"
            alt="template"
            className="card-img-top"
          />
          <h5>{title}</h5>
        </div>
        // </div>
      ));
    else
      return (
        <h1 className="text-center mt-5 text-center text-muted">
          {" "}
          Wow Such Empty!!
        </h1>
      );
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <section className="generator-section">
      <div className="container py-5">
        <div className="card digi-card temp-card">
          <div className="card-body">
            <h3 className="mt-5">Manage Templates</h3>
            <hr />
            <div className="card-grid-row">
              <TemplateAddForm fetchTemplates={fetchTemplates} />

              {displayTemplates()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateManager;
