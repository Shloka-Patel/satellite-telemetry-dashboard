# Satellite Telemetry Dashboard

A full-stack web app that shows satellite telemetry (battery level and temperature) on a live dashboard.

<img width="521" height="401" alt="SAT-1" src="https://github.com/user-attachments/assets/4619e17d-b21b-44a3-a650-dd226a1aaae2" />
<img width="554" height="401" alt="SAT-2" src="https://github.com/user-attachments/assets/c254e30a-0820-47ca-97a8-c0b7a0934d07" />
<img width="578" height="403" alt="SAT-3" src="https://github.com/user-attachments/assets/a9a6c6cd-ba91-4aa8-9b5a-84385ea48c4e" />

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
