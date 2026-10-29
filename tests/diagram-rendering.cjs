const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');

test('zoomed-out frames clear the full bitmap and preserve retina scaling', async () => {
    const source = readFileSync(join(__dirname,
        '../src/pages/diagrams/fddescendants/libs/RenderLib.js'), 'utf8')
        .replace(/^import .*;\r?$/gm, '');
    const {RenderLib} = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
    let transform = [2, 0, 0, 2, 0, 0];
    let saved;
    let cleared;
    const ctx = {
        canvas: {width: 2000, height: 1600},
        save() { saved = transform; },
        setTransform(...value) { transform = value; },
        clearRect(...rect) { cleared = {rect, transform}; },
        restore() { transform = saved; }
    };
    new RenderLib({}, {}).clear(ctx, {graph_width: 200, graph_height: 100});
    assert.deepEqual(cleared, {rect: [0, 0, 2000, 1600], transform: [1, 0, 0, 1, 0, 0]});
    assert.deepEqual(transform, [2, 0, 0, 2, 0, 0]);
});
