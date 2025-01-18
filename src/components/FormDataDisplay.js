import React from "react";

const FormDataDisplay = ({ formData }) => {
  return (
    <div className="data-display">
      <h2>Submitted Data</h2>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Country:</strong> {formData.country}</p>
      <p><strong>State:</strong> {formData.state}</p>
    </div>
  );
};

export default FormDataDisplay;
