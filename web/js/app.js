// Load and populate events from JSON
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/events.json');
    const data = await response.json();
    populateEvents(data.events);
  } catch (error) {
    console.error('Error loading events:', error);
  }
});

function populateEvents(events) {
  const eventList = document.getElementById('event-list');
  if (!eventList) return;

  eventList.innerHTML = events.map(event => {
    const status = getEventStatus(event.dateFrom, event.dateTo);
    const statusClass = `event-${status}`;
    const dateStr = formatEventDate(event.dateFrom, event.dateTo);
    // Use url property if provided, otherwise construct from subdomain
    const eventUrl = event.url ? event.url : `https://${event.subdomain}.matsudoroboevents.info/`;

    return `
      <article class="event-card ${statusClass}">
        <div class="event-status ${statusClass}">
          <span class="status-badge">${getStatusLabel(status)}</span>
        </div>
        <div class="event-content">
          <h3 class="event-title"><a href="${eventUrl}" target="_blank" rel="noopener">${event.titleJa}</a></h3>
          <p class="event-title-eng">${event.titleEng}</p>
          <p class="event-date">${dateStr}</p>
          <p class="event-organization">主催: ${event.organization}</p>
          <p class="event-description">${event.description}</p>
          <a href="${eventUrl}" class="event-link" target="_blank" rel="noopener">イベントページへ →</a>
        </div>
      </article>
    `;
  }).join('');
}

function formatEventDate(dateFrom, dateTo) {
  const from = new Date(dateFrom);
  const to = new Date(dateTo);
  
  const fromStr = from.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // If single-day event, just return the from date
  if (dateFrom === dateTo) {
    return fromStr;
  }

  const toStr = to.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `${fromStr} ～ ${toStr}`;
}

function getEventStatus(dateFrom, dateTo) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const from = new Date(dateFrom);
  from.setHours(0, 0, 0, 0);

  const to = new Date(dateTo);
  to.setHours(23, 59, 59, 999);

  if (today > to) {
    return 'past';
  } else if (today >= from && today <= to) {
    return 'ongoing';
  } else {
    return 'upcoming';
  }
}

function getStatusLabel(status) {
  const labels = {
    'past': '終了',
    'ongoing': '開催中',
    'upcoming': '予定'
  };
  return labels[status] || status;
}
