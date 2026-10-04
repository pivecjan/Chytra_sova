export function renderGrades(container, grades, onSelect) {
    container.innerHTML = '';

    grades.forEach((grade, index) => {
        const button = document.createElement('button');
        button.className = `kid-btn bg-white border-b-8 border-${grade.color}-400 rounded-[2rem] p-6 flex flex-col items-center ${grade.available ? '' : ''}`;
        button.innerHTML = `
            <div class="bg-${grade.color}-100 text-${grade.color}-500 text-4xl font-black w-20 h-20 rounded-full flex items-center justify-center mb-3">${index + 1}.</div>
            <span class="text-xl font-bold">${grade.label}</span>
        `;
        button.addEventListener('click', () => onSelect(grade));
        container.appendChild(button);
    });
}

export function renderSubjects(container, subjects, onSelect) {
    container.innerHTML = '';

    subjects.forEach((subject) => {
        const button = document.createElement('button');
        button.className = `kid-btn bg-white border-b-8 border-${subject.color}-400 rounded-[2rem] p-6 flex flex-col items-center`;
        button.innerHTML = `
            <div class="text-6xl mb-3">${subject.icon}</div>
            <span class="text-xl font-bold text-center">${subject.label}</span>
        `;
        button.addEventListener('click', () => onSelect(subject));
        container.appendChild(button);
    });
}

export function renderTopics(container, topics, onSelect) {
    container.innerHTML = '';

    topics.forEach((topic) => {
        const button = document.createElement('button');
        button.className = 'kid-btn bg-white border-l-8 border-l-blue-500 rounded-2xl p-6 flex items-center justify-between group text-left shadow-md';
        button.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="bg-blue-100 text-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-2xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <i class="fas ${topic.icon}"></i>
                </div>
                <div>
                    <h3 class="text-xl font-black text-slate-800">${topic.title}</h3>
                    <p class="text-slate-500 font-bold mt-1 text-sm">${topic.subtitle}</p>
                </div>
            </div>
            <i class="fas fa-chevron-right text-slate-300 text-2xl group-hover:text-blue-500"></i>
        `;
        button.addEventListener('click', () => onSelect(topic));
        container.appendChild(button);
    });
}

export function renderQuestion(container, question, onSingle, onMultiple, onText) {
    container.innerHTML = '';

    if (question.type === 'single') {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2 gap-4 max-w-lg mx-auto';
        question.options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'opt-btn w-full text-center bg-slate-50 border-4 border-slate-200 py-4 px-2 rounded-2xl font-black text-2xl text-slate-700 hover:border-blue-400 transition-colors';
            button.innerText = option;
            button.addEventListener('click', () => onSingle(option, button));
            grid.appendChild(button);
        });
        container.appendChild(grid);
    } else if (question.type === 'text' || question.type === 'number') {
        const input = document.createElement('input');
        input.id = 'quiz-input';
        input.type = question.type === 'number' ? 'number' : 'text';
        input.className = 'w-full max-w-sm mx-auto block text-center text-3xl font-black text-slate-800 bg-white border-4 border-slate-200 p-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors';
        input.placeholder = question.type === 'number' ? 'Napiš výsledek...' : 'Napiš odpověď...';
        input.autocomplete = 'off';
        if (question.type === 'number') {
            input.inputMode = 'numeric';
        }
        input.addEventListener('input', (event) => onText(event.target.value));
        container.appendChild(input);
        setTimeout(() => input.focus(), 100);
    } else if (question.type === 'truefalse') {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2 gap-4 max-w-lg mx-auto';
        [
            { value: 'true', label: 'Pravda', icon: 'fa-check text-green-500' },
            { value: 'false', label: 'Nepravda', icon: 'fa-times text-red-500' }
        ].forEach((item) => {
            const button = document.createElement('button');
            button.className = 'opt-btn w-full flex flex-col items-center justify-center gap-2 bg-slate-50 border-4 border-slate-200 py-6 px-2 rounded-2xl font-black text-2xl text-slate-700 hover:border-blue-400 transition-colors';
            button.innerHTML = `<i class="fas ${item.icon} text-3xl mb-2"></i> ${item.label}`;
            button.addEventListener('click', () => onSingle(item.value, button));
            grid.appendChild(button);
        });
        container.appendChild(grid);
    } else if (question.type === 'multiple') {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'opt-btn flex items-center w-full bg-slate-50 border-4 border-slate-200 p-4 rounded-2xl font-bold text-xl text-slate-700 hover:border-purple-300 transition-colors text-left';
            button.innerHTML = `<div class="chk-box flex-shrink-0 w-8 h-8 rounded-lg border-2 border-slate-300 mr-4 flex items-center justify-center bg-white transition-colors"><i class="fas fa-check text-white opacity-0 transition-opacity chk-icon"></i></div><span class="flex-grow">${option}</span>`;
            button.addEventListener('click', () => onMultiple(index, button));
            grid.appendChild(button);
        });
        container.appendChild(grid);
    }
}

export function renderResultsHistory(container, emptyContainer, history) {
    container.innerHTML = '';

    if (!history.length) {
        emptyContainer.classList.remove('hidden');
        return;
    }

    emptyContainer.classList.add('hidden');
    history.forEach((entry) => {
        const item = document.createElement('li');
        item.className = 'bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3';
        item.innerHTML = `
            <div>
                <div class="font-black text-slate-700">${entry.topicTitle}</div>
                <div class="text-slate-500">${new Date(entry.finishedAt).toLocaleString('cs-CZ')}</div>
            </div>
            <div class="font-black text-blue-600">${entry.score}/${entry.total}</div>
        `;
        container.appendChild(item);
    });
}
