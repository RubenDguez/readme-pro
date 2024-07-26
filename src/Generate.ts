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
    private genLicense(license: TLicense): string {
        if (license === 'None') {
            return '[This project has no license yet, please click on this link in order to better understand licensing and perhaps choose one](https://opensource.org/license)'
        }

        const urls: Record<Exclude<TLicense, 'None'>, string> = {
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

        return `[![](https://img.shields.io/badge/License-${license.replace(/\s+|-/g, '_')}-${color})](${urls[license]})`;
    }

    /**
     * Get Badges
     * @param {Array<TBadges>} badges
     * @return {string}
     */
    private getBadges(badges: Array<TBadges>): string {
        if (!badges) return '';

        const urls: Record<TBadges, string> = {
            'CSS': '![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)',
            'Express': '![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)',
            'HTML': '![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)',
            'JavaScript': '![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)',
            'Node': '![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)',
            'React': '![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)',
            'Redux': '![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)',
            'TypeScript': '![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)'
        }
        
        let str = '';
        for (const badge of badges) {
            str = str.concat(urls[badge]).concat('\n');
        }

        return str;
    }

    /**
     * Get Clone Repository
     * @param {string} repo
     * @return {string}
     * @description Method to get the git clone command
     */
    private getConeRepository(repo: string): string {
        let last = repo.split('/').length - 1;
        let _repo = repo.split('/')[last];

        _repo = _repo.split('.')[0];

        return '```sh\ngit clone ' + repo + '\ncd ' + _repo +'\n```';
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
        badges,
        repo,
    }: ICreateOptions): Generate {
        const _installation = this.getInstallation(installation);
        const _license = this.genLicense(license);
        const _badges = this.getBadges(badges);
        const _repository = this.getConeRepository(repo);

        this._template = this._template.replace('<project-title>', name);
        this._template = this._template.replace('<project-description>', description);
        this._template = this._template.replace('<project-motivation>', motivation ? '- Project motivation: ' + motivation : '');
        this._template = this._template.replace('<project-build>', build ? '- Why building this project? ' + build : '');
        this._template = this._template.replace('<project-solve>', solve ? '- What problem does it solve? ' + solve : '');
        this._template = this._template.replace('<project-learning>', learn ? '- What did you learn? ' + learn : '');
        this._template = this._template.replace('<project-git-clone>', _repository);
        this._template = this._template.replace('<project-installation>', _installation);
        this._template = this._template.replace('<project-usage>', usage);
        this._template = this._template.replace('<project-license-badge>', _license);
        this._template = this._template.replace('<github-profile>', `- This is my GitHub profile: [${github}](https://github.com/${github})`);
        this._template = this._template.replace('<email-address>', `- If you have further questions, you can contact me at: ${email}`);
        this._template = this._template.replace('<project-badges>', _badges);

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
