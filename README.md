# Train Ticket Rechecking

A simple abstract model of passengers repeatedly checking ticket information.

[Open the demo](https://jenniferyang111.github.io/Train-Ticket-Rechecking/)

## Interaction

Read the initially visible ticket. Select Hide ticket, then Check ticket whenever you choose. Only reopening increases the recheck counter. Restart resets the counter, shows the ticket, and selects a different fictional ticket.

## Abstraction

The model keeps ticket information, visible/hidden state, and a recheck count. It removes journey stages and location tracking to focus on the cycle: view → hide → check again. It represents behavior, not its psychological cause.

## Files

- index.html: ticket, button, counter, and restart.
- style.css: compact horizontal ticket layout and page styling.
- script.js: visibility toggle, counter, and new tickets on restart.

All three files are separate at the repository root. Download them together and open index.html locally; no installation is needed. Refund and rescheduling terms are fictional.

## Validation

Checked initial viewing, hiding without increasing the count, repeated reopening, stable ticket details during a session, and reset with a different ticket.
