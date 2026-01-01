# k6 API Performance Testing Framework (Swagger Petstore)

This repository contains a **simple, local k6 framework** for API performance testing.
It demonstrates **Load, Stress, and Spike testing** using the **Swagger Petstore API**.

The framework runs **locally using k6**.  
---

## Prerequisites (Windows)

### Install k6

1. Open: https://github.com/grafana/k6/releases  
2. Download:
   ```
   k6-vX.X.X-windows-amd64.zip
   ```
3. Extract to:
   ```
   C:\k6\
   ```
4. Add `C:\k6` to **PATH**
   - Search → Edit environment variables
   - Environment Variables → User variables → Path → Add `C:\k6`
5. Restart PowerShell

Verify installation:
```powershell
k6 version
```

---

### Install Node.js

Download from:
https://nodejs.org

Verify:
```powershell
node -v
npm -v
```

---

## Project Structure

```
.
├── tests/
│   ├── load.js       # Load test
│   ├── stress.js     # Stress test
│   └── spike.js      # Spike test
│
├── lib/
│   └── request.js    # Shared API request logic
│
├── config/
│   └── endpoints.json  # API endpoints configuration
│
├── package.json
└── README.md
```

---

## APIs Under Test

All test scenarios use the same endpoints defined in:

```
config/endpoints.json
```

Default Swagger Petstore endpoints:
- `GET /pet/findByStatus?status=available`
- `GET /store/inventory`
- `GET /pet/1`
- `POST /pet`

Each virtual user executes all endpoints sequentially in every iteration.

---

## Base URL

Default:
```
https://petstore.swagger.io/v2
```

Override if required:
```powershell
$env:BASE_URL="https://petstore.swagger.io/v2"
```

---

## How to Run Tests (Using npm)

Run commands from the folder containing `package.json`:

```powershell
cd D:\Perfomance-testing-K6
```

Load Test:
```powershell
npm run load
```

Stress Test:
```powershell
npm run stress
```

Spike Test:
```powershell
npm run spike
```

---

## How to Run Tests (Direct k6)

```powershell
k6 run .\tests\load.js
k6 run .\tests\stress.js
k6 run .\tests\spike.js
```

---

## Test Types

### Load Test
- Simulates normal expected traffic
- Ramp-up → steady load → ramp-down

### Stress Test
- Gradually increases traffic
- Identifies breaking point and error behavior

### Spike Test
- Sudden surge in traffic
- Tests system stability under unexpected load

---

## How the Framework Works

```
Test script (load / stress / spike)
        ↓
Shared request runner (lib/request.js)
        ↓
Endpoints loaded from config/endpoints.json
        ↓
Swagger Petstore API
```

---

## Modifying APIs

Edit:
```
config/endpoints.json
```

You can:
- Add or remove endpoints
- Change HTTP methods
- Update expected status codes
- Modify request bodies

No changes to test scripts are required.

---


## Summary

A clean, config-driven k6 framework for running load, stress, and spike tests locally on API endpoints.
