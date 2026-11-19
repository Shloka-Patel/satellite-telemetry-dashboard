# Satellite Telemetry Dashboard

A full-stack web app that shows satellite telemetry (battery level and temperature) on a live dashboard.

**Stack:** React (Vite) + Chart.js · Django · MongoDB (PyMongo)

## How it works
MongoDB stores telemetry readings → a Django REST API endpoint (`/api/telemetry/<satellite>/`) returns them as JSON → the React frontend shows the latest values as cards and a temperature trend chart.

## Run it locally
1. Start MongoDB: `docker run -d --name mongo -p 27017:27017 mongo:7`
2. Backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python seed.py
   python manage.py runserver
   ```
3. Frontend (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser and pick a satellite from the dropdown.
