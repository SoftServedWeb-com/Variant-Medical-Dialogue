## API Documentation

### Patient API

#### POST /api/patient/create

**Description**: Create a new patient in the database.

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
- availability is only returned if `doctorPrefered` is true else it is null
```json
{
    "patient": {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "lastVisitOn": "string"
    }
    ,availability:{
        "id": "string",
        "dayOfWeek": "number",
        "startTime": "string",
        "endTime": "string"
    }
}


#### POST /api/patient/check

**Description**: Check if a patient with the given ID exists in the database.

**Request Body**:
```json
{
    "patientId": "string",  
    "doctorId": "string",
    "doctorPrefered": "boolean"
}
```

**Response**:
- availability is only returned if `doctorPrefered` is true else it is null
```json
{
    "patient": {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "lastVisitOn": "string"
    },  
    "availability": {
        "id": "string",
        "dayOfWeek": "number",
        "startTime": "string",
        "endTime": "string"
    }
}
```


#### GET /api/doctor/all

**Description**: Get all the doctors in the database.

**Request Body**:
```json
{}
```


#### POST /api/doctor/create

**Description**: Create a new doctor in the database.

**Request Body**:
  dayOfWeek Int // 0-6, where 0 is Sunday
  startTime String // Format: "HH:mm"
  endTime   String // Format: "HH:mm"

```json
{
    "doctorId": "string",
    "doctorName": "string",
    "doctorSpeciality": "string",
    "doctorAvailability": {
        "dayOfWeek": "number",
        "startTime": "string",
        "endTime": "string"
    }
}   
```

**Response**:
```json
{
    "doctor": {
        "id": "string",
        "name": "string",
        "speciality": "string"
    }
}


#### POST /api/doctor/update-availability

**Description**: Update the availability of a doctor in the database.

**Request Body**:
```json
{
    "doctorId": "string",
    "doctorAvailability": {
        "dayOfWeek": "number",
        "startTime": "string",
        "endTime": "string"
    }
}
```

**Response**:
```json 
{
    "doctor": {
        "id": "string",
    }
}
```
