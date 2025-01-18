import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import FormDataDisplay from "./components/FormDataDisplay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Contact Form Application</h1>
      <ContactForm onSubmit={handleFormSubmit} />
      {submittedData && <FormDataDisplay formData={submittedData} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
