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
        let theHTML = `
            <div class="svg-title-subtitle">
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
            let currentCard = `<div class="card${collectionCSSClass + visibleClass}">` +
                cardImgAndText(this.fetchCards[card]) +
                `</div>`;
            theHTML += currentCard;
        }

        // adding a dark gray loading card as last
        theHTML += initialLoadingCard();

        theHTML += `<div class="carousel-buttons">
                        <button class="move-left" aria-label="move left" disabled onclick="moveToPreviousCard(this.parentNode.parentNode)">&lt;</button>
                        <button class="move-right" aria-label="move right" onclick="moveToNextCard(this.parentNode.parentNode)">&gt;</button>
                    </div>`;

        theHTML += `</div>`;

        parentContainer.innerHTML = theHTML;
    }
}

const firstCard = 0; // card stack begins
const loadingTime = 3000; // 3 seconds to render the newly fetched cards
const numberOfFetchedNewCards = 6;

function cardImgAndText(card) {
    let cardImgAndTextHTML = `
                    <div class="card-img">
                        <img src="${card.image}" alt="hero-pic" title="hero-pic">
                        <div class="type-of-card">${card.type}</div>
                        <div class="duration-of-card">${card.duration}</div>
                    </div>
                    <div class="card-text">
                        <p>${card.title}</p>
                    </div>
    `;
    return cardImgAndTextHTML;
}

function startingPosition(cards) {
    for (let card in cards) {
        if (cards[card].classList.contains('visible')) {
            return +card;
            break;
        }
    }
}

function initialLoadingCard() {
    return '<div class="card loading">' + loadingCardInnerHTML() + '</div>';
}

function nodeLoadingCard() {
    let loadingCard = document.createElement('div');
    loadingCard.className = 'card loading';
    loadingCard.innerHTML = loadingCardInnerHTML();
    return loadingCard;
}

function loadingCardInnerHTML() {
    return `<div class="card-img"></div>
            <div class="card-text">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve"><circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/><circle fill="#fff" stroke="#a9a9a9" stroke-width="3" cx="8" cy="54" r="6"><animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" /></circle></svg>
            </div>`;
}

function moveToNextCard(cardsDiv) {
    let cards = cardsDiv.getElementsByClassName('card');
    let startDisplaying = startingPosition(cards);
    let endDisplaying = +startDisplaying + 4;
    let moveRightButton = cardsDiv.getElementsByClassName('move-right')[0];
    let moveLeftButton = cardsDiv.getElementsByClassName('move-left')[0];

    if (endDisplaying + 1 < cards.length) {
        startDisplaying++;
        endDisplaying++;
        updateCardsVisibility(cards, startDisplaying, endDisplaying);

        if (startDisplaying > 0) {
            moveLeftButton.disabled = false;
        }

        if (endDisplaying + 1 === cards.length) {
            moveRightButton.setAttribute("disabled", "disabled");
            emulateLoading(moveRightButton, cards, cardsDiv);
        }
    }
}

function moveToPreviousCard(cardsDiv) {
    let cards = cardsDiv.getElementsByClassName('card');
    let startDisplaying = startingPosition(cards);
    let endDisplaying = +startDisplaying + 4;
    let moveRightButton = cardsDiv.getElementsByClassName('move-right')[0];
    let moveLeftButton = cardsDiv.getElementsByClassName('move-left')[0];

    if (startDisplaying - 1 >= firstCard) {
        startDisplaying--;
        endDisplaying--;

        updateCardsVisibility(cards, startDisplaying, endDisplaying);

        if (endDisplaying < cards.length) {
            moveRightButton.disabled = false;
        }

        if (startDisplaying === 0) {
            moveLeftButton.setAttribute("disabled", "disabled");
        }
    }
}

function updateCardsVisibility(cards, startDisplaying, endDisplaying) {
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

function emulateLoading(moveRightButton, cards, cardsDiv) {
    // This function emulates the usage of a real REST API returning JSON data
    // from a backend and should therefore introduce fake delays (in this case,
    // the variable loadingTime, or 3 seconds), before returning the next chunk
    // of cards (in this case, newBatchOfCards, or 6 new cards).
    setTimeout(function () {
        let buttonsStart = cardsDiv.getElementsByClassName('carousel-buttons');
        let newBatchOfCards = getRandomCards(numberOfFetchedNewCards);
        moveRightButton.disabled = false;

        for (let card in cards) {
            if (cards[card].classList.contains('loading')) {
                cards[card].remove();
                break;
            }
        }

        for (let card in newBatchOfCards) {
            let collectionCSSClass = '';
            if (newBatchOfCards[card].cardinality === 'collection') collectionCSSClass = ' collection';
            let visibleClass = '';
            if (card < 5) visibleClass = ' visible';
            let currentCard = document.createElement('div');
            currentCard.className = "card" + visibleClass;
            currentCard.innerHTML = cardImgAndText(newBatchOfCards[card]);

            buttonsStart[0].parentNode.insertBefore(currentCard, buttonsStart[0]);
        }

        buttonsStart[0].parentNode.insertBefore(nodeLoadingCard(), buttonsStart[0]);

    }, loadingTime);
}