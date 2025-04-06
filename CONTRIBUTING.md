# Contributing to Sekhmet

Thank you for your interest in contributing to Sekhmet! This document provides guidelines and instructions for contributing to the project.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Making Changes](#making-changes)
- [Database Guidelines](#database-guidelines)
- [Pull Request Process](#pull-request-process)

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/sekhmet.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   DISCORD_TOKEN=your_discord_token
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

## Code Style

- Use consistent indentation (2 spaces)
- Follow the existing code style in the project
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and single-purpose

## Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "feat: add new feature X"
   git commit -m "fix: resolve issue with Y"
   ```

## Database Guidelines

Since we're using Mongoose, please follow these guidelines:

1. Define schemas in the appropriate directory
2. Use Mongoose middleware when necessary
3. Implement proper error handling for database operations
4. Use Mongoose's built-in validation features
5. Follow MongoDB best practices for schema design

Example schema structure:
```javascript
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    // Add validation rules
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});
```

## Pull Request Process

1. Update your fork with the latest changes from the main repository
2. Push your changes to your fork
3. Create a Pull Request with:
   - A clear description of your changes
   - Any relevant issue numbers
   - Screenshots or examples if applicable
4. Wait for review and address any feedback

## Questions?

If you have any questions, feel free to:
- Open an issue
- Join our Discord server
- Contact the maintainers

Thank you for contributing to Sekhmet! 