function pickRandomSubset(items, limit) {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, Math.min(limit, shuffled.length));
}

function normalizeText(value) {
    return value.toString().trim().replace(/\s+/g, ' ').toLowerCase();
}

function parseIntegerAnswer(value) {
    const normalized = value.toString().trim();
    if (!/^-?\d+$/.test(normalized)) {
        return null;
    }

    return Number(normalized);
}

export class QuizEngine {
    constructor(questions, limit = 20) {
        this.questions = pickRandomSubset(questions, limit);
        this.currentIndex = 0;
        this.score = 0;
        this.mistakes = [];
    }

    static fromProgress(progress) {
        const engine = Object.create(QuizEngine.prototype);
        engine.questions = progress.questions;
        engine.currentIndex = progress.currentIndex;
        engine.score = progress.score;
        engine.mistakes = progress.mistakes;
        return engine;
    }

    isFinished() {
        return this.currentIndex >= this.questions.length;
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex] ?? null;
    }

    getProgress() {
        return {
            current: this.currentIndex + 1,
            total: this.questions.length,
            ratio: this.questions.length ? this.currentIndex / this.questions.length : 0
        };
    }

    evaluate(answer) {
        const question = this.getCurrentQuestion();
        if (!question) {
            return null;
        }

        let isCorrect = false;
        let displayCorrect = '';
        let userDisplay = answer;

        if (question.type === 'single' || question.type === 'truefalse') {
            isCorrect = answer === question.correct;
            displayCorrect = question.type === 'truefalse' ? (question.correct === 'true' ? 'Pravda' : 'Nepravda') : question.correct;
            userDisplay = question.type === 'truefalse' ? (answer === 'true' ? 'Pravda' : 'Nepravda') : answer;
        } else if (question.type === 'text') {
            const userText = normalizeText(answer ?? '');
            const correctText = normalizeText(question.correct);
            isCorrect = userText === correctText;
            displayCorrect = question.correct;
            userDisplay = userText;
        } else if (question.type === 'number') {
            const userNumber = parseIntegerAnswer(answer ?? '');
            isCorrect = userNumber !== null && userNumber === question.correct;
            displayCorrect = question.correct.toString();
            userDisplay = answer?.toString().trim() ?? '';
        } else if (question.type === 'multiple') {
            const userArr = [...(answer ?? [])].sort((a, b) => a - b);
            const corrArr = [...question.correct].sort((a, b) => a - b);
            isCorrect = userArr.length === corrArr.length && userArr.every((v, i) => v === corrArr[i]);
            displayCorrect = question.correct.map((index) => question.options[index]).join(', ');
            userDisplay = userArr.map((index) => question.options[index]).join(', ');
        }

        if (isCorrect) {
            this.score += 1;
        } else {
            this.mistakes.push({
                question: question.prompt,
                userAns: userDisplay,
                correctAns: displayCorrect
            });
        }

        return {
            isCorrect,
            displayCorrect,
            userDisplay
        };
    }

    next() {
        this.currentIndex += 1;
        return this.isFinished();
    }

    getResults() {
        return {
            score: this.score,
            total: this.questions.length,
            mistakes: this.mistakes
        };
    }

    toProgress() {
        return {
            questions: this.questions,
            currentIndex: this.currentIndex,
            score: this.score,
            mistakes: this.mistakes
        };
    }
}
