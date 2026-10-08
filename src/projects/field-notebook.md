---
title: Field notebook
summary: An offline-first notebook for researchers who collect data where there is no signal.
year: 2026
role: Product design, front-end
tags: [Product design, Offline-first, PWA]
cover: /img/field-notebook.svg
coverAlt: Abstract cover — stacked notebook pages in green and sand.
featured: true
---

## The problem

A team of ecologists was recording observations on paper, photographing the
pages at the end of each day and typing them up at night. Every trip lost a few
hours to transcription and a few records to bad handwriting.

They had tried two note-taking apps. Both assumed a connection, and both lost
work when the phone went offline halfway through an entry.

## What I did

- Ran a week of field visits to watch how notes were actually taken — mostly
  one-handed, often in gloves, rarely with more than a minute to spare.
- Designed a single-screen capture flow: a large tap target per observation
  type, location filled in automatically, and free text only when it is needed.
- Built it as a progressive web app that saves every keystroke locally and
  syncs when a connection comes back, with a visible "saved on this phone"
  state so nobody has to wonder.

## Outcome

Transcription went away entirely. The team now spends the evening reviewing a
day's records instead of typing them, and the error rate on species codes fell
because codes are picked from a list rather than written by hand.

> "It's the first app we haven't had to work around." — the field team lead
