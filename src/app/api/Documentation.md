## API Documentation

### Patient API

#### POST /api/patient/check

**Description**: Check if a patient with the given ID exists in the database.

**Request Body**:
```json
{
    "patientId": "string",
    "patientName": "string",
    "patientEmail": "string",
    "patientPhone": "string",
    "patientAge": "number",
    "doctorPrefered": "boolean",
    "doctorId": "string"
}
```

**Response**:

