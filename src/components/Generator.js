import React, { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import app_config from "../config";
// import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Select from "react-select";
import { Formik } from "formik";

const GenerateSingle = ({ selPDF }) => {
  const url = app_config.api_url + "/";
  const technologyList = app_config.courses.map(course => ({value: course, label : course}));
  // console.log(technologyList);
  const generateCerti = async (formdata, { isSubmitting, resetForm }) => {
    console.log(formdata);
    // return;
    const response = await fetch(url + "certificate/generatesingle", {
      method: "POST",
      body: JSON.stringify({
        certificateDetails: formdata,
        template_id: selPDF._id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      window.open(url + "generatedPDF/" + data.pdfFile, "_self");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card my-4">
          <div className="card-header">
            <h4 className="m-0">Generate Single Card</h4>
          </div>
          <div className="card-body">
            <Formik
              initialValues={{
                studentName: "",
                technology: technologyList[0].value,
                duration: "",
                project: "",
              }}
              onSubmit={generateCerti}
            >
              {({ values, handleSubmit, handleChange, setFieldValue, field }) => (
                <form onSubmit={handleSubmit}>
                  <label>Student Name</label>
                  <input name="studentName" onChange={handleChange} className="form-control mb-4" />

                  <Select name="technology"
                    value={values.technology.value}
                    onChange={({ value }) => setFieldValue('technology', value)}
                    options={technologyList}
                  />
                  <label>Duration</label>
                  <input name="duration" onChange={handleChange} className="form-control mb-4" />

                  <label>Mini/Minor Project Name</label>
                  <input name="project" onChange={handleChange} className="form-control mb-4" />

                  <button type="submit" className="btn btn-primary my-5">
                    Generate Certificate
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreviewSheet = ({ data }) => {
  return (
    <table
      className="table digi-table"
      style={{ tableLayout: "fixed", width: "1800px" }}
    >
      <thead className="">
        <tr>
          {data[0].map((col) => (
            <th style={{ width: "1fr" }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row) => (
          <tr>
            {row.map((cell) => (
              <td>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Generator = () => {
  const url = app_config.api_url + "/";
  const [selPDF, setSelPDF] = useState(null);
  const [sheetLoaded, setSheetLoaded] = useState(false);
  const [sheetData, setSheetData] = useState(null);

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

  useEffect(() => {
    fetchTemplates();
  }, []);

  const generateCertificates = async () => {
    const res = await fetch(url + "certificate/generatebatch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sheetData,
        template_id: selPDF._id,
      }),
    });

    console.log(res.status);
    if (res.status === 200) {
      console.log("success");
      const data = await res.json();
      console.log(data);
      window.open(url + "generatedPDF/" + data.zipFile, "_self");
    }
  };

  const extractData = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = async (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws, { header: 1 });
      console.log(data);
      setSheetData(data);
      setSheetLoaded(true);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const getPDFFromId = (id) => {
    // console.log(id);
    if (!id) return null;
    const pdf = templateList.find((item) => item._id === id);
    console.log(pdf);
    return pdf;
  };

  const displayTempateOptions = () => {
    return (
      <select
        className="form-control"
        onChange={(e) => setSelPDF(getPDFFromId(e.target.value))}
      >
        <option key={0} value={""}>
          Select Template
        </option>
        {templateList.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="">
      <div className="col-md-11 mx-auto py-4">
        <div className="card digi-card gen-card">
          <div className="card-header">
            <h3>Generate Certificate</h3>
          </div>
          <div className="card-body">
            <div className="row mt-5">
              <div className="col-8">
                <div className="container">
                  <label className="mb-2 h5">
                    Select a Template to Generate Certificate
                  </label>
                  {displayTempateOptions()}
                  <Select
                    value={selPDF}
                    onChange={(e) => setSelPDF(getPDFFromId(e.target.value))}
                    options={templateList}
                  />

                  <div className="row mt-4">
                    <div className="col-4">
                      <label
                        htmlFor="sheet-upload"
                        className="btn btn-danger upload-btn btn-lg"
                      >
                        <i className="fas fa-upload"></i> Upload Sheet
                      </label>
                      <input
                        hidden
                        id="sheet-upload"
                        onChange={extractData}
                        type="file"
                      />
                    </div>
                    <div className="col-6">
                      <button
                        disabled={!(selPDF && sheetLoaded)}
                        className="btn btn-primary generate-btn h5"
                        onClick={generateCertificates}
                      >
                        <i className="fas fa-certificate"></i> &nbsp; Generate
                        Certificates
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-5">Sheet Preview</h3>
                  <div className="card w-100 sheet-preview">
                    {sheetLoaded && <PreviewSheet data={sheetData} />}
                  </div>
                </div>
              </div>
              <div
                style={{ marginLeft: "1px solid red" }}
                className="col-4 d-flex align-items-center"
              >
                {selPDF && (
                  <Document
                    file={url + "templates/" + selPDF.file}
                    onLoadSuccess={console.log}
                  >
                    <Page pageNumber={1} width="500" />
                  </Document>
                )}
                
                {/* {url + 'templates/' + selPDF.file} */}

                {/* <img src="template.jpg" alt="template" className="img-fluid" /> */}
              </div>
            </div>
            {selPDF && <GenerateSingle selPDF={selPDF} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
