// Calendar progression is independent of the force layout's animation frames.
export class SimulationTimeline {
    constructor(generations, selectedPersonId, settings) {
        this.people = generations.flat().filter(p => !p.IsHtmlLink);
        this.root = this.people.find(p => String(p.PersonId) === String(selectedPersonId)) || this.people[0];
        const birthYear = p => {
            const year = Number(p?.RecordLink.DOB);
            return Number.isFinite(year) && year > 0 ? year : null;
        };
        const dated = this.people.filter(p => birthYear(p));
        // Estimate an undated root from the earliest dated generation, or use 1695.
        this.startYear = birthYear(this.root) ?? (dated.length ? Math.min(...dated.map(p =>
            birthYear(p) - Math.max(0, p.GenerationIdx - this.root.GenerationIdx) * 18)) : 1695);
        this.people.forEach(p => {
            const parentYear = p.Father?.simulationYear ?? p.Mother?.simulationYear;
            p.simulationYear = Math.max(this.startYear, birthYear(p) ??
                (parentYear != null ? parentYear + 18 : this.startYear + Math.max(0, p.GenerationIdx - this.root.GenerationIdx) * 18));
        });
        this.endYear = Math.max(this.startYear, ...this.people.map(p => p.simulationYear));
        this.interval = settings.speed;
        this.increment = settings.increment;
        this.speed = 1;
        this.restart();
    }
    snapshot() {
        return {year: this.year, paused: this.paused, finished: this.finished, speed: this.speed};
    }
    notify() { this.onChange?.(); }
    restart() {
        this.year = this.startYear;
        this.elapsed = 0;
        this.lastTimestamp = null;
        this.paused = false;
        this.finished = false;
        this.notify();
    }
    togglePause() {
        this.paused = !this.paused;
        this.lastTimestamp = null;
        this.notify();
    }
    setSpeed(speed) {
        if ([0.5, 1, 2, 4].includes(Number(speed))) this.speed = Number(speed);
        this.notify();
    }
    tick(timestamp, populate) {
        if (!Number.isFinite(timestamp)) return;
        const delta = this.lastTimestamp == null ? 0 : Math.max(0, timestamp - this.lastTimestamp);
        this.lastTimestamp = timestamp;
        if (this.paused || this.finished) return;
        // Ignore time spent in a background tab so returning cannot flood the graph.
        this.elapsed += Math.min(delta, 250) * this.speed;
        while (this.elapsed >= this.interval && !this.finished) {
            this.elapsed -= this.interval;
            this.year = Math.min(this.endYear, this.year + this.increment);
            populate(this.year);
            this.finished = this.year >= this.endYear;
            this.notify();
        }
    }
}
