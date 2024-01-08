// ==UserScript==
// @name BlurStyle
// @version 4.0
// @description better user experience
// @author Wolf Team
// @match https://*.tankionline.com/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=wolf.ua
// ==/UserScript==

(function()
{
	let observer;
	let cssStyles;
	let isFilterEnabled = true;
	let saturationValue = 170;
	let contrastValue = 110;

	/* логика тегов */
	function animationTags(element, el)
	{
		if (element.tag.includes("fade"))
		{
			el.classList.add("animate", "fade");
		}

		if (element.tag.includes("scale"))
		{
			el.classList.add("animate", "scale");
		}

		if (element.tag.includes("scale3d"))
		{
			el.classList.add("animate", "scale3d");
		}

		if (element.tag.includes("slide"))
		{
			el.classList.add("animate", "slideIn");
		}
	}

	/* логика ховер тегов */
	function mouseHover(element, el)
	{
		Object.entries(element.styles).forEach(([style, value]) =>
		{
			el.style[style] = value;
		});

		if (element.tag.includes("BHV"))
		{
			el.addEventListener("mouseover", () =>
			{
				el.style.transition = "border-color 1s";
				el.style.border = "0.150rem solid rgba(255, 255, 255, 1)";
			});

			el.addEventListener("mouseout", () =>
			{
				el.style.transition = "border-color 1s";
				el.style.border = element.styles.border;
			});

			el.addEventListener("mousemove", () =>
			{
				el.style.border = "0.150rem solid rgba(255, 255, 255, 1)";
			});
		}
		else if (element.tag.includes("RHV"))
		{
			el.addEventListener("mouseover", () =>
			{
				el.style.transition = "background 0.5s";
				el.style.borderRadius = "1.1rem";
			});

			el.addEventListener("mouseout", () =>
			{
				el.style.transition = "background 0.5s";
				el.style.borderRadius = element.styles.borderRadius;
			});

			el.addEventListener("mousemove", () =>
			{
				el.style.borderRadius = "1.1rem";
			});
		}
	}

	/* логика трансформации карточек */
	function handleMouseMove(e, card)
	{
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const xPercent = (x / rect.width) * 110;
		const yPercent = (y / rect.height) * 110;

		const rotateX = (yPercent / 50 - 1) * 5;
		const rotateY = (xPercent / 50 - 1) * 5;

		card.style.transition = "box-shadow 0.7s, border-color 0.7s";
		card.style.transformOrigin = "center center";
		card.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
		card.style.boxShadow = "0rem 0rem 0.7rem 0.05rem rgba(255, 255, 255, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)";
	}

	function resetTransform(card)
	{
		card.style.transition = "transform 0.5s ease-in-out, box-shadow 0.7s, border-color 0.7s";
		card.style.transform = `perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		card.style.boxShadow = "0rem 0rem 0.3rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)";
	}

	/* логика фильтров */
	function toggleFilters()
	{
		isFilterEnabled = !isFilterEnabled;
		updateFilters();
	}

	function updateFilters()
	{
		const currentURL = window.location.href;
		const targetURL = 'https://tankionline.com/play/';

		if (isFilterEnabled && currentURL.startsWith(targetURL))
		{
			applyFilters(saturationValue, contrastValue);
		}
		else
		{
			document.body.style.filter = '';
		}
	}

	function applyFilters(saturation, contrast)
	{
		document.body.style.filter = `saturate(${saturation}%) contrast(${contrast}%)`;
	}

	updateFilters();

	document.addEventListener('keydown', function(event)
	{
		if ((event.key === '\\' || event.key === 'Backslash') && window.location.href.startsWith('https://tankionline.com/play/'))
		{
			toggleFilters();
		}
	});

	/* массив стилей */
	function styles()
	{
		const elements = [
			{ /* logo аним фрейм */
				cssStyles: `
					@keyframes logoAnim {
						35% {
							width: 0%;
						}

						100% {
							width: 100px;
						}
					}

					.LobbyLoaderComponentStyle-logo {
						animation: logoAnim 3s linear forwards;
						animation-iteration-count: 2;
						position: relative;
					}
				`
			},

			{ /* fade аним фрейм */
				cssStyles: `
					@keyframes fadeIn {
						from {
							opacity: 0;
						}
						to {
							opacity: 1;
						}
					}

					.fade {
						animation: fadeIn 0.65s ease;
					}
				`
			},

			{ /* scale аним фрейм */
				cssStyles: `
					@keyframes scaleIn {
						0% {
							transform: scale(0.9);
						}
						50% {
							transform: scale(1.025);
						}
						100% {
							transform: scale(1);
						}
					}

					.scale {
						animation: scaleIn 0.7s ease-in-out;
					}
				`
			},

			{ /* slide аним фрейм */
				cssStyles: `
					@keyframes slideIn {
						0% {
						opacity: 0.8;
						transform: translateY(20%) perspective(50rem) rotateX(30deg);
						}
						100% {
						opacity: 1;
						transform: translateY(0) perspective(50rem) rotateX(0deg);
						}
					}


					.slideIn {
						animation: slideIn 0.4s ease-out;
					}
				`
			},

			{ /* стилизация общего блока */
				tag: ["QS"],
				selector: ".Common-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 0%)"
				}
			},

			{ /* стилизация первоначального экрана */
				tag: ["QS"],
				selector: ".Common-entranceGradient",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 0%)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "fade"],
				selector: ".SettingsComponentStyle-scrollingMenu",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
				}
			},

			{ /* стилизация таба в битве */
				tag: ["QS", "scale"],
				selector: ".BattleTabStatisticComponentStyle-containerInsideTeams",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.5rem",
					boxShadow: "0rem 0rem 1rem 0.10rem rgba(0, 0, 0, 0.6), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация таба в битве */
				tag: ["QS", "scale"],
				selector: ".BattleTabStatisticComponentStyle-containerInsideResults",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.5rem",
					boxShadow: "0rem 0rem 1rem 0.10rem rgba(0, 0, 0, 0.6), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация таба в битве */
				tag: ["QS"],
				selector: ".BattleTabStatisticComponentStyle-header",
				styles:
				{
					borderBottom: "none"
				}
			},

			{ /* стилизация игроков в табе */
				tag: ["QSA", "BHV"],
				selector: ".BattleTabStatisticComponentStyle-rowBackGround",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "inset 0rem 0rem 0.5rem 0.05rem rgba(0,0,0,0.170)",
					marginBottom: "0.50%",
					top: "0.5rem"
				}
			},

			{ /* стилизация игроков в табе */
				tag: ["QSA"],
				selector: ".BattleTabStatisticComponentStyle-scoreCell",
				styles:
				{
					borderLeft: "none"
				}
			},

			{ /* стилизация игроков в табе */
				tag: ["QSA"],
				selector: ".BattleTabStatisticComponentStyle-dlCell",
				styles:
				{
					borderLeft: "none"
				}
			},

			{ /* стилизация игрока в табе */
				tag: ["QS", "BHV"],
				selector: ".BattleTabStatisticComponentStyle-selectedRowBackGround",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.075) 0%)",
					backdropFilter: "blur(2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "inset 0rem 0rem 0.5rem 0.05rem rgba(0,0,0,0.170)",
					marginBottom: "0.50%",
					top: "0.5rem"
				}
			},

			{ /* стилизация увед точек */
				tag: ["QSA"],
				selector: ".ItemNotificationMarkerStyle-base",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация кнопки забрать все в контах */
				tag: ["QS", "BHV", "fade"],
				selector: ".SuperMissionComponentStyle-buttonCollect",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация шапки новостного меню */
				tag: ["QS"],
				selector: ".NewsComponentStyle-header",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 0%)",
					backdropFilter: "blur(10px)"
				}
			},

			{ /* стилизация новостного меню */
				tag: ["QS"],
				selector: ".NewsComponentStyle-newsWindow",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 0%)",
					backdropFilter: "blur(10px)"
				}
			},

			{ /* стилизация новостного меню */
				tag: ["QS", "fade"],
				selector: ".NewsComponentStyle-closeArea",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)"
				}
			},

			{ /* стилизация шапки блока с чатом */
				tag: ["QS", "fade"],
				selector: ".ChatComponentStyle-upMenu",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)"
				}
			},

			{ /* стилизация блока с чатом */
				tag: ["QS", "BHV"],
				selector: ".ChatComponentStyle-channelSelect",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.8rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "0.6rem",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация блока с чатом */
				tag: ["QS"],
				selector: ".ChatComponentStyle-chatWindow",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 0%)",
					backdropFilter: "blur(1rem)"
				}
			},

			{ /* стилизация сообщений в блоке с чатом */
				tag: ["QSA", "BHV", "scale"],
				selector: ".ChatComponentStyle-messageRow",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.8rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "12px",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация блока с чатом */
				tag: ["QS", "fade"],
				selector: ".ChatComponentStyle-closeArea",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)"
				}
			},

			{ /* стилизация кнопки играть в главном меню */
				tag: ["QS", "BHV", "scale3d"],
				selector: ".MainScreenComponentStyle-playButtonContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "3rem 3rem 3rem 3rem",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					height: "12.5rem",
					width: "24.3rem",
					top: "5%",
					right: "5.5%",
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "BHV", "scale3d"],
				selector: ".PrimaryMenuItemComponentStyle-itemCommonLi.PrimaryMenuItemComponentStyle-menuItemContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "30px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "5%",
					height: "3.8rem",
					width: "23.8rem",
					top: "17%",
					right: "12%"
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "fade"],
				selector: ".PrimaryMenuItemComponentStyle-notificationIconNewNews",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "BHV", "scale3d"],
				selector: ".FooterComponentStyle-containerMenu.FooterComponentStyle-newsButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "50px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "2%",
					height: "4.5rem",
					width: "4.5rem",
					right: "12%"
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "BHV", "scale3d"],
				selector: ".FooterComponentStyle-containerMenu.FooterComponentStyle-chatButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "50px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "2%",
					height: "4.5rem",
					width: "4.5rem",
					right: "5%"
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "BHV", "scale3d"],
				selector: ".FooterComponentStyle-containerMenu.FooterComponentStyle-friendButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "50px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "2%",
					height: "4.5rem",
					width: "4.5rem",
					right: "-2%"
				}
			},

			{ /* стилизация разделов в главном меню */
				tag: ["QSA", "BHV", "scale3d"],
				selector: ".FooterComponentStyle-containerMenu.FooterComponentStyle-clanButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "50px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "2%",
					height: "4.5rem",
					width: "4.5rem",
					right: "-10%"
				}
			},
			{ /* стилизация промежуточного загрузочного экрана */
				tag: ["QS", "fade"],
				selector: ".LobbyLoaderComponentStyle-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 0%)",
					backdropFilter: "blur(0.5rem)"
				}
			},

			{ /* стилизация диалоговых окон */
				tag: ["QS", "scale"],
				selector: ".DialogContainerComponentStyle-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					outline: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация диалоговых окон */
				tag: ["QS", "BHV", "fade"],
				selector: ".DialogContainerComponentStyle-keyButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация диалоговых окон */
				tag: ["QS", "BHV", "fade"],
				selector: ".DialogContainerComponentStyle-enterButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 128, 0, 0.150) 0%, rgba(0, 128, 0, 0.150) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация шапки в главном меню игры */
				tag: ["QS"],
				selector: ".MainScreenComponentStyle-containerPanel",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderBottomLeftRadius: "2rem",
					borderBottomRightRadius: "2rem",
					width: "99.7%",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация шапки во всех меню игры */
				tag: ["QS", "fade"],
				selector: ".BreadcrumbsComponentStyle-headerContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0px solid rgba(255, 255, 255, 0.150)",
				}
			},

			{ /* стилизация туториал всплывашек */
				tag: ["QS", "fade"],
				selector: ".TutorialModalComponentStyle-contentWrapper",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0rem)"
				}
			},

			{ /* стилизация туториал всплывашек */
				tag: ["QSA", "BHV", "fade"],
				selector: ".TutorialModalComponentStyle-navigationButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация лобби-меню в главном меню */
				tag: ["QS", "scale"],
				selector: ".InvitationWindowsComponentStyle-commonItem",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.2rem",
					top: "6.350rem",
					left: "0.1rem",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* фикс иконок в шапке */
				tag: ["QS", "fade"],
				selector: ".BreadcrumbsComponentStyle-iconLogout",
				styles:
				{
					borderRadius: "none"
				}
			},

			{ /* фикс иконок в шапке */
				tag: ["QS", "fade"],
				selector: ".Common-backgroundImageCover",
				styles:
				{
					borderRadius: "none"
				}
			},

			{ /* фикс иконок в шапке */
				tag: ["QS", "fade"],
				selector: ".Common-backgroundImageContain",
				styles:
				{
					borderRadius: "none"
				}
			},

			{ /* фикс иконок в шапке */
				tag: ["QS", "fade"],
				selector: ".IconStyle-iconLogOff",
				styles:
				{
					borderRadius: "none"
				}
			},

			{ /* стилизация лобби-меню в главном меню */
				tag: ["QSA", "RHV"],
				selector: ".InvitationWindowsComponentStyle-commonItem *",
				styles:
				{
					border: "none"
				}
			},

			{ /* стилизация кланового диалогового окна */
				tag: ["QS", "scale"],
				selector: ".ClanCreateComponentStyle-blockCreatureClan",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(10px)"
				}
			},

			{ /* стилизация чекбоксов */
				cssStyles: `
					.CheckBoxStyle-checkbox > label > span:not(#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span) {
						background: radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%);
						border: 0.150rem solid rgba(255, 255, 255, 0.2);
						border-radius: 1.2rem;
					}

					.CheckBoxStyle-checkbox > label > span:not(#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span)::before {
						background: radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.9) 0%);
						margin-top: 0.2rem;
						border-radius: 5rem;
						height: 1.1rem;
						width: 1rem;
					}
				`
			},

			{ /* стилизация меню челленджа */
				tag: ["QS", "BHV", "scale3d"],
				selector: ".BattlePassLobbyComponentStyle-menuBattlePass",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "15px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					top: "3%"
				}
			},

			{ /* стилизация меню челленджа */
				tag: ["QSA"],
				selector: ".BattlePassLobbyComponentStyle-blockBattlePass",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.050)",
					borderRadius: "20px",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					right: "0.1rem"
				}
			},

			{ /* стилизация меню челленджа */
				tag: ["QSA"],
				selector: ".BattlePassLobbyComponentStyle-commonDescription",
				styles:
				{
					borderRight: "none"
				}
			},

			{ /* стилизация инфо-всплывашки в разделе гаража */
				tag: ["QS", "fade"],
				selector: ".ItemDescriptionComponentStyle-commonBlockModal",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0rem)"
				}
			},

			{ /* стилизация ивентового меню челленджа */
				tag: ["QS", "BHV", "scale3d"],
				selector: ".EventBattlePassLobbyComponentStyle-buttonEventBattlePass",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.150) 0%, rgba(0, 0, 0, 0.150) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "15px",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					top: "15.7%"
				}
			},

			{ /* стилизация ивентового меню челленджа */
				tag: ["QS"],
				selector: ".EventBattlePassLobbyComponentStyle-commonBlockProgressBar",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
				}
			},

			{ /* стилизация рекламного блока в мейн меню */
				tag: ["QS", "BHV", "scale3d"],
				selector: ".AnnouncementHomeScreenComponentStyle-mainContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(5px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					bottom: "0.950rem"
				}
			},

			{ /* стилизация рекламного блока в мейн меню */
				tag: ["QS"],
				selector: ".AnnouncementHomeScreenComponentStyle-announceDescriptionContainer",
				styles:
				{
					borderTopLeftRadius: "0.8rem",
					borderTopRightRadius: "0.8rem",
				}
			},

			{ /* стилизация рекламного блока в мейн меню */
				tag: ["QS"],
				selector: "#root > div > div.AnnouncementHomeScreenComponentStyle-mainContainer > div.Common-flexCenterAlignCenterColumn",
				styles:
				{
					borderBottomLeftRadius: "1rem",
					borderBottomRightRadius: "1rem",
				}
			},

			{ /* скрытие анимации загрузки в промежуточном загрузочном экране */
				tag: ["QS"],
				selector: ".LobbyLoaderComponentStyle-loaderContainer",
				styles:
				{
					display: "none"
				}
			},

			{ /* стилизация окна с премом в главном меню */
				tag: ["QS", "scale"],
				selector: ".ModalStyle-rootHover .Common-displayFlex:first-child",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(1rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.5rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация кнопки купить прем */
				tag: ["QS", "BHV", "fade"],
				selector: ".UserTitleComponentStyle-premiumButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0)"
				}
			},

			{ /* стилизация кнопки в шапке с премом в главном меню */
				tag: ["QS", "RHV"],
				selector: "#root > div > div.Common-flexStartAlignStart > div.MainScreenComponentStyle-containerPanel > div.UserInfoContainerStyle-blockLeftPanel > div > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(10px)",
					boxShadow: "none"
				}
			},

			{ /* стилизация выпадающих менюшек*/
				tag: ["QS", "slide"],
				selector: ".ContextMenuStyle-menu",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация диалоговых окон с контекстом */
				tag: ["QSA", "RHV"],
				selector: ".ContextMenuStyle-menu *",
				styles:
				{}
			},

			{ /* стилизация всплывающих подсказок */
				tag: ["QS", "scale"],
				selector: ".TooltipStyle-tooltip",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.1rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.5rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация карточек в режимах битв */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".Common-flexSpaceBetweenAlignCenterColumn.descriptionMode.blockCard",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "20px",
					backdropFilter: "blur(1rem)",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)",
				}
			},

			{ /* стилизация хоткеев */
				tag: ["QSA"],
				selector: ".HotKey-commonBlockForHotKey",
				styles:
				{
					borderRadius: "1.1rem"
				}
			},

			{ /* стилизация хоткеев */
				tag: ["QSA"],
				selector: ".Common-buttonQE",
				styles:
				{
					borderRadius: "1.1rem"
				}
			},

			{ /* стилизация хоткеев */
				tag: ["QSA"],
				selector: "div.BreadcrumbsComponentStyle-backButton > h3",
				styles:
				{
					borderRadius: "1.1rem"
				}
			},

			{ /* дел бордеров из шапки в главном меню */
				tag: ["QSA", "RHV"],
				selector: ".MainScreenComponentStyle-containerPanel *",
				styles:
				{
					border: "none",
					boxShadow: "none"
				}
			},

			{ /* дел бордеров из шапки во всех разделах */
				tag: ["QSA", "RHV"],
				selector: ".BreadcrumbsComponentStyle-headerContainer *",
				styles:
				{
					border: "none",
					boxShadow: "none"
				}
			},

			{ /* дел бордера из прем окна */
				tag: ["QS"],
				selector: "#modal-root > div > div > div.Common-flexCenterAlignCenterColumn",
				styles:
				{
					border: "none",
				}
			},

			{ /* дел разделителя с блока под шапкой во всех разделах */
				tag: ["QS"],
				selector: ".MenuComponentStyle-decorLineMenu",
				styles:
				{
					display: "none",
				}
			},

			{ /* мыло на бэкграунд модальных окон */
				tag: ["QS", "fade"],
				selector: ".ModalStyle-rootHover",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
				}
			},

			{ /* стилизация модального окна покупки в магазе */
				tag: ["QS", "scale"],
				selector: ".SuccessfulPurchaseComponentStyle-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация модального окна покупки в магазе */
				tag: ["QS", "BHV", "fade"],
				selector: ".SuccessfulPurchaseComponentStyle-container .Common-flexCenterAlignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "BHV", "fade"],
				selector: ".ClanInvitationsItemComponentStyle-buttonReject",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 0, 0, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS"],
				selector: ".ClanInvitationsComponentStyle-invitationsLine",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "scale"],
				selector: ".ClanInvitationsComponentStyle-invitationContent",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "fade"],
				selector: "#modal-root > div > div > div.ClanCommonStyle-members.ClanInvitationsListComponentStyle-members > table > thead > tr",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA"],
				selector: "#modal-root > div > div > div.ClanCommonStyle-members.ClanInvitationsListComponentStyle-members > table > thead > tr *",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация одного из модальных окон */
				tag: ["QS", "fade"],
				selector: "#modal-root > div > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "none",
					borderRadius: "1.2rem",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0rem 0rem rgba(0,0,0,0)",
				}
			},

			{ /* стилизация карточек в кнопке играть */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".BattlePickComponentStyle-commonStyleBlock.cardImgEvents",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75)"
				}
			},

			{ /* стилизация списка заявок в друзья */
				tag: ["QS", "fade"],
				selector: ".FriendRequestComponentStyle-cellName",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "-1%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация списка заявок в друзья */
				tag: ["QS", "fade"],
				selector: ".FriendRequestComponentStyle-cellActions",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "-1%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация списка заявок в друзья */
				tag: ["QSA", "BHV", "fade"],
				selector: ".TableComponentStyle-row",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "0.50%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},


			{ /* стилизация кнопочек в списке заявок в друзья */
				tag: ["QSA", "BHV", "fade"],
				selector: ".FriendRequestComponentStyle-buttonDecline",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.2) 0%, rgba(255, 0, 0, 0.150) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "0.50%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация кнопочек в списке заявок в друзья */
				tag: ["QSA", "BHV", "fade"],
				selector: ".FriendRequestComponentStyle-buttonAccept",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(60, 179, 113, 0.2) 0%, rgba(60, 179, 113, 0.2) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "0.50%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация списка заявок в друзья */
				tag: ["QS"],
				selector: ".TableComponentStyle-thead",
				styles:
				{
					marginBottom: "0.725rem"
				}
			},

			{ /* стилизация кнопочек в списке заявок в друзья */
				tag: ["QS", "BHV", "fade"],
				selector: ".FriendRequestComponentStyle-buttonDeclineAll",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.150) 0%, rgba(255, 0, 0, 0.150) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "0.50%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация кнопочек в списке заявок в друзья */
				tag: ["QS"],
				selector: ".FriendRequestComponentStyle-buttonDeclineAllInvisible",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					marginBottom: "0.50%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация списка друзей */
				tag: ["QSA", "BHV", "fade"],
				selector: ".FriendListComponentStyle-blockList.nickNameClass",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "2rem",
					marginBottom: "-1%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация списка друзей */
				tag: ["QSA"],
				selector: ".FriendListComponentStyle-stringCommunity",
				styles:
				{
					paddingTop: "0.5rem"
				}
			},

			{ /* стилизация прогресса возле званки */
				cssStyles: `
					div.UserInfoContainerStyle-containerProgressMainScreen > div.Common-flexStartAlignStartColumn {
						background: rgba(222, 184, 135, 0.5) !important;
						filter: saturate(1);
					}

					div.UserInfoContainerStyle-containerProgressMainScreen > div.Common-flexStartAlignStartColumn::after {
						background: rgba(222, 184, 135, 1) !important;
						filter: saturate(5);
					}

					.UserInfoContainerStyle-xpIcon {
						filter: saturate(0);
					}

					div.UserInfoContainerStyle-progressValue {
						color: rgba(255, 255, 255, 1) !important;
					}

					div.UserInfoContainerStyle-progressValue > span {
						color: rgba(255, 255, 255, 1) !important;
					}
				`
			},

			{ /* стилизация списка друзей */
				tag: ["QSA"],
				selector: ".FriendListComponentStyle-substrateRhombus",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
				}
			},

			{ /* стилизация кнопочек в разделе друзей */
				tag: ["QS", "fade", "BHV"],
				selector: ".FriendListComponentStyle-buttonCloseAddFriends",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)"
				}
			},

			{ /* стилизация кнопочек в разделе друзей */
				tag: ["QS", "fade", "BHV"],
				selector: ".FriendListComponentStyle-buttonAddFriends",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)"
				}
			},

			{ /* стилизация кнопочек в разделе друзей */
				tag: ["QS"],
				selector: "div.FriendListComponentStyle-containerButtonFriends > div > img",
				styles:
				{
					filter: "invert(0)"
				}
			},

			{ /* стилизация кнопочек в разделе друзей */
				tag: ["QS", "fade"],
				selector: ".FriendListComponentStyle-buttonDisableAdd",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)"
				}
			},

			{ /* стилизация списка друзей в инвайт меню */
				tag: ["QSA", "BHV", "fade"],
				selector: ".Common-flexStartAlignCenter.Common-whiteSpaceNoWrap.nickNameClass",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "2rem",
					marginBottom: "-1%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация списка друзей в инвайт меню */
				tag: ["QSA", "fade"],
				selector: ".Common-flexStartAlignCenter.Common-whiteSpaceNoWrap",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "2rem",
					marginBottom: "-1%",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация списка друзей в инвайт меню */
				tag: ["QSA"],
				selector: ".InvitationWindowsComponentStyle-substrateRank",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация кнопочек в инвайт меню */
				tag: ["QS", "BHV", "fade"],
				selector: ".InvitationWindowsComponentStyle-backButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация кнопочек в инвайт меню */
				tag: ["QSA", "BHV", "fade"],
				selector: ".InvitationWindowsComponentStyle-inviteButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0px 0px 0px rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация полосы поиска */
				tag: ["QSA", "fade", "BHV"],
				selector: ".SearchInputComponentStyle-searchInput .Font-normal",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QSA", "fade", "BHV"],
				selector: ".SettingsMenuComponentStyle-menuItemOptions",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0.5rem 0.05rem rgba(0, 0, 0, 0.55), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					width: "17rem",
					height: "3rem",
					marginBottom: "0.7rem",
					top: "3.8rem"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".GameSettingsStyle-button",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".KeyboardSettingsComponentStyle-buttonResetAllKeys",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QSA", "BHV", "fade"],
				selector: ".KeyboardSettingsComponentStyle-keyInput",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QSA", "BHV", "fade"],
				selector: ".AccountSettingsComponentStyle-buttonChangesOptions",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".AccountSettingsComponentStyle-buttonCaptchaOptions",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".TwitchSettingsRendersStyle-button",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: "div.AccountSettingsComponentStyle-containerFormOptions > div > div.AccountSettingsComponentStyle-blockInputEmail > input",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "fade"],
				selector: "#root > div > div > div > div > div > div.AccountSettingsComponentStyle-containerFormOptions:nth-child(1) > form > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QSA", "BHV", "fade"],
				selector: ".KeyMappingWithIconComponentStyle-commonBlockSupplies",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация ползунков в разделе настроек */
				tag: ["QSA", "fade"],
				selector: ".InputRangeComponentStyle-range",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					backdropFilter: "blur(0.2rem)"
				}
			},

			{ /* стилизация активного раздела */
				cssStyles: `
	.InputRangeComponentStyle-range::-webkit-slider-thumb {
		background: radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 0%) !important;
		border-radius: 1rem !important;
	}
`
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".SecuritySettingsComponentStyle-button",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 0, 0, 0.2)",
					borderRadius: "1rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".KeyMappingWithIconComponentStyle-overdrives",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS", "BHV", "fade"],
				selector: ".SettingsButtonsComponentStyle-buttonsWidthBackReset",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 0, 0, 0.2)",
					borderRadius: "1.2rem",
					backdropFilter: "blur(0.2rem)",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела настроек */
				tag: ["QS"],
				selector: ".SettingsMenuComponentStyle-slideMenuOptions",
				styles:
				{
					display: "none"
				}
			},

			{ /* стилизация выпадающего списка */
				tag: ["QSA", "fade", "BHV"],
				selector: ".DropDownStyle-dropdownControl",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация выпадающего списка */
				tag: ["QSA"],
				selector: ".DropDownStyle-outerContainerStyle.DropDownStyle-dropdownMenu",
				styles:
				{
					top: "3.5rem"
				}
			},

			{ /* стилизация выпадающего списка */
				tag: ["QSA", "fade", "BHV"],
				selector: ".VerticalScrollStyle-outerContainerStyle .Common-flexStartAlignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "0.4rem"
				}
			},

			{ /* стилизация активного раздела */
				cssStyles: `
					.Common-activeMenu {
						color: rgba(222, 184, 135, 1) !important;
						animation: fadeIn 0.3s ease-in-out;
					}

					.MenuComponentStyle-mainMenuItem:hover {
						color: rgba(222, 184, 135, 1) !important;
					}

					.Common-menuItemActive {
						background: rgba(222, 184, 135, 1) !important;
						box-shadow: rgba(222, 184, 135, 1) 0rem 0rem 0.375rem !important;
						filter: drop-shadow(rgba(222, 184, 135, 1) 0rem 0rem 0.5rem) !important;
						animation: scaleIn 0.7s ease-in-out;
					}
				`
			},

			{ /* стилизация заголовка раздела */
				cssStyles: `
					div.BreadcrumbsComponentStyle-breadcrumbs > div > span {
						color: rgba(222, 184, 135, 1) !important;
					}
				`
			},

			{ /* стилизация кнопок в битве */
				tag: ["QSA", "fade", "BHV"],
				selector: ".BattleHudComponentStyle-hudButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
				}
			},

			{ /* стилизация всплывающих сообщений в битве */
				tag: ["QSA"],
				selector: ".BattleMessagesComponentStyle-message",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.1rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.2)",
				}
			},

			{ /* стилизация менюшки с паузой в битве */
				tag: ["QS"],
				selector: ".BattlePauseMenuComponentStyle-dialogFooter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация кнопочек в менюшке паузы */
				tag: ["QSA", "BHV", "fade"],
				selector: ".BattlePauseMenuComponentStyle-menuButton.BattlePauseMenuComponentStyle-enabledButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.2)",
				}
			},

			{ /* стилизация кнопочек в менюшке паузы */
				tag: ["QSA", "fade"],
				selector: ".BattlePauseMenuComponentStyle-menuButton.BattlePauseMenuComponentStyle-disabledButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.1rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.2)",
				}
			},

			{ /* стилизация кнопочек в менюшке паузы */
				tag: ["QS", "BHV", "fade"],
				selector: ".BattlePauseMenuComponentStyle-selectedRedMenuButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.2) 0%, rgba(255, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(0.1rem)",
					border: "0.150rem solid rgba(255, 0, 0, 0.3)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.2)",
				}
			},

			{ /* стилизация окна с полученной званкой */
				tag: ["QS", "scale"],
				selector: ".RankupComponentStyle-wrapper",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.8rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					width: "60%"
				}
			},

			{ /* стилизация окна с полученной званкой */
				tag: ["QS"],
				selector: ".RankupRewardComponentStyle-buttonNext",
				styles:
				{
					background: "none",
					boxShadow: "none"
				}
			},

			{ /* стилизация заданок в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: ".BattleResultQuestProgressComponentStyle-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация заданок в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: ".BattleResultQuestProgressComponentStyle-container-true",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация заданок в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: ".BattleResultQuestProgressComponentStyle-container-false",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QS", "fade"],
				selector: ".BattleResultUserInfoComponentStyle-progressVictoryContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QS"],
				selector: ".BattleResultHeaderComponentStyle-flashLight",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QSA", "fade"],
				selector: ".BattleRewardsComponentStyle-normalRow",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QSA", "fade"],
				selector: ".BattleRewardsComponentStyle-selectedRow",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QS"],
				selector: ".BattleRewardsComponentStyle-selectedRow",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QS"],
				selector: ".BattleResultNavigationComponentStyle-commonBlockBattleResultNavigation",
				styles:
				{
					borderBottom: "none"
				}
			},

			{ /* стилизация списка игроков в ммной стате */
				tag: ["QSA", "fade"],
				selector: "#selfUserBg",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.3rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация списка игроков в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: "#blueCommand",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(32, 42, 255, 0.1) 0%, rgba(32, 42, 255, 0.05) 0%)",
					backdropFilter: "blur(0.3rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация списка игроков в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: "#enemyCommand",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0.05) 0%)",
					backdropFilter: "blur(0.3rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация кнопочки купить премиум в ммной стате */
				tag: ["QS", "BHV", "fade"],
				selector: "#root > div > div > div.BattleRewardsComponentStyle-commonBlockButtonRewards > div > div > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					width: "30%"
				}
			},

			{ /* стилизация навигационных кнопочек в ммной стате */
				tag: ["QSA", "BHV", "fade"],
				selector: ".BattleResultNavigationComponentStyle-button",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация навигационных кнопочек в ммной стате */
				tag: ["QS", "BHV", "fade"],
				selector: "div.Common-flexCenterAlignCenter.BattleResultNavigationComponentStyle-buttonNextWithTimer.BattleResultNavigationComponentStyle-buttonWithTimer.Common-flexCenterAlignCenterColumn.Common-displayFlexColumn.Common-displayFlex.Common-alignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация навигационных кнопочек в ммной стате */
				tag: ["QS", "fade"],
				selector: ".BattleResultNavigationComponentStyle-disabledButtonWithTimer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация ммной статы */
				tag: ["QS", "fade"],
				selector: ".BlockResultTankComponentStyle-gsContainer",
				styles:
				{
					top: "-2.5rem"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS", "BHV", "fade"],
				selector: ".ItemDescriptionComponentStyle-captionDevice",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS", "BHV", "fade"],
				selector: ".LockableContainersComponentStyle-possibleRewardsBlock",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QSA", "BHV"],
				selector: "div.LockableContainersComponentStyle-rewards > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					margin: "0.2rem"
				}
			},

			{ /* стилизация раздела с контейнерами и гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".DeviceButtonComponentStyle-blockAlterations .Common-flexCenterAlignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS", "BHV", "fade"],
				selector: ".LockableContainersComponentStyle-moreButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS"],
				selector: ".LockableContainersComponentStyle-rewards",
				styles:
				{
					right: "0.5rem"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS"],
				selector: ".LockableContainersComponentStyle-navigationBlock",
				styles:
				{
					borderBottom: "none"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS"],
				selector: ".LockableContainerInfoComponentStyle-lootBoxDescriptionContainer",
				styles:
				{
					background: "none",
					borderRight: "none"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS"],
				selector: ".LockableContainersComponentStyle-leftPane",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QS"],
				selector: ".LockableContainersComponentStyle-rightPane",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация раздела с контейнерами */
				tag: ["QSA", "BHV", "fade"],
				selector: "div.LockableContainerInfoComponentStyle-possibleRewardsContainer > div > div > div.Common-flexCenterAlignCenterColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация дропа с контейнеров */
				tag: ["QSA", "BHV", "fade"],
				selector: ".RewardCardComponentStyle-smoothAppearance",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация дропа с контейнеров */
				tag: ["QSA", "BHV", "fade"],
				selector: ".RewardCardComponentStyle-fastAppearance",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "fade"],
				selector: ".ScrollingCardsComponentStyle-scrollCard.cardImg",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "RHV", "fade"],
				selector: ".ProBattlesComponentStyle-commonBlockHotkeyV",
				styles:
				{
					border: "none",
					borderRadius: "1.1rem",
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "fade"],
				selector: "div.QuestsComponentStyle-content > div > div > h2",
				styles:
				{
					borderRadius: "1.1rem",
					boxShadow: "inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "fade"],
				selector: ".SuperMissionComponentStyle-descriptionSuperMission",
				styles:
				{
					background: "none",
					borderRight: "none"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS"],
				selector: "div.SuperMissionComponentStyle-descriptionSuperMission > div",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS"],
				selector: ".SuperMissionComponentStyle-gradientBackground",
				styles:
				{
					background: "none"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "fade"],
				selector: ".SuperMissionComponentStyle-buttonDisable",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "fade"],
				selector: ".SuperMissionComponentStyle-rewardsContainer .Common-flexCenterAlignCenterColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "fade"],
				selector: ".MainQuestComponentStyle-rewardsContainer .Common-flexCenterAlignCenterColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "fade"],
				selector: ".TableMainQuestComponentStyle-rewardsContainerTable .Common-flexCenterAlignCenterColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "fade"],
				selector: ".MainQuestComponentStyle-rewardsInDescriptionModal .Common-flexCenterAlignCenterColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "BHV", "fade"],
				selector: ".MainQuestComponentStyle-buttonContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "BHV", "fade"],
				selector: ".MainQuestComponentStyle-containerButtonStore",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "scale"],
				selector: ".MainQuestComponentStyle-cardRewardGiven",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "fade"],
				selector: ".TableMainQuestComponentStyle-cardRewardGivenTable",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QS", "fade"],
				selector: ".MainQuestComponentStyle-needRank",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.2rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".MainQuestComponentStyle-colorCardPlay",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".MainQuestComponentStyle-commonCard",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "fade"],
				selector: ".TableMainQuestComponentStyle-cardLockedTable",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA"],
				selector: ".MainQuestComponentStyle-colorLockedGradient",
				styles:
				{
					display: "none"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".MainQuestComponentStyle-cardPlay",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "fade"],
				selector: ".MainQuestComponentStyle-cardPlayCommon",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".MainQuestComponentStyle-cardRewardCompleted",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.6rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.6)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "fade"],
				selector: ".TableMainQuestComponentStyle-cardRewardCompletedTable",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					backdropFilter: "blur(0.6rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.6)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA", "BHV", "fade"],
				selector: ".MainQuestComponentStyle-cardCommonLocked",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с миссиями */
				tag: ["QSA"],
				selector: ".TableMainQuestComponentStyle-colorLockedGradientTable",
				styles:
				{
					display: "none"
				}
			},

			{ /* стилизация всплывающего инфо-окна */
				tag: ["QS", "scale"],
				selector: ".NotificationViewStyle-commonBlockNotification",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.5rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация всплывающего инфо-окна */
				tag: ["QSA", "BHV", "fade"],
				selector: "div.NotificationViewStyle-commonBlockButtonYesNo > div",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация всплывающего инфо-окна */
				tag: ["QS"],
				selector: ".NotificationViewStyle-positionBlock",
				styles:
				{
					border: "none"
				}
			},

			{ /* стилизация всплывающего инфо-окна */
				tag: ["QS"],
				selector: ".NotificationViewStyle-progressNotification",
				styles:
				{
					display: "none"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "fade"],
				selector: ".TankParametersStyle-leftParamsContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: "div.GarageSuppliesComponentStyle-containerButtons > div > div.GarageSuppliesComponentStyle-check",
				styles:
				{
					backgroundSize: "initial",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "0.9rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: "div.GarageSuppliesComponentStyle-containerButtons > div > div.GarageSuppliesComponentStyle-checkDown",
				styles:
				{
					backgroundSize: "initial",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "0.9rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: ".MountedItemsStyle-commonBlockDrone",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					width: "47%"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".SkinCellStyle-widthHeight",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "fade"],
				selector: ".GarageCommonStyle-positionContentAlteration .Common-flexSpaceBetweenAlignStartColumn",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					borderRight: "none"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: ".MountedItemsStyle-commonBlockPaint",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)",
					width: "47%"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".MountedItemsComponentStyleMobile-commonBlockForTurretsHulls",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".MountedItemsComponentStyleMobile-commonBlockForTurretsHulls",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".MountedItemsStyle-commonForCellResistenceName",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".GarageProtectionsComponentStyle-equipmentResistance",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".Common-flexCenterAlignCenter.Common-borderRadius4px",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".SuppliesComponentStyle-cellAdd",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "fade"],
				selector: "#root > div > div.GarageCommonStyle-garageContainer > div.GarageCommonStyle-positionContent > div.GarageMainScreenStyle-blockParameters > div.TanksPartBaseComponentStyle-tankPartContainer > div > div.TanksPartComponentStyle-tankPartUpgrades.GarageCommonStyle-animatedBlurredRightBlock",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "fade"],
				selector: "#root > div > div > div.GarageCommonStyle-garageContainer > div.GarageCommonStyle-positionContent > div.GarageMainScreenStyle-blockParameters > div.TanksPartBaseComponentStyle-tankPartContainer > div > div.TanksPartComponentStyle-tankPartUpgrades.GarageCommonStyle-animatedBlurredRightBlock",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: "div.GarageSuppliesComponentStyle-containerButtons > div > input",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "BHV", "fade"],
				selector: "div.TanksPartComponentStyle-descriptionContainer > div.GarageCommonStyle-animatedBlurredLeftBlock > div:nth-child(2)",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QS", "fade"],
				selector: ".TanksPartComponentStyle-blockForImageResistanceModule",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".SquarePriceButtonComponentStyle-commonBlockButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "BHV", "fade"],
				selector: ".Common-itemStyle.garage-item",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.250rem 0.05rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".ListItemsComponentStyle-itemsListContainer.CssCommonAnimations-appearFromBottom",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA"],
				selector: ".ListItemsComponentStyle-itemsWrapper .Common-flexCenterAlignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".GarageProtectionsComponentStyle-iconEquipResist",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".MountedItemsStyle-improvementArrow",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".SkinCellStyle-mountIcon",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".MountedItemsStyle-improvementArrow",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".MountedItemsStyle-improvementArrow",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: ".GarageItemComponentStyle-improvementArrow",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация гаража */
				tag: ["QSA", "fade"],
				selector: "div.MountedItemsComponentStyleMobile-commonButtonUpdate > div.Common-flexCenterAlignCenter > div.Common-backgroundImage",
				styles:
				{
					filter: "saturate(0)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "fade"],
				selector: ".ClanHeaderComponentStyle-blockInform",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "fade"],
				selector: ".ClanInfoComponentStyle-messageClan",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.1rem",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "BHV", "fade"],
				selector: ".ClanInvitationsComponentStyle-sendButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "BHV", "fade"],
				selector: ".ClanProfileEditComponentStyle-clanDescriptionEdit",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "BHV", "fade"],
				selector: ".ClanProfileEditComponentStyle-buttonCancel",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "fade"],
				selector: ".ClanProfileEditComponentStyle-containerParametersClanBlockInform",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "BHV", "fade"],
				selector: ".ClanInfoComponentStyle-buttonEditProfile",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "fade"],
				selector: "#root > div > div > div.FriendListComponentStyle-containerMembers > table > thead > tr",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA"],
				selector: "#root > div > div > div.FriendListComponentStyle-containerMembers > table > thead > tr *",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "BHV", "fade"],
				selector: ".ClanCommonStyle-row",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
					marginBottom: "0.4rem"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA"],
				selector: ".ClanCommonStyle-rowEmpty",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS"],
				selector: "#root > div > div > div.FriendListComponentStyle-containerMembers > table > tbody > div",
				styles:
				{
					top: "0.4rem"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "BHV", "fade"],
				selector: ".ClanMembersListComponentStyle-buyClanPlaceButton",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS", "BHV", "fade"],
				selector: ".ClanCommonStyle-buttonInvite",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "BHV", "fade"],
				selector: ".PopupMessageComponentStyle-buttonsContainer .Common-flexCenterAlignCenter",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 0rem 0rem rgba(0, 0, 0, 0), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QSA", "fade"],
				selector: ".ClanStatisticsComponentStyle-areCommon",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.125rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
				}
			},

			{ /* стилизация раздела с кланом */
				tag: ["QS"],
				selector: ".ClanHeaderComponentStyle-logo",
				styles:
				{
					filter: "saturate(0)"
				}
			},

		];

		elements.forEach((element) =>
		{
			let selectedElements;

			if (element.tag && element.tag.includes("QSA"))
			{
				selectedElements = document.querySelectorAll(element.selector);
			}
			else if (element.tag && element.tag.includes("QS"))
			{
				const singleElement = document.querySelector(element.selector);
				selectedElements = singleElement ? [singleElement] : [];
			}

			if (selectedElements)
			{
				selectedElements.forEach((el) =>
				{
					if (el && !el.classList.contains("animate") && !el.dataset.animated)
					{
						el.dataset.animated = true;

						animationTags(element, el);
						mouseHover(element, el);

						el.addEventListener("animationend", () =>
						{
							el.classList.remove("animate");
						},
						{
							once: true
						});

						if (el.classList.contains("scale3d"))
						{
							el.addEventListener("mousemove", (e) => handleMouseMove(e, el));
							el.addEventListener("mouseenter", () => el.classList.add("is-hovered"));
							el.addEventListener("mouseleave", () =>
							{
								el.classList.remove("is-hovered");
								resetTransform(el);
							});
						}
					}
				});
			}
		});

		const checkStyles = cssStyles ? cssStyles.textContent : '';
		const updateStyles = elements.reduce((acc, element) =>
		{
			if (element.cssStyles && !checkStyles.includes(element.cssStyles))
			{
				acc += element.cssStyles;
			}
			return acc;
		}, '');

		if (updateStyles)
		{
			if (!cssStyles)
			{
				cssStyles = document.createElement("style");
				document.head.appendChild(cssStyles);
			}
			cssStyles.textContent = checkStyles + updateStyles;
		}
	}

	function initObserver()
	{
		observer = new MutationObserver(styles);

		const config = {
			childList: true,
			subtree: true,
		};

		observer.observe(document.body, config);
	}

	initObserver();
})();