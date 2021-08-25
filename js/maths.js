export function approach(start, end, diff) {
    if (start < end) return Math.min(start + diff, end);
    else return Math.max(start - diff, end);
}

export function normalise(x, y) {
    length = Math.sqrt(x * x + y * y);
    return { x: x / length, y: y / length };
}
