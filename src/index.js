import {el, element, formatDate} from './lib/utils';
// importa öðru sem þarf...
import fetchEarthquakes from './lib/earthquakes';
import {init, createPopup} from './lib/map';

function createMarkerItem(earthquake) {
    const {properties, id} = earthquake;
    const {time, title} = properties;
    const url = `https://earthquake.usgs.gov/earthquakes/eventpage/${id}`;

    const div = el('div',
        el('h2', title),
        el('p', formatDate(time)),
        element('a', {href: url, target: '_blank'}, null, 'Skoða nánar'));
    return div;
}

function createListItem(earthquake) {
    const {properties, id} = earthquake;
    const {mag, time, title} = properties;
    const url = `https://earthquake.usgs.gov/earthquakes/eventpage/${id}`;

    const li = el('li',
        el('div',
            el('h2', title),
            el('dl',
                el('dt', 'Tími'),
                el('dd', formatDate(time)),
                el('dt', 'Styrkur'),
                el('dd', `${mag} á richter`),
                el('dt', 'Nánar'),
                el('dd', url)),
            element('div', {class: 'buttons'}, null,
                element('button', null, {
                    click: () => {
                        createPopup(earthquake, createMarkerItem).openPopup();
                    },
                }, 'Sjá á korti'),
                element('a', {href: url, target: '_blank'}, null, 'Skoða nánar'))));
    return li;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Hér er allt „vírað“ saman
    const earthquakes = document.querySelector('.earthquakes');
    const loading = document.querySelector('.loading');
    const map = document.querySelector('.map');

    fetchEarthquakes().then((res) => {
        loading.style.display = 'none';
        earthquakes.append(...res.features.map(createListItem));
        init(map);
        createPopup(res, createMarkerItem);
    }).catch(() => {
        earthquakes.remove();
        loading.style.display = 'block';
    });
});
