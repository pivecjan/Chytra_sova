export const curriculum = {
    grades: [
        {
            id: 'grade-1',
            label: 'První třída',
            color: 'green',
            available: false,
            subjects: []
        },
        {
            id: 'grade-2',
            label: 'Druhá třída',
            color: 'orange',
            available: false,
            subjects: []
        },
        {
            id: 'grade-3',
            label: 'Třetí třída',
            color: 'blue',
            available: true,
            subjects: [
                {
                    id: 'cz',
                    label: 'Český jazyk',
                    icon: '📖',
                    color: 'rose',
                    available: true,
                    topics: [
                        {
                            id: 'hard-soft-consonants',
                            title: 'Tvrdé a měkké souhlásky',
                            subtitle: 'Náhodný mix 20 otázek',
                            icon: 'fa-pencil-alt',
                            questionSetId: 'cs-3-hard-soft'
                        },
                        {
                            id: 'paired-consonants',
                            title: 'Párové souhlásky',
                            subtitle: 'Doplňování a výběr správných slov',
                            icon: 'fa-spell-check',
                            questionSetId: 'cs-3-paired-consonants'
                        }
                    ]
                },
                {
                    id: 'en',
                    label: 'Angličtina',
                    icon: '🇬🇧',
                    color: 'indigo',
                    available: true,
                    topics: [
                        {
                            id: 'numbers-1-20',
                            title: 'Čísla 1 až 20',
                            subtitle: 'Procvič si psaní čísel anglicky',
                            icon: 'fa-language',
                            questionSetId: 'en-3-numbers-1-20'
                        },
                        {
                            id: 'school-supplies',
                            title: 'Školní potřeby',
                            subtitle: 'Přelož česká slovíčka do angličtiny',
                            icon: 'fa-school',
                            questionSetId: 'en-3-school-supplies'
                        }
                    ]
                },
                {
                    id: 'math',
                    label: 'Matematika',
                    icon: '🧮',
                    color: 'teal',
                    available: true,
                    topics: [
                        {
                            id: 'multiplication-0-10-by-0-10',
                            title: 'Násobení 0–10 × 0–10',
                            subtitle: 'Procvič si násobení v malé násobilce',
                            icon: 'fa-times',
                            questionSetId: 'math-3-multiplication-0-10-by-0-10'
                        },
                        {
                            id: 'multiplication-0-10-by-10-20',
                            title: 'Násobení 0–10 × 10–20',
                            subtitle: 'Násobení s druhým činitelem od 10 do 20',
                            icon: 'fa-calculator',
                            questionSetId: 'math-3-multiplication-0-10-by-10-20'
                        }
                    ]
                }
            ]
        }
    ]
};

export function getGrade(gradeId) {
    return curriculum.grades.find((grade) => grade.id === gradeId) || null;
}

export function getSubject(grade, subjectId) {
    return grade?.subjects?.find((subject) => subject.id === subjectId) || null;
}

export function getTopic(subject, topicId) {
    return subject?.topics?.find((topic) => topic.id === topicId) || null;
}
