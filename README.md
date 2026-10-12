# Train Ticket Rechecking

[Open the demo](https://jenniferyang111.github.io/Train-Ticket-Rechecking/?version=abstract-2)

## Core idea

Passengers can repeatedly consult ticket information before or after taking an action, then compare their chosen position with the ticket and adjust if needed.

This abstract model has three independent operations: view information, choose a position, and compare. There are no journey stages or required checking order. The position choice stands for an action; changing it stands for correcting that action. The counter counts every opening of the ticket, including the first.

## Use

View and hide the ticket as often as you wish. Choose a train/carriage/seat combination. Compare it with the ticket, then change your choice if needed. You can check the ticket at any point. Start again changes the ticket and corresponding choices, and clears the selection, comparison, and view count. Tickets include platform information. Mismatches appear in red; matches appear in green.

## Files

Separate root-level files: index.html (interface), style.css (styling), script.js (viewing and comparison). Download them together and open index.html in a browser. No dependencies or installation.

## Scope and validation

Three sample tickets and five choices per ticket keep the code simple. This version focuses on the essential checking-and-action relationship. It does not explain psychological causes or simulate actual travel.

Validated repeated viewing before action, action before viewing, each mismatch, a correct match, clearing stale comparisons after changing position, and resetting.
