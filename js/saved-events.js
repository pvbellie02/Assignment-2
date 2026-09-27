/*
  Name: [Pranav Bellie]
  Date: 10.02.2026
  CSC 372-01

  This file adds the Save Event / Remove Event feature to the upcoming
  events grid on index.html. On page load it builds a Save Event button
  for every event card, and it keeps a live "Saved Events" summary
  section at the bottom of the page in sync as cards are saved or
  removed.
*/

// Tracks saved events. Each key is a card's data-event-id, each value
// is that event's { name, dateTime, location } details.
let savedEvents = new Map();

/**
 * Reads the event name, date/time, and location out of one event
 * card's existing markup.
 * @param {HTMLElement} card - The .event-card element to read from.
 * @return {{name: string, dateTime: string, location: string}} The event's details.
 */
function readEventDetails(card) {
  let name = card.querySelector('h3').textContent.trim();
  let metaParagraph = card.querySelector('.event-meta');
  let dateTime = metaParagraph.querySelector('time').textContent.trim();
  let metaText = metaParagraph.textContent;
  let location = metaText.split('\u00B7')[1].trim();
  return { name: name, dateTime: dateTime, location: location };
}

/**
 * Builds a single list item describing one saved event.
 * @param {{name: string, dateTime: string, location: string}} details - The event's details.
 * @return {HTMLLIElement} A populated li element ready to append to the summary list.
 */
function buildSavedEventItem(details) {
  let item = document.createElement('li');
  item.className = 'saved-event-item';

  let nameEl = document.createElement('strong');
  nameEl.textContent = details.name;

  let metaEl = document.createElement('span');
  metaEl.className = 'saved-event-meta';
  metaEl.textContent = details.dateTime + ' \u00B7 ' + details.location;

  item.appendChild(nameEl);
  item.appendChild(metaEl);
  return item;
}

/**
 * Clears and rebuilds the saved events summary list from the current
 * contents of savedEvents. Shows a placeholder message when nothing
 * has been saved yet.
 */
function renderSavedEventsList() {
  let list = document.getElementById('saved-events-list');
  list.innerHTML = ''; // clearing the container, not adding elements this way

  if (savedEvents.size === 0) {
    let message = document.createElement('li');
    message.id = 'no-saved-events-message';
    message.textContent = 'No events saved yet.';
    list.appendChild(message);
    return;
  }

  savedEvents.forEach(function (details) {
    list.appendChild(buildSavedEventItem(details));
  });
}

/**
 * Handles a click on any Save Event / Remove Event button. Toggles
 * that card's saved state, updates its highlight and button text, and
 * re-renders the summary list.
 * @param {MouseEvent} event - The click event from the button.
 */
function handleSaveButtonClick(event) {
  let button = event.currentTarget;
  let card = button.closest('.event-card');
  let id = card.dataset.eventId;

  if (savedEvents.has(id)) {
    savedEvents.delete(id);
    card.classList.remove('event-saved');
    button.textContent = 'Save Event';
  } else {
    let details = readEventDetails(card);
    savedEvents.set(id, details);
    card.classList.add('event-saved');
    button.textContent = 'Remove Event';
  }

  renderSavedEventsList();
}

/**
 * Adds a Save Event button to one event card and wires up its click
 * listener.
 * @param {HTMLElement} card - The .event-card element to add a button to.
 * @param {number} index - The card's position in the grid, used to build a unique id.
 */
function addSaveButtonToCard(card, index) {
  card.dataset.eventId = 'event-' + index;

  let button = document.createElement('button');
  button.type = 'button';
  button.className = 'save-btn';
  button.textContent = 'Save Event';
  button.addEventListener('click', handleSaveButtonClick);

  let cardBody = card.querySelector('.event-card-body');
  cardBody.appendChild(button);
}

/**
 * Builds the "Saved Events" summary section and appends it to the end
 * of main, then renders its initial empty state.
 */
function buildSavedEventsSummary() {
  let section = document.createElement('section');
  section.id = 'saved-events';

  let heading = document.createElement('h2');
  heading.textContent = 'Saved Events';

  let list = document.createElement('ul');
  list.id = 'saved-events-list';

  section.appendChild(heading);
  section.appendChild(list);

  document.querySelector('main').appendChild(section);
  renderSavedEventsList();
}

/**
 * Sets up the Save Event feature once the page has finished loading:
 * adds a button to every event card and builds the saved events
 * summary section.
 */
function initSavedEvents() {
  let cards = document.querySelectorAll('#events-grid .event-card');
  cards.forEach(function (card, index) {
    addSaveButtonToCard(card, index);
  });
  buildSavedEventsSummary();
}

document.addEventListener('DOMContentLoaded', initSavedEvents);
