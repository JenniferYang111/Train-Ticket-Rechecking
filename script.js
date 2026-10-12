// Keep the same ticket throughout a session; change it on Restart.
const tickets = [
  { route: 'River City → Lake Town', carriage: '06', seat: '12A', train: 'T102', time: '09:30', location: 'River City Central · Platform 3', gate: 'A2', refund: 'Full refund before departure.', rescheduling: 'One free change before departure.' },
  { route: 'Hill Town → Coast City', carriage: '03', seat: '08C', train: 'T205', time: '13:45', location: 'Hill Town Station · Platform 5', gate: 'B4', refund: '80% refund before departure.', rescheduling: 'Changes before departure with a sample $5 fee.' },
  { route: 'Forest City → Valley Town', carriage: '09', seat: '16F', train: 'T318', time: '17:20', location: 'Forest City North · Platform 2', gate: 'C1', refund: 'Non-refundable sample fare.', rescheduling: 'Two free changes before departure.' },
  { route: 'Harbor Town → Meadow City', carriage: '02', seat: '05D', train: 'T406', time: '20:10', location: 'Harbor Town Station · Platform 7', gate: 'D3', refund: '50% refund before departure.', rescheduling: 'Changes before departure with a sample $10 fee.' }
];

let ticketIndex = 3;
let ticketVisible = true;
let rechecks = 0;
const element = id => document.getElementById(id);

function render() {
  const ticket = tickets[ticketIndex];
  Object.entries(ticket).forEach(([field, value]) => {
    element('ticket-' + field).textContent = value;
  });
  const [station, platform] = ticket.location.split(' · Platform ');
  element('ticket-location').textContent = station;
  element('ticket-platform').textContent = platform;
  element('ticket').hidden = !ticketVisible;
  element('check').textContent = ticketVisible ? 'Hide ticket' : 'Check ticket';
  element('check').setAttribute('aria-expanded', String(ticketVisible));
  element('status').textContent = 'Rechecks: ' + rechecks;
}

// Closing does not count. Only reopening adds a recheck.
element('check').addEventListener('click', () => {
  if (!ticketVisible) rechecks++;
  ticketVisible = !ticketVisible;
  render();
});

element('restart').addEventListener('click', () => {
  ticketIndex = (ticketIndex + 1 + Math.floor(Math.random() * (tickets.length - 1))) % tickets.length;
  ticketVisible = true;
  rechecks = 0;
  render();
});
render();
