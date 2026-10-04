import test from 'node:test';
import assert from 'node:assert/strict';

import { getQuestionSet, validateQuestionSet } from '../src/data/question-banks.js';

test('english numbers question set has exactly 20 mapped text questions', () => {
    const questionSet = getQuestionSet('en-3-numbers-1-20');
    const expected = [
        'one', 'two', 'three', 'four', 'five',
        'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
    ];

    assert.equal(questionSet.length, 20);
    assert.ok(questionSet.every((question) => question.type === 'text'));
    assert.deepEqual(questionSet.map((question) => question.correct), expected);
    assert.equal(validateQuestionSet(questionSet, 'en-3-numbers-1-20'), true);
});

test('english school supplies set has expanded quality vocabulary', () => {
    const questionSet = getQuestionSet('en-3-school-supplies');
    const answers = new Set(questionSet.map((question) => question.correct));

    assert.equal(questionSet.length, 18);
    assert.ok(answers.has('pencil case'));
    assert.ok(answers.has('schoolbag'));
    assert.ok(answers.has('coloured pencil'));
    assert.ok(answers.has('calculator'));
    assert.equal(validateQuestionSet(questionSet, 'en-3-school-supplies'), true);
});

test('paired consonants set has expanded pool and covers all required pairs', () => {
    const questionSet = getQuestionSet('cs-3-paired-consonants');

    assert.equal(questionSet.length, 42);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(b/p)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(d/t)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(ď/ť)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(z/s)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(ž/š)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(v/f)')).length, 6);
    assert.equal(questionSet.filter((question) => question.prompt.includes('(h/ch)')).length, 6);
    assert.equal(validateQuestionSet(questionSet, 'cs-3-paired-consonants'), true);
});

test('math multiplication 0-10 x 0-10 set has ~50 unique examples in valid range', () => {
    const questionSet = getQuestionSet('math-3-multiplication-0-10-by-0-10');

    assert.equal(questionSet.length, 50);
    assert.equal(new Set(questionSet.map((question) => question.prompt)).size, questionSet.length);
    assert.ok(questionSet.every((question) => question.type === 'number'));

    questionSet.forEach((question) => {
        const [, first, second] = question.prompt.match(/Vypočítej: (\d+) × (\d+)/) ?? [];
        assert.ok(first !== undefined && second !== undefined);
        assert.ok(Number(first) >= 0 && Number(first) <= 10);
        assert.ok(Number(second) >= 0 && Number(second) <= 10);
        assert.equal(question.correct, Number(first) * Number(second));
    });

    assert.ok(questionSet.some((question) => question.prompt === 'Vypočítej: 0 × 9'));
    assert.ok(questionSet.some((question) => question.prompt === 'Vypočítej: 10 × 10'));
    assert.equal(validateQuestionSet(questionSet, 'math-3-multiplication-0-10-by-0-10'), true);
});

test('math multiplication 0-10 x 10-20 set has ~50 unique examples in valid range', () => {
    const questionSet = getQuestionSet('math-3-multiplication-0-10-by-10-20');

    assert.equal(questionSet.length, 50);
    assert.equal(new Set(questionSet.map((question) => question.prompt)).size, questionSet.length);
    assert.ok(questionSet.every((question) => question.type === 'number'));

    questionSet.forEach((question) => {
        const [, first, second] = question.prompt.match(/Vypočítej: (\d+) × (\d+)/) ?? [];
        assert.ok(first !== undefined && second !== undefined);
        assert.ok(Number(first) >= 0 && Number(first) <= 10);
        assert.ok(Number(second) >= 10 && Number(second) <= 20);
        assert.equal(question.correct, Number(first) * Number(second));
    });

    assert.ok(questionSet.some((question) => question.prompt === 'Vypočítej: 0 × 10'));
    assert.ok(questionSet.some((question) => question.prompt === 'Vypočítej: 10 × 20'));
    assert.ok(!questionSet.some((question) => /× [0-9]$/.test(question.prompt)));
    assert.equal(validateQuestionSet(questionSet, 'math-3-multiplication-0-10-by-10-20'), true);
});
