# k6 Simple Framework (Swagger Petstore)

A minimal k6 framework with 3 scenarios:
- **Load** (normal traffic)
- **Stress** (push until it breaks)
- **Spike** (sudden surge)

## Quick start (Docker required)
```bash
# default points to Swagger Petstore
export BASE_URL="https://petstore.swagger.io/v2"

npm run load
npm run stress
npm run spike
```

## What to edit
- `config/endpoints.json` : change/add endpoints, expected status, bodies

## Notes
Petstore is a public demo API, so results can fluctuate.
