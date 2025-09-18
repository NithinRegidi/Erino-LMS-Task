

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import "../pages/styles/LeadForm.css";

function LeadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "website",
    status: "new",
    score: 0,
    lead_value: 0,
    is_qualified: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/leads/${id}`)
        .then(res => setForm(res.data))
        .catch(() => setError("Error fetching lead data."))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = value;
    if (type === "checkbox") finalValue = checked;
    else if (type === "number") finalValue = value === "" ? "" : Number(value);
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...form, score: Number(form.score), lead_value: Number(form.lead_value) };
      if (isEditing) await api.put(`/leads/${id}`, payload);
      else await api.post("/leads", payload);
      navigate("/leads");
    } catch (err) {
      setError(err.response?.data?.message || "Error saving lead. Please check the fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-page">
      <div className="lead-form-card">
        <h1 className="lead-form-title">{isEditing ? "Edit Lead" : "Add New Lead"}</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="lead-form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">First Name</label>
              <input className="form-input" id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">Last Name</label>
              <input className="form-input" id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            {/* <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input className="form-input" id="phone" name="phone" value={form.phone} onChange={handleChange} />
            </div> */}

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone</label>
              <input className="form-input" id="phone" name="phone" type="tel" pattern="[0-9]*" inputMode="numeric" value={form.phone} onChange={handleChange}maxLength="15" placeholder="Enter phone number"/>
            </div>
            <div className="form-group full-width">
              <label className="form-label" htmlFor="company">Company</label>
              <input className="form-input" id="company" name="company" value={form.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="city">City</label>
              <input className="form-input" id="city" name="city" value={form.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="state">State</label>
              <input className="form-input" id="state" name="state" value={form.state} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="source">Source</label>
              <select className="form-input" id="source" name="source" value={form.source} onChange={handleChange}>
                <option value="website">Website</option>
                <option value="facebook_ads">Facebook Ads</option>
                <option value="google_ads">Google Ads</option>
                <option value="referral">Referral</option>
                <option value="events">Events</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="status">Status</label>
              <select className="form-input" id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
                <option value="won">Won</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="score">Score (0-100)</label>
              <input className="form-input" id="score" name="score" type="number" min="0" max="100" value={form.score} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lead_value">Lead Value ($)</label>
              <input className="form-input" id="lead_value" name="lead_value" type="number" value={form.lead_value} onChange={handleChange} />
            </div>
            <div className="checkbox-row">
              <input
                id="is_qualified"
                type="checkbox"
                name="is_qualified"
                checked={form.is_qualified}
                onChange={handleChange}
                className="checkbox-input"
              />
              <label className="checkbox-label" htmlFor="is_qualified">Mark as Qualified</label>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/leads")}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : (isEditing ? "Update Lead" : "Create Lead")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;