import test from 'node:test';
import assert from 'node:assert/strict';

import { getGrade, getSubject } from '../src/data/curriculum.js';

test('grade 3 contains new english, czech and math topics in normal navigation', () => {
    const grade = getGrade('grade-3');
    assert.ok(grade);

    const czech = getSubject(grade, 'cz');
    const english = getSubject(grade, 'en');
    const math = getSubject(grade, 'math');

    assert.ok(czech?.topics.some((topic) => topic.questionSetId === 'cs-3-paired-consonants'));
    assert.ok(english?.topics.some((topic) => topic.questionSetId === 'en-3-school-supplies'));
    assert.equal(math?.available, true);
    assert.ok(math?.topics.some((topic) => topic.questionSetId === 'math-3-multiplication-0-10-by-0-10'));
    assert.ok(math?.topics.some((topic) => topic.questionSetId === 'math-3-multiplication-0-10-by-10-20'));
});
