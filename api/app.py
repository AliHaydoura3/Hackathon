import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from collections import defaultdict

app = Flask(__name__)
CORS(app)

with open("devices.sample_1.json", "r") as f:
    devices = json.load(f)

GROUPS = {
    1: {"id": 1, "name": "Default", "is_default": True},
    2: {"id": 2, "name": "Staff", "is_default": False},
    3: {"id": 3, "name": "Guests", "is_default": False},
    4: {"id": 4, "name": "IoT", "is_default": False}
}

@app.route("/api/devices", methods=["GET"])
def get_devices():
    return jsonify(devices), 200

@app.route("/api/devices/<int:device_id>", methods=["PATCH"])
def patch_device(device_id):
    device = next((d for d in devices if d["id"] == device_id), None)
    if not device:
        return jsonify({"error": "Device not found"}), 404
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    if "given_name" in data:
        device["given_name"] = data["given_name"]
    if "group" in data and "id" in data["group"]:
        group_id = data["group"]["id"]
        if group_id in GROUPS:
            device["group"] = GROUPS[group_id]
        else:
            return jsonify({"error": "Invalid group id"}), 400
    if "blocklist" in data and isinstance(data["blocklist"], dict):
        for key, value in data["blocklist"].items():
            if key in device["blocklist"] and isinstance(value, bool):
                device["blocklist"][key] = value
    return jsonify(device), 200

@app.route("/api/devices/<int:device_id>/actions", methods=["POST"])
def device_action(device_id):
    device = next((d for d in devices if d["id"] == device_id), None)
    if not device:
        return jsonify({"error": "Device not found"}), 404
    data = request.get_json()
    if not data or "action" not in data:
        return jsonify({"error": "Action not specified"}), 400
    action = data["action"]
    category = data.get("category")
    blocklist_keys = list(device["blocklist"].keys())
    if action == "isolate":
        for key in blocklist_keys:
            device["blocklist"][key] = True
        device["has_custom_blocklist"] = True
    elif action == "release":
        for key in blocklist_keys:
            device["blocklist"][key] = False
        if "safesearch" in device["blocklist"]:
            device["blocklist"]["safesearch"] = True
        device["has_custom_blocklist"] = True
    elif action == "toggle_block":
        if not category or category not in device["blocklist"]:
            return jsonify({"error": "Invalid or missing category"}), 400
        device["blocklist"][category] = not device["blocklist"][category]
        device["has_custom_blocklist"] = True
    else:
        return jsonify({"error": "Invalid action"}), 400
    return jsonify(device), 200

@app.route("/api/summary", methods=["GET"])
def get_summary():
    total = len(devices)
    active = sum(1 for d in devices if d.get("is_active", False))
    by_group = defaultdict(int)
    by_category = defaultdict(int)
    for d in devices:
        group_name = d.get("group", {}).get("name", "Unknown")
        by_group[group_name] += 1
        category = d.get("ai_classification", {}).get("device_category", "Unknown")
        by_category[category] += 1
    summary = {
        "total": total,
        "active": active,
        "by_group": dict(by_group),
        "by_category": dict(by_category)
    }
    return jsonify(summary), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Device not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
