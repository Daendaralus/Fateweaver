let cname = game.user.character.name;
let fname = cname.split(' ')[0];
let mhand = null;
for (let deck of game.cards) {
    if (deck.name.startsWith(fname)){
        mhand = deck;
        break;
    }
}
if (!mhand) {
    ui.notifications.warn(`No deck found starting with: ${fname}`);
    return;
}
let data = {
  handId: mhand.id,
  stackId: "CnVWfu7HaxG6IIDL"
};
game.socket.emit('module.fateweaver-module', data);