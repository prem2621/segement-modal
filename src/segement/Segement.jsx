import React, { useEffect, useMemo, useState } from "react";
import SchemaRow from "./SchemaRow";

const ALL_OPTIONS = [
  { label: "First name", value: "first_name" },
  { label: "Last name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SegmentModal({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [topSelect, setTopSelect] = useState("");
  const [rows, setRows] = useState([]);  
  const [sending, setSending] = useState(false);
 
  const selectedValues = useMemo(
    () => rows.map((r) => r.value).filter(Boolean),
    [rows]
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function addSchema() {
    if (!topSelect) return;
    setRows((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), value: topSelect },
    ]);
    setTopSelect("");
  }

  function updateRow(id, newValue) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, value: newValue } : r))
    );
  }

  function removeRow(id) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function availableOptionsForRow(rowId) {
     const otherSelected = rows
      .filter((r) => r.id !== rowId)
      .map((r) => r.value)
      .filter(Boolean);
    return ALL_OPTIONS.filter((o) => !otherSelected.includes(o.value));
  }

  async function saveSegment() {
    console.log("clicked saveSegment");
    if (!segmentName.trim()) return alert("Enter segment name");
    if (rows.length === 0) return alert("Add at least one schema");

    const payload = {
      segment_name: segmentName.trim(),
      schema: rows.map((r) => {
        const opt = ALL_OPTIONS.find((o) => o.value === r.value);
        return { [r.value]: opt ? opt.label : "" };
      }),
    };
    console.log("payload:", payload);
     

     const webhookUrl = "https://webhook.site/c1199f75-13a9-4125-9ed1-cb12d4cf4729"; 
    try {
      setSending(true);
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });
     alert("Segment saved! Data sent to webhook.");
    onClose() 
     
    } catch (err) {
      console.error(err);
      alert("Error sending data");
    } finally {
      setSending(false);
    }
  }

  return ( 
  <div className="modal-overlay"
      onClick={(e) => {if (e.target.classList.contains("modal-overlay")) onClose();
      }} >
      <div className="modal">
        <div className="modal-header">
          <h2>
            <span>&lt;</span> Saving Segment
          </h2>
        </div>

        <div className="modal-body">
          <label className="input-text">Enter the name of the segment</label>
          <input
            className="text-input"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segement" />
          <h1 className="text">
            To save your sagement, you need to add the schemas to build the
            query
          </h1>

          <div className="seperate">
            <div className="legend">
              <span className="dot user"></span>
              <small>user-traits</small>
              <span className="dot group"></span>
              <small>group-traits</small>
            </div>
          </div>

          <div className="blue-box" aria-live="polite">
            {rows.length === 0 && (
              <div className="hint">No schema added yet</div>
            )}
            {rows.map((r) => (
              <SchemaRow
                key={r.id}
                id={r.id}
                value={r.value}
                options={availableOptionsForRow(r.id)}
                onChange={(val) => updateRow(r.id, val)}
                onRemove={() => removeRow(r.id)}
              />
            ))}
          </div>

           <div className="top-add">
            <select value={topSelect} onChange={(e) => setTopSelect(e.target.value)}>
              <option value="">Add schema to segment</option>
              {ALL_OPTIONS.filter((o) => !selectedValues.includes(o.value)).map(
                (opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                )
              )}
            </select> 
          </div>
          <button className="link-btn" onClick={addSchema}>
              +Add new schema
            </button>

            <div className="modal-footer">
        <button className="primary-btn" onClick={saveSegment} disabled={sending || !segmentName.trim()} >
            {sending ? "Saving..." : "Save the segment"}
          </button>
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button> 
        </div>        

        </div> 
      </div>
    </div>
  );
}
