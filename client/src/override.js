const {readFile} = require('fs').promises;
const {join} = require('path');

const createPattern = (url) => new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

const overrides = [
/* худ и прочее в битве */
    {from: `supplies_atlas`, to: `resources/battle/hud/bs_black_supplies_atlas.png`},
    {from: `/0/16716/156/240/30545000607201/image.webp`, to: `resources/battle/bilboard/bilboard.jpg`},
/* дефолт космос небо | кастом космос небо */
    {from: '/0/16721/110/123/30545000606213/image.webp', to: 'resources/battle/skybox/parkour/up.png'},
    {from: '/0/16721/110/124/30545000606433/image.webp', to: 'resources/battle/skybox/parkour/down.png'},
    {from: '/0/16721/110/121/30545000607406/image.webp', to: 'resources/battle/skybox/parkour/back.png'},
    {from: '/0/16721/110/120/30545000605752/image.webp', to: 'resources/battle/skybox/parkour/right.png'},
    {from: '/0/16721/107/207/30545000605173/image.webp', to: 'resources/battle/skybox/parkour/front.png'},
    {from: '/0/16721/110/122/30545000606256/image.webp', to: 'resources/battle/skybox/parkour/left.png'},
/* дефолт лобби | кастом бс лобби */
    {from: `/601/166176/165/206/31167700267244/object.3ds`, to: `resources/lobby/scifi_lobby.3ds`},
    {from: `/601/166176/165/206/31167700267244/flr1.webp`, to: `resources/lobby/floor.png`},
    {from: `/601/166176/165/206/31167700267244/gar1.webp`, to: `resources/lobby/room.png`},
    {from: `/601/166176/165/206/31167700267244/sky1.webp`, to: `resources/lobby/sky0.png`},
    {from: `/601/166176/165/206/31167700267244/pl1.webp`, to: `resources/lobby/tnk_plat.png`},
    {from: `/601/166176/165/206/31167700267244/pl2.webp`, to: `resources/lobby/pl2.jpg`},
    {from: `/601/166176/165/206/31167700267244/race1.webp`, to: `resources/lobby/race1.jpg`},
/* дефолт защитник | кастом бс защитник */
    {from: `/546/35001/351/175/30545000710544/lightmap.webp`, to: `resources/drones/defender/defender.png`},
    {from: `/546/35001/351/175/30545000710544/object.3ds`, to: `resources/drones/defender/defender.3ds`}
];

const originalFetch = window.fetch.bind(window);

window.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;

  for (const override of overrides) {
    const pattern = createPattern(override.from);
        if (pattern.test(url)) {console.log(`[Blurstyle] успешная замена:\nкаво: ${url}\nкуда: ${override.to}`);

        const resourcePath = join(__dirname, override.to);

        try {
            const data = await readFile(resourcePath);

            return new Response(data, {status: 200, statusText: 'OK', headers: {'Content-Type': 'application/octet-stream'}});}
                catch (err) {console.error(`чет не могу прочесть ресы: ${err.message}`);
                    throw err;}}}
                        return originalFetch(input, init);
};