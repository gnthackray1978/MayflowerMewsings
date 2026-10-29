const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {join} = require('node:path');

const source = readFileSync(join(__dirname,
    '../src/pages/diagrams/fddescendants/libs/SimulationTimeline.js'), 'utf8');
const load = () => import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

test('calendar respects pause, speed, completion and restart', async () => {
    const {SimulationTimeline} = await load();
    const root = {PersonId: 1, GenerationIdx: 0, RecordLink: {DOB: 1700}};
    const child = {PersonId: 2, GenerationIdx: 1, RecordLink: {DOB: 1710}, Father: root};
    const undated = {PersonId: 3, GenerationIdx: 2, RecordLink: {DOB: 0}, Father: child};
    const timeline = new SimulationTimeline([[root], [child], [undated]], 1,
        {speed: 1000, increment: 5});
    assert.equal(timeline.root, root);
    assert.equal(undated.simulationYear, 1728);
    const years = [];
    let now = 0;
    const advance = frames => {
        for (let i = 0; i < frames; i++) timeline.tick(now += 250, year => years.push(year));
    };
    timeline.tick(0, () => {});
    advance(4);
    assert.deepEqual(years, [1705]);
    timeline.togglePause();
    advance(20);
    assert.equal(timeline.year, 1705);
    timeline.togglePause();
    advance(5);
    assert.equal(timeline.year, 1710);
    timeline.setSpeed(2);
    advance(2);
    assert.equal(timeline.year, 1715);
    advance(10);
    assert.equal(timeline.year, 1728);
    assert.equal(timeline.finished, true);
    timeline.restart();
    assert.equal(timeline.year, 1700);
    assert.equal(timeline.finished, false);
    assert.equal(timeline.speed, 2);
});

test('unknown dates have a fallback and background time cannot flood the graph', async () => {
    const {SimulationTimeline} = await load();
    const timeline = new SimulationTimeline([
        [{PersonId: 1, GenerationIdx: 0, RecordLink: {DOB: null}}],
        [{PersonId: 2, GenerationIdx: 1, RecordLink: {DOB: null}}]
    ], 1, {speed: 3000, increment: 5});
    assert.equal(timeline.startYear, 1695);
    assert.equal(timeline.endYear, 1713);
    timeline.tick(0, () => {});
    timeline.tick(100000, () => assert.fail('must not advance after a background gap'));
    assert.equal(timeline.year, 1695);
});


test('seeded diagram can position its viewport before the first timeline tick and after restart', async () => {
    // Load these browser ES modules in Node; omit unused UI-only imports.
    const cache = new Map();
    async function moduleUrl(file) {
        if (cache.has(file)) return cache.get(file);
        let code = readFileSync(file, 'utf8').replace(/^import .*?(?:@mui\/material|graphDataFuncs).*?;?\r?$/gm, '');
        const matches = [...code.matchAll(/from ["']([^"']+)["']/g)];
        for (const match of matches) {
            if (!match[1].startsWith('.')) continue;
            const dependency = require('node:path').resolve(require('node:path').dirname(file), match[1]);
            code = code.replace(match[0], 'from "' + await moduleUrl(dependency) + '"');
        }
        const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
        cache.set(file, url);
        return url;
    }
    const loadModule = async name => import(await moduleUrl(join(__dirname,
        '../src/pages/diagrams/fddescendants/libs/', name + '.js')));
    const {Drawing} = await loadModule('Drawing');
    const {Graph} = await loadModule('Graph');
    const {DataSource} = await loadModule('DataSource');
    const {LayoutSettings} = await loadModule('LayoutSettings');
    global.window = {innerWidth: 1000, innerHeight: 800};
    global.screen = {width: 1000, height: 800};
    try {
        const channel = {on() {}, emit() {}};
        const root = {PersonId: 1, GenerationIdx: 0, RecordLink: {DOB: 1700, Name: 'Root'}};
        const drawing = new Drawing(channel, new Graph(channel), {}, new LayoutSettings(), new DataSource([[root]]));
        drawing.selectedPersonId = 1;
        drawing.Init();
        drawing.adjustPosition(drawing.TopLayout());
        assert.equal(drawing.graph.nodeCount(), 1);
        assert.ok(Number.isFinite(drawing.dims.currentBB.bottomleft.x));
        drawing.RestartSimulation();
        drawing.adjustPosition(drawing.TopLayout());
        assert.equal(drawing.graph.nodeCount(), 1);
        assert.ok(Number.isFinite(drawing.dims.currentBB.topright.y));
    } finally {
        delete global.window;
        delete global.screen;
    }
});
