const ENGLISH_NUMBERS_1_TO_20 = [
    'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
];

const ENGLISH_SCHOOL_SUPPLIES = [
    { cz: 'tužka', en: 'pencil' },
    { cz: 'propiska', en: 'pen' },
    { cz: 'pravítko', en: 'ruler' },
    { cz: 'guma', en: 'eraser' },
    { cz: 'penál', en: 'pencil case' },
    { cz: 'školní batoh', en: 'schoolbag' },
    { cz: 'kniha', en: 'book' },
    { cz: 'sešit', en: 'notebook' },
    { cz: 'ořezávátko', en: 'sharpener' },
    { cz: 'pastelky', en: 'crayons' },
    { cz: 'nůžky', en: 'scissors' },
    { cz: 'lepidlo', en: 'glue' }
];

const englishNumbersQuestionSet = ENGLISH_NUMBERS_1_TO_20.map((word, index) => ({
    type: 'text',
    text: `Napiš číslo ${index + 1} anglicky.`,
    correct: word
}));

const englishSchoolSuppliesQuestionSet = ENGLISH_SCHOOL_SUPPLIES.map((item) => ({
    type: 'text',
    text: `Jak se anglicky řekne: "${item.cz}"?`,
    correct: item.en
}));

function createMultiplicationQuestionSet(minA, maxA, minB, maxB) {
    const questions = [];

    for (let first = minA; first <= maxA; first += 1) {
        for (let second = minB; second <= maxB; second += 1) {
            questions.push({
                type: 'number',
                text: `Vypočítej: ${first} × ${second}`,
                correct: first * second
            });
        }
    }

    return questions;
}

const rawQuestionBanks = {
    'cs-3-hard-soft': [
        { type: 'single', text: 'Která z uvedených souhlásek je tvrdá?', options: ['k', 'č', 'š', 'c'], correct: 'k' },
        { type: 'single', text: 'Která z uvedených souhlásek je měkká?', options: ['h', 'ch', 'r', 'ř'], correct: 'ř' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: h__bat se', correct: 'ý' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: ž__žala', correct: 'í' },
        { type: 'truefalse', text: 'Po měkkých souhláskách (ž, š, č, ř, c, j, ď, ť, ň) píšeme v českých slovech vždy měkké i/í.', correct: 'true' },
        { type: 'truefalse', text: 'Písmeno "ch" patří mezi měkké souhlásky.', correct: 'false' },
        { type: 'multiple', text: 'Vyber všechny tvrdé souhlásky z nabídky:', options: ['h', 'c', 'k', 'r'], correct: [0, 2, 3] },
        { type: 'multiple', text: 'Vyber slova, do kterých doplníš tvrdé y/ý:', options: ['ch__ba', 'č__slo', 'r__chlost', 'j__h'], correct: [0, 2] },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: k__selý?', options: ['y', 'i', 'ý', 'í'], correct: 'y' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: c__zinec?', options: ['y', 'i', 'ý', 'í'], correct: 'i' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: kř__da', correct: 'í' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: r__bník', correct: 'y' },
        { type: 'truefalse', text: 'Souhlásky h, ch, k, r, d, t, n patří do skupiny měkkých souhlásek.', correct: 'false' },
        { type: 'truefalse', text: 'Ve slově "cibule" napíšeme po "c" měkké "i", protože "c" je měkká souhláska.', correct: 'true' },
        { type: 'multiple', text: 'Vyber všechny měkké souhlásky z nabídky:', options: ['š', 'k', 'č', 'ř'], correct: [0, 2, 3] },
        { type: 'multiple', text: 'Vyber slova, do kterých doplníš měkké i/í:', options: ['š__ška', 'ch__trý', 'r__chle', 'j__dlo'], correct: [0, 3] },
        { type: 'single', text: 'Ve které řadě jsou POUZE tvrdé souhlásky?', options: ['h, ch, k, r', 'ž, š, č, ř', 'c, j, ď, ť', 'š, c, h, k'], correct: 'h, ch, k, r' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: ř__dit?', options: ['y', 'i', 'ý', 'í'], correct: 'í' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: ch__stá se', correct: 'y' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: č__stý', correct: 'i' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: t__kadlo?', options: ['y', 'i', 'ý', 'í'], correct: 'y' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: š__roký?', options: ['y', 'i', 'ý', 'í'], correct: 'i' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: c__hla', correct: 'i' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: d__chat', correct: 'ý' },
        { type: 'truefalse', text: 'Po souhlásce "r" píšeme v českých slovech vždy tvrdé y/ý.', correct: 'true' },
        { type: 'truefalse', text: 'Písmeno "ž" je tvrdá souhláska.', correct: 'false' },
        { type: 'multiple', text: 'Do kterých slov doplníš měkké i/í?', options: ['ž__dle', 'k__tka', 'h__bat', 'č__nky'], correct: [0, 3] },
        { type: 'multiple', text: 'Do kterých slov doplníš tvrdé y/ý?', options: ['r__že', 't__den', 'j__ný', 'ž__vot'], correct: [0, 1] },
        { type: 'single', text: 'Která z těchto souhlásek NENÍ měkká?', options: ['š', 'k', 'č', 'ř'], correct: 'k' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: k__chat (kýchnout)?', options: ['y', 'i', 'ý', 'í'], correct: 'ý' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: č__slo', correct: 'í' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: ř__ká', correct: 'í' },
        { type: 'truefalse', text: 'Písmeno "k" je tvrdá souhláska.', correct: 'true' },
        { type: 'truefalse', text: 'Po hlásce "c" se v českých slovech píše tvrdé y/ý.', correct: 'false' },
        { type: 'multiple', text: 'Které z těchto hlásek jsou tvrdé?', options: ['h', 'ch', 'k', 'j'], correct: [0, 1, 2] },
        { type: 'multiple', text: 'Do kterých slov doplníš tvrdé y/ý?', options: ['d__ně', 'r__chle', 'c__zinec', 'j__zva'], correct: [0, 1] },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: ž__vot?', options: ['y', 'i', 'ý', 'í'], correct: 'i' },
        { type: 'single', text: 'Které písmeno (i/í/y/ý) doplníš do slova: ch__ba?', options: ['y', 'i', 'ý', 'í'], correct: 'y' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: j__ný', correct: 'i' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: ch__tat', correct: 'y' },
        { type: 'truefalse', text: 'Písmeno "r" je tvrdá souhláska.', correct: 'true' },
        { type: 'truefalse', text: 'Po souhlásce "š" se vždy píše tvrdé y/ý.', correct: 'false' },
        { type: 'multiple', text: 'Vyber slova, do kterých se píše tvrdé y/ý:', options: ['k__selý', 'r__chlý', 'č__stý', 'š__roký'], correct: [0, 1] },
        { type: 'multiple', text: 'Vyber slova, do kterých se píše měkké i/í:', options: ['c__bule', 'j__zda', 'ch__ba', 'd__chat'], correct: [0, 1] },
        { type: 'single', text: 'Která z těchto hlásek patří mezi tvrdé?', options: ['r', 'ř', 'ž', 'š'], correct: 'r' },
        { type: 'single', text: 'Která z těchto hlásek patří mezi měkké?', options: ['h', 'k', 'c', 'r'], correct: 'c' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: ž__zeň', correct: 'í' },
        { type: 'text', text: 'Doplň chybějící písmeno do slova: k__tka', correct: 'y' },
        { type: 'truefalse', text: 'Souhlásky d, t, n jsou tvrdé, a proto se po nich v českých slovech píše tvrdé y/ý.', correct: 'true' },
        { type: 'truefalse', text: 'Po hlásce "j" se většinou píše tvrdé y/ý.', correct: 'false' }
    ],
    'cs-3-paired-consonants': [
        { type: 'text', text: 'Doplň správnou souhlásku (b/p): du_', correct: 'b' },
        { type: 'single', text: 'Vyber správně napsané slovo pro zmrzlou vodu (d/t):', options: ['let', 'led'], correct: 'led' },
        { type: 'text', text: 'Doplň správnou souhlásku (ď/ť): lo_', correct: 'ď' },
        { type: 'single', text: 'Vyber správně napsané slovo (z/s):', options: ['obras', 'obraz'], correct: 'obraz' },
        { type: 'text', text: 'Doplň správnou souhlásku (ž/š): nů_', correct: 'ž' },
        { type: 'single', text: 'Vyber správně napsané slovo (v/f):', options: ['lef', 'lev'], correct: 'lev' },
        { type: 'single', text: 'Vyber správně napsané slovo (h/ch):', options: ['sních', 'sníh'], correct: 'sníh' },
        { type: 'single', text: 'Která souhláska doplní slovo du_?', options: ['b', 'p'], correct: 'b' },
        { type: 'single', text: 'Která souhláska doplní slovo le_?', options: ['d', 't'], correct: 'd' },
        { type: 'single', text: 'Která souhláska doplní slovo lo_?', options: ['ď', 'ť'], correct: 'ď' },
        { type: 'single', text: 'Která souhláska doplní slovo obra_?', options: ['z', 's'], correct: 'z' },
        { type: 'single', text: 'Která souhláska doplní slovo nů_?', options: ['ž', 'š'], correct: 'ž' },
        { type: 'single', text: 'Která souhláska doplní slovo le_?', options: ['v', 'f'], correct: 'v' },
        { type: 'single', text: 'Která souhláska doplní slovo sní_?', options: ['h', 'ch'], correct: 'h' }
    ],
    'en-3-numbers-1-20': englishNumbersQuestionSet,
    'en-3-school-supplies': englishSchoolSuppliesQuestionSet,
    'math-3-multiplication-0-10-by-0-10': createMultiplicationQuestionSet(0, 10, 0, 10),
    'math-3-multiplication-0-10-by-10-20': createMultiplicationQuestionSet(0, 10, 10, 20)
};

function normalizeQuestion(question, index) {
    return {
        id: `${question.type}-${index + 1}`,
        type: question.type,
        prompt: question.text,
        options: question.options ?? [],
        correct: question.correct
    };
}

export function getQuestionSet(setId) {
    const questionSet = rawQuestionBanks[setId] ?? [];
    return questionSet.map((question, index) => normalizeQuestion(question, index));
}

function validateQuestion(question) {
    if (!question.id || !question.type || !question.prompt) {
        return false;
    }

    if (question.type === 'single' || question.type === 'multiple') {
        return Array.isArray(question.options) && question.options.length > 0;
    }

    if (question.type === 'truefalse') {
        return ['true', 'false'].includes(question.correct);
    }

    if (question.type === 'text') {
        return typeof question.correct === 'string' && question.correct.trim().length > 0;
    }

    if (question.type === 'number') {
        return typeof question.correct === 'number' && Number.isFinite(question.correct);
    }

    return false;
}

function validateEnglishNumbersSet(questionSet) {
    if (questionSet.length !== ENGLISH_NUMBERS_1_TO_20.length) {
        return false;
    }

    return questionSet.every((question, index) => (
        question.type === 'text'
        && question.correct === ENGLISH_NUMBERS_1_TO_20[index]
    ));
}

function validateEnglishSchoolSuppliesSet(questionSet) {
    if (questionSet.length !== ENGLISH_SCHOOL_SUPPLIES.length) {
        return false;
    }

    return questionSet.every((question, index) => (
        question.type === 'text'
        && question.correct === ENGLISH_SCHOOL_SUPPLIES[index].en
    ));
}

function validateMultiplicationSet(questionSet, minA, maxA, minB, maxB) {
    const expected = createMultiplicationQuestionSet(minA, maxA, minB, maxB).map((question, index) => (
        normalizeQuestion(question, index)
    ));

    if (questionSet.length !== expected.length) {
        return false;
    }

    return questionSet.every((question, index) => (
        question.type === 'number'
        && question.prompt === expected[index].prompt
        && question.correct === expected[index].correct
    ));
}

export function validateQuestionSet(questionSet, setId = null) {
    const hasValidQuestions = questionSet.every((question) => validateQuestion(question));

    if (!hasValidQuestions) {
        return false;
    }

    if (setId === 'en-3-numbers-1-20') {
        return validateEnglishNumbersSet(questionSet);
    }

    if (setId === 'en-3-school-supplies') {
        return validateEnglishSchoolSuppliesSet(questionSet);
    }

    if (setId === 'math-3-multiplication-0-10-by-0-10') {
        return validateMultiplicationSet(questionSet, 0, 10, 0, 10);
    }

    if (setId === 'math-3-multiplication-0-10-by-10-20') {
        return validateMultiplicationSet(questionSet, 0, 10, 10, 20);
    }

    return true;
}
