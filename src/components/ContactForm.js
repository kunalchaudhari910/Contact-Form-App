import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    country: "",
    state: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch countries when the component mounts
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => setCountries(response.data.data))
      .catch(() => toast.error("Failed to load countries."));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "" });

    if (!selectedCountry) {
      setStates([]);
      return;
    }

    // Fetch states for the selected country
    axios
      .get(`https://countriesnow.space/api/v0.1/countries/states/q?country=${selectedCountry}`)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.msg || "Failed to load states.");
          setStates([]);
        } else {
          setStates(response.data.data.states || []);
        }
      })
      .catch(() => {
        toast.error("Failed to load states.");
        setStates([]);
      });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = `${key} is required.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      toast.success("Form submitted successfully!");
      setFormData({ name: "", address: "", phoneNumber: "", country: "", state: "" });
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Contact Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`form-textarea ${errors.address ? "error" : ""}`}
          />
          {errors.address && <span className="error-text">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className={`form-input ${errors.phoneNumber ? "error" : ""}`}
          />
          {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            className={`form-select ${errors.country ? "error" : ""}`}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.country} value={country.country}>
                {country.country}
              </option>
            ))}
          </select>
          {errors.country && <span className="error-text">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>State:</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`form-select ${errors.state ? "error" : ""}`}
            disabled={!states.length}
          >
            <option value="">{states.length ? "Select State" : "No states available"}</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && <span className="error-text">{errors.state}</span>}
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
