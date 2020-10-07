interface CreateMailProps {
    baseText: string;
    replacers: string[];
}

export function createMail(
    options: CreateMailProps,
    placeholder = '?$?'
): string {
    if (!placeholder) {
        placeholder = '?$?';
    }

    const { baseText = '', replacers } = options;

    if (!baseText || replacers.length < 1) {
        throw new Error('Provide a baseText and replacers');
    }

    const result = baseText.split(placeholder).reduce(
        (content, word) => {
            const newPhrase = content.phrase;
            const currentReplacer = replacers[content.index];

            if (currentReplacer) {
                return {
                    index: content.index + 1,
                    phrase: newPhrase + word + currentReplacer,
                };
            }

            return {
                ...content,
                phrase: newPhrase + word,
            };
        },
        { phrase: '', index: 0 }
    );

    return result.phrase;
}
