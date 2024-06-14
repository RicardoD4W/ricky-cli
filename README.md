# ricky-cli

**ricky-cli** is a powerful and user-friendly command-line interface designed to streamline and automate the process of creating components and others utilities for your projects. Built with Node.js and leveraging popular libraries such as chalk, figlet, and inquirer, **ricky-cli** provides a seamless and interactive experience for developers.

## Features:

- Component Creation: Quickly generate boilerplate code for new components with just a few prompts.
- Framework Support: Currently supports the Lit framework, with plans to expand to additional frameworks.
- Language Selection: Choose between different programming languages.
- Additional Options: Customize your component with additional features like models, events, shared utilities, templates, and services.
- Interactive Prompts: Easy-to-follow prompts guide you through the component creation process, ensuring you provide all necessary details.
- Automated Directory and File Creation: Automatically generates the necessary directories and files, saving you time and reducing errors.

## Installation

```bash
npm i -g ricky-cli
```

```bash
ricky-cli
```

## How It Works:

Initialization: When you run **ricky-cli**, it welcomes you with a stylish ASCII art banner.
Action Selection: You are prompted to choose an action from a list of options.
Component Naming: Enter the name for your new component. The CLI ensures that the name is valid and properly formatted.
Framework and Language Selection: Choose the framework and programming language for your component.
Additional Options: If applicable, select additional features to include in your component.
File Generation: **ricky-cli** generates the necessary files and directories based on your input, using templates tailored for your selected framework and language.
Feedback: The CLI provides feedback on the creation process, confirming the successful generation of your component and any additional options.
Example Usage:
Bash
Copy code
$**ricky-cli**
Follow the prompts to create a new component effortlessly.

**ricky-cli** is designed to make your development workflow more efficient and enjoyable. Whether you're starting a new project or adding new components to an existing one, **ricky-cli** handles the boilerplate so you can focus on what matters most: building great software.
