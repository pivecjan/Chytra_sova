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
