# Students API

The Students API is a mock API that allows users to perform CRUD operations on a MySQL table called "Students". The table consists of four columns: StudentID, FirstName, LastName, and Age. The API provides the following endpoints:

- GET `/students`: Retrieves a list of all students. Supports sorting, filtering, and pagination.
- POST `/students`: Adds a new student.
- PUT `/students/:id`: Updates a specific student by ID.
- DELETE `/students/:id`: Deletes a specific student by ID.

The API also performs input validation on all endpoints.

## Technologies Used

The following technologies were used to build this API:

- Node.js
- Express.js
- MySQL
- Docker
- Kubernetes
- Postman

## Getting Started

To run the API locally, follow these steps:

1. Install dependencies using `npm install`.
2. Start the server using `npm start`.
3. Access the API at `http://localhost:8080/students`.

To test the API using Postman, import the included `students-api.postman_collection.json` file.

## Deployment

To deploy the API to a Kubernetes cluster using Minikube, follow these steps:

1. Start the Minikube cluster using `minikube start`.
2. Verify the cluster is running using `kubectl cluster-info`.
3. Apply the YAML file in the `kube` folder using `kubectl apply -f kube`.
4. Get the URL of the newly exposed service using `minikube service knote --url`.

The Docker image for the API is available on Docker Hub at `amrnashaat98/my-node-app:2.0.0`.

## Swagger API Documentation

The API documentation is available through Swagger at `/api-docs/`. This documentation provides a user-friendly interface for exploring the API's endpoints and parameters.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
