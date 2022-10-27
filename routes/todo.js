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
router.get('/add_edit/:id', requireAuth, todoController.displayEditPage);
router.post('/add_edit/:id', requireAuth, todoController.processEditPage);

// Delete
router.get('/add_edit/:id', requireAuth, todoController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add_edit', requireAuth,todoController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add_edit', requireAuth, todoController.processAddPage);

module.exports = router;