'use strict';

class Carousel {
    constructor(option) {
        this.container = option.container;
        this.title = option.title;
        this.subtitle = option.subtitle;
        this.fetchCards = option.fetchCards;
    }

    appendCarousel() {
        let parentContainer = document.getElementById(this.container); // used to append the carousel to
        let theHTML = `<div class="svg-title-subtitle">
            <img src="img/carousel.svg" class="carousel-svg" alt="carousel-svg" title="carousel-svg">
            <div class="text-next-to-svg">
                <h3>${this.title}</h3>
                <p>${this.subtitle}</p>
            </div>
        </div>
        <div class="carousel">`;

        for (let card in this.fetchCards) {
            let collectionCSSClass = '';
            if (this.fetchCards[card].cardinality === 'collection') collectionCSSClass = ' collection';
            let visibleClass = '';
            if (card < 5) visibleClass = ' visible';
            let currentCard = `<div class="card${collectionCSSClass + visibleClass}">
                    <div class="card-img">
                        <img src="${this.fetchCards[card].image}" alt="hero-pic" title="hero-pic">
                        <div class="type-of-card">${this.fetchCards[card].type}</div>
                        <div class="duration-of-card">${this.fetchCards[card].duration}</div>
                    </div>
                    <div class="card-text">
                        <p>${this.fetchCards[card].title}</p>
                    </div>
            </div>`;
            theHTML += currentCard;
        }

        theHTML += `<div class="carousel-buttons">
                        <button class="move-left" aria-label="move left" disabled onclick="moveToPreviousCard(this.parentNode.parentNode)">&lt;</button>
                        <button class="move-right" aria-label="move right" onclick="moveToNextCard(this.parentNode.parentNode)">&gt;</button>
        </div>`;

        theHTML += `</div>`;

        parentContainer.innerHTML = theHTML;
    }
}

let startDisplaying = 0; // start showing number
let endDisplaying = 4; // end showing number
const firstCard = 0; // card stack begins

function moveToNextCard(cardsDiv) {
    let cards = cardsDiv.getElementsByClassName('card');
    let moveRightButton = cardsDiv.getElementsByClassName('move-right')[0];
    let moveLeftButton = cardsDiv.getElementsByClassName('move-left')[0];

    if (endDisplaying + 1 < cards.length) {
        startDisplaying++;
        endDisplaying++;
        updateCardsVisibility(cards);

        if (startDisplaying > 0) {
            moveLeftButton.disabled = false;
        }

        if (endDisplaying + 1 === cards.length) {
            moveRightButton.setAttribute("disabled", "disabled");
        }
    }
}

function moveToPreviousCard(cardsDiv) {
    let cards = cardsDiv.getElementsByClassName('card');
    let moveRightButton = cardsDiv.getElementsByClassName('move-right')[0];
    let moveLeftButton = cardsDiv.getElementsByClassName('move-left')[0];
    if (startDisplaying - 1 >= firstCard) {
        startDisplaying--;
        endDisplaying--;

        updateCardsVisibility(cards);

        if (endDisplaying < cards.length) {
            moveRightButton.disabled = false;
        }

        if (startDisplaying === 0) {
            moveLeftButton.setAttribute("disabled", "disabled");
        }
    }
}

function updateCardsVisibility(cards) {
    for (let c = 0; c < cards.length; c++) {
        if (c >= startDisplaying && c <= endDisplaying) {
            cards[c].classList.remove('hidden');
            cards[c].classList.add('visible');
        } else {
            cards[c].classList.remove('visible');
            cards[c].classList.add('hidden');
        }
    }
}