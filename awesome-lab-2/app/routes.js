const userService = require('./users/userService');

module.exports = (app) => {

    // Create a new Note
    app.post('/users',userService.createUser );

    // Retrieve all Notes
    app.get('/users', userService.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', userService.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', userService.updateUser);

    // Delete a Note with noteId
    app.delete('/users/:userId', userService.deleteUser);
};
