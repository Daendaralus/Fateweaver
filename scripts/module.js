Hooks.once('init', async function() {
    game.socket.on('module.fateweaver-module', data => {
        if (game.user.isGM) {
            changeFate(data.handId, data.stackId);
        }
    });
});

Hooks.once('ready', async function() {
});


function changeFate(handId, stackId) {
    // Grab the first card in the hand
    let hand = game.cards.get(handId);
    let stack = game.cards.get(stackId);
    let card = hand.cards.contents[0];
    if (!card) {
    ui.notifications.warn("No card found with the provided ID.");
    return;
    }

    // Flip the card
    card.update({ "face": 0 });


    // Use OrcnogFancyCardDealer to view the card
    let deckName = stack.name; // Assuming the card's data has a 'deck' property with the deck's name
    OrcnogFancyCardDealer({
    deckName: deckName,
    }).view(card.id, true, true, true);

    // Post the card's image to chat
    let cardImgSrc = card.faces[0].img;
    let chatMessage = `<img src="${cardImgSrc}" alt="Card Image" style="max-width: 100%; height: auto;">`;
    ChatMessage.create({
    user: game.user.id,
    content: chatMessage,
    });

    // Return the card to its stack
    card.recall();
};
