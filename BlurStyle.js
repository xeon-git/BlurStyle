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

	function cssAnimations()
	{
		const style = document.createElement("style");
		style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

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

            @keyframes logoAnim {
                35% {
                    width: 0%;
                }

                100% {
                    width: 20rem;
                }
            }

            .LobbyLoaderComponentStyle-logo {
                animation: logoAnim 3s linear forwards;
                animation-iteration-count: 2;
                position: relative;
            }

            .fade-animation {
                animation: fadeIn 0.65s ease;
            }

            .scale-animation {
                animation: scaleIn 0.7s ease-in-out;
            }

			.slideIn {
				animation: slideIn 0.3s ease-out;
			}
        `;
		document.head.appendChild(style);
	}

	function animationTags(element, el)
	{
		if (element.tag.includes("fade"))
		{
			el.classList.add("animate", "fade-animation");
		}

		if (element.tag.includes("scale"))
		{
			el.classList.add("animate", "scale-animation");
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
		card.style.boxShadow = "0rem 0rem 1rem 0.05rem rgba(255, 255, 255, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)";
	}

	function resetTransform(card)
	{
		card.style.transition = "transform 0.5s ease-in-out, box-shadow 0.7s, border-color 0.7s";
		card.style.transform = `perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
		card.style.boxShadow = "0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)";
	}

	function styles(mutationsList)
	{
		const elements = [
			{ /* стилизация общего блока */
				tag: ["QS"],
				selector: ".Common-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgb(0, 0, 0, 1) 0%, rgb(0, 0, 0, 1) 0%)"
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
				tag: ["QS", "scale"],
				selector: ".ChatComponentStyle-chatWindow",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 0%)",
					backdropFilter: "blur(10px)"
				}
			},

			{ /* стилизация сообщений в блоке с чатом */
				tag: ["QSA", "BHV", "scale"],
				selector: ".ChatComponentStyle-messageRow",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(10px)",
					border: "0.150rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "12px",
					boxShadow: "inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)",
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
					backdropFilter: "blur(1rem)"
				}
			},

			{ /* стилизация диалоговых окон */
				tag: ["QS", "scale"],
				selector: ".DialogContainerComponentStyle-container",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.1rem solid rgba(255, 255, 255, 0.1)",
					borderRadius: "1.1rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)"
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
				tag: ["QS"],
				selector: ".BreadcrumbsComponentStyle-headerContainer",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 0%)",
					border: "0px solid rgba(255, 255, 255, 0.150)",
				}
			},

			{ /* стилизация туториал менюшек */
				tag: ["QS"],
				selector: ".TutorialModalComponentStyle-contentWrapper",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
					backdropFilter: "blur(10px)"
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
					background: "radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)",
					backdropFilter: "blur(10px)"
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

			{ /* стилизация кнопки в шапке с премом в главном меню */
				tag: ["QS"],
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

			{ /* стилизация карточек в кнопке играть */
				tag: ["QSA", "BHV", "scale", "scale3d"],
				selector: ".BattlePickComponentStyle-commonStyleBlock.cardImgEvents",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 0%)",
					border: "0.150rem solid rgba(255, 255, 255, 0.3)",
					borderRadius: "1.2rem",
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
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)",
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

			{ /* стилизация полосы поиска */
				tag: ["QSA", "fade", "BHV"],
				selector: ".SearchInputComponentStyle-searchInput .Font-normal",
				styles:
				{
					background: "radial-gradient(50% 100% at 50% 100%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 0%)",
					backdropFilter: "blur(0.5rem)",
					border: "0.150rem solid rgba(255, 255, 255, 0.2)",
					borderRadius: "1.2rem",
					boxShadow: "0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.5)",
				}
			},

		];

		mutationsList.forEach((mutation) =>
		{
			if (mutation.type === "childList")
			{
				elements.forEach((element) =>
				{
					let selectedElements;

					if (element.tag.includes("QSA"))
					{
						selectedElements = document.querySelectorAll(element.selector);
					}
					else if (element.tag.includes("QS"))
					{
						const singleElement = document.querySelector(element.selector);
						selectedElements = singleElement ? [singleElement] : [];
					}

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
				});
			}
		});
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

	cssAnimations();
	initObserver();
})();