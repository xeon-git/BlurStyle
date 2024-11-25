export const overrides = [
/* худ и прочее в битве */
	{	/* припасы в битве | прозрачные белые припасы */
		from: `supplies_atlas`,
		to: `https://xeon.fun/blurStyle/resources/battle/hud/bs_black_supplies_atlas.png`
	},
	{	/* сток билборд в катке | блюрстайл лого */
		from: `/0/16716/156/240/30545000607201/image.webp`,
		to: `https://xeon.fun/blurStyle/resources/battle/bilboard/bilboard.jpg`
	},
/* дефолт космос небо | кастом космос небо */
	{   /* верх */
		from: '/0/16721/110/123/30545000606213/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/up.png'
	},
	{   /* низ */
		from: '/0/16721/110/124/30545000606433/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/down.png'
	},
	{   /* зад */
		from: '/0/16721/110/121/30545000607406/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/back.png'
	},
	{   /* право */
		from: '/0/16721/110/120/30545000605752/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/right.png'
	},
	{   /* перед */
		from: '/0/16721/107/207/30545000605173/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/f.png'
	},
	{   /* лево */
		from: '/0/16721/110/122/30545000606256/image.webp',
		to: 'https://xeon.fun/blurStyle/resources/battle/skybox/parkour/left.png'
	},
/* дефолт лобби | кастом бс лобби */
	{
		from: `/601/166176/165/206/30545000710421/object.3ds`,
		to: `https://xeon.fun/blurStyle/resources/lobby/scifi_lobby.3ds`,
	},
	{
		from: `/601/166176/165/206/30545000710421/flr1.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/floor.png`,
	},
	{
		from: `/601/166176/165/206/30545000710421/gar1.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/room.png`,
	},
	{
		from: `/601/166176/165/206/30545000710421/sky1.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/sky0.png`,
	},
	{
		from: `/601/166176/165/206/30545000710421/pl1.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/tnk_plat.png`,
	},
	{
		from: `/601/166176/165/206/30545000710421/pl2.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/pl2.jpg`,
	},
	{
		from: `/601/166176/165/206/30545000710421/race1.webp`,
		to: `https://xeon.fun/blurStyle/resources/lobby/race1.jpg`,
	},
/* дефолт защитник | кастом бс защитник */
	{
		from: `/546/35001/351/175/30545000710544/lightmap.webp`,
		to: `https://xeon.fun/blurStyle/resources/drones/defender/defender.png`
	},
	{
		from: `/546/35001/351/175/30545000710544/object.3ds`,
		to: `https://xeon.fun/blurStyle/resources/drones/defender/defender.3ds`
	}
];