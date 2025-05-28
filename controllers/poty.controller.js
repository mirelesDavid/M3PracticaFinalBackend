const Poty = require('../models/poty.model');
const jwt = require('jsonwebtoken');

// Create a new user
exports.create = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'All fields are required!',
      });
    }

    // Check if email already exists
    const existingUser = await Poty.login(req.body.email, req.body.password);
    if (existingUser) {
      return res.status(400).send({
        message: 'Email already registered!',
      });
    }

    // Create a new user
    const poty = new Poty({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Save user in the database
    const data = await Poty.create(poty);
    res.status(201).send({
      message: 'User created successfully!',
      user: {
        id: data.id,
        username: poty.username,
        email: poty.email,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the user.',
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    // Validate request
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Email and password are required!',
      });
    }

    // Attempt to login
    const user = await Poty.login(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).send({
        message: 'Invalid email or password!',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    res.send({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while logging in.',
    });
  }
};

// Retrieve all users
exports.findAll = async (req, res) => {
  try {
    const potys = await Poty.findAll();
    res.send(potys);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving users.',
    });
  }
};

// Update a user by the id
exports.update = async (req, res) => {
  try {
    // Validate request
    if (!req.body.username || !req.body.email) {
      return res.status(400).send({
        message: 'Username and email are required!',
      });
    }

    const result = await Poty.updateById(req.params.id, req.body);
    if (result === 0) {
      return res.status(404).send({
        message: `Cannot update user with id ${req.params.id}. User was not found!`,
      });
    }
    res.send({ message: 'User was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating user with id ${req.params.id}`,
    });
  }
};

// Delete a user with the specified id
exports.delete = async (req, res) => {
  try {
    const result = await Poty.deleteById(req.params.id);
    if (result === 0) {
      return res.status(404).send({
        message: `Cannot delete user with id ${req.params.id}. User was not found!`,
      });
    }
    res.send({ message: 'User was deleted successfully!' });
  } catch (err) {
    res.status(500).send({
      message: err.message || `Could not delete user with id ${req.params.id}`,
    });
  }
};
