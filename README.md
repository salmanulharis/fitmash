# Shop Management API

A RESTful API built with Node.js, Express, and Prisma ORM for managing users, shops, and products.

## Technology Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Nodemon (for development)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Project Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
PORT=3000
```

4. **Install Development Dependencies**
```bash
npm install -D nodemon prisma
```

5. **Initialize Prisma**
```bash
npx prisma init
```

## Database Setup and Migration

1. **Create Initial Migration**
```bash
npx prisma migrate dev --name init
```

2. **Generate Prisma Client**
```bash
npx prisma generate
```

3. **View Database with Prisma Studio**
```bash
npx prisma studio
```

## Running the Application

1. **Development Mode** (with nodemon)
```bash
npm run dev
```

2. **Production Mode**
```bash
npm start
```

Add these scripts to your `package.json`:
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

## Database Schema Updates

When you need to update the database schema:

1. Modify the `schema.prisma` file
2. Create a new migration:
```bash
npx prisma migrate dev --name <migration-name>
```

## API Endpoints

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

#### User Object Structure
```json
{
  "name": "string",
  "phoneNumber": "string",
  "type": "string"
}
```

## API Request Examples

### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "type": "owner"
  }'
```

## Error Handling

The API returns appropriate HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses include a message explaining the error:
```json
{
  "error": "Error message description"
}
```

## Development Tips

1. Use Prisma Studio to manage database:
```bash
npx prisma studio
```

2. Reset Database (Warning: This will delete all data):
```bash
npx prisma migrate reset
```

3. Format Prisma Schema:
```bash
npx prisma format
```

4. View Migration History:
```bash
npx prisma migrate status
```

## Common Issues and Solutions

1. **Database Connection Issues**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists

2. **Prisma Client Issues**
```bash
npx prisma generate
```

3. **Migration Issues**
```bash
npx prisma migrate reset
npx prisma migrate dev
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.