# Train Ticket Rechecking

A simple interactive model of passengers repeatedly checking their carriage and seat information during a train journey.

## Demo

[Open the live simulation](https://jenniferyang111.github.io/Train-Ticket-Rechecking/)

You can also download the three files together and open `index.html` in a browser. No installation is required.

## Files

- `index.html`: page structure and ticket information.
- `style.css`: responsive layout and visual styling.
- `script.js`: journey stages, optional checks, history, summary, and restart.

The files are separate and stored directly at the repository root.

## How to use

Read the initial ticket, then select Continue. The ticket automatically hides. At subsequent stages, choose Check ticket or Continue. Close the ticket to check again within the same stage. At the seated stage, choose Finish journey to see the summary. Restart journey clears all records.

The ticket includes a fictional route, train number, departure time, boarding location, ticket gate, carriage, seat, refund terms, and rescheduling terms. Every restart selects a different sample ticket; its details remain unchanged throughout that journey. Refund and rescheduling information is illustrative, not real operator policy.

## Computational model

Receiving ticket information → Traveling to the station → Security → Ticket gate → Platform → Carriage entrance → Finding the seat → Seated.

Each stage permits a decision to check or continue. Initial viewing is not counted as a recheck; only reopening the ticket adds to the count. The journey ends when the user chooses Finish journey after sitting down.

This prototype represents optional repeated checking, rather than investigating psychological causes. It does not simulate elapsed travel time, actual navigation, or memory correction. Carriage and seat labels are described in the stage text; the user mentally compares them with the ticket.

## Validation

Checked zero-check completion, repeated checks within one stage, closing without increasing the count, automatic hiding on Continue, checking after sitting down, summary totals, and resetting all state.
