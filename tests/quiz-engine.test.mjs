import test from 'node:test';
import assert from 'node:assert/strict';

import { QuizEngine } from '../src/core/quiz-engine.js';

test('evaluates single answers', () => {
    const engine = new QuizEngine([
        { id: 'q1', type: 'single', prompt: 'A', options: ['a', 'b'], correct: 'a' }
    ], 1);

    const result = engine.evaluate('a');
    assert.equal(result.isCorrect, true);
    assert.equal(engine.getResults().score, 1);
});

test('normalizes text answers', () => {
    const engine = new QuizEngine([
        { id: 'q2', type: 'text', prompt: 'B', options: [], correct: 'í' }
    ], 1);

    const result = engine.evaluate(' Í ');
    assert.equal(result.isCorrect, true);
    assert.equal(engine.getResults().score, 1);
});

test('normalizes extra spaces in text answers', () => {
    const engine = new QuizEngine([
        { id: 'q4', type: 'text', prompt: 'B', options: [], correct: 'pencil case' }
    ], 1);

    const result = engine.evaluate('  Pencil   Case  ');
    assert.equal(result.isCorrect, true);
});

test('accepts only numeric answers for number questions', () => {
    const engine = new QuizEngine([
        { id: 'q5', type: 'number', prompt: 'B', options: [], correct: 48 }
    ], 1);

    const right = engine.evaluate(' 48 ');
    assert.equal(right.isCorrect, true);

    engine.currentIndex = 0;
    engine.score = 0;
    engine.mistakes = [];

    const wrong = engine.evaluate('48a');
    assert.equal(wrong.isCorrect, false);
});

test('tracks mistakes for wrong multiple answers', () => {
    const engine = new QuizEngine([
        { id: 'q3', type: 'multiple', prompt: 'C', options: ['x', 'y', 'z'], correct: [0, 2] }
    ], 1);

    const result = engine.evaluate([1]);
    assert.equal(result.isCorrect, false);

    const final = engine.getResults();
    assert.equal(final.mistakes.length, 1);
    assert.match(final.mistakes[0].correctAns, /x/);
});
