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
// Fictional examples, selected once per journey and kept stable during rechecks.
const tickets = [
  { route: 'River City → Lake Town', carriage: '06', seat: '12A', train: 'T102', time: '09:30', location: 'River City Central · Platform 3', gate: 'A2', refund: 'Full refund before departure.', rescheduling: 'One free change before departure.' },
  { route: 'Hill Town → Coast City', carriage: '03', seat: '08C', train: 'T205', time: '13:45', location: 'Hill Town Station · Platform 5', gate: 'B4', refund: '80% refund before departure.', rescheduling: 'Changes before departure with a sample $5 fee.' },
  { route: 'Forest City → Valley Town', carriage: '09', seat: '16F', train: 'T318', time: '17:20', location: 'Forest City North · Platform 2', gate: 'C1', refund: 'Non-refundable sample fare.', rescheduling: 'Two free changes before departure.' },
  { route: 'Harbor Town → Meadow City', carriage: '02', seat: '05D', train: 'T406', time: '20:10', location: 'Harbor Town Station · Platform 7', gate: 'D3', refund: '50% refund before departure.', rescheduling: 'Changes before departure with a sample $10 fee.' }
];
let ticketIndex = Math.floor(Math.random() * tickets.length);

function render() {
  const ticket = tickets[ticketIndex];
  Object.entries(ticket).forEach(([field, value]) => { element(`ticket-${field}`).textContent = value; });
  element('journey').replaceChildren(...stages.map(([name], index) => {
    const item = document.createElement('li');
    item.textContent = name;
    if (index === currentStage) item.setAttribute('aria-current', 'step');
    if (index < currentStage || finished) item.classList.add('completed');
    return item;
  }));
  element('stage-number').textContent = `STAGE ${currentStage + 1} OF ${stages.length}`;
  element('stage-title').textContent = stages[currentStage][0];
  element('stage-description').textContent = currentStage === 3
    ? `Find ticket gate ${ticket.gate} at the departure station. Queue and pass through the gate; check your ticket if you wish.`
    : stages[currentStage][1];
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
  // A nonzero offset guarantees a different ticket on every restart.
  ticketIndex = (ticketIndex + 1 + Math.floor(Math.random() * (tickets.length - 1))) % tickets.length;
  currentStage = 0;
  ticketVisible = true;
  checkHistory = [];
  finished = false;
  render();
  element('continue').focus();
});
render();
