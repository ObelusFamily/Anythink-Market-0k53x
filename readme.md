# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

1. [Install Docker](https://docs.docker.com/get-docker/). Verify docker is ready by running the following commands: `docker -v` and `docker-compose -v`.
1. Run `docker-compose up` from the **project root directory** to load backend and frontend.
1. Confirm the backend is running by opening http://localhost:3000/api/ping in the browser.
1. Confirm the frontend is running by opening http://localhost:3001/register in the browser.
1. Create a user.
