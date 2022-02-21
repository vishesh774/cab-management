function getMostIdleCab(cabs = []) {
    let mostIdleCab = {};
    let mostDiff = 0;
    const cabsMap = {};
    const now = new Date().getTime()
    cabs.forEach((cab) => {
        if (!cabsMap[cab.Cab_Id]) {
            const diff = now - new Date(cab.createdAt).getTime();
            if (diff >= mostDiff) {
                mostIdleCab = cab;
                cabsMap[cab.Cab_Id] = 1;
            }
        }
    });
    return mostIdleCab;
}
module.exports = {
    getMostIdleCab
}