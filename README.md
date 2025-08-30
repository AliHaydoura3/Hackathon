# Device Dashboard
## Overview
Device Dashboard is a **visualization-first web application** for managing network devices. It presents devices in an **interactive bubble chart**, allowing instant insights into device status, group, and category. Users can perform **quick actions** such as isolating, releasing, or toggling blocklist categories.
## Features
### Backend (Flask API)
- **GET /api/devices** – Returns all devices with full schema.
- **GET /api/summary** – Returns counts of total, active devices, devices by group, and devices by AI category.
- **PATCH /api/devices/<id>** – Partial updates (allowed: `given_name`, `group.id`, `blocklist.*`).
- **POST /api/devices/<id>/actions** – Perform actions: `isolate` → block all categories, `release` → unblock all except `safesearch`, `toggle_block` → flip specific blocklist category.
- **CORS enabled** for client access.
- Reads/writes data from a **local JSON file** in memory.
### Frontend (React)
- **Interactive Bubble Chart**: color-coded by **AI category**, size indicates **active/inactive status**, hover shows **device info** (MAC, IP, group, vendor).
- **Device Actions Modal**: Isolate, Release, Toggle Blocklist.
- **Filters**: By **group**, **vendor**, **active status**.
- **Responsive & professional layout**.
## Installation
### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux / Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python app.py
```
Runs Flask API at http://localhost:5000.

## Frontend

```bash
cd web-app
npm install
npm start
```
Runs React app at http://localhost:3000 (CRA).

## Usage

1. Open the frontend in your browser.


2. The bubble chart will display all devices.


3. Use filters to narrow devices by group, vendor, or status.


4. Click a bubble to open the action modal.


5. Perform Isolate, Release, or Toggle blocklist actions.


6. Changes are sent to the API and reflected immediately.



## Project Structure

### Backend

backend/
├─ devices.sample_1.json
├─ app.py
└─ requirements.txt

### Frontend

web-app/
├─ src/
│  ├─ components/
│  │  ├─ DeviceBubbleChart.jsx
│  │  ├─ DeviceActionsModal.jsx
│  │  └─ Filters.jsx
│  ├─ services/
│  │  └─ api.js
│  └─ App.jsx
├─ package.json
└─ vite.config.js

## Notes

API does not call any third-party service.

Data is local only (JSON + in-memory).

Designed for visualization-first device management.

Can scale to hundreds of devices.
