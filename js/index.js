function conclusionToQuestion(conclusionHtml) {
    // Translation Map
    const translationMap = {
        'é igual a': 'is the same as',
        'é oposto de': 'is opposite of',
        'é diferente de': 'is different from',
        'tem a mesma relação que': 'has the same relation as',
        'tem uma relação diferente de': 'has a different relation than',
        'é menos que': 'is less than',
        'está antes de': 'is before',
        'contém': 'contains',
        'está a esquerda de': 'is left of',
        'está acima de': 'is above',
        'está em': 'is in'
    };
    
    // Format simple binary conclusions as questions
    const translatedHtml = conclusionHtml.replace(/(é igual a|é oposto de|é diferente de|tem a mesma relação que|tem uma relação diferente de|é menos que|está antes de|contém|está a esquerda de|está acima de|está em)/g, match => translationMap[match]);
    return translatedHtml + '?'; // Append a question mark
}

// Implementing the new helper into existing functionalities
function displayInit(formattedConclusion) {
    // Assume this function handles the display of conclusions
    const conclusion = conclusionToQuestion(formattedConclusion);
    // Logic to display the conclusion
}

function renderCarousel(carouselConclusion) {
    const conclusion = conclusionToQuestion(carouselConclusion);
    // Logic to render the carousel
}

function createHQLI(historyConclusion) {
    const conclusion = conclusionToQuestion(historyConclusion);
    // Logic to handle HQLI creation
}