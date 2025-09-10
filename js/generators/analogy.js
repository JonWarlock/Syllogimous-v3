function pickAnalogyStatementSameTwoOptions() {
    return pickNegatable([
        '<div class="analogy-statement">é igual a</div>',
        '<div class="analogy-statement" style="color: red;">é diferente de</div>'
    ]);
}

function pickAnalogyStatementDifferentTwoOptions() {
    return pickNegatable([
        '<div class="analogy-statement">é diferente de</div>',
        '<div class="analogy-statement" style="color: red;">é igual a</div>'
    ]);
}

function pickAnalogyStatementSame() {
    return pickNegatable([
        '<div class="analogy-statement">tem a mesma relação que</div>',
        '<div class="analogy-statement" style="color: red">tem uma relação diferente de</div>',
    ]);
}

function pickAnalogyStatementDifferent() {
    return pickNegatable([
        '<div class="analogy-statement">tem uma relação diferente de</div>',
        '<div class="analogy-statement" style="color: red">tem a mesma relação que</div>',
    ]);
}

function analogyTo(a, b) {
    return `<span class="subject">${a}</span> para <span class="subject">${b}</span>`;
}

class AnalogyQuestion {
     create(length) {
        const timeOffset = savedata.offsetAnalogyTime;
        const premiseOffset = getPremisesFor('offsetAnalogyPremises', 0);
        const choiceIndices = [];

        let generators = [];
        if (savedata.enableDistinction)
            generators.push(createDistinctionGenerator(length));
        if (savedata.enableLinear)
            generators.push(...createLinearGenerators(length));
        if (savedata.enableDirection)
            generators.push(createDirectionGenerator(length));
        if (savedata.enableDirection3D)
            generators.push(createDirection3DGenerator(length));
        if (savedata.enableDirection4D)
            generators.push(createDirection4DGenerator(length));
        if (savedata.enableAnchorSpace)
            generators.push(createAnchorSpaceGenerator(length));

        const totalWeight = generators.reduce((sum, item) => sum + item.weight, 0);
        const randomValue = Math.random() * totalWeight;
        let cumulativeWeight = 0;
        let g;
        for (let generator of generators) {
            cumulativeWeight += generator.weight;
            if (randomValue < cumulativeWeight) {
                g = generator;
                break;
            }
        }

        let question = g.question.createAnalogy(Math.max(g.premiseCount + premiseOffset, 3));
        question.plen = g.premiseCount;
        question.tlen = question.countdown || savedata.timer;
        question.tags = ['analogy'];
        if (question.countdown) {
            question.countdown += timeOffset;
        } else {
            question.timeOffset = timeOffset;
        }

        return question;
    }
}

function createAnalogyGenerator(length) {
    return {
        question: new AnalogyQuestion(),
        premiseCount: length,
        weight: 100,
    };
}
