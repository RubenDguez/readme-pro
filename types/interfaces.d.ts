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
    badges: Array<TBadges>
}

interface IPrompts {
    name: TPromptName,
    message: string,
    default?: string,
    type?: TPromptType,
    choices?: Array<TLicense> | Array<TInstallation> | Array<TBadges>
    validate?: (param: string) => (boolean | string);
}

interface ILicense {
    badge: string,
    link: string
}
