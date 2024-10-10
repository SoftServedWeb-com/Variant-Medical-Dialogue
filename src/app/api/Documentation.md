## API Documentation

### Patient API

#### POST /api/patient/create

**Description**: Create a new patient in the database.

**Request Body**:
if no doctor is prefered, then pass in an empty string for doctorId
```json
{
    "patientId": "string",
    "patientName": "string",
    "patientEmail": "string",
    "patientPhone": "string",
    "DOB": "string",
    "doctorPrefered": "boolean",
    "doctorId": "string"
}
```

**Response**:
- `availability` is only returned if `doctorPrefered` is true, otherwise it is null
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


#### POST /api/patient/check

**Description**: Check if a patient with the given ID exists in the database. Also pass in the doctor ID and doctor prefered boolean. to get the availability of the preferred doctor

**Request Body**:
```json
{
    "patientId": "string",  
    "doctorId": "string",
    "doctorPrefered": "boolean"
}
```

**Response**:
- `availability` is only returned if `doctorPrefered` is true, otherwise it is null
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
NOTE : doctorId is different from userId.
even if the user is a doctor, the doctorId is not the same as the userId
doctorId if from EHR

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

    userId is the userId from the auth.user table.. It is absolutely required!
```json
{
    "doctorId": "string",
    "doctorName": "string",
    "userId": "string",
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
{
  "doctor": {
    "id": "DOC1979",
    "name": "Dr.Nisham ",
    "speciality": "Onceology",
    "availability": [
      {
        "id": "cm236anpc000bc963rxu60p77",
        "doctorId": "DOC1979",
        "dayOfWeek": 4,
        "startTime": "12:00",
        "endTime": "19:00"
      }
    ],
    "user": {
      "id": "cm236anpc000ac963b16ovpva",
      "email": "dr.nisham.@example.com",
      "password": "password123",
      "role": "DOCTOR"
    }
  }
}
}

```

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



### Transcription API

#### POST /api/transcription/process

**Description**: Process the transcription and return the ICD-10 codes.

**Request Body**:
```json
{
    "transcription": "string",
    "patientId":"string"
}
```

**Response**:
```json
{
    "responses": "string"
}

```

### Appointment API

#### POST /api/appointment/create

**Description**: Create a new appointment in the database.

*caps compulsory*
enum Severity {
  LOW
  MODERATE
  SEVERE
  CRITICAL
}

*caps compulsory*
enum AppointmentStatus {
  PENDING
  CONFIRMED
  RESCHEDULED
  REJECTED
}

**Request Body**:
```json 
{
  "patientId": "266",
  "doctorPrefered":true,
  "doctorId":"DOC1232",
  
    "appointmentDate": "14-05-2024",
    "condition": "Pain in the nasal cavity",
    "status":"PENDING",
    "severity": "LOW",
    "ICD10Codes": [
        {
            "code": "Z00.00",
            "description": "Encounter for general adult medical examination without abnormal findings",
            "severity": "Low"
        },
        {
            "code": "Z71.89",
            "description": "Other specified counseling",
            "severity": "Low"
        }
    ]
}
```

**Response**:
```json
{
    "appointment": {
        "id": "string"
    }
}
```



