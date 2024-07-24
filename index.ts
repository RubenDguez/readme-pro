import inquirer from "inquirer";
import Generate from "./src/Generate.js";
import prompts from "./src/prompts.js";
import Title from "./src/title.js";

(async () => {
    try {
        console.clear();
        Title();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const answers = await inquirer.prompt(prompts as any); // don't worry typescript I know what I am doing (lol)
        const readme = new Generate()
            .setup(answers as ICreateOptions)
            .create();
        if (readme) {
            console.log('\nMake sure to check the newly created file for fine-tuning and any missing information.')
            console.log('Thank you for using this tool, have a great day!\n');
        }
    } catch (error) {
        console.error((error as Error).message);
    }
})();
