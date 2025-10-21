# CustomerLabs Segment Modal (React Assessment Project)

### 🔗 Live Demo  
👉 [View Live Project](https://prem2621.github.io/segement-modal/)  
👉 [GitHub Repository](https://github.com/prem2621/segement-modal)

---

## 📖 Project Overview

This project was built as part of the **CustomerLabs Frontend Developer Assessment**.  
The goal of this task was to **recreate the Segment creation modal UI and its functionality** exactly as shown in the provided design using **React and external CSS** — no Tailwind, no external UI libraries.

The project implements a clean, functional, and responsive **Segment Creation Modal**, where users can:

- Enter a **segment name**
- Select multiple **schema traits** (like First name, Gender, City, etc.)
- Add or remove schema dropdowns dynamically
- Validate inputs before saving
- Submit the final segment data as JSON to a **webhook endpoint**
 
---

## 🧩 Features Implemented

### 🎯 Core Functionalities
- **Modal UI with blur background**
  - Opens when the “Save segment” button is clicked.
  - Closes when clicking outside or pressing `Escape`.

- **Segment Name Input**
  - Input field for entering the name of the segment.
  - Save button is disabled until a name is provided.

- **Dynamic Schema Dropdowns**
  - A dropdown labeled “Add schema to segment” lists available schema fields:
    - First Name, Last Name, Gender, Age, Account Name, City, State.
  - Clicking **“+Add new schema”** adds a new dropdown inside the blue box.
  - Once added, the top dropdown resets to unselected state.

- **Duplicate Prevention**
  - Options already selected in blue-box dropdowns are hidden from other dropdowns to avoid duplicates.

- **Editable and Removable Schemas**
  - Each dropdown inside the blue box can be changed individually.
  - Clicking the ✕ button removes that particular schema.

- **Visual Legends**
  - Green circle for **user-traits**  
  - Red circle for **group-traits**

- **Webhook Integration**
  - On clicking **“Save the segment”**, the app sends the following payload via `fetch` to a webhook endpoint:
    ```json
    {
      "segment_name": "sample_name",
      "schema": [
        {"first_name": "First name"},
        {"city": "City"}
      ]
    }
    ```
  - Webhook used: [https://webhook.site](https://webhook.site)
  - Uses `mode: 'no-cors'` to safely bypass browser CORS restrictions.

---

## 🧠 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Vite)** | Frontend UI development |
| **JavaScript (ES6+)** | Logic, state management |
| **HTML5 & CSS3** | Layout and styling |
| **Fetch API** | Data submission to webhook |
| **GitHub Pages** | Project deployment |

---

## 🧱 Project Structure

segement-modal/
│
├── public/
│ └── index.html
│
├── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── segement/
│ │ ├── Segement.jsx # Main modal component (SegmentModal)
│ │ ├── SchemaRow.jsx # Row component for schema dropdown
│ │ ├── Segement.css # External CSS styling
│
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
 

---

## 🚀 Deployment (GitHub Pages)

This project was deployed using **Vite + gh-pages** package.

**Build and deploy commands:**
```bash
npm run build
npm run deploy


## ⚙️ How It Works (Step-by-Step)

1. **User opens the modal** by clicking “Save segment”.
2. **Enter segment name** in the input field.
3. **Select schema field** from the dropdown and click “+Add new schema”.
4. A new schema dropdown appears in the **blue box**.
5. **Repeat** to add multiple schema fields.
6. **Edit or remove** schemas anytime.
7. Once ready, click **“Save the segment”** — the data is sent to the webhook as a structured JSON payload.

---

## 🧩 Data Format Sent to Webhook

Example of payload:
```json
{
  "segment_name": "newyork_customers",
  "schema": [
    {"first_name": "First name"},
    {"age": "Age"},
    {"city": "City"}
  ]
}


