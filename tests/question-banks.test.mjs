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

test('english school supplies set includes expected words and strict validation', () => {
    const questionSet = getQuestionSet('en-3-school-supplies');

    assert.equal(questionSet.length, 12);
    assert.equal(questionSet[4].correct, 'pencil case');
    assert.equal(questionSet[5].correct, 'schoolbag');
    assert.equal(validateQuestionSet(questionSet, 'en-3-school-supplies'), true);
});

test('math multiplication 0-10 x 0-10 set has full range and correct boundaries', () => {
    const questionSet = getQuestionSet('math-3-multiplication-0-10-by-0-10');

    assert.equal(questionSet.length, 121);
    assert.ok(questionSet.every((question) => question.type === 'number'));
    assert.equal(questionSet[0].prompt, 'Vypočítej: 0 × 0');
    assert.equal(questionSet[0].correct, 0);
    assert.equal(questionSet.at(-1).prompt, 'Vypočítej: 10 × 10');
    assert.equal(questionSet.at(-1).correct, 100);
    assert.equal(validateQuestionSet(questionSet, 'math-3-multiplication-0-10-by-0-10'), true);
});

test('math multiplication 0-10 x 10-20 set enforces second factor range', () => {
    const questionSet = getQuestionSet('math-3-multiplication-0-10-by-10-20');

    assert.equal(questionSet.length, 121);
    assert.equal(questionSet[0].prompt, 'Vypočítej: 0 × 10');
    assert.equal(questionSet[0].correct, 0);
    assert.equal(questionSet.at(-1).prompt, 'Vypočítej: 10 × 20');
    assert.equal(questionSet.at(-1).correct, 200);
    assert.equal(validateQuestionSet(questionSet, 'math-3-multiplication-0-10-by-10-20'), true);
});
