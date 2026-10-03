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
                        }
                    ]
                },
                {
                    id: 'math',
                    label: 'Matematika',
                    icon: '🧮',
                    color: 'teal',
                    available: false,
                    topics: []
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
