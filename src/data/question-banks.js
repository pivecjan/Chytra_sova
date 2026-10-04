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
    { cz: 'lepidlo', en: 'glue' },
    { cz: 'školní lavice', en: 'desk' },
    { cz: 'židle', en: 'chair' },
    { cz: 'kalkulačka', en: 'calculator' },
    { cz: 'učebnice', en: 'textbook' },
    { cz: 'pracovní sešit', en: 'workbook' },
    { cz: 'pastelka', en: 'coloured pencil' }
];

const MULTIPLICATION_0_10_BY_0_10_FACTORS = [
    ...Array.from({ length: 11 }, (_, second) => [0, second]),
    ...Array.from({ length: 11 }, (_, second) => [1, second]),
    ...Array.from({ length: 11 }, (_, second) => [10, second]),
    [2, 3], [2, 5], [2, 10],
    [3, 2], [3, 7],
    [4, 3], [4, 8],
    [5, 4], [5, 9],
    [6, 3], [6, 8],
    [7, 2], [7, 6],
    [8, 4], [8, 7],
    [9, 3], [9, 5]
];

const MULTIPLICATION_0_10_BY_10_20_FACTORS = [
    ...Array.from({ length: 11 }, (_, first) => [first, 10]),
    ...Array.from({ length: 11 }, (_, first) => [first, 20]),
    ...Array.from({ length: 11 }, (_, first) => [first, 15]),
    [0, 18], [1, 12], [2, 14], [3, 16], [4, 11], [5, 13], [6, 17], [7, 19], [8, 12], [9, 14], [10, 18],
    [2, 19], [3, 11], [4, 18], [6, 12], [8, 16], [9, 17]
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

function createMultiplicationQuestionSet(factors) {
    return factors.map(([first, second]) => ({
        type: 'number',
        text: `Vypočítej: ${first} × ${second}`,
        correct: first * second
    }));
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
        { type: 'text', text: 'Doplň správnou souhlásku (b/p): du_ (pomůcka: duby)', correct: 'b' },
        { type: 'single', text: 'Vyber správně napsané slovo (b/p):', options: ['zub', 'zup'], correct: 'zub' },
        { type: 'text', text: 'Doplň správnou souhlásku (b/p): chlu_ (pomůcka: chlupy)', correct: 'p' },
        { type: 'single', text: 'Vyber správně napsané slovo (b/p):', options: ['strob', 'strop'], correct: 'strop' },
        { type: 'single', text: 'Která souhláska doplní slovo zu_?', options: ['b', 'p'], correct: 'b' },
        { type: 'single', text: 'Která souhláska doplní slovo chlu_?', options: ['b', 'p'], correct: 'p' },

        { type: 'text', text: 'Doplň správnou souhlásku (d/t): le_ (pomůcka: ledy)', correct: 'd' },
        { type: 'single', text: 'Vyber správně napsané slovo (d/t):', options: ['hrat', 'hrad'], correct: 'hrad' },
        { type: 'text', text: 'Doplň správnou souhlásku (d/t): plo_ (pomůcka: ploty)', correct: 't' },
        { type: 'single', text: 'Vyber správně napsané slovo (d/t):', options: ['svět', 'svěd'], correct: 'svět' },
        { type: 'single', text: 'Která souhláska doplní slovo hra_?', options: ['d', 't'], correct: 'd' },
        { type: 'single', text: 'Která souhláska doplní slovo plo_?', options: ['d', 't'], correct: 't' },

        { type: 'text', text: 'Doplň správnou souhlásku (ď/ť): lo_ (pomůcka: lodě)', correct: 'ď' },
        { type: 'single', text: 'Vyber správně napsané slovo (ď/ť):', options: ['zeď', 'zeť'], correct: 'zeď' },
        { type: 'text', text: 'Doplň správnou souhlásku (ď/ť): sí_ (pomůcka: sítě)', correct: 'ť' },
        { type: 'single', text: 'Vyber správně napsané slovo (ď/ť):', options: ['naď', 'nať'], correct: 'nať' },
        { type: 'single', text: 'Která souhláska doplní slovo hru_?', options: ['ď', 'ť'], correct: 'ď' },
        { type: 'single', text: 'Která souhláska doplní slovo chu_?', options: ['ď', 'ť'], correct: 'ť' },

        { type: 'text', text: 'Doplň správnou souhlásku (z/s): obra_ (pomůcka: obrazy)', correct: 'z' },
        { type: 'single', text: 'Vyber správně napsané slovo (z/s):', options: ['mras', 'mráz'], correct: 'mráz' },
        { type: 'text', text: 'Doplň správnou souhlásku (z/s): hla_ (pomůcka: hlasy)', correct: 's' },
        { type: 'single', text: 'Vyber správně napsané slovo (z/s):', options: ['provaz', 'provas'], correct: 'provaz' },
        { type: 'single', text: 'Která souhláska doplní slovo vla_?', options: ['z', 's'], correct: 's' },
        { type: 'single', text: 'Která souhláska doplní slovo mrá_?', options: ['z', 's'], correct: 'z' },

        { type: 'text', text: 'Doplň správnou souhlásku (ž/š): nů_ (pomůcka: nože)', correct: 'ž' },
        { type: 'single', text: 'Vyber správně napsané slovo (ž/š):', options: ['kříž', 'kříš'], correct: 'kříž' },
        { type: 'text', text: 'Doplň správnou souhlásku (ž/š): ko_ (pomůcka: koše)', correct: 'š' },
        { type: 'single', text: 'Vyber správně napsané slovo (ž/š):', options: ['myž', 'myš'], correct: 'myš' },
        { type: 'single', text: 'Která souhláska doplní slovo no_?', options: ['ž', 'š'], correct: 'ž' },
        { type: 'single', text: 'Která souhláska doplní slovo ko_?', options: ['ž', 'š'], correct: 'š' },

        { type: 'text', text: 'Doplň správnou souhlásku (v/f): le_ (pomůcka: lvi)', correct: 'v' },
        { type: 'single', text: 'Vyber správně napsané slovo (v/f):', options: ['mrav', 'mraf'], correct: 'mrav' },
        { type: 'text', text: 'Doplň správnou souhlásku (v/f): ku_ (pomůcka: kufry)', correct: 'f' },
        { type: 'single', text: 'Vyber správně napsané slovo (v/f):', options: ['zpěf', 'zpěv'], correct: 'zpěv' },
        { type: 'single', text: 'Která souhláska doplní slovo mra_?', options: ['v', 'f'], correct: 'v' },
        { type: 'single', text: 'Která souhláska doplní slovo ku_?', options: ['v', 'f'], correct: 'f' },

        { type: 'text', text: 'Doplň správnou souhlásku (h/ch): sní_ (pomůcka: sněhu)', correct: 'h' },
        { type: 'single', text: 'Vyber správně napsané slovo (h/ch):', options: ['břeh', 'břech'], correct: 'břeh' },
        { type: 'text', text: 'Doplň správnou souhlásku (h/ch): vr_ (pomůcka: vrchy)', correct: 'ch' },
        { type: 'single', text: 'Vyber správně napsané slovo (h/ch):', options: ['prách', 'práh'], correct: 'práh' },
        { type: 'single', text: 'Která souhláska doplní slovo me_?', options: ['h', 'ch'], correct: 'ch' },
        { type: 'single', text: 'Která souhláska doplní slovo sně_?', options: ['h', 'ch'], correct: 'h' }
    ],
    'en-3-numbers-1-20': englishNumbersQuestionSet,
    'en-3-school-supplies': englishSchoolSuppliesQuestionSet,
    'math-3-multiplication-0-10-by-0-10': createMultiplicationQuestionSet(MULTIPLICATION_0_10_BY_0_10_FACTORS),
    'math-3-multiplication-0-10-by-10-20': createMultiplicationQuestionSet(MULTIPLICATION_0_10_BY_10_20_FACTORS)
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

function hasUniquePrompts(questionSet) {
    return new Set(questionSet.map((question) => question.prompt)).size === questionSet.length;
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

function validateMultiplicationSet(questionSet, factors, minA, maxA, minB, maxB) {
    const expected = createMultiplicationQuestionSet(factors).map((question, index) => normalizeQuestion(question, index));

    if (questionSet.length !== expected.length) {
        return false;
    }

    const hasRangeErrors = factors.some(([first, second]) => (
        first < minA || first > maxA || second < minB || second > maxB
    ));

    if (hasRangeErrors) {
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

    if (!hasValidQuestions || !hasUniquePrompts(questionSet)) {
        return false;
    }

    if (setId === 'en-3-numbers-1-20') {
        return validateEnglishNumbersSet(questionSet);
    }

    if (setId === 'en-3-school-supplies') {
        return validateEnglishSchoolSuppliesSet(questionSet);
    }

    if (setId === 'math-3-multiplication-0-10-by-0-10') {
        return validateMultiplicationSet(questionSet, MULTIPLICATION_0_10_BY_0_10_FACTORS, 0, 10, 0, 10);
    }

    if (setId === 'math-3-multiplication-0-10-by-10-20') {
        return validateMultiplicationSet(questionSet, MULTIPLICATION_0_10_BY_10_20_FACTORS, 0, 10, 10, 20);
    }

    return true;
}
