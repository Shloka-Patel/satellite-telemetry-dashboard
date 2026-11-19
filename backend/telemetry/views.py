import os
from django.http import JsonResponse
from pymongo import MongoClient

client = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
readings = client["satellite_db"]["telemetry"]


def telemetry(request, satellite):
    docs = readings.find({"satellite": satellite}, {"_id": 0}).sort("timestamp", 1)
    data = [{**d, "timestamp": d["timestamp"].isoformat()} for d in docs]
    return JsonResponse({"satellite": satellite, "readings": data})