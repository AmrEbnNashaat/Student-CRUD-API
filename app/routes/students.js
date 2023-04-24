import express from 'express';
import { deflateRaw } from 'zlib';
import mysql from 'mysql2';
import connection from '../db/db_connection.js';
import { validationResult, check, param } from 'express-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - Age
 *       properties:
 *         FirstName:
 *           type: string
 *           description: Student's first name
 *         LastName:
 *           type: string
 *           description: Student's last name
 *         Age:
 *           type: int
 *           description: Student's age
 *       example:
 *         FirstName: Amr
 *         LastName: Ali
 *         Age: 25
 */
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing student records
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The created student.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing student records
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Age:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 100
 *             example:
 *               FirstName: Alia
 *               Age: 17
 *     responses:
 *       200:
 *         description: The updated student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Some server error
 */
/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The student was deleted successfully
 *       404:
 *         description: The specified student was not found
 *       500:
 *         description: Some server error
 */






const router = express.Router();
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server!');
  });

//this is localhost:8080/students 
router.get('/', (req, res) => {
    const filter = req.query.filter || '';
    const sortField = req.query.sortField || 'StudentID';
    const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
  
    const q = `
      SELECT * 
      FROM students
      WHERE CONCAT(FirstName, ' ', LastName) LIKE ?
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ${limit} OFFSET ${offset}
    `;
    const params = [`%${filter}%`];
    connection.query(q, params, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving students from database." });
      }
      return res.json(data);
    });
  });
  

//StudentID, FirstName, LastName, Age
router.post("/", [
    check('FirstName').isString().trim().notEmpty(),
    check('LastName').isString().trim().notEmpty(),
    check('Age').isInt({ min: 1, max: 100 }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const age = req.body.Age;
  
    const selectQuery = "SELECT COUNT(*) AS count FROM students WHERE FirstName = ? AND LastName = ? AND Age = ?";
    connection.query(selectQuery, [firstName, lastName, age], (err, data) => {
      if (err) return res.json(err);
      const count = data[0].count;
      if (count > 0) {
        return res.status(400).json(`User with name ${firstName} ${lastName} and age ${age} already exists.`);
      } else {
        const insertQuery = "INSERT INTO students (`FirstName`, `LastName`, `Age`) VALUES (?)";
        const values = [firstName, lastName, age];
        connection.query(insertQuery, [values], (err, data) => {
          if (err) return res.json(err);
          return res.json("User added successfully!");
        });
      }
    });
  });
  


  router.delete("/:id", [
    param('id').isInt({ min: 1 }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const studentId = req.params.id;
    const selectQuery = "SELECT COUNT(*) AS count FROM students WHERE StudentID = ?";
    connection.query(selectQuery, [studentId], (err, data) => {
      if (err) return res.json(err);
      const count = data[0].count;
      if (count === 0) {
        return res.status(404).json(`Student with ID ${studentId} not found.`);
      } else {
        const deleteQuery = "DELETE FROM students WHERE StudentID = ?";
        connection.query(deleteQuery, [studentId], (err, data) => {
          if (err) return res.json(err);
          return res.json("User deleted successfully!");
        });
      }
    });
  });
  

  router.put("/:id", [
    check('FirstName').optional().isString().trim().notEmpty(),
    check('LastName').optional().isString().trim().notEmpty(),
    check('Age').optional().isInt({ min: 1, max: 100 }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const studentId = req.params.id;
    const fieldsToUpdate = [];
    const values = [];
    for (const [key, value] of Object.entries(req.body)) {
      fieldsToUpdate.push(`${key} = ?`);
      values.push(value);
    }
    const q = `UPDATE students SET ${fieldsToUpdate.join(", ")} WHERE StudentID = ?`;
    connection.query(q, [...values, studentId], (err, data) => {
      if (err) return res.json(err);
      return res.json("User updated successfully!");
    });
  });
  



export default router;