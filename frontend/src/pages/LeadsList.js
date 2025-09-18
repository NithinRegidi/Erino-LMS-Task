
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry } from 'ag-grid-community';
// import { AllCommunityModule } from 'ag-grid-community';
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "../pages/styles/LeadsList.css";

// ModuleRegistry.registerModules([AllCommunityModule]);

// // Utility function to build query string for filtering
// const buildQueryString = (filters) => {
//   const params = new URLSearchParams();
//   if (filters.status?.trim()) params.append("status", filters.status.trim());
//   if (filters.search?.trim()) params.append("search", filters.search.trim());
//   console.log("Query String:", params.toString()); // Debugging
//   return params.toString();
// };


// // Column definitions for AG Grid
// const getColumnDefs = (navigate, handleDelete) => [
//   { 
//     field: "first_name", 
//     headerName: "First Name",
//     sortable: true,
//     minWidth: 120
//   },
//   { 
//     field: "last_name", 
//     headerName: "Last Name",
//     sortable: true,
//     minWidth: 120
//   },
//   { 
//     field: "email", 
//     sortable: true,
//     minWidth: 180
//   },
//   { 
//     field: "company", 
//     sortable: true,
//     minWidth: 150
//   },
//   { 
//     field: "status", 
//     sortable: true,
//     minWidth: 120,
//     cellRenderer: (params) => (
//       <span className={`status-pill status-${params.value}`}>
//         {params.value}
//       </span>
//     )
//   },
//   { 
//     field: "score", 
//     sortable: true,
//     minWidth: 100,
//     cellRenderer: (params) => (
//       <span className={params.value >= 70 ? 'score-high' : params.value >= 40 ? 'score-mid' : 'score-low'}>
//         {params.value}
//       </span>
//     )
//   },
//   { 
//     field: "lead_value", 
//     headerName: "Value ($)", 
//     sortable: true,
//     minWidth: 120,
//     valueFormatter: p => p.value ? `$${p.value.toLocaleString()}` : '-',
//     cellClass: 'cell-money'
//   },
//   { 
//     headerName: "Actions",
//     field: "_id",
//     sortable: false,
//     filter: false,
//     minWidth: 130,
//     cellRenderer: (params) => (
//       <div className="action-cell-container">
//         <button className="edit-button" onClick={() => navigate(`/leads/${params.data._id}/edit`)}>
//           Edit
//         </button>
//         <button className="delete-button" onClick={() => handleDelete(params.data._id)}>
//           Delete
//         </button>
//       </div>
//     )
//   }
// ];

// function LeadsList() {
//   const navigate = useNavigate();
//   const [isFiltering, setIsFiltering] = useState(false);
  
//   // Data states
//   const [rowData, setRowData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filter states
//   const [formFilters, setFormFilters] = useState({ status: "", search: "" });
//   const [appliedFilters, setAppliedFilters] = useState({ status: "", search: "" });

//   // Fetch leads with filtering
//   const fetchLeads = useCallback(async () => {
//     setLoading(true);
//     try {
//       const queryString = buildQueryString(appliedFilters);
//       const res = await api.get(`/leads?page=${page}&limit=${limit}&${queryString}`);
      
//       if (res.data.data.length === 0 && isFiltering) {
//         setError("No results found for your search.");
//       } else {
//         setError("");
//       }
      
//       setRowData(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error("Error fetching leads:", err);
//       setError("Could not fetch leads.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, limit, appliedFilters, isFiltering]);

//   useEffect(() => {
//     fetchLeads();
//   }, [fetchLeads]);

//   // Filter handlers
//   const handleSearch = () => {
//     setIsFiltering(true);
//     setPage(1);
//     setAppliedFilters(formFilters);
//   };

//   const resetFilters = () => {
//     setIsFiltering(false);
//     setFormFilters({ status: "", search: "" });
//     setAppliedFilters({ status: "", search: "" });
//     setPage(1);
//   };

//   const handleFilterInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // Delete handler
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this lead?")) return;
//     try {
//       await api.delete(`/leads/${id}`);
//       fetchLeads();
//     } catch (error) {
//       setError("Error deleting lead.");
//     }
//   };

//   // Column definitions
//   const [columnDefs] = useState(() => getColumnDefs(navigate, handleDelete));

//   return (
//     <div className="leads-page">
//       <div className="leads-header">
//         <h1 className="leads-title">Leads Dashboard</h1>
//         <button className="add-lead-button" onClick={() => navigate("/leads/new")}>
//           + Add Lead
//         </button>
//       </div>

//       <div className="filter-bar">
//         <input
//           type="text"
//           name="search"
//           placeholder="Search by company..."
//           className="filter-input"
//           value={formFilters.search}
//           onChange={handleFilterInputChange}
//         />
//         <select
//           name="status"
//           className="filter-input"
//           value={formFilters.status}
//           onChange={handleFilterInputChange}
//         >
//           <option value="">All Statuses</option>
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//           <option value="lost">Lost</option>
//           <option value="won">Won</option>
//         </select>
//         <button 
//           className="search-button" 
//           onClick={handleSearch}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//         <button 
//           className="reset-button" 
//           onClick={resetFilters}
//           disabled={loading || (!formFilters.status && !formFilters.search)}
//         >
//           Reset
//         </button>
//       </div>

//       {isFiltering && (appliedFilters.status || appliedFilters.search) && (
//         <div className="active-filters">
//           Active Filters:
//           {appliedFilters.status && ` Status: ${appliedFilters.status}`}
//           {appliedFilters.search && ` Search: "${appliedFilters.search}"`}
//         </div>
//       )}

//       {error && <div className="error-message">{error}</div>}

//       <div className="ag-theme-alpine-dark grid-container">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           domLayout="autoHeight"
//           suppressCellFocus={true}
//           overlayLoadingTemplate='<span class="grid-overlay">Loading leads...</span>'
//           overlayNoRowsTemplate='<span class="grid-overlay">No leads found.</span>'
//           loading={loading}
//         />
//       </div>

//       <div className="pagination-container">
//         <button
//           className="pagination-button"
//           disabled={page <= 1}
//           onClick={() => setPage(p => p - 1)}
//         >
//           Previous
//         </button>
//         <span>Page {page} of {totalPages}</span>
//         <button
//           className="pagination-button"
//           disabled={page >= totalPages}
//           onClick={() => setPage(p => p + 1)}
//         >
//           Next
//         </button>
//         <select
//           className="limit-select"
//           value={limit}
//           onChange={(e) => {
//             setPage(1);
//             setLimit(Number(e.target.value));
//           }}
//         >
//           <option value={10}>10 / page</option>
//           <option value={25}>25 / page</option>
//           <option value={50}>50 / page</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default LeadsList;

// =======================================================================================

// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";
// import { AgGridReact } from "ag-grid-react";
// import { ModuleRegistry } from "ag-grid-community";
// import { AllCommunityModule } from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "../pages/styles/LeadsList.css";

// ModuleRegistry.registerModules([AllCommunityModule]);

// // Utility function to build query string for filtering
// const buildQueryString = (filters) => {
//   const params = new URLSearchParams();

//   // status filter (equals)
//   if (filters.status?.trim()) {
//     params.append("status_eq", filters.status.trim());
//   }

//   // search filter (company contains)
//   if (filters.search?.trim()) {
//     params.append("company_contains", filters.search.trim());
//   }

//   console.log("Query String:", params.toString()); // Debugging
//   return params.toString();
// };

// // Column definitions for AG Grid
// const getColumnDefs = (navigate, handleDelete) => [
//   {
//     field: "first_name",
//     headerName: "First Name",
//     sortable: true,
//     minWidth: 120,
//   },
//   {
//     field: "last_name",
//     headerName: "Last Name",
//     sortable: true,
//     minWidth: 120,
//   },
//   {
//     field: "email",
//     sortable: true,
//     minWidth: 180,
//   },
//   {
//     field: "company",
//     sortable: true,
//     minWidth: 150,
//   },
//   {
//     field: "status",
//     sortable: true,
//     minWidth: 120,
//     cellRenderer: (params) => (
//       <span className={`status-pill status-${params.value}`}>
//         {params.value}
//       </span>
//     ),
//   },
//   {
//     field: "score",
//     sortable: true,
//     minWidth: 100,
//     cellRenderer: (params) => (
//       <span
//         className={
//           params.value >= 70
//             ? "score-high"
//             : params.value >= 40
//             ? "score-mid"
//             : "score-low"
//         }
//       >
//         {params.value}
//       </span>
//     ),
//   },
//   {
//     field: "lead_value",
//     headerName: "Value ($)",
//     sortable: true,
//     minWidth: 120,
//     valueFormatter: (p) =>
//       p.value ? `$${p.value.toLocaleString()}` : "-",
//     cellClass: "cell-money",
//   },
//   {
//     headerName: "Actions",
//     field: "_id",
//     sortable: false,
//     filter: false,
//     minWidth: 130,
//     cellRenderer: (params) => (
//       <div className="action-cell-container">
//         <button
//           className="edit-button"
//           onClick={() => navigate(`/leads/${params.data._id}/edit`)}
//         >
//           Edit
//         </button>
//         <button
//           className="delete-button"
//           onClick={() => handleDelete(params.data._id)}
//         >
//           Delete
//         </button>
//       </div>
//     ),
//   },
// ];

// function LeadsList() {
//   const navigate = useNavigate();
//   const [isFiltering, setIsFiltering] = useState(false);

//   // Data states
//   const [rowData, setRowData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filter states
//   const [formFilters, setFormFilters] = useState({ status: "", search: "" });
//   const [appliedFilters, setAppliedFilters] = useState({
//     status: "",
//     search: "",
//   });

//   // Fetch leads with filtering
//   const fetchLeads = useCallback(async () => {
//     setLoading(true);
//     try {
//       const queryString = buildQueryString(appliedFilters);
//       const res = await api.get(
//         `/leads?page=${page}&limit=${limit}&${queryString}`
//       );

//       if (res.data.data.length === 0 && isFiltering) {
//         setError("No results found for your search.");
//       } else {
//         setError("");
//       }

//       setRowData(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error("Error fetching leads:", err);
//       setError("Could not fetch leads.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, limit, appliedFilters, isFiltering]);

//   useEffect(() => {
//     fetchLeads();
//   }, [fetchLeads]);

//   // Filter handlers
//   const handleSearch = () => {
//     setIsFiltering(true);
//     setPage(1);
//     setAppliedFilters(formFilters);
//   };

//   const resetFilters = () => {
//     setIsFiltering(false);
//     setFormFilters({ status: "", search: "" });
//     setAppliedFilters({ status: "", search: "" });
//     setPage(1);
//   };

//   const handleFilterInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Delete handler
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this lead?")) return;
//     try {
//       await api.delete(`/leads/${id}`);
//       fetchLeads();
//     } catch (error) {
//       setError("Error deleting lead.");
//     }
//   };

//   // Column definitions
//   const [columnDefs] = useState(() => getColumnDefs(navigate, handleDelete));

//   return (
//     <div className="leads-page">
//       <div className="leads-header">
//         <h1 className="leads-title">Leads Dashboard</h1>
//         <button
//           className="add-lead-button"
//           onClick={() => navigate("/leads/new")}
//         >
//           + Add Lead
//         </button>
//       </div>

//       <div className="filter-bar">
//         <input
//           type="text"
//           name="search"
//           placeholder="Search by company..."
//           className="filter-input"
//           value={formFilters.search}
//           onChange={handleFilterInputChange}
//         />
//         <select
//           name="status"
//           className="filter-input"
//           value={formFilters.status}
//           onChange={handleFilterInputChange}
//         >
//           <option value="">All Statuses</option>
//           <option value="new">New</option>
//           <option value="contacted">Contacted</option>
//           <option value="qualified">Qualified</option>
//           <option value="lost">Lost</option>
//           <option value="won">Won</option>
//         </select>
//         <button
//           className="search-button"
//           onClick={handleSearch}
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Search"}
//         </button>
//         <button
//           className="reset-button"
//           onClick={resetFilters}
//           disabled={
//             loading || (!formFilters.status && !formFilters.search)
//           }
//         >
//           Reset
//         </button>
//       </div>

//       {isFiltering && (appliedFilters.status || appliedFilters.search) && (
//         <div className="active-filters">
//           Active Filters:
//           {appliedFilters.status && ` Status: ${appliedFilters.status}`}
//           {appliedFilters.search && ` Search: "${appliedFilters.search}"`}
//         </div>
//       )}

//       {error && <div className="error-message">{error}</div>}

//       <div className="ag-theme-alpine-dark grid-container">
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={columnDefs}
//           domLayout="autoHeight"
//           suppressCellFocus={true}
//           overlayLoadingTemplate='<span class="grid-overlay">Loading leads...</span>'
//           overlayNoRowsTemplate='<span class="grid-overlay">No leads found.</span>'
//           loading={loading}
//         />
//       </div>

//       <div className="pagination-container">
//         <button
//           className="pagination-button"
//           disabled={page <= 1}
//           onClick={() => setPage((p) => p - 1)}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           className="pagination-button"
//           disabled={page >= totalPages}
//           onClick={() => setPage((p) => p + 1)}
//         >
//           Next
//         </button>
//         <select
//           className="limit-select"
//           value={limit}
//           onChange={(e) => {
//             setPage(1);
//             setLimit(Number(e.target.value));
//           }}
//         >
//           <option value={10}>10 / page</option>
//           <option value={25}>25 / page</option>
//           <option value={50}>50 / page</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default LeadsList;


// ***************************************************************************************


import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../pages/styles/LeadsList.css";

ModuleRegistry.registerModules([AllCommunityModule]);

// Utility function to build query string for filtering
const buildQueryString = (filters) => {
  const params = new URLSearchParams();

  // String filters
  if (filters.company_contains) params.append("company_contains", filters.company_contains.trim());
  if (filters.company_eq) params.append("company_eq", filters.company_eq.trim());
  if (filters.email_contains) params.append("email_contains", filters.email_contains.trim());
  if (filters.city_eq) params.append("city_eq", filters.city_eq.trim());

  // Enums
  if (filters.status_eq) params.append("status_eq", filters.status_eq);
  if (filters.source_eq) params.append("source_eq", filters.source_eq);

  // Numbers
  if (filters.score_eq) params.append("score_eq", filters.score_eq);
  if (filters.score_gt) params.append("score_gt", filters.score_gt);
  if (filters.score_lt) params.append("score_lt", filters.score_lt);
  if (filters.score_between) params.append("score_between", filters.score_between);

  if (filters.lead_value_eq) params.append("lead_value_eq", filters.lead_value_eq);
  if (filters.lead_value_gt) params.append("lead_value_gt", filters.lead_value_gt);
  if (filters.lead_value_lt) params.append("lead_value_lt", filters.lead_value_lt);
  if (filters.lead_value_between) params.append("lead_value_between", filters.lead_value_between);

  // Dates
  if (filters.created_at_on) params.append("created_at_on", filters.created_at_on);
  if (filters.created_at_before) params.append("created_at_before", filters.created_at_before);
  if (filters.created_at_after) params.append("created_at_after", filters.created_at_after);
  if (filters.created_at_between) params.append("created_at_between", filters.created_at_between);

  // Boolean
  if (filters.is_qualified) params.append("is_qualified", filters.is_qualified);

  console.log("Query String:", params.toString());
  return params.toString();
};

// Column definitions for AG Grid
const getColumnDefs = (navigate, handleDelete) => [
  { field: "first_name", headerName: "First Name", sortable: true, minWidth: 120 },
  { field: "last_name", headerName: "Last Name", sortable: true, minWidth: 120 },
  { field: "email", sortable: true, minWidth: 180 },
  { field: "company", sortable: true, minWidth: 150 },
  { field: "status", sortable: true, minWidth: 120,
    cellRenderer: (params) => <span className={`status-pill status-${params.value}`}>{params.value}</span>
  },
  { field: "score", sortable: true, minWidth: 100,
    cellRenderer: (params) => (
      <span className={
        params.value >= 70 ? "score-high" :
        params.value >= 40 ? "score-mid" : "score-low"
      }>
        {params.value}
      </span>
    )
  },
  { field: "lead_value", headerName: "Value ($)", sortable: true, minWidth: 120,
    valueFormatter: (p) => p.value ? `$${p.value.toLocaleString()}` : "-",
    cellClass: "cell-money"
  },
  { headerName: "Actions", field: "_id", sortable: false, filter: false, minWidth: 130,
    cellRenderer: (params) => (
      <div className="action-cell-container">
        <button className="edit-button" onClick={() => navigate(`/leads/${params.data._id}/edit`)}>Edit</button>
        <button className="delete-button" onClick={() => handleDelete(params.data._id)}>Delete</button>
      </div>
    )
  }
];

function LeadsList() {
  const navigate = useNavigate();
  const [isFiltering, setIsFiltering] = useState(false);

  // Data states
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters (form + applied)
  const [formFilters, setFormFilters] = useState({
    company_contains: "",
    status_eq: "",
    source_eq: "",
    score_gt: "",
    score_lt: "",
    created_at_after: "",
    created_at_before: "",
    is_qualified: ""
  });
  const [appliedFilters, setAppliedFilters] = useState(formFilters);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const queryString = buildQueryString(appliedFilters);
      const res = await api.get(`/leads?page=${page}&limit=${limit}&${queryString}`);

      if (res.data.data.length === 0 && isFiltering) {
        setError("No results found.");
      } else {
        setError("");
      }

      setRowData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Could not fetch leads.");
    } finally {
      setLoading(false);
    }
  }, [page, limit, appliedFilters, isFiltering]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Filter handlers
  const handleSearch = () => {
    setIsFiltering(true);
    setPage(1);
    setAppliedFilters(formFilters);
  };

  const resetFilters = () => {
    setIsFiltering(false);
    setFormFilters({
      company_contains: "",
      status_eq: "",
      source_eq: "",
      score_gt: "",
      score_lt: "",
      created_at_after: "",
      created_at_before: "",
      is_qualified: ""
    });
    setAppliedFilters({});
    setPage(1);
  };

  const handleFilterInputChange = (e) => {
    const { name, value } = e.target;
    setFormFilters(prev => ({ ...prev, [name]: value }));
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      fetchLeads();
    } catch {
      setError("Error deleting lead.");
    }
  };

  // Columns
  const [columnDefs] = useState(() => getColumnDefs(navigate, handleDelete));

  return (
    <div className="leads-page">
      <div className="leads-header">
        <h1 className="leads-title">Leads Dashboard</h1>
        <button className="add-lead-button" onClick={() => navigate("/leads/new")}>
          + Add Lead
        </button>
      </div>

      {/* Filter Bar without names/defines
      <div className="filter-bar">
        <input name="company_contains" placeholder="Company contains..."
          className="filter-input" value={formFilters.company_contains}
          onChange={handleFilterInputChange} />
        <select name="status_eq" className="filter-input"
          value={formFilters.status_eq} onChange={handleFilterInputChange}>
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
          <option value="won">Won</option>
        </select>
        <select name="source_eq" className="filter-input"
          value={formFilters.source_eq} onChange={handleFilterInputChange}>
          <option value="">All Sources</option>
          <option value="website">Website</option>
          <option value="facebook_ads">Facebook Ads</option>
          <option value="google_ads">Google Ads</option>
          <option value="referral">Referral</option>
          <option value="events">Events</option>
          <option value="other">Other</option>
        </select>
        <input type="number" name="score_gt" placeholder="Score >"
          className="filter-input" value={formFilters.score_gt}
          onChange={handleFilterInputChange} />
        <input type="number" name="score_lt" placeholder="Score <"
          className="filter-input" value={formFilters.score_lt}
          onChange={handleFilterInputChange} />
        <input type="date" name="created_at_after" className="filter-input"
          value={formFilters.created_at_after} onChange={handleFilterInputChange} />
        <input type="date" name="created_at_before" className="filter-input"
          value={formFilters.created_at_before} onChange={handleFilterInputChange} />
        <select name="is_qualified" className="filter-input"
          value={formFilters.is_qualified} onChange={handleFilterInputChange}>
          <option value="">Qualified?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <button className="reset-button" onClick={resetFilters} disabled={loading}>
          Reset
        </button>
      </div> */}

      {/* Filter Bar */}
<div className="filter-bar">
  {/* Company Filter */}
  <label htmlFor="company_contains" className="filter-label">Company Contains:</label>
  <input
    id="company_contains"
    name="company_contains"
    placeholder="Enter company name..."
    className="filter-input"
    value={formFilters.company_contains}
    onChange={handleFilterInputChange}
  />

  {/* Status Filter */}
  <label htmlFor="status_eq" className="filter-label">Status:</label>
  <select
    id="status_eq"
    name="status_eq"
    className="filter-input"
    value={formFilters.status_eq}
    onChange={handleFilterInputChange}
  >
    <option value="">All Statuses</option>
    <option value="new">New</option>
    <option value="contacted">Contacted</option>
    <option value="qualified">Qualified</option>
    <option value="lost">Lost</option>
    <option value="won">Won</option>
  </select>

  {/* Source Filter */}
  <label htmlFor="source_eq" className="filter-label">Source:</label>
  <select
    id="source_eq"
    name="source_eq"
    className="filter-input"
    value={formFilters.source_eq}
    onChange={handleFilterInputChange}
  >
    <option value="">All Sources</option>
    <option value="website">Website</option>
    <option value="facebook_ads">Facebook Ads</option>
    <option value="google_ads">Google Ads</option>
    <option value="referral">Referral</option>
    <option value="events">Events</option>
    <option value="other">Other</option>
  </select>

  {/* Score Filters */}
  <label htmlFor="score_gt" className="filter-label">Score Greater Than:</label>
  <input
    id="score_gt"
    type="number"
    name="score_gt"
    placeholder="Enter minimum score..."
    className="filter-input"
    value={formFilters.score_gt}
    onChange={handleFilterInputChange}
  />

  <label htmlFor="score_lt" className="filter-label">Score Less Than:</label>
  <input
    id="score_lt"
    type="number"
    name="score_lt"
    placeholder="Enter maximum score..."
    className="filter-input"
    value={formFilters.score_lt}
    onChange={handleFilterInputChange}
  />

  {/* Date Filters */}
  <label htmlFor="created_at_after" className="filter-label">Created After:</label>
  <input
    id="created_at_after"
    type="date"
    name="created_at_after"
    className="filter-input"
    value={formFilters.created_at_after}
    onChange={handleFilterInputChange}
  />

  <label htmlFor="created_at_before" className="filter-label">Created Before:</label>
  <input
    id="created_at_before"
    type="date"
    name="created_at_before"
    className="filter-input"
    value={formFilters.created_at_before}
    onChange={handleFilterInputChange}
  />

  {/* Qualified Filter */}
  <label htmlFor="is_qualified" className="filter-label">Qualified:</label>
  <select
    id="is_qualified"
    name="is_qualified"
    className="filter-input"
    value={formFilters.is_qualified}
    onChange={handleFilterInputChange}
  >
    <option value="">All</option>
    <option value="true">Yes</option>
    <option value="false">No</option>
  </select>

  {/* Search and Reset Buttons */}
  <button className="search-button" onClick={handleSearch} disabled={loading}>
    {loading ? "Searching..." : "Search"}
  </button>
  <button className="reset-button" onClick={resetFilters} disabled={loading}>
    Reset
  </button>
</div>

      {error && <div className="error-message">{error}</div>}

      {/* Grid */}
      <div className="ag-theme-alpine-dark grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          suppressCellFocus={true}
          overlayLoadingTemplate='<span class="grid-overlay">Loading leads...</span>'
          overlayNoRowsTemplate='<span class="grid-overlay">No leads found.</span>'
          loading={loading}
        />
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button className="pagination-button" disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button className="pagination-button" disabled={page >= totalPages}
          onClick={() => setPage(p => p + 1)}>Next</button>
        <select className="limit-select" value={limit}
          onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>
    </div>
  );
}

export default LeadsList;
