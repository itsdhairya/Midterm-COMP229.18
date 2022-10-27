var express = require('express');
var router = express.Router();

let todoController = require('../controllers/todo');

// Helper function for guard purposes
function requireAuth(req, res, next)
{

    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next(); 
}

/* GET list of items */
router.get('/list', todoController.todoList);

// Route for Details
router.get('/details/:id', todoController.details);

// Routers for edit
router.get('/edit/:id', requireAuth, todoController.add_edit);
router.post('/edit/:id', requireAuth, todoController.add_edit);

// Delete
router.get('/delete/:id', requireAuth, todoController.add_edit);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth,todoController.add_edit);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, todoController.add_edit);

module.exports = router;