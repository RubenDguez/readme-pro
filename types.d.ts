type TPromptName =
    'email' |
    'github' |
    'name' |
    'description' |
    'motivation' |
    'build' |
    'solve' |
    'learn' |
    'installation' |
    'usage' |
    'license';

type TPromptType =
    'input' |
    'number' |
    'confirm' |
    'list' |
    'rawlist' |
    'expand' |
    'checkbox' |
    'password' |
    'editor'

type TLicense =
    'None' |
    'Apache License 2.0' |
    'GNU General Public License v3.0' |
    'MIT License' |
    'BSD 2-Clause "Simplified" License' |
    'BSD 3-Clause "New" or "Revised" License' |
    'Boost Software License 1.0' |
    'Creative Commons Zero v1.0 Universal' |
    'Eclipse Public License 2.0' |
    'GNU Affero General Public License v3.0' |
    'GNU General Public License v2.0' |
    'GNU Lesser General Public License v2.1' |
    'Mozilla Public License 2.0' |
    'The Unlicense'

type TInstallation =
    'npm' |
    'yarn' |
    'bun'

interface ICreateOptions {
    email: string;
    github: string;
    name: string;
    description: string;
    motivation: string;
    build: string;
    solve: string;
    learn: string;
    installation: TInstallation;
    usage: string;
    license: TLicense;
}

interface IPrompts {
    name: TPromptName,
    message: string,
    default?: string,
    type?: TPromptType,
    choices?: Array<TLicense> | Array<TInstallation>
}

interface ILicense { 
    badge: string,
    link: string
}
