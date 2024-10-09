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
```json
{
    "doctorId": "string",
    "doctorName": "string",
    "doctorSpeciality": "string"
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

