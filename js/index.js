function renderConclusionAsQuestion(conclusionHtml, q) {
    // Parse the conclusion HTML and convert simple "SUBJECT relation SUBJECT" forms into a question.
    const tmp = document.createElement('div');
    tmp.innerHTML = conclusionHtml;

    const subjects = tmp.querySelectorAll('.subject');
    const relationEl = tmp.querySelector('.relation');

    // Only transform simple binary conclusions with exactly two subjects and one relation
    if (subjects.length === 2 && relationEl) {
        const a = subjects[0].textContent.trim();
        const b = subjects[1].textContent.trim();
        let relationText = relationEl.textContent.replace(/\s+/g, ' ').trim();

        // Construct question: "Is A RELATION B?"
        return `Is ${a} ${relationText} ${b}?`;
    }

    // Leave complex conclusions untouched
    return conclusionHtml;
}