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
     * @description Method to clean the README.md file
     */
    private clean(): string {
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
     * Generate License
     * @param {TLicense} license
     * @return {ILicense}
     * @description Method to generate the license badge and link
     */
    private genLicense(license: TLicense): ILicense {
        const urls: Record<TLicense, string> = {
            'None': 'https://opensource.org/license',
            'Apache License 2.0': 'https://opensource.org/license/apache-2-0',
            'GNU General Public License v3.0': 'https://opensource.org/license/gpl-3-0',
            'MIT License': 'https://opensource.org/license/mit',
            'BSD 2-Clause "Simplified" License': 'https://opensource.org/license/bsd-2-clause',
            'BSD 3-Clause "New" or "Revised" License': 'https://opensource.org/license/bsd-3-clause',
            'Boost Software License 1.0': 'https://opensource.org/license/bsl-1-0',
            'Creative Commons Zero v1.0 Universal': 'https://opensource.org/license/0bsd',
            'Eclipse Public License 2.0': 'https://opensource.org/license/epl-2-0',
            'GNU Affero General Public License v3.0': 'https://opensource.org/license/agpl-v3',
            'GNU General Public License v2.0': 'https://opensource.org/license/gpl-2-0',
            'GNU Lesser General Public License v2.1': 'https://opensource.org/license/lgpl-2-1',
            'Mozilla Public License 2.0': 'https://opensource.org/license/mpl-2-0',
            'The Unlicense': 'https://opensource.org/license/unlicense',
        };

        const colors = ['blue', 'orange', 'green', 'yellow', 'red'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const badge = license !== 'None' ? `![badge](https://img.shields.io/badge/License-${license.replace(/\s+|-/g, '_')}-${color})` : '';
        const link = license !== 'None' ? `[${license}](${urls[license]})` : `[This project has no license yet, please follow this link in order to better understand licensing and perhaps choose one](${urls[license]})`;

        return {badge, link};
    }

    /**
     * Get Installation
     * @param {TInstallation} installation 
     * @return {string}
     * @description Method to get the installation command
     */
    private getInstallation(installation: TInstallation): string {
        const install: Record<TInstallation, string> = {
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
     * @description Method to setup the README.md file
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
        this._template = this._template.replace('<project-installation>', this.getInstallation(installation));
        this._template = this._template.replace('<project-usage>', usage);

        const lic = this.genLicense(license);
        this._template = this._template.replace('<project-license-badge>', lic.badge);
        this._template = this._template.replace('<project-license>', lic.link);

        this._template = this._template.replace('<github-profile>', `- This is my GitHub profile: [${github}](https://github.com/${github})`);
        this._template = this._template.replace('<email-address>', `- If you have further questions, you can contact me at: ${email}`);

        this._template = this.clean();

        return this;
    }

    /**
     * Create
     * @return {boolean}
     * @description Method to create the README File
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
