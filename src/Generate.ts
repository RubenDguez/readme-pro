import { mkdirSync, readFileSync, writeFileSync } from "fs";

/** Generate Class */
export default class Generate {
    private readonly _templateFile = './src/template/readme.md';
    private _template: string;
    private _outputCreateAttempt = 0;

    /** Constructor */
    constructor() {
        this._template = readFileSync(this._templateFile, { encoding: 'utf8' });
    }

    /**
     * Clean
     * @return {string}
     * @description Function to clean the README.md file
     */
    #clean(): string {
        let text = '';
        let isSpace = false;
        for (const line of this._template.split('\n')) {
            if (line === '' && isSpace) {
                continue;
            }

            isSpace = line === '';

            text = text + line + '\n';
        }

        return text;
    }

    /**
     * Get Installation
     * @param {string} installation 
     * @return {string}
     * @description Function to get the installation command
     */
    #getInstallation(installation: string): string {
        const install: Record<string, string> = {
            npm: '```sh\nnpm install\n```',
            yarn: '```sh\nyarn install\n```',
            bun: '```sh\nbun install\n```',
        }

        return install[installation];
    }

    /**
     * Setup
     * @param {ICreateOptions} options  
     * @return {Generate}
     * @description Function to setup the README.md file
     */
    setup({
        email,
        github,
        name,
        description,
        motivation,
        build,
        solve,
        learn,
        installation,
        usage,
        license,
    }: ICreateOptions): Generate {
        if (!email) throw new Error('The email address is a required field');
        if (!github) throw new Error('The GitHub username is a required field');
        if (!name) throw new Error('The title is a required field');

        this._template = this._template.replace('<project-title>', name);

        this._template = this._template.replace('<project-description>', description);
        this._template = this._template.replace('<project-motivation>', motivation ? '- Project motivation: ' + motivation : '');
        this._template = this._template.replace('<project-build>', build ? '- Why building this project? ' + build : '');
        this._template = this._template.replace('<project-solve>', solve ? '- What problem does it solve? ' + solve : '');
        this._template = this._template.replace('<project-learning>', learn ? '- What did you learn? ' + learn : '');
        this._template = this._template.replace('<project-installation>', this.#getInstallation(installation));
        this._template = this._template.replace('<project-usage>', usage);
        this._template = this._template.replace('<project-license-badge>', `![badge](https://img.shields.io/badge/${license.replace(/\s+/g, '_')}-orange)`);
        this._template = this._template.replace('<project-license>', license);
        this._template = this._template.replace('<github-profile>', `- This is my GitHub profile: [${github}](https://github.com/${github})`);
        this._template = this._template.replace('<email-address>', `- If you have further questions, you can contact me at: ${email}`);

        this._template = this.#clean();

        return this;
    }

    /**
     * Create
     * @return {boolean}
     * @description Function to create the README File
     */
    create(): boolean {
        try {
            const timestamp = new Date().getTime().toString();
            writeFileSync(`output/README.${timestamp}.md`, this._template, { encoding: 'utf-8' });
            return true;
        } catch (err: unknown) {
            const error = err as Error;

            // if the output folder does not exist, create it and try again
            if (error.message.includes('no such file or directory') && this._outputCreateAttempt < 3) {
                mkdirSync('output');
                return this.create();
            }

            throw new Error('Something went wrong while creating README.md' + '\n' + error.message);
        }
    }
}
