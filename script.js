const ticket = document.getElementById('ticket');
const check = document.getElementById('check');
const count = document.getElementById('count');
const position = document.getElementById('position');
const result = document.getElementById('result');
let views = 0;

// Viewing is independent of choosing or comparing a position.
check.onclick = () => {
  ticket.hidden = !ticket.hidden;
  if (!ticket.hidden) views++;
  check.textContent = ticket.hidden ? 'View ticket' : 'Hide ticket';
  check.setAttribute('aria-expanded', String(!ticket.hidden));
  count.textContent = 'Ticket views: ' + views;
};

// Changing the action clears the previous comparison.
position.onchange = () => { result.textContent = 'Position selected. Compare it when ready.'; };
document.getElementById('compare').onclick = () => {
  const messages = {
    '': 'Choose a position first.',
    'wrong-train': 'The train does not match. You can check the ticket and change your choice.',
    'wrong-carriage': 'The carriage does not match. You can check the ticket and change your choice.',
    'wrong-seat': 'The seat does not match. You can check the ticket and change your choice.',
    'correct': 'The train, carriage and seat match your ticket.'
  };
  result.textContent = messages[position.value];
};
document.getElementById('reset').onclick = () => {
  views = 0;
  ticket.hidden = true;
  check.textContent = 'View ticket';
  check.setAttribute('aria-expanded', 'false');
  count.textContent = 'Ticket views: 0';
  position.value = '';
  result.textContent = 'No position compared yet.';
};
