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

interface ICreateOptions {
    email: string;
    github: string;
    name: string;
    description: string;
    motivation: string;
    build: string;
    solve: string;
    learn: string;
    installation: string;
    usage: string;
    license: string;
}

interface IPrompts {
    name: TPromptName,
    message: string,
    default?: string,
    type?: TPromptType,
    choices?: Array<string>
}
