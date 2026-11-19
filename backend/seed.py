import os
from datetime import datetime, timedelta, timezone
import random
from pymongo import MongoClient

client = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
db = client["satellite_db"]
readings = db["telemetry"]

readings.delete_many({})

satellites = ["SAT-1", "SAT-2", "SAT-3"]
now = datetime.now(timezone.utc)
docs = []

for sat in satellites:
    battery = random.uniform(70, 100)
    for i in range(10):
        battery -= random.uniform(0, 3)
        docs.append({
            "satellite": sat,
            "timestamp": now - timedelta(minutes=10 * (9 - i)),
            "battery": round(battery, 1),
            "temperature": round(random.uniform(-20, 40), 1),
        })

readings.insert_many(docs)
print(f"Inserted {readings.count_documents({})} readings for {len(satellites)} satellites")