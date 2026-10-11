// Stages describe the journey; checking remains the passenger's choice.
const stages = [
  ['Receiving ticket information', 'You have bought your ticket. Read your carriage and seat information, then continue.'],
  ['Traveling to the station', 'You are on your way to the station. Continue, or check your ticket if you choose.'],
  ['Security', 'You have passed security. Decide whether to check before moving on.'],
  ['Ticket gate', 'You are queuing and passing through the ticket gate.'],
  ['Platform', 'You have reached the platform and are waiting for the train.'],
  ['Carriage entrance', 'Locate the carriage. You can check the ticket to compare its number with the carriage sign.'],
  ['Finding the seat', 'You have boarded. Use the seat labels to locate your assigned seat; check the ticket if needed.'],
  ['Seated', 'You are seated in your assigned seat. Check again if you wish, or finish the journey.']
];
let currentStage = 0;
let ticketVisible = true;
let checkHistory = [];
let finished = false;
const element = id => document.getElementById(id);

function render() {
  element('journey').replaceChildren(...stages.map(([name], index) => {
    const item = document.createElement('li');
    item.textContent = name;
    if (index === currentStage) item.setAttribute('aria-current', 'step');
    if (index < currentStage || finished) item.classList.add('completed');
    return item;
  }));
  element('stage-number').textContent = `STAGE ${currentStage + 1} OF ${stages.length}`;
  element('stage-title').textContent = stages[currentStage][0];
  element('stage-description').textContent = stages[currentStage][1];
  element('ticket').hidden = !ticketVisible;
  element('check').hidden = currentStage === 0;
  element('check').textContent = ticketVisible ? 'Close ticket' : 'Check ticket';
  element('check').disabled = finished;
  element('continue').disabled = finished;
  element('continue').textContent = currentStage === stages.length - 1 ? 'Finish journey' : 'Continue';
  element('status').textContent = finished ? 'Journey complete.' : `Rechecks so far: ${checkHistory.length}`;
  element('history').replaceChildren();
  const entries = checkHistory.length ? checkHistory.map((stage, index) => `${index + 1}. ${stages[stage][0]}`) : ['No rechecks yet.'];
  entries.forEach(text => { const item = document.createElement('li'); item.textContent = text; element('history').append(item); });
  element('summary').hidden = !finished;
  if (finished) {
    element('total').textContent = `You rechecked your ticket ${checkHistory.length} time${checkHistory.length === 1 ? '' : 's'}.`;
    element('breakdown').replaceChildren();
    stages.slice(1).forEach(([name], index) => {
      const item = document.createElement('li');
      const count = checkHistory.filter(stage => stage === index + 1).length;
      item.textContent = `${name}: ${count}`;
      element('breakdown').append(item);
    });
  }
}

element('check').addEventListener('click', () => {
  // Only opening the ticket counts as a recheck. Closing never adds a check.
  if (!ticketVisible) checkHistory.push(currentStage);
  ticketVisible = !ticketVisible;
  render();
});
element('continue').addEventListener('click', () => {
  ticketVisible = false;
  if (currentStage < stages.length - 1) currentStage++;
  else finished = true;
  render();
  if (finished) element('summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
element('restart').addEventListener('click', () => {
  currentStage = 0;
  ticketVisible = true;
  checkHistory = [];
  finished = false;
  render();
  element('continue').focus();
});
render();
