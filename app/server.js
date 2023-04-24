import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/students.js';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
    definition: {
       openapi: "3.0.0",
      info: {
        title: "Express API",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Amr Nashaat",
          url: "https://github.com/AmrEbnNashaat",
          email: "amrnashaat98@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  const specs = swaggerJsdoc(options);


dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 8080;


app.use(bodyParser.json());
app.use('/students', (usersRoutes));



//export KUBECONFIG=/etc/kubernetes/admin.conf or $HOME/.kube/config


app.get('/', (req, res) => {
    res.send("test");
})
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
});

//docker build -t mysql_db .
//docker run mysql_db
//docker container ls
//docker exec -it b2abd5a8ef52 /bin/bash
//mysql -proot