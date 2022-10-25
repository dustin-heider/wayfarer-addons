// ==UserScript==
// @name         Wayfarer Nomination Types
// @version      0.2.0
// @description  Shows an indicator for which game the Wayspot was nominated
// @namespace    https://github.com/tehstone/wayfarer-addons/
// @downloadURL  https://github.com/tehstone/wayfarer-addons/raw/main/wayfarer-nomination-types.user.js
// @homepageURL  https://github.com/tehstone/wayfarer-addons/
// @match        https://wayfarer.nianticlabs.com/*
// ==/UserScript==

// Copyright 2022 tehstone, bilde
// This file is part of the Wayfarer Addons collection.

// This script is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This script is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You can find a copy of the GNU General Public License in the root
// directory of this script's GitHub repository:
// <https://github.com/tehstone/wayfarer-addons/blob/main/LICENSE>
// If not, see <https://www.gnu.org/licenses/>.

/* eslint-env es6 */
/* eslint no-var: "error" */

(() => {
    let urlMap;
    let counter = 0;

    const games = {
        ingress: {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAh1BMVEUAAAAAAABfAOVVAOJgAOBZAOlDALY2AIZSAM9XAORaAONbAOWkdO3////f0PKJROr09PTs5vTm3PTx7/TTvPJkD+fFp+9fBuXNsvKzi+7q4fSsge3Xw/KcYe13J+jh1/K+m++6ku+LTeqqe+1wIOijb+1oGeiCPOqfaO1+N+iPVup3MOjPuvJ4u1X3AAAAC3RSTlMACu65lHAqE0vY10mWW7gAAAYgSURBVHja3Ztpc5swGISTnmklc4RwmcM2YPCR///76kQ2CzoqGwkn7X5oO52JZ+N9YHkl8fCP68fXrz8ePk4/v5GTvv18+Bg9fv9C3vXl++PDB+jpF+n16+nhXkL4ZKS7oYDwmcKQMN0RBYRPQpdSNyb3RQHhx92WnrQ73hUFhH/c0bOK5m4oIPyyoANV90EB4TcHOtZ2Pz8KCD+sqKiinAkFhA/0e218f83lABTshw/0mVJncdIqpRe5MVCYKXygT+vcW7zLyzPKhEsSKFgKX0Q/CRa9ggQotEDBXvgi+mt/MdJMKCB8oI/wIaCASxIo2Agf6CN8SEChaIxRQPhAXwzf6/8ACsgBKBiED/TF8JebZ/bXUoZCFwMFs/DLQhp+EFHKDFAaBRIUdiUBCtPDbw/S8L2XmsIArV89CQqHdgIKCB/oi+E7GaUw8KbMkaHgTkAB4QN9IXxKhwaYpChsj7c/NuK2rw5fZmCEgpPikhRR0IfPFB7k4csNKFGoQg4FXfhQ7MrCVxhQo7DtYqCgC5/TUQxfbUCNQlFqUED4vFwufI0BJQqHVo0CwhcUpnz4agM6FNz47yggfCCwE8NXG9CisDtimBQdPCq+fYSvNaBHAZfkFQbKBJ+w3VG9gatQqEKtATH8LMQdQWNAgwKeVpQGxPCThuWhNXAtCq7CgDx8x+0j2WoM6FG41sAGP1MQqC3E3zA9CZeHDoX8SgMvg/CHiis6RfXLBYXn2wxEDeHV0UnKnAkGgo4MBRAmaRPcbMAhUoUFnSTf2ABA+CADUHdXA10kKndu0MbQQPy8MFJgHEFlZmBtzsDrwkArCxCW3mKyvNTGVZBON5BbuQxDfwG9ln+/I6SrIYG1nftAMfpWN2iovXDTHy9dRLZuRPn4ytr2j7dNXw0YYKAltWVgz7NdoRqE6RXamBqAogUEFAACwucItGWgDVimkQSFPR++45wfZ2yWEWWfWXa5iEKzG4a/3GTMS2K1DeMV+1BCiiV+1TMKB380PjooAVsGUAnVibts8MhejgYY77U+sYgSsPo8kDD+47fvfIhC6nHjo8/+Ta0aQCVQ9pQAFPjxMUEJWDSASgjYmA8UuLWDM4Ev1LIBVEJEmIDCSd66pkw5SsCuAVTCnpwFFKKmpUwblIBlA6iEHP/RBZcJIqRMS5TADAb2LN/BvMj2jN7uE+c5ECUwy2M5u8T9UDRA2BQYoATsG0AlpBIDO3rSC0pgFgOoBNFA8VaIKIFZDKASXkUDB3opAX/G0QyVIBioUALzGUAlPMe8ARclMKMBVELNG+hQArMYCNNWVgkwcORLYFPbNFD4i0hWCTBQciVQB0FizcD+/cO7cSV0HANcCeRYlzM10K49RlcsVgIM5IMSwC1hZT4bxtu+dalQCTBQcCXgYInWzEDnDJZs+UqAgdBHCcAAnhOnGmgjyZItKgEGUpSAuEQbRBMNxDTAQkssq4SLgRIlIF2iXa6nGHAxa0UtVwkOq4SLgQQlIKzWMznBzQYGP8ytmeKiq5iBCiWgntZvNAAFu1hdCWy5/lldAunKwABmUFUlQOoSWPsmBvIjUSgTBnbNhsEUA35BlAq5wcR3qVJ1DgNGGxbilAAVpemGhX7LRpwSoJw0Zls26k2rTmXg6A0I3JPW2qYVtu0UOzeohF7rExQm23b6jUuIq4T++ShWhs9asaZaA5zKRIcCHRX1VrN1i0MlWgPq/UuhErBsQgpN+Ewu9o55/SaQfAdXVQnMXKEJf3SK4fej5gCDHgVUQnKeWRThZ9ypUxxg0B7h0KPQeJgUK134+xhHODSHWK5HIcOs7OrCv+4805MUBV+FQrhcYsn2qvB1J7r0KKQjFA59LEeD8A1QgEqD8A1QgJoJ4ZujADWJQfjmKITZhPCNUYjxdLI0CN8chS6Xhl/pwzdHocSKrUH4RijIw98pw7eNApRQhN+pwp8BBewfVbrwzU94iyhgB61vo0IV/kwoYH7ba8KfDYWk7NtIHf58KDhVb0cd/pwoxIikUYQ/LwqQKvx5UYDU4c+MAqQOf14U7vjmJ1AwDd8chWnh/z8vvX6C134/wYvPH//q9yd4+d2G/gAkMiXZAYCffgAAAABJRU5ErkJggg==',
            label: 'Ingress'
        },
        pogo: {
            // https://logos.fandom.com/wiki/Pok%C3%A9mon_Go
            icon: 'data:image/png;base64,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',
            label: 'Pokémon GO'
        },
        lightship: {
            icon: 'data:image/webp;base64,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',
            label: 'Lightship'
        }
    };

    // ===== INJECTION AND REQUEST HANDLING =====

    (function (open) {
        XMLHttpRequest.prototype.open = function (method, url) {
            if (method == 'GET') {
                let callback = null;
                switch (url) {
                    case '/api/v1/vault/manage':
                        callback = injectNominations;
                        break;
                    case '/api/v1/vault/home':
                        callback = injectShowcase;
                        break;
                }
                if (callback) this.addEventListener('load', () => checkResponse(this.response, callback), false);
            }
            open.apply(this, arguments);
        };
    })(XMLHttpRequest.prototype.open);

    const checkResponse = (response, callback) => {
        try {
            const json = JSON.parse(response);
            if (!json) return;
            if (json.captcha || !json.result) return;
            callback(json.result);
        } catch (e) {
            console.error(e);
        }
    };

    const injectNominations = result => {
        urlMap = Object.assign({}, ...result.nominations.map(e => ({[e.id]: e.imageUrl})));
        // awaitElement(() => document.querySelector('input.w-full')).then(searchInput => {
        //     if (searchInput !== undefined) {

        //     }
        // });
        window.addEventListener("WFNM_MapFilterChange", renderNominationMapIntegration);
        addNominationListIcons();
        renderNominationMapIntegration();
        setupDetailsPaneInput(result.nominations);
    };

    const injectShowcase = result => awaitElement(() => document.querySelector('.showcase-item')).then(ref => {
        const showcase = result.showcase;
        const count = showcase.length;
        const labelMap = Object.assign({}, ...Object.keys(games).map(e => ({[games[e].label]: e})));
        let index = 0;
        let style = null;

        const render = () => {
            const discGame = showcase[index].discovererGame;
            const styleContent = labelMap.hasOwnProperty(discGame) ? `background-image: url(${games[labelMap[discGame]].icon});` : 'display: none;';
            if (style) style.parentElement.removeChild(style);
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = `app-showcase-item .showcase-item__image-caption::before { ${styleContent} }`;
            document.querySelector('head').appendChild(style);
        };

        render();
        const paginators = document.getElementsByClassName('showcase-gallery__button');
        if (paginators.length == 2) {
            paginators[0].addEventListener('click', () => { index = (index - 1 + count) % count; render(); });
            paginators[1].addEventListener('click', () => { index = (index + 1 + count) % count; render(); });
        }
    });

    // ===== RENDERING FUNCTIONS =====

    const addNominationListIcons = () => {
        if (localStorage.hasOwnProperty('wfpNominationTypes')) {
            const types = JSON.parse(localStorage.wfpNominationTypes);
            Object.keys(types).forEach(k => addIcon(k, types[k]));
        }
    }

    const renderNominationMapIntegration = () => awaitElement(() => document.querySelector('.wayfarernm_text')).then(ref => {
        if (localStorage.hasOwnProperty('wfpNominationTypes')) {
            const types = JSON.parse(localStorage.wfpNominationTypes);
            const counters = Object.assign({}, ...Object.keys(games).map(e => ({[e]: 0})));
            const existing = document.getElementsByClassName('wfpNT__nmIntegration');
            for (let i = existing.length - 1; i >= 0; i--) existing[i].parentNode.removeChild(existing[i]);
            const listEl = document.querySelector(".cdk-virtual-scroll-content-wrapper");
            nominations = listEl["__ngContext__"][3][26];
            let nominationIds = {};
            nominations.forEach(n => nominationIds[n.id] = 1);
            Object.keys(types).forEach(k => {
                if (nominationIds[k]) {
                    counters[types[k]]++
                }
            });
            Object.keys(games).forEach(game => {
                if (counters[game] > 0) {
                    const outer = document.createElement('span');
                    outer.classList.add('wfpNT__nmIntegration');
                    outer.classList.add('wfpNT__nmIntegration_' + game);
                    outer.textContent = counters[game];
                    ref.appendChild(outer);
                }
            });
        }
    }).catch(() => {});

    const setupDetailsPaneInput = nominations => {
        let box = null;
        const idMap = Object.assign({}, ...nominations.map(e => ({[e.imageUrl]: e.id})));
        awaitElement(() => document.querySelector('app-nominations-list')).then(ref => ref.addEventListener('click', e => {
            const item = e.target.closest('app-nominations-list-item');
            if (item) {
                const id = idMap[item.querySelector('img').src];
                awaitElement(() => document.querySelector('app-details-pane app-nomination-tag-set')).then(tags => {
                    const before = tags.parentElement;
                    if (box) box.parentElement.removeChild(box);
                    box = document.createElement('p');
                    box.classList.add('wfpNT__para');
                    const thisGame = getGameForId(id);

                    const first = document.createElement('span');
                    first.textContent = 'Nominated for:';
                    box.appendChild(first);
                    Object.keys(games).forEach(game => box.appendChild(createRadioForGame(game, counter, game == thisGame, () => setGameForId(id, game))));

                    counter++;
                    before.parentElement.insertBefore(box, before);
                });
            };
        }));
    };

    const createRadioForGame = (game, uid, checked, callback) => {
        const label = document.createElement('label');
        label.for = 'wfpNT__radio' + uid + game;
        const radio = document.createElement('input');
        radio.id = label.for;
        radio.type = 'radio';
        radio.name = 'wfpNT__radiogroup' + uid;
        radio.checked = checked;
        radio.addEventListener('change', callback);
        const span = document.createElement('span');
        span.textContent = games[game].label;
        label.appendChild(radio);
        label.appendChild(span);
        return label;
    };

    // ===== UTILITY FUNCTIONS =====

    const awaitElement = get => new Promise((resolve, reject) => {
        let triesLeft = 10;
        const queryLoop = () => {
            const ref = get();
            if (ref) resolve(ref);
            else if (!triesLeft) reject();
            else setTimeout(queryLoop, 100);
            triesLeft--;
        }
        queryLoop();
    });

    // ===== STORAGE HANDLING =====

    const getGameForId = id => {
        if (localStorage.hasOwnProperty('wfpNominationTypes')) {
            const types = JSON.parse(localStorage.wfpNominationTypes);
            if (types.hasOwnProperty(id)) return types[id];
        }
        return null;
    }

    const setGameForId = (id, game) => {
        const types = localStorage.hasOwnProperty('wfpNominationTypes') ? JSON.parse(localStorage.wfpNominationTypes) : {};
        types[id] = game;
        addIcon(id, game);
        localStorage.wfpNominationTypes = JSON.stringify(types);
        renderNominationMapIntegration();
    }

    // ===== STYLE INJECTION =====

    const addIcon = (id, game) => {
        if (!urlMap.hasOwnProperty(id) || !games.hasOwnProperty(game)) return;
        const css = `app-nominations-list-item img[src='${urlMap[id]}'] + div app-nomination-tag-set::before {
            content: ' ';
            background-image: url(${games[game].icon});
            background-repeat: no-repeat;
            background-size: contain;
            display: inline-block;
            width: 28px;
        }`;
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    };

    (() => {
        let css = `
            .wfpNT__para {
                margin-bottom: 16px;
            }
            .wfpNT__para input[type=radio] {
                margin: 0 3px 0 12px;
            }
            app-showcase-item .showcase-item__image-caption::before {
                content: '';
                position: absolute;
                left: -44px;
                width: 44px;
                top: 0;
                height: 100%;
                background-color: rgba(0,0,0,0.8);
                background-size: 40px;
                background-repeat: no-repeat;
                background-position: right;
            }
        `;
        Object.keys(games).forEach(game => {
            css += `.wfpNT__nmIntegration_${game}::before {
                content: ' ';
                background-image: url(${games[game].icon});
                background-repeat: no-repeat;
                background-size: contain;
                display: inline-block;
                width: 28px;
                height: 28px;
                margin: 0 3px -8px 10px;
            }`;
        });
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.querySelector('head').appendChild(style);
    })();
})();
