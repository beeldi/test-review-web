const checkpoints = require('./data/checkpoints.json');

export function fetchCheckpoints() {
    return Promise.resolve(checkpoints);
}
