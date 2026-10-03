const QUIZ_PROGRESS_KEY = 'chytra-sova.quiz-progress';
const RESULTS_HISTORY_KEY = 'chytra-sova.results-history';

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

export function saveQuizProgress(payload) {
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(payload));
}

export function loadQuizProgress() {
    return readJson(QUIZ_PROGRESS_KEY, null);
}

export function clearQuizProgress() {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
}

export function addResultToHistory(result) {
    const history = readJson(RESULTS_HISTORY_KEY, []);
    history.unshift(result);
    localStorage.setItem(RESULTS_HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
}

export function loadResultsHistory() {
    return readJson(RESULTS_HISTORY_KEY, []);
}
