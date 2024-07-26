const prompts: Array<IPrompts> = [
    {
        name: 'name',
        message: 'What is your project name?',
        validate: (name) => {
            if (!name.length) {
                return 'Please provide a project name';
            }
            return true;
        }
    },
    {
        name: 'description',
        message: 'Project description',
        default: 'Project description here...',
    },
    {
        name: 'motivation',
        message: 'Project motivation',
    },
    {
        name: 'build',
        message: 'Why did you build this project?',
    },
    {
        name: 'solve',
        message: 'What problem does it solve?',
    },
    {
        name: 'learn',
        message: 'What did you learn?'
    },
    {
        name: 'installation',
        message: 'Package manager',
        default: 'npm',
        type: 'list',
        choices: ['npm', 'yarn', 'bun']
    },
    {
        name: 'usage',
        message: 'How to use this project',
        default: 'Provide instructions and examples for use. Include screenshots as needed.'
    },
    {
        name: 'license',
        message: 'Choose a license',
        default: 'None',
        type: 'list',
        choices: ['None', 'Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense']
    },
    {
        name: 'email',
        message: 'What is your email address?',
        validate: (email) => {
            if (!email.length) {
                return 'Please provide an email';
            }
            if (email.length <= 3) {
                return 'Please provide an email greater than 3 characters long';
            }
            return true;
        }
    },
    {
        name: 'github',
        message: 'What is your GitHub username?',
        validate: (github) => {
            if (!github.length) {
                return 'Please provide a GitHub username';
            }
            return true;
        }
    },
    {
        name: 'badges',
        message: 'Choose some badges',
        type: 'checkbox',
        choices: ['HTML', 'CSS', 'JavaScript', 'Node', 'Express', 'TypeScript', 'React', 'Redux']
    }
];

export default prompts;
