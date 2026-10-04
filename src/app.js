import { ScreenRouter } from './core/router.js';
import { QuizEngine } from './core/quiz-engine.js';
import { curriculum, getGrade, getSubject, getTopic } from './data/curriculum.js';
import { getQuestionSet, validateQuestionSet } from './data/question-banks.js';
import { addResultToHistory, clearQuizProgress, loadQuizProgress, loadResultsHistory, saveQuizProgress } from './state/storage.js';
import { renderGrades, renderQuestion, renderResultsHistory, renderSubjects, renderTopics } from './ui/renderers.js';

const state = {
    selectedGradeId: null,
    selectedSubjectId: null,
    selectedTopicId: null,
    currentAnswer: null,
    quizEngine: null
};

const refs = {
    backButton: document.getElementById('btn-back'),
    homeButton: document.getElementById('btn-home'),
    wipBackButton: document.getElementById('btn-wip-back'),
    resultsHomeButton: document.getElementById('btn-results-home'),
    gradesContainer: document.getElementById('grades-container'),
    subjectsContainer: document.getElementById('subjects-container'),
    topicsContainer: document.getElementById('topics-container'),
    subjectsTitle: document.getElementById('subjects-title'),
    topicsTitle: document.getElementById('topics-title'),
    quizTopicTitle: document.getElementById('quiz-topic-title'),
    progressText: document.getElementById('quiz-progress-text'),
    progressBar: document.getElementById('quiz-progress-bar'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    warningBox: document.getElementById('quiz-warning'),
    feedbackBox: document.getElementById('quiz-feedback'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackMessage: document.getElementById('feedback-message'),
    feedbackCorrection: document.getElementById('feedback-correction'),
    checkButton: document.getElementById('btn-check'),
    nextButton: document.getElementById('btn-next'),
    score: document.getElementById('res-score'),
    resultIcon: document.getElementById('res-icon'),
    resultMessage: document.getElementById('res-msg'),
    mistakesBox: document.getElementById('mistakes-container'),
    mistakesList: document.getElementById('mistakes-list'),
    historyList: document.getElementById('results-history'),
    historyEmpty: document.getElementById('results-history-empty')
};

const router = new ScreenRouter((screenId, canGoBack) => {
    document.querySelectorAll('.screen').forEach((screen) => screen.classList.remove('active'));
    document.getElementById(`screen-${screenId}`).classList.add('active');

    if (canGoBack && screenId !== 'results') {
        refs.backButton.classList.remove('hidden');
    } else {
        refs.backButton.classList.add('hidden');
    }

    window.scrollTo(0, 0);
});

function updateHistoryPreview() {
    renderResultsHistory(refs.historyList, refs.historyEmpty, loadResultsHistory());
}

function showWip() {
    router.goTo('wip');
}

function renderGradeSelection() {
    renderGrades(refs.gradesContainer, curriculum.grades, (grade) => {
        if (!grade.available) {
            showWip();
            return;
        }

        state.selectedGradeId = grade.id;
        refs.subjectsTitle.innerText = `Co budeme cvičit? (${grade.label})`;
        renderSubjectsSelection(grade.id);
        router.goTo('subjects');
    });
}

function renderSubjectsSelection(gradeId) {
    const grade = getGrade(gradeId);
    renderSubjects(refs.subjectsContainer, grade?.subjects ?? [], (subject) => {
        if (!subject.available) {
            showWip();
            return;
        }

        state.selectedSubjectId = subject.id;
        refs.topicsTitle.innerText = `Vyber si téma z ${subject.label}`;
        renderTopicsSelection(gradeId, subject.id);
        router.goTo('topics');
    });
}

function renderTopicsSelection(gradeId, subjectId) {
    const subject = getSubject(getGrade(gradeId), subjectId);
    renderTopics(refs.topicsContainer, subject?.topics ?? [], (topic) => {
        state.selectedTopicId = topic.id;
        startQuiz(topic);
    });
}

function getCurrentTopic() {
    const grade = getGrade(state.selectedGradeId);
    const subject = getSubject(grade, state.selectedSubjectId);
    return getTopic(subject, state.selectedTopicId);
}

function saveProgress() {
    const topic = getCurrentTopic();
    if (!topic || !state.quizEngine) {
        return;
    }

    saveQuizProgress({
        topicId: topic.id,
        topicTitle: topic.title,
        selectedGradeId: state.selectedGradeId,
        selectedSubjectId: state.selectedSubjectId,
        quiz: state.quizEngine.toProgress()
    });
}

function startQuiz(topic) {
    const questionSet = getQuestionSet(topic.questionSetId);
    if (!validateQuestionSet(questionSet, topic.questionSetId)) {
        throw new Error(`Neplatná sada otázek: ${topic.questionSetId}`);
    }

    const saved = loadQuizProgress();
    const canResume = saved?.topicId === topic.id && saved?.quiz;

    if (canResume && window.confirm('Našli jsme rozdělaný kvíz. Chceš pokračovat?')) {
        state.quizEngine = QuizEngine.fromProgress(saved.quiz);
    } else {
        state.quizEngine = new QuizEngine(questionSet, 20);
    }

    refs.quizTopicTitle.innerText = topic.title;
    router.goTo('quiz');
    loadCurrentQuestion();
    saveProgress();
}

function markSelectedSingle(button) {
    document.querySelectorAll('.opt-btn').forEach((item) => item.classList.remove('selected-option'));
    button.classList.add('selected-option');
}

function toggleMultiple(index, button) {
    const values = Array.isArray(state.currentAnswer) ? state.currentAnswer : [];
    const pos = values.indexOf(index);
    const box = button.querySelector('.chk-box');
    const icon = button.querySelector('.chk-icon');

    if (pos > -1) {
        values.splice(pos, 1);
        button.classList.remove('selected-option-multi');
        box.classList.remove('custom-checkbox-checked');
        icon.classList.add('opacity-0');
    } else {
        values.push(index);
        button.classList.add('selected-option-multi');
        box.classList.add('custom-checkbox-checked');
        icon.classList.remove('opacity-0');
    }

    state.currentAnswer = values;
}

function loadCurrentQuestion() {
    const question = state.quizEngine?.getCurrentQuestion();
    if (!question) {
        showResults();
        return;
    }

    state.currentAnswer = question.type === 'multiple' ? [] : null;
    const progress = state.quizEngine.getProgress();

    refs.progressText.innerText = `${progress.current}/${progress.total}`;
    refs.progressBar.style.width = `${Math.round(progress.ratio * 100)}%`;
    refs.questionText.innerText = question.prompt;

    refs.checkButton.classList.remove('hidden');
    refs.nextButton.classList.add('hidden');
    refs.feedbackBox.classList.add('hidden');
    refs.warningBox.classList.add('hidden');

    renderQuestion(
        refs.optionsContainer,
        question,
        (value, button) => {
            state.currentAnswer = value;
            markSelectedSingle(button);
        },
        (index, button) => toggleMultiple(index, button),
        (value) => {
            state.currentAnswer = value;
        }
    );
}

function hasAnswer(answer) {
    if (answer === null || answer === '') {
        return false;
    }
    if (Array.isArray(answer)) {
        return answer.length > 0;
    }
    return true;
}

function setFeedback(result) {
    refs.feedbackBox.classList.remove('hidden', 'bg-green-100', 'border-green-400', 'text-green-800', 'bg-red-100', 'border-red-400', 'text-red-800');
    refs.feedbackCorrection.classList.add('hidden');

    if (result.isCorrect) {
        refs.feedbackBox.classList.add('bg-green-100', 'border-green-400', 'text-green-800');
        refs.feedbackIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        refs.feedbackMessage.innerText = 'Výborně! To je správně.';
        return;
    }

    refs.feedbackBox.classList.add('bg-red-100', 'border-red-400', 'text-red-800');
    refs.feedbackIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
    refs.feedbackMessage.innerText = 'To se nepovedlo.';
    refs.feedbackCorrection.classList.remove('hidden');
    refs.feedbackCorrection.innerHTML = `Správná odpověď byla: <strong>${result.displayCorrect}</strong>`;
}

function lockQuestionInputs(questionType) {
    if (questionType === 'text' || questionType === 'number') {
        const input = document.getElementById('quiz-input');
        if (input) {
            input.disabled = true;
        }
        return;
    }

    document.querySelectorAll('.opt-btn').forEach((button) => {
        button.classList.add('disabled-element');
        button.disabled = true;
    });
}

function checkAnswer() {
    const question = state.quizEngine?.getCurrentQuestion();
    if (!question) {
        return;
    }

    if (!hasAnswer(state.currentAnswer)) {
        refs.warningBox.classList.remove('hidden');
        return;
    }

    refs.warningBox.classList.add('hidden');
    const result = state.quizEngine.evaluate(state.currentAnswer);
    if (!result) {
        return;
    }

    lockQuestionInputs(question.type);
    setFeedback(result);
    refs.checkButton.classList.add('hidden');
    refs.nextButton.classList.remove('hidden');
    saveProgress();
}

function nextQuestion() {
    if (!state.quizEngine) {
        return;
    }

    const finished = state.quizEngine.next();
    if (finished) {
        showResults();
        return;
    }

    loadCurrentQuestion();
    saveProgress();
}

function renderMistakes(mistakes) {
    refs.mistakesList.innerHTML = '';
    mistakes.forEach((mistake) => {
        const item = document.createElement('li');
        item.className = 'bg-white p-4 rounded-xl shadow-sm border border-red-100';
        item.innerHTML = `
            <div class="font-bold text-slate-700 mb-1">${mistake.question}</div>
            <div class="text-sm">
                <span class="text-red-500 line-through mr-2">Tvá odpověď: ${mistake.userAns}</span><br>
                <span class="text-green-600 font-bold">Správně bylo: ${mistake.correctAns}</span>
            </div>
        `;
        refs.mistakesList.appendChild(item);
    });
}

function showResults() {
    const topic = getCurrentTopic();
    const result = state.quizEngine?.getResults();
    if (!result || !topic) {
        return;
    }

    router.goTo('results');
    refs.progressBar.style.width = '100%';
    refs.score.innerText = `Máš ${result.score} z ${result.total}!`;

    if (result.score === result.total) {
        refs.resultIcon.innerText = '🏆';
        refs.resultMessage.innerText = 'Bez chybičky! Jsi naprostý mistr.';
        refs.mistakesBox.classList.add('hidden');
    } else {
        if (result.score >= Math.ceil(result.total * 0.8)) {
            refs.resultIcon.innerText = '⭐';
            refs.resultMessage.innerText = 'Velmi dobrá práce! Skoro všechno správně.';
        } else if (result.score >= Math.ceil(result.total * 0.5)) {
            refs.resultIcon.innerText = '👍';
            refs.resultMessage.innerText = 'To není špatné, ale určitě to půjde ještě lépe.';
        } else {
            refs.resultIcon.innerText = '💪';
            refs.resultMessage.innerText = 'Nevadí! Chce to víc cvičit a příště to bude lepší.';
        }

        renderMistakes(result.mistakes);
        refs.mistakesBox.classList.remove('hidden');
    }

    addResultToHistory({
        topicId: topic.id,
        topicTitle: topic.title,
        score: result.score,
        total: result.total,
        finishedAt: new Date().toISOString()
    });

    clearQuizProgress();
    updateHistoryPreview();
}

function goHome() {
    router.home();
    clearQuizProgress();
    state.quizEngine = null;
    state.currentAnswer = null;
    updateHistoryPreview();
}

function bindEvents() {
    refs.backButton.addEventListener('click', () => router.back());
    refs.homeButton.addEventListener('click', goHome);
    refs.homeButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            goHome();
        }
    });

    refs.wipBackButton.addEventListener('click', () => router.back());
    refs.resultsHomeButton.addEventListener('click', goHome);
    refs.checkButton.addEventListener('click', checkAnswer);
    refs.nextButton.addEventListener('click', nextQuestion);
}

function init() {
    bindEvents();
    renderGradeSelection();
    updateHistoryPreview();
}

init();
