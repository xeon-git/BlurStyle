export const overrides = [
	/* худ и прочее в битве */
	{	
		id: "supplies_atlas",
		from: `supplies_atlas`,
		to: `https://hierophant.host/blurStyle/resources/battle/hud/bs_black_supplies_atlas.png`,
		description: "Кастомные припасы в битве"
	},
	{	
		id: "bilboard",
		from: `/0/16716/156/240/30545000607201/image.webp`,
		to: `https://hierophant.host/blurStyle/resources/battle/bilboard/bilboard.jpg`,
		description: "Блюрстайл билборды в битве"
	},
	/* дефолт космос небо | кастом космос небо */
	{   
		id: "skybox_up",
		from: '/0/16721/110/123/30545000606213/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/up.png',
		description: "Кастом небо | верх"
	},
	{   
		id: "skybox_down",
		from: '/0/16721/110/124/30545000606433/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/down.png',
		description: "Кастом небо | низ"
	},
	{   
		id: "skybox_right",
		from: '/0/16721/110/120/30545000605752/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/right.png',
		description: "Кастом небо | право"
	},
	{   
		id: "skybox_left",
		from: '/0/16721/110/122/30545000606256/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/left.png',
		description: "Кастом небо | лево"
	},
	{   
		id: "skybox_front",
		from: '/0/16721/107/207/30545000605173/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/f.png',
		description: "Кастом небо | перед"
	},
	{   
		id: "skybox_back",
		from: '/0/16721/110/121/30545000607406/image.webp',
		to: 'https://hierophant.host/blurStyle/resources/battle/skybox/parkour/back.png',
		description: "Кастом небо | зад"
	},
	/* дефолт лобби | кастом бс лобби */
	{
		id: "lobby_3ds",
		from: `/601/166176/165/206/31167700267244/object.3ds`,
		to: `https://hierophant.host/blurStyle/resources/lobby/scifi_lobby.3ds`,
		description: "Кастом лобби | модель"
	},
	{
		id: "lobby_floor",
		from: `/601/166176/165/206/31167700267244/flr1.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/floor.png`,
		description: "Кастом лобби | текстура пола"
	},
	{
		id: "lobby_room",
		from: `/601/166176/165/206/31167700267244/gar1.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/room.png`,
		description: "Кастом лобби | текстура комнаты"
	},
	{
		id: "lobby_sky",
		from: `/601/166176/165/206/31167700267244/sky1.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/sky0.png`,
		description: "Кастом лобби | текстура неба"
	},
	{
		id: "lobby_platform",
		from: `/601/166176/165/206/31167700267244/pl1.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/tnk_plat.png`,
		description: "Кастом лобби | текстура платформы"
	},
	{
		id: "lobby_platform2",
		from: `/601/166176/165/206/31167700267244/pl2.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/pl2.jpg`,
		description: "Кастом лобби | доп текстура платформы"
	},
	{
		id: "lobby_race",
		from: `/601/166176/165/206/31167700267244/race1.webp`,
		to: `https://hierophant.host/blurStyle/resources/lobby/race1.jpg`,
		description: "Кастом лобби | текстура трассы"
	},
	/* дефолт хр | кастом бс хр */
	{
        "id": "railgun_xt_meta",
        "from": "567/105205/202/122/31167700270037/meta.info",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/meta.info",
        "description": "Кастом рельса ХТ | мета"
    },
    {
        "id": "railgun_xt_model",
        "from": "567/105205/202/122/31167700270037/object.3ds",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/object.3ds",
        "description": "Кастом рельса ХТ | модель"
    },
    {
        "id": "railgun_xt_lightmap",
        "from": "567/105205/202/122/31167700270037/lightmap.webp",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/lightmap.png",
        "description": "Кастом рельса ХТ | текстура"
    },
    {
        "id": "railgun_xt_low_meta",
        "from": "573/162033/227/133/31167700274115/meta.info",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/meta.info",
        "description": "Кастом рельса ХТ | мета лоу"
    },
    {
        "id": "railgun_xt_low_model",
        "from": "573/162033/227/133/31167700274115/object.3ds",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/object.3ds",
        "description": "Кастом рельса ХТ | модель лоу"
    },
    {
        "id": "railgun_xt_low_lightmap",
        "from": "573/162033/227/133/31167700274115/lightmap.webp",
        "to": "https://hierophant.host/blurStyle/resources/turrets/railgun-xt/lightmap.png",
        "description": "Кастом рельса ХТ | текстура лоу"
    },

    {
        "id": "hornet_xt_meta",
        "from": "566/70102/323/346/31167700274103/meta.info",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/meta.info",
        "description": "Кастом хорнет ХТ | мета"
    },
    {
        "id": "hornet_xt_model",
        "from": "566/70102/323/346/31167700274103/object.3ds",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/object.3ds",
        "description": "Кастом хорнет ХТ | модель"
    },
    {
        "id": "hornet_xt_lightmap",
        "from": "566/70102/323/346/31167700274103/lightmap.webp",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/lightmap.png",
        "description": "Кастом хорнет ХТ | текстура"
    },
    {
        "id": "hornet_xt_tracks",
        "from": "566/70102/323/346/31167700274103/tracks.webp",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/tracks.png",
        "description": "Кастом хорнет ХТ | гусеницы"
    },
    {
        "id": "hornet_xt_low_meta",
        "from": "570/57730/367/11/31167700274130/meta.info",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/meta.info",
        "description": "Кастом хорнет ХТ | мета лоу"
    },
    {
        "id": "hornet_xt_low_model",
        "from": "570/57730/367/11/31167700274130/object.3ds",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/object.3ds",
        "description": "Кастом хорнет ХТ | модель лоу"
    },
    {
        "id": "hornet_xt_low_lightmap",
        "from": "570/57730/367/11/31167700274130/lightmap.webp",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/lightmap.png",
        "description": "Кастом хорнет ХТ | текстура лоу"
    },
    {
        "id": "hornet_xt_low_tracks",
        "from": "570/57730/367/11/31167700274130/tracks.webp",
        "to": "https://hierophant.host/blurStyle/resources/hulls/hornet-xt/tracks.png",
        "description": "Кастом хорнет ХТ | гусеницы лоу"
    }
];