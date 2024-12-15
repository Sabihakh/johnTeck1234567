import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "./AddCer.css";

const AddCer = ({ onAdd, navigate }) => {
  const [showModal, setShowModal] = useState(false);
  const [image, SetImage] = useState("");
  const [pdf, SetPdf] = useState("");

  // فتح النافذة
  const handleOpenModal = () => setShowModal(true);

  // إغلاق النافذة
  const handleCloseModal = () => setShowModal(false);

  // وظيفة حفظ الشهادة
  async function savecertifi(e) {
    e.preventDefault();
    const formData = new FormData();
    if (image instanceof File) {
      formData.append("image", image);
    }
    if (pdf instanceof File) {
      formData.append("pdf", pdf);
    }
    try {
      const res = await axios.post(
        `http://192.168.43.202:8000/api/certificates/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        const newCer = res.data;
        onAdd(newCer);
        handleCloseModal();
        navigate("/Dashboardcertificates", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button className="add" onClick={handleOpenModal}>
        <h2>Add New Certificates</h2>
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
      <div className="App">
        {showModal && (
          <div className="modal-cer-overlay" onClick={handleCloseModal}>
            <div
              className="modal-content-cer"
              onClick={(e) => e.stopPropagation()} // منع الإغلاق عند النقر داخل النافذة
            >
              <span className="close-cer" onClick={handleCloseModal}>
                &times;
              </span>
              <div>
                <div className="upload-box">
                  <input
                    type="file"
                    onChange={(e) => SetImage(e.target.files[0])}
                  />
                  <div>
                    <FontAwesomeIcon
                      icon={faImage}
                      fontSize="100px"
                      style={{ marginTop: "10%", color: "rgb(135 148 171)" }}
                    />
                    <p style={{ marginTop: "-3%", marginLeft: "6%" }}>
                      Select Image
                    </p>
                  </div>
                </div>

                <div className="upload-box">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => SetPdf(e.target.files[0])}
                  />
                  <div>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      fontSize="90px"
                      style={{
                        marginTop: "20%",
                        marginLeft: "5%",
                        color: "rgb(135 148 171)",
                      }}
                    />
                    <p style={{ marginTop: "7%", marginLeft: "6%" }}>
                      Select File
                    </p>
                  </div>
                </div>
                <button onClick={savecertifi}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCer;
