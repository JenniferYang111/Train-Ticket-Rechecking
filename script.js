const ticket = document.getElementById('ticket');
const check = document.getElementById('check');
const count = document.getElementById('count');
const position = document.getElementById('position');
const result = document.getElementById('result');
let views = 0;
const tickets = [
  { train: 'T406', platform: '7', carriage: '02', seat: '05D' },
  { train: 'T205', platform: '5', carriage: '03', seat: '08C' },
  { train: 'T318', platform: '2', carriage: '09', seat: '16F' }
];
let ticketIndex = 0;
const describe = t => 'Train ' + t.train + ' · Platform ' + t.platform + ' · Carriage ' + t.carriage + ' · Seat ' + t.seat;

function loadTicket() {
  const current = tickets[ticketIndex];
  const other = tickets[(ticketIndex + 1) % tickets.length];
  ticket.textContent = describe(current);
  position.replaceChildren(new Option('Select a position', ''));
  for (const field of ['train', 'platform', 'carriage', 'seat']) {
    position.add(new Option(describe({ ...current, [field]: other[field] }), 'wrong-' + field));
  }
  position.add(new Option(describe(current), 'correct'));
}
loadTicket();

// Viewing is independent of choosing or comparing a position.
check.onclick = () => {
  ticket.hidden = !ticket.hidden;
  if (!ticket.hidden) views++;
  check.textContent = ticket.hidden ? 'View ticket' : 'Hide ticket';
  check.setAttribute('aria-expanded', String(!ticket.hidden));
  count.textContent = 'Ticket views: ' + views;
};

// Changing the action clears the previous comparison.
position.onchange = () => {
  result.textContent = 'Position selected. Compare it when ready.';
  result.className = '';
};
document.getElementById('compare').onclick = () => {
  const messages = {
    '': 'Choose a position first.',
    'wrong-platform': 'The platform does not match. You can check the ticket and change your choice.',
    'wrong-train': 'The train does not match. You can check the ticket and change your choice.',
    'wrong-carriage': 'The carriage does not match. You can check the ticket and change your choice.',
    'wrong-seat': 'The seat does not match. You can check the ticket and change your choice.',
    'correct': 'The train, platform, carriage and seat match your ticket.'
  };
  result.textContent = messages[position.value];
  result.className = position.value === 'correct' ? 'correct' : position.value ? 'incorrect' : '';
};
document.getElementById('reset').onclick = () => {
  ticketIndex = (ticketIndex + 1 + Math.floor(Math.random() * (tickets.length - 1))) % tickets.length;
  loadTicket();
  result.className = '';
  views = 0;
  ticket.hidden = true;
  check.textContent = 'View ticket';
  check.setAttribute('aria-expanded', 'false');
  count.textContent = 'Ticket views: 0';
  position.value = '';
  result.textContent = 'No position compared yet.';
};
