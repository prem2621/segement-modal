import React from 'react';

export default function SchemaRow({ id, value, options, onChange, onRemove }){
  return (
    <div className="schema-row">
      <select value={value} onChange={(e)=>onChange(e.target.value)}>
        <option value="">-- select --</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <button className="remove-btn" onClick={onRemove} aria-label="Remove schema">✕</button>
    </div>
  );
}
