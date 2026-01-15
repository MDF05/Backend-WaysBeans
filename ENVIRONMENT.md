# Environment Variables

The application requires the following environment variables to run.

## Setup
1.  Copy `.env.example` to `.env`.
2.  Fill in the values.

## Variable Reference

| Variable | Description | Required | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | The port the server listens on. | No | `5000` |
| `DATABASE_URL` | PostgreSQL connection string. | Yes | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for signing JWTs. | Yes | `verysecretkey` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name. | Yes | `dhx7...` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key. | Yes | `123456...` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret. | Yes | `abcde...` |
| `MIDTRANS_SERVER_KEY` | Midtrans Server Key (SB/Prod). | Yes | `SB-Mid-server-...` |
| `MIDTRANS_CLIENT_KEY` | Midtrans Client Key. | Yes | `SB-Mid-client-...` |
