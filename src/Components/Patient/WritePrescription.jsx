import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export default function WritePrescription() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState({
    medication: "",
    dosage: "",
    instructions: "",
    patientId: id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:7127/api/Generic/Create-Precription",
        prescription
      );
      navigate("/prescription-history");
    } catch (error) {
      console.error("Failed to submit the prescription:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>{t("Prescription Form")}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="medication" className="form-label">
                    {t("Medication")}
                  </label>
                  <input
                    type="text"
                    id="medication"
                    name="medication"
                    className="form-control"
                    value={prescription.medication}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dosage" className="form-label">
                    {t("Dosage")}
                  </label>
                  <input
                    type="text"
                    id="dosage"
                    name="dosage"
                    className="form-control"
                    value={prescription.dosage}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="instructions" className="form-label">
                    {t("Instructions")}
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    className="form-control"
                    value={prescription.instructions}
                    onChange={handleInputChange}
                    required
                    rows="4"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                  {t("Save")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
