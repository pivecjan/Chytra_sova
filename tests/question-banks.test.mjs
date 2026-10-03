import test from 'node:test';
import assert from 'node:assert/strict';

import { getQuestionSet, validateQuestionSet } from '../src/data/question-banks.js';

test('english numbers question set has 20 text questions', () => {
    const questionSet = getQuestionSet('en-3-numbers-1-20');

    assert.equal(questionSet.length, 20);
    assert.ok(questionSet.every((question) => question.type === 'text'));
    assert.equal(questionSet[0].correct, 'one');
    assert.equal(questionSet[19].correct, 'twenty');
});

test('english numbers question set passes strict validation', () => {
    const questionSet = getQuestionSet('en-3-numbers-1-20');

    assert.equal(validateQuestionSet(questionSet, 'en-3-numbers-1-20'), true);
});

test('english numbers strict validation fails on wrong answer mapping', () => {
    const questionSet = getQuestionSet('en-3-numbers-1-20');
    questionSet[0].correct = 'two';

    assert.equal(validateQuestionSet(questionSet, 'en-3-numbers-1-20'), false);
});
