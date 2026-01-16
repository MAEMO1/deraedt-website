# Security Rules

## Secrets & Credentials

- **NEVER** read, write, or reference `.env` files
- **NEVER** hardcode API keys, tokens, or credentials
- **NEVER** commit secrets to git
- If credentials are needed: document as BLOCK and create stub/interface

## Authentication & Authorization

- All `/admin` routes require authentication
- Implement RBAC (Role-Based Access Control) server-side
- Roles: DIRECTIE, SALES, HR, OPERATIONS, ADMIN, PARTNER
- Check permissions on every API route

## Input Validation

- Validate all user input server-side with Zod
- Sanitize file uploads (type + size limits)
- Rate limit public forms

## Audit Trail

- Log all authentication events
- Log CRUD operations on critical entities
- Include: user_id, action, entity, timestamp, ip

## GDPR Compliance

- Data minimization: only collect what's needed
- Retention policies: 12 months (applications), 24 months (leads)
- Consent checkboxes on all public forms
- Support right-to-access, right-to-delete
