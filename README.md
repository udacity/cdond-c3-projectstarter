# Give your Application Auto-Deploy Superpowers

In this project, you will prove your mastery of the following learning objectives:

- Explain the fundamentals and benefits of CI/CD to achieve, build, and deploy automation for cloud-based software products.
- Utilize Deployment Strategies to design and build CI/CD pipelines that support Continuous Delivery processes.
- Utilize a configuration management tool to accomplish deployment to cloud-based servers.
- Surface critical server errors for diagnosis using centralized structured logging.

## Getting Started

Instructions for how to get a copy of the project running on your local machine.

### Dependencies

NodeJs v10 or higher

### Installation

This is a "mono-repository" which means multiple servers or layers exist in the same repository. You'll find the following main folders:

- `./frontend`
- `./backend`

#### 1. Install dependencies in both front-end and back-end folders.

```
cd frontend
npm i
```

```
cd backend
npm i
```

#### 2. Create `.env` file for database connection info.

Add a `.env` file to your `backend` folder with the following contents:

```
NODE_ENV=local
VERSION=1
TYPEORM_CONNECTION=postgres
TYPEORM_MIGRATIONS_DIR=./src/migrations
TYPEORM_ENTITIES=./src/modules/domain/**/*.entity.ts
TYPEORM_MIGRATIONS=./src/migrations/*.ts

# Things you can change if you wish...
TYPEORM_HOST=localhost
TYPEORM_PORT=5532
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=password
TYPEORM_DATABASE=glee
```

You can use your own Postgres server if you wish or you can use the Docker-Compose template we provided in the `./utils` folder.

## Running PostgreSQL in Docker-Compose

For convenience, we have provided a template that you can use to easily run a Postgres database for local testing. To run this template, you'll need to install Docker and Docker-Compose.

To start the database:

```
cd utils
docker-compose up
```

## Testing

We have provided unit tests for both back-end and front-end.

```
cd frontend
npm run test
```

```
cd backend
npm run test
```

## Project Instructions

This section should contain all the student deliverables for this project.

## Built With

- [Item1](www.item1.com) - Description of item
- [Item2](www.item2.com) - Description of item
- [Item3](www.item3.com) - Description of item

Include all items used to build project.

## License

[License](LICENSE.md)
