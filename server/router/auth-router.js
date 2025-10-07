const express = require('express');
const router = express.Router();
const authcontrollers = require('../controllers/auth-conrollers');

router.route('/').get(authcontrollers.home);
router.route('/register').post(authcontrollers.register);
router.route('/login').post(authcontrollers.login);
// Collection CRUD Routes
router.post("/admin/collection", authcontrollers.createDetail);      // Create
router.get("/admin/collection", authcontrollers.getDetails);         // Read
router.put("/admin/collection/:id", authcontrollers.updateDetail);   // Update
router.delete("/admin/collection/:id", authcontrollers.deleteDetail);// Delete

// Expenses CRUD Routes
router.post("/admin/expenses", authcontrollers.createExpenses);      // Create
router.get("/admin/expenses", authcontrollers.getExpenses);         // Read
router.put("/admin/expenses/:id", authcontrollers.updateExpenses);   // Update
router.delete("/admin/expenses/:id", authcontrollers.deleteExpenses);// Delete


// Catch all other routes
router.all('*', (req, res) => {
    res.status(404).send('404 - Page not found');
});

module.exports = router;


