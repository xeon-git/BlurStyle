import {animationTags} from '../utils/animationTags';
import {mouseHover} from '../utils/mouseHover';
import {handleMouseMove, resetTransform} from '../utils/transform';

let cssStyles;
let elementsProcessed = new WeakSet();

export const styles = () => {
  const cssVariables = `
    :root {
      /* основные цвета */
      --color-primary: rgba(222, 184, 135, 1);
      --color-white: rgba(255, 255, 255, 1);
      --color-black: rgba(0, 0, 0, 1);
      --color-red: rgba(255, 0, 0, 1);
      --color-green: rgba(60, 179, 113, 1);
      --color-gold: rgba(255, 204, 0, 1);
      
      /* прозрачные бгшки */
      --bg-transparent: rgba(0, 0, 0, 0);
      --bg-transparent-light: rgba(0, 0, 0, 0.1);
      --bg-transparent-medium: rgba(0, 0, 0, 0.15);
      --bg-transparent-dark: rgba(0, 0, 0, 0.2);
      --bg-transparent-darker: rgba(0, 0, 0, 0.3);
      --bg-white-opaque: rgba(255, 255, 255, 1);
      --bg-white-light: rgba(255, 255, 255, 0.1);
      --bg-white-medium: rgba(255, 255, 255, 0.2);
      --bg-white-dark: rgba(255, 255, 255, 0.3);
      --bg-red-light: rgba(255, 0, 0, 0.1);
      --bg-red-medium: rgba(255, 0, 0, 0.15);
      --bg-green-light: rgba(60, 179, 113, 0.1);
      --bg-green-medium: rgba(60, 179, 113, 0.2);
      --bg-gold-light: rgba(255, 204, 0, 0.1);
      --bg-gold-medium: rgba(255, 204, 0, 0.2);
      --bg-gray-light: rgba(128, 128, 128, 0.2);
      --bg-gray-medium: rgba(176, 176, 176, 0.7);
      
      /* бордеры */
      --border-width: 0.15rem;
      --border-radius-xs: 0.6rem;
      --border-radius-sm: 0.7rem;
      --border-radius-md: 1rem;
      --border-radius-lg: 1.1rem;
      --border-radius-xl: 1.2rem;
      --border-radius-xxl: 1.5rem;
      --border-radius-round: 2rem;
      
      /* цвета бордеров */
      --border-color-none: rgba(0, 0, 0, 1);
      --border-color-light: rgba(255, 255, 255, 0.05);
      --border-color-medium: rgba(255, 255, 255, 0.1);
      --border-color-dark: rgba(255, 255, 255, 0.2);
      --border-color-darker: rgba(255, 255, 255, 0.3);
      --border-color-red-light: rgba(255, 0, 0, 0.1);
      --border-color-red-medium: rgba(255, 0, 0, 0.2);
      --border-color-gold-light: rgba(255, 204, 0, 0.1);
      --border-color-gold-medium: rgba(255, 204, 0, 0.2);
      
      /* тени */
      --shadow-none: 0rem 0rem 0rem 0rem rgba(0, 0, 0, 0);
      --shadow-light: 0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4);
      --shadow-medium: 0rem 0rem 0.5rem 0.05rem rgba(0, 0, 0, 0.55);
      --shadow-dark: 0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75);
      --shadow-darker: 0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75);
      --shadow-darkest: 0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.6);
      
      /* внутренние тени */
      --shadow-inset-light: inset 0rem 0rem 0.25rem 0.05rem rgba(0, 0, 0, 0.2);
      --shadow-inset-medium: inset 0rem 0rem 0.25rem 0.05rem rgba(0, 0, 0, 0.3);
      --shadow-inset-dark: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.3);
      --shadow-inset-darker: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);
      
      /* комбинированные тени */
      --shadow-combined-light: var(--shadow-light), var(--shadow-inset-light);
      --shadow-combined-medium: var(--shadow-medium), var(--shadow-inset-medium);
      --shadow-combined-dark: var(--shadow-dark), var(--shadow-inset-dark);
      --shadow-combined-darker: var(--shadow-darker), var(--shadow-inset-darker);
      --shadow-combined-darkest: var(--shadow-darkest), var(--shadow-inset-dark);
      
      /* мыло */
      --blur-xs: blur(0.1rem);
      --blur-sm: blur(0.2rem);
      --blur-md: blur(0.3rem);
      --blur-lg: blur(0.5rem);
      --blur-xl: blur(0.8rem);
      --blur-xxl: blur(1rem);
      --blur-xxxl: blur(2rem);
      
      /* основа с градиентами */
      --gradient-black: radial-gradient(50% 100% at 50% 100%, var(--color-black) 0%, var(--color-black) 0%);
      --gradient-transparent: radial-gradient(50% 100% at 50% 100%, var(--bg-transparent) 0%, var(--bg-transparent) 0%);
      --gradient-transparent-light: radial-gradient(50% 100% at 50% 100%, var(--bg-transparent-light) 0%, var(--bg-transparent-light) 0%);
      --gradient-transparent-medium: radial-gradient(50% 100% at 50% 100%, var(--bg-transparent-medium) 0%, var(--bg-transparent-medium) 0%);
      --gradient-transparent-dark: radial-gradient(50% 100% at 50% 100%, var(--bg-transparent-dark) 0%, var(--bg-transparent-dark) 0%);
      --gradient-transparent-darker: radial-gradient(50% 100% at 50% 100%, var(--bg-transparent-darker) 0%, var(--bg-transparent-darker) 0%);
      --gradient-white: radial-gradient(50% 100% at 50% 100%, var(--color-white) 0%, var(--color-white) 0%);
      --gradient-white-light: radial-gradient(50% 100% at 50% 100%, var(--bg-white-light) 0%, var(--bg-white-light) 0%);
      --gradient-white-medium: radial-gradient(50% 100% at 50% 100%, var(--bg-white-medium) 0%, var(--bg-white-medium) 0%);
      --gradient-white-dark: radial-gradient(50% 100% at 50% 100%, var(--bg-white-dark) 0%, var(--bg-white-dark) 0%);
      --gradient-red-light: radial-gradient(50% 100% at 50% 100%, var(--bg-red-light) 0%, var(--bg-red-light) 0%);
      --gradient-green-light: radial-gradient(50% 100% at 50% 100%, var(--bg-green-light) 0%, var(--bg-green-light) 0%);
      --gradient-gray-light: radial-gradient(50% 100% at 50% 100%, var(--bg-gray-light) 0%, var(--bg-gray-light) 0%);
      --gradient-gray-medium: radial-gradient(50% 100% at 50% 100%, var(--bg-gray-medium) 0%, var(--bg-gray-medium) 0%);
      
      /* основа с мыльными комбинациями */
      --glassmorphism-none: var(--gradient-transparent) var(--blur-lg);
      --glassmorphism-light: var(--gradient-transparent-light) var(--blur-lg);
      --glassmorphism-medium: var(--gradient-transparent-medium) var(--blur-lg);
      --glassmorphism-dark: var(--gradient-transparent-dark) var(--blur-lg);
      --glassmorphism-darker: var(--gradient-transparent-darker) var(--blur-lg);
      
      /* тень для шрифта */
      --text-shadow-gold: rgb(222, 184, 135) 1px 0px, rgb(222, 184, 135) 0px -1px 15px, rgb(222, 184, 135) -1px 0px, rgb(222, 184, 135) 0px 1px;
      
      /* шорткаты бордеров */
      --card-border-light: var(--border-width) solid var(--border-color-medium);
      --card-border-medium: var(--border-width) solid var(--border-color-dark);
      --card-border-dark: var(--border-width) solid var(--border-color-darker);
      
      /* фильтры */
      --filter-saturate-none: saturate(0);
      --filter-saturate-light: saturate(1);
      --filter-saturate-medium: saturate(1.5);
      --filter-drop-shadow-gold: drop-shadow(0rem 0rem 0.5rem rgba(255, 165, 0, 1));
    }
  `;

  const bsGlass = (opacity = "light", borderOpacity = "medium", radius = "md", blurStrength = "lg", shadowIntensity = "dark") => {
    return {
      background: `var(--gradient-transparent-${opacity})`,
      backdropFilter: `var(--blur-${blurStrength})`,
      border: `var(--border-width) solid var(--border-color-${borderOpacity})`,
      borderRadius: `var(--border-radius-${radius})`,
      boxShadow: `var(--shadow-none), var(--shadow-inset-${shadowIntensity})`
    };
  };

  const elements = [
    { /* logo аним фрейм */
      cssStyles: `
        @keyframes logoAnim {
          0%, 100% {transform: scale(0.7); filter: var(--filter-drop-shadow-gold)}
          50% {transform: scale(0.5); filter: drop-shadow(0rem 0rem 0.5rem rgba(255, 165, 0, 0))}}

        .LobbyLoaderComponentStyle-logo {animation: logoAnim 2s infinite; position: relative;}
      `
    },

    { /* fade аним фрейм */
      cssStyles: `
        @keyframes fadeIn {from {opacity: 0;} to {opacity: 1;}}

        .fade {animation: fadeIn 0.65s ease;}
      `
    },

    { /* scale аним фрейм */
      cssStyles: `
        @keyframes scaleIn {
          0% {transform: scale(0.9);}
          50% {transform: scale(1.025);}
          100% {transform: scale(1);}}

        .scale {animation: scaleIn 0.7s ease-in-out;}
      `
    },

    { /* slide аним фрейм */
      cssStyles: `
        @keyframes slideIn {
          0% {opacity: 0.5; transform: translateY(20%);}
          100% {opacity: 1; transform: translateY(0);}}

        .slideIn {animation: slideIn 0.4s ease-out;}
      `
    },

    { /* стилизация body */
      tag: ["QS"],
      selector: "body",
      styles:
        {
          background: "var(--color-black)"
        }
    },

    { /* стилизация канвас контейнера */
      tag: ["QS"],
      selector: ".BattleComponentStyle-canvasContainer",
      styles: 
        {
          animation: "fadeIn 1s"
        }
    },

    { /* фикс страницы ТСТО из-за стилизации body */
      tag: ["QS"],
      selector: "body > div.content-wrapper > main",
      styles:
        {
          background: "var(--color-black)"
        }
    },

    { /* стилизация общего блока */
      tag: ["QS"],
      selector: ".Common-container",
      styles:
        {
          background: "var(--gradient-black)"
        }
    },

    { /* стилизация первоначального экрана */
      tag: ["QS"],
      selector: ".Common-entranceGradient",
      styles:
        {
          background: "var(--gradient-black)"
        }
    },

    { /* стилизация первоначального экрана */
      tag: ["QS", "scale"],
      selector: ".MainEntranceComponentStyle-mainContainer",
      styles:
        {
          zIndex: "999"
        }
    },

    { /* стилизация раздела с челленджами */
      cssStyles: `
        div.QuestsChallengesComponentStyle-containerParametrsChallenge > div:nth-child(5) {
          display: none !important;
        }
      `
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "BHV", "fade"],
      selector: ".InputComponentStyle-input",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".SecuritySettingsComponentStyle-activation2FaButton",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "fade"],
      selector: ".SettingsComponentStyle-scrollingMenu",
      styles:
        {
          background: "var(--gradient-transparent)",
          overflow: "hidden auto"
        }
    },

    { /* стилизация чата в битве */
      tag: ["QS", "slide"],
      selector: ".BattleChatComponentStyle-inputContainerAllies",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xl)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
        }
    },

    { /* стилизация чата в битве */
      tag: ["QS", "slide"],
      selector: ".BattleChatComponentStyle-inputContainerAll",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xl)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
        }
    },

    { /* стилизация чата в битве */
      tag: ["QS"],
      selector: ".BattleChatComponentStyle-btnToggleTeamAllies",
      styles:
        {
          background: "var(--gradient-transparent)",
          borderRadius: "var(--border-radius-md)"
        }
    },

    { /* стилизация чата в битве */
      tag: ["QS"],
      selector: ".BattleChatComponentStyle-btnToggleTeamAll",
      styles:
        {
          background: "var(--gradient-transparent)",
          borderRadius: "var(--border-radius-md)"
        }
    },

    { /* стилизация таба в битве */
      tag: ["QS", "scale"],
      selector: ".BattleTabStatisticComponentStyle-containerInsideTeams",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
        }
    },

    { /* стилизация таба в битве */
      tag: ["QS", "scale"],
      selector: ".BattleTabStatisticComponentStyle-containerInsideResults",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
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
          background: "var(--gradient-transparent-medium)",
          backdropFilter: "var(--blur-xxxl)",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--shadow-inset-light)",
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
          background: "var(--gradient-white-light)",
          backdropFilter: "var(--blur-xxxl)",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--shadow-inset-light)",
          marginBottom: "0.50%",
          top: "0.5rem"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS", "slide"],
      selector: ".MatchmakingWaitComponentStyle-container",
      styles:
        {
          background: "var(--gradient-transparent-medium)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-darkest), var(--shadow-inset-dark)",
          left: "36vw",
          top: "8vw",
          width: "27.8vw",
          height: "7.4vw",
          zIndex: "5"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS", "fade"],
      selector: ".MatchmakingWaitComponentStyle-contentContainer",
      styles:
        {
          position: "absolute",
          transform: "scale(1.1)",
          top: "27%",
          width: "20.75rem"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS"],
      selector: "#root > div.MatchmakingWaitComponentStyle-container.slideIn > div.MatchmakingWaitComponentStyle-contentContainer > div.MatchmakingWaitComponentStyle-currentTimeContainer > div > span",
      styles:
        {
          fontSize: "1rem"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS"],
      selector: "div.MatchmakingWaitComponentStyle-container > div",
      styles:
        {
          background: "none"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS", "BHV", "fade"],
      selector: ".MatchmakingWaitComponentStyle-cancelButton",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--shadow-darkest), var(--shadow-inset-dark)",
          position: "absolute",
          right: "2%",
          top: "4rem",
          height: "3.5rem",
          width: "8rem"
        }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS"],
      selector: "div.MatchmakingWaitComponentStyle-cancelButton > span",
      styles:
        {
          margin: "0"
        }
    },

    { /* стилизация окна поиска битвы */
    tag: ["QS"],
    selector: "#root > div.Common-container > div.Common-blockCenter.MainScreenComponentStyle-containerForMenuGradient > div.Common-displayFlex > div > div.Common-backgroundImageContain",
    styles:
      {
        position: "absolute",
        top: "1.5rem",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация окна поиска битвы */
      tag: ["QS"],
      selector: "#root > div.Common-container > div.Common-blockCenter.MainScreenComponentStyle-containerForMenuGradient > div.Common-displayFlex > div > h3",
      styles:
        {
          top: "calc(50% - 0.5em + 2.438em)",
          color: "var(--color-white)"
        }
    },

    { /* стилизация раздела с битвами */
      cssStyles: `
        .InputComponentStyle-blurBackground {
          display: none !important;
        }
    `
    },

    { /* стилизация раздела с битвами */
      cssStyles: `
        .UsersTableStyle-scrollCommandTable:hover {
          scrollbar-width: thin !important;
        }
      `
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".Common-backgroundImageCover.modeLimitIcon",
      styles:
        {
          border: "var(--border-width) solid var(--border-color-none)",
          borderRadius: "var(--border-radius-xl)",
          boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
        }
    },

    { /* стилизация раздела с битвами */
    tag: ["QSA", "BHV", "scale", "scale3d"],
    selector: ".BattleCreateComponentStyle-blockCard .Common-flexStartAlignStretchColumn .Common-backgroundImageCover",
    styles:
      {
        border: "var(--border-width) solid var(--border-color-none)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
    tag: ["QSA", "BHV", "scale", "scale3d"],
    selector: ".BattleCreateComponentStyle-scrollBattlePick .Common-flexStartAlignStretchColumn .blockCard",
    styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
      cssStyles: `
        .ProBattlesComponentStyle-borderLineCell {
          border-left: none !important;
        }
      `
    },

    { /* стилизация увед точек */
      tag: ["QSA", "fade"],
      selector: ".MainScreenComponentStyle-new.FooterComponentStyle-marginEllips",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед точек в настройках */
      tag: ["QSA", "fade"],
      selector: "li.SettingsMenuComponentStyle-menuItemOptions > div.ItemNotificationMarkerStyle-base",
      styles:
        {
          filter: "var(--filter-saturate-none)",
          top: "15%"
        }
    },

    { /* стилизация увед точек */
      tag: ["QSA", "fade"],
      selector: ".ItemNotificationMarkerStyle-base",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед количества в режимах */
      tag: ["QSA", "fade"],
      selector: ".ScrollingCardsComponentStyle-cardCount",
      styles:
        {
          background: "var(--gradient-white)",
        }
    },

    { /* стилизация увед количества каток в разделе с битвами */
      tag: ["QSA", "fade"],
      selector: ".FormatsSectionComponentStyle-numberBattles",
      styles:
        {
          background: "var(--gradient-white)",
        }
    },

    { /* стилизация увед точек */
      tag: ["QSA", "fade"],
      selector: "div.MenuComponentStyle-battleTitleCommunity > div > span",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед скидок */
      tag: ["QSA", "fade"],
      selector: ".Common-discount",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед скидок */
      tag: ["QSA", "fade"],
      selector: ".SquarePriceButtonComponentStyle-discountLabel",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед скидок */
      tag: ["QSA", "fade"],
      selector: ".SuppliesComponentStyle-discountLabel",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация увед скидок */
      tag: ["QS", "fade"],
      selector: "div.GarageCommonStyle-animatedBlurredLeftBlock > div > img",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* фикс стилизации гаража */
      tag: ["QS"],
      selector: ".TanksPartComponentStyle-descriptionContainer > .GarageCommonStyle-animatedBlurredLeftBlock",
      styles:
        {
          backdropFilter: "none"
        }
    },

    { /* стилизация увед скидок */
      tag: ["QSA", "fade"],
      selector: ".GarageCommonStyle-discountLabel",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация кнопки забрать все в контах */
      tag: ["QS", "BHV", "fade"],
      selector: ".SuperMissionComponentStyle-buttonCollect",
      styles: bsGlass("light", "dark", "lg", "lg", "light")
    },

    { /* стилизация шапки новостного меню */
      tag: ["QS"],
      selector: ".NewsComponentStyle-header",
      styles:
        {
          background: "var(--gradient-transparent)"
        }
    },

    { /* стилизация бесполезной модалки с гс */
      tag: ["QS"],
      selector: "#modal-root > div > .Common-flexCenterAlignCenter > .Common-flexCenterAlignCenter",
      styles: 
        {
          border: "none"
        }
    },

    { /* стилизация новостного меню */
      tag: ["QS"],
      selector: ".NewsComponentStyle-newsWindow",
      styles:
        {
          background: "var(--gradient-transparent-darker)",
          borderRight: "var(--border-width) solid var(--border-color-dark)",
          animation: "fadeIn 0.3s ease-in-out"
        }
    },

    { /* стилизация новостного меню */
      tag: ["QSA"],
      selector: ".NewsComponentStyle-newsItemContainer",
      styles:
        {
          background: "var(--gradient-transparent)"
        }
    },

    { /* стилизация новостного меню */
      tag: ["QSA"],
      selector: "div.NewsComponentStyle-newsItemDate > img",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация новостного меню */
      tag: ["QS", "fade"],
      selector: ".NewsComponentStyle-closeArea",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)"
        }
    },

    { /* стилизация шапки блока с чатом */
      tag: ["QS", "fade"],
      selector: ".ChatComponentStyle-upMenu",
      styles:
        {
          background: "var(--gradient-transparent-dark)",
          backdropFilter: "var(--blur-lg)"
        }
    },

    { /* стилизация ресайз полоски с чатом */
      tag: ["QS"],
      selector: ".ChatComponentStyle-chatResize",
      styles:
        {
          background: "var(--gradient-white-dark)",
          backdropFilter: "var(--blur-lg)"
        }
    },

    { /* стилизация блока с чатом */
      tag: ["QS", "BHV"],
      selector: ".ChatComponentStyle-channelSelect",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-xl)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xs)",
          boxShadow: "var(--shadow-inset-dark)",
        }
    },

    { /* стилизация блока с чатом */
      tag: ["QS"],
      selector: ".ChatComponentStyle-chatWindow",
      styles:
        {
          background: "var(--gradient-transparent-darker)",
          backdropFilter: "var(--blur-xxl)",
          animation: "fadeIn 0.3s ease-in-out"
        }
    },

    { /* стилизация сообщений в блоке с чатом */
      tag: ["QSA", "BHV", "scale"],
      selector: ".ChatComponentStyle-messageRow",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-xl)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "12px",
          boxShadow: "var(--shadow-inset-dark)",
        }
    },

    { /* стилизация блока с чатом */
      tag: ["QS", "fade"],
      selector: ".ChatComponentStyle-closeArea",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)"
        }
    },

    { /* стилизация логотипа в шапке */
      tag: ["QS"],
      selector: ".UserInfoContainerStyle-blockForIconTankiOnline",
      styles:
        {
          display: "none"
        }
    },

    { /* стилизация кнопки играть в главном меню */
      tag: ["QS", "BHV", "scale", "scale3d"],
      selector: ".MainScreenComponentStyle-playButtonContainer",
      styles:
        {
          background: "var(--gradient-transparent-medium)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-round) var(--border-radius-round) var(--border-radius-round) var(--border-radius-round)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
          position: "fixed",
          height: "5.4vw",
          width: "28vw",
          top: "2vw",
          left: "36vw"
        }
    },

    { /* стилизация кнопки играть в главном меню */
      cssStyles: `
        .MainScreenComponentStyle-playButtonContainer > span, .MainScreenComponentStyle-playButtonContainer > h3 {
          color: var(--color-white) !important;
        }
      `
    },

    {	/* стилизация разделов в главном меню */
      tag: ["QSA", "BHV", "fade", "scale3d"],
      selector: ".PrimaryMenuItemComponentStyle-itemCommonLi.PrimaryMenuItemComponentStyle-menuItemContainer",
      styles:
        {
          background: "var(--gradient-transparent-dark)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-round)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
          marginBottom: "1vw",
          height: "5vw",
          width: "20vw",
          right: "1.88vw",
          bottom: "5.1rem"
        }
    },

    {	/* стилизация разделов в главном меню */
      tag: ["QSA", "fade"],
      selector: "#root > div > div.Common-blockCenter.MainScreenComponentStyle-containerForMenuGradient > div.MainScreenComponentStyle-blockMainMenu > ul > li > div",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация разделов в главном меню */
      tag: ["QSA", "fade"],
      selector: ".PrimaryMenuItemComponentStyle-notificationIconNewNews",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация иконок в табе */
      tag: ["QSA", "fade"],
      selector: ".Common-maskImageContain.BattleTabStatisticComponentStyle-colorIconBattleOptions",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация нижних разделов в лобби */
    tag: ["QS"],
    selector: ".FooterComponentStyle-footer",
    styles:
      {
        height: "10rem"
      }
    },

    { /* стилизация нижних разделов в лобби */
      tag: ["QS", "fade"],
      selector: "#root > div > div.Common-blockCenter.MainScreenComponentStyle-containerForMenuGradient > footer > ul",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-round)",
          boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          position: "absolute",
          bottom: "1.5vw",
          left: "-1.95vw",
          width: "20.4vw"
        }
    },

    { /* стилизация нижних разделов в лобби */
      tag: ["QSA", "BHV", "fade", "scale3d"],
      selector: ".FooterComponentStyle-containerMenu",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-light)",
          borderRadius: "4.5rem",
          boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
          marginRight: "0.6rem",
          width: "4.5rem",
          height: "4.5rem",
          bottom: "0.150rem",
          left: "0.250vw",
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация промежуточного загрузочного экрана */
      tag: ["QS", "fade"],
      selector: ".LobbyLoaderComponentStyle-container",
      styles:
      {
        background: "var(--gradient-transparent-darker)",
        backdropFilter: "var(--blur-lg)"
      }
    },

    { /* стилизация диалоговых окон */
      tag: ["QS", "scale"],
      selector: ".DialogContainerComponentStyle-container",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        outline: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация диалоговых окон */
      tag: ["QS", "BHV", "fade"],
      selector: ".DialogContainerComponentStyle-keyButton, #modal-root > div > div > .Common-flexStartAlignStartColumn > .Common-flexEndAlignCenter > :nth-child(1)",
      styles:
      {
        background: "var(--gradient-red-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация диалоговых окон */
      tag: ["QS", "BHV", "fade"],
      selector: ".DialogContainerComponentStyle-enterButton, #modal-root > div > div > .Common-flexStartAlignStartColumn > .Common-flexEndAlignCenter > :nth-child(3)",
      styles:
      {
        background: "var(--gradient-green-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QS"],
      selector: ".MainScreenComponentStyle-containerPanel",
      styles:
      {
        background: "none",
        border: "none"
          /* backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderBottomLeftRadius: "var(--border-radius-round)",
          borderBottomRightRadius: "var(--border-radius-round)",
          width: "99.7%",
          boxShadow: "var(--shadow-inset-dark)" */
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QS", "fade"],
      selector: ".MainScreenComponentStyle-containerPanel .UserInfoContainerStyle-blockLeftPanel",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-round)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        position: "fixed",
        left: "2vw",
        width: "33rem",
        height: "5.2vw",
        top: "2vw"
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QS", "fade"],
      selector: ".MainScreenComponentStyle-containerPanel .UserScoreComponentStyle-blockRightPanel",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-round)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        position: "fixed",
        right: "2vw",
        width: "33rem",
        height: "5.2vw",
        top: "2vw"
      }
    },

    { /* стилизация шапки в главном меню игры */
    tag: ["QSA"],
    selector: ".UserScoreComponentStyle-addCoinCrystal",
    styles:
      {
        position: "initial"
      }
    },

    { /* стилизация элементов в главном меню игры */
      tag: ["QS"],
      selector: ".ChallengeTimerComponentStyle-textTime",
      styles:
      {
        background: "var(--gradient-white)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        height: "1.3rem",
        transform: "scale(0.94)"
      }
    },

    { /* стилизация элементов в главном меню игры/заданках */
    tag: ["QSA"],
    selector: ".BattlePickComponentStyle-timerButton, .MainQuestComponentStyle-commonBlockTimerButton",
    styles:
      {
        background: "var(--gradient-white)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация элементов в главном меню игры */
      tag: ["QSA"],
      selector: ".PrimaryMenuItemComponentStyle-discountNotification",
      styles:
      {
        background: "var(--gradient-white)",
        borderRadius: "var(--border-radius-md)",
        height: "1.7rem",
        transform: "scale(0.94)",
        right: "2rem"
      }
    },

    { /* стилизация раздела с битвами */
    tag: ["QS"],
    selector: ".IconStyle-iconAddBattle",
    styles:
      {
        background: "var(--gradient-white)"
      }
    },

    { /* стилизация раздела с битвами */
    tag: ["QS"],
    selector: ".ProBattlesComponentStyle-createBattleButton > h3",
    styles:
      {
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация раздела с битвами */
    tag: ["QS", "fade"],
    selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn",
    styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "none",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none)",
        marginBottom: "0.8rem"
      }
    },

    { /* стилизация раздела с битвами */
      cssStyles: `
        .BattleInfoComponentStyle-blockSelectedOptionsSettings {
          box-shadow: none !important;
        }
      `
    },

    { /* стилизация раздела с битвами */
    tag: ["QS"],
    selector: ".BattleInfoComponentStyle-selectBattle.Common-backgroundImageCover.Common-backgroundImage",
    styles:
      {
        background: "none"
      }
    },

    { /* стилизация раздела с битвами */
    tag: ["QS", "RHV"],
    selector: ".BattleModesComponentStyle-button .Common-flexCenterAlignCenter, .Common-flexStartAlignStartColumn .BattleModesComponentStyle-button, .BattleModesComponentStyle-fund",
    styles: {}
    },

    { /* стилизация раздела с битвами */
    tag: ["QSA", "RHV"],
    selector: ".BattleOptionsSectionComponentStyle-checkBoxSettingsCreateBattle .Common-flexSpaceBetweenAlignCenter",
    styles:
      {
        borderBottom: "none"
      }
    },

    { /* стилизация элементов в главном меню игры */
      tag: ["QS"],
      selector: ".AnnouncementHomeScreenComponentStyle-headerTimer",
      styles:
      {
        background: "var(--gradient-white)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        height: "1.3rem",
        transform: "scale(0.94)"
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QSA", "RHV"],
      selector: ".HeaderCommonStyle-icons",
      styles:
      {
        justifyContent: "center",
        border: "none"
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QS"],
      selector: "div.UserScoreComponentStyle-blockRightPanel > div",
      styles:
      {
        flexDirection: "initial"
      }
    },

    { /* стилизация шапки во всех меню игры */
      tag: ["QS"],
      selector: ".BreadcrumbsComponentStyle-rightButtonsContainer > div",
      styles:
        {
          transform: "scale(1.1)",
          flexDirection: "initial"
        }
    },

    { /* стилизация шапки в магазе */
      tag: ["QS"],
      selector: ".BreadcrumbsComponentStyle-rightButtonsContainer",
      styles:
        {
          height: "auto"
        }
    },

    { /* стилизация шапки в магазе */
      cssStyles: `
        .UserScoreComponentStyle-coinsContainer {
          margin: 0 !important;
          border: none !important;
        }

        .UserScoreComponentStyle-coinBlock {
          margin-right: 0.7em !important;
        }

        .HeaderCommonStyle-icons > span {
          margin-right: 0.7em !important;
        }

        .HeaderCommonStyle-icons > .UserScoreComponentStyle-coinBlock > .UserScoreComponentStyle-coinIcon {
          margin-top: 0.3em !important;
        }

        .UserScoreComponentStyle-addRubyCrystal {
          position: initial !important;
        }

        .BreadcrumbsComponentStyle-rightButtonsContainer > div:nth-child(2) {
          flex-direction: initial !important;
        }
      `
    },

    { /* стилизация шапки во всех меню игры */
      tag: ["QS", "fade"],
      selector: ".BreadcrumbsComponentStyle-headerContainer",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "0px solid var(--border-color-medium)",
      }
    },

    { /* стилизация туториал всплывашек */
      tag: ["QS", "fade"],
      selector: ".TutorialModalComponentStyle-contentWrapper",
      styles:
      {
        background: "var(--gradient-transparent)",
        borderLeft: "var(--border-width) solid var(--border-color-medium)",
        animation: "none"
      }
    },

    { /* стилизация туториал всплывашек */
      tag: ["QSA", "BHV", "fade"],
      selector: ".TutorialModalComponentStyle-navigationButton",
      styles: bsGlass("dark", "medium", "lg")
    },

    { /* стилизация лобби-меню в главном меню */
      tag: ["QS", "slide"],
      selector: ".InvitationWindowsComponentStyle-commonItem",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xxl)",
        top: "8vw",
        left: "2vw",
        width: "33rem",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
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
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        width: "60%"
      }
    },

    { /* стилизация кланового диалогового окна */
    tag: ["QS"],
    selector: ".ClanCreateComponentStyle-rectangle",
    styles:
      {
        background: "none"
      }
    },

    { /* стилизация кланового диалогового окна */
    tag: ["QS"],
    selector: ".ClanCreateComponentStyle-descriptionInfo",
    styles:
      {
        background: "none"
      }
    },

    { /* стилизация кланового диалогового окна */
    tag: ["QS"],
    selector: ".ClanCreateComponentStyle-containerButtons",
    styles:
      {
        background: "none"
      }
    },

    { /* стилизация чекбоксов */
      cssStyles: `
        .CheckBoxStyle-checkbox > label > span:not(#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span) {
          background: var(--gradient-transparent-light);
          border: var(--border-width) solid var(--border-color-dark);
          border-radius: var(--border-radius-xl);
        }

        .CheckBoxStyle-checkbox > label > span:not(#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span)::before {
          background: var(--gradient-white);
          margin-top: 0.2rem;
          border-radius: 5rem;
          height: 1.1rem;
          width: 1rem;
        }
      `
    },

    { /* стилизация меню челленджа */
      tag: ["QS", "BHV", "fade", "scale3d"],
      selector: ".BattlePassLobbyComponentStyle-menuBattlePass",
      styles:
      {
        background: "var(--gradient-transparent-medium)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        position: "absolute",
        margin: "0",
        top: "16.9rem",
        right: "2vw"
      }
    },

    { /* стилизация меню челленджа */
      tag: ["QSA"],
      selector: ".BattlePassLobbyComponentStyle-blockBattlePass",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "none",
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
        background: "var(--gradient-transparent)",
        borderLeft: "var(--border-width) solid var(--border-color-medium)"
      }
    },

    { /* стилизация ивентового меню челленджа */
      tag: ["QS", "BHV", "fade", "scale3d"],
      selector: ".EventBattlePassLobbyComponentStyle-buttonEventBattlePass",
      styles:
      {
        background: "var(--gradient-transparent-medium)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        position: "absolute",
        top: "33rem",
        width: "21.5rem",
        right: "2vw"
      }
    },

    { /* стилизация ивентового меню челленджа */
      tag: ["QS"],
      selector: ".EventBattlePassLobbyComponentStyle-commonBlockProgressBar",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация ивентового блока */
    tag: ["QS"],
    selector: ".AnnouncementComponentStyle-extContent",
    styles:
      {
        zIndex: "1"
      }
    },

    { /* стилизация рекламного блока в мейн меню */
      tag: ["QS", "BHV", "fade", "scale3d"],
      selector: ".AnnouncementHomeScreenComponentStyle-mainContainer",
      styles:
      {
        background: "var(--gradient-transparent-medium)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)",
        bottom: "2.79rem"
      }
    },

    { /* стилизация анонс блока в главном меню */
      cssStyles: `
        .AnnouncementHomeScreenComponentStyle-announceContainer {
          background: linear-gradient(rgba(0, 25, 38, 0) 0%, rgb(0, 25, 38) 100%) !important;
          border: none !important;
          border-radius: 0rem !important;
          transform: none !important;
        }
      `
    },

    { /* стилизация рекламного блока в мейн меню */
      cssStyles: `
        .AnnouncementHomeScreenComponentStyle-announceDescriptionContainer {
          border-top-left-radius: 0.85rem !important;
          border-top-right-radius: 0.85rem !important;
        }
      `
    },

    { /* стилизация рекламного блока в мейн меню */
      tag: ["QS"],
      selector: "#root > div > div.AnnouncementHomeScreenComponentStyle-mainContainer > div.Common-flexCenterAlignCenterColumn",
      styles:
      {
        borderBottomLeftRadius: "var(--border-radius-md)",
        borderBottomRightRadius: "var(--border-radius-md)",
        background: "var(--gradient-transparent-light)"
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
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-xxl)",
        border: "var(--border-width) solid var(--border-color-light)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-dark), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация кнопки купить прем */
      tag: ["QS", "BHV", "fade"],
      selector: ".UserTitleComponentStyle-premiumButton",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none)"
      }
    },

    { /* стилизация кнопки в шапке с премом в главном меню игры */
      tag: ["QS", "RHV"],
      selector: "#root > div > div.Common-flexStartAlignStart > div.MainScreenComponentStyle-containerPanel > div.UserInfoContainerStyle-blockLeftPanel > div > div",
      styles:
      {
        background: "none",
        border: "none",
        boxShadow: "none"
      }
    },

    { /* стилизация шапки в главном меню игры */
      tag: ["QS", "RHV"],
      selector: ".UserInfoContainerStyle-blockLeftPanel .UserInfoContainerStyle-containerProgressMainScreen",
      styles:
      {
        position: "absolute",
        left: "18rem"
      }
    },

    { /* стилизация выпадающих менюшек*/
      tag: ["QS", "slide"],
      selector: ".ContextMenuStyle-menu",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-md)",
        border: "var(--border-width) solid var(--border-color-light)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-darker), var(--shadow-inset-dark)"
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
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-dark), var(--shadow-inset-dark)",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация карточек в режимах битв */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".Common-flexSpaceBetweenAlignCenterColumn.descriptionMode.blockCard",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "20px",
        backdropFilter: "var(--blur-xxl)",
        boxShadow: "var(--shadow-dark), var(--shadow-inset-darker)",
      }
    },

    { /* стилизация хоткеев */
      tag: ["QSA", "fade"],
      selector: ".MainQuestComponentStyle-timerData",
      styles:
        {
          background: "var(--gradient-white)",
          borderRadius: "var(--border-radius-lg)"
        }
    },

    { /* стилизация хоткеев */
      tag: ["QSA", "fade"],
      selector: ".HotKey-commonBlockForHotKey",
      styles:
      {
        borderRadius: "var(--border-radius-lg)",
        transform: "scale(0.94)"
      }
    },

    { /* стилизация хоткеев */
      tag: ["QSA", "fade"],
      selector: ".HotKey-inlineBlockForHotKey",
      styles:
        {
          borderRadius: "var(--border-radius-lg)",
          transform: "scale(0.94)"
        }
    },

    { /* стилизация хоткеев */
      tag: ["QS", "fade"],
      selector: ".ApplicationLoaderComponentStyle-helpChangeKey",
      styles:
      {
        borderRadius: "var(--border-radius-md)",
      }
    },

    { /* стилизация хоткеев */
      tag: ["QSA", "fade"],
      selector: ".Common-buttonQE",
      styles:
      {
        borderRadius: "var(--border-radius-lg)",
        transform: "scale(0.94)"
      }
    },

    { /* стилизация хоткеев */
      tag: ["QSA", "fade"],
      selector: "div.BreadcrumbsComponentStyle-backButton > h3",
      styles:
      {
        borderRadius: "var(--border-radius-lg)",
        transform: "scale(0.94)"
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
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "scale"],
      selector: ".ChangeOwnerDialogComponentStyle-container ",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          outline: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xl)",
          boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
        }
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ClanInvitationsItemComponentStyle-buttonReject",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS"],
      selector: ".ClanInvitationsComponentStyle-invitationsLine",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "scale"],
      selector: ".ClanInvitationsComponentStyle-invitationContent",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-dark), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS"],
      selector: ".ClanCommonStyle-content",
      styles:
        {
          background: "var(--gradient-transparent)"
        }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanInvitationsComponentStyle-buttonDeclineAll",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ClanCommonStyle-buttonSendRequest",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: "#modal-root > div > div > div.ClanCommonStyle-members.ClanInvitationsListComponentStyle-members > table > thead > tr",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA"],
      selector: "#modal-root > div > div > div.ClanCommonStyle-members.ClanInvitationsListComponentStyle-members > table > thead > tr *",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: "#root > div > div > div.ClanCommonStyle-members > table > thead > tr",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA"],
      selector: "#root > div > div > div.ClanCommonStyle-members > table > thead > tr *",
      styles:
        {
          background: "var(--gradient-transparent)"
        }
    },

    { /* стилизация раздела званок */
      tag: ["QS", "scale"],
      selector: ".UserProgressComponentStyle-modalWrapper",
      styles:
        {
          background: "var(--gradient-transparent-light)",
          backdropFilter: "var(--blur-lg)",
          border: "var(--border-width) solid var(--border-color-medium)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
          width: "72%"
        }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-progressLegendPlusGradient > .Common-flexCenterAlignCenter",
      styles:
        {
          textShadow: "var(--text-shadow-gold)",
          color: "rgba(0, 0, 0, 0.9)"
        }
    },

    { /* фикс стилизации модальных окон */
    tag: ["QS", "fade"],
    selector: "#modal-root > div > div.BattlePauseMenuDialogComponentStyle-wrapper, #modal-root > div > div.BattlePickComponentStyle-modeCards, #modal-root > div > div.TutorialModalComponentStyle-modalContainer",
    styles:
      {
        background: "none",
        backdropFilter: "none",
        border: "none",
        boxShadow: "none"
      }
  },

    { /* стилизация модальных окон */
      tag: ["QS", "scale"],
      selector: "#modal-root > div > div, #modal-root > div:nth-child(2) > .Common-flexSpaceBetweenAlignStartColumn", /* старый костыль #modal-root > div > .Common-flexSpaceBetweenAlignCenterColumn, #modal-root > div > .Need2FaDialogComponentStyle-container, #modal-root > div > .Common-flexCenterAlignCenter */
      styles:
        {
          background: "var(--gradient-transparent-dark)",
          backdropFilter: "var(--blur-md)",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-darkest), var(--shadow-inset-dark)",
          opacity: "1",
          outline: "none"
        }
    },

    { /* стилизация модальных окон */
      tag: ["QS", "scale"],
      selector: "#modal-root > div:nth-child(2) > .Common-flexSpaceBetweenAlignStartColumn", 
      styles:
        {
          background: "var(--gradient-transparent-dark)",
          backdropFilter: "var(--blur-md)",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-xxl)",
          boxShadow: "var(--shadow-darkest), var(--shadow-inset-dark)",
          opacity: "1",
          outline: "none"
        }
    },

    { /* стилизация карточек в кнопке играть */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".BattlePickComponentStyle-commonStyleBlock.cardImgEvents",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-darker)"
      }
    },

    { /* стилизация списка заявок в друзья */
      tag: ["QS", "fade"],
      selector: ".FriendRequestComponentStyle-cellName",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "-1%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },

    { /* стилизация списка заявок в друзья */
      tag: ["QS", "fade"],
      selector: ".FriendRequestComponentStyle-cellActions",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "-1%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },

    { /* стилизация списка заявок в друзья */
      tag: ["QSA", "BHV", "fade"],
      selector: ".TableComponentStyle-row",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "0.50%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },


    { /* стилизация кнопочек в списке заявок в друзья */
      tag: ["QSA", "BHV", "fade"],
      selector: ".FriendRequestComponentStyle-buttonDecline",
      styles:
      {
        background: "var(--gradient-red-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "0.50%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },

    { /* стилизация кнопочек в списке заявок в друзья */
      tag: ["QSA", "BHV", "fade"],
      selector: ".FriendRequestComponentStyle-buttonAccept",
      styles:
      {
        background: "var(--gradient-green-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "0.50%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
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
        background: "var(--gradient-red-medium)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "0.50%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },

    { /* стилизация кнопочек в списке заявок в друзья */
      tag: ["QS"],
      selector: ".FriendRequestComponentStyle-buttonDeclineAllInvisible",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "0.50%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
      }
    },

    { /* стилизация списка друзей */
      tag: ["QSA", "BHV", "fade"],
      selector: ".FriendListComponentStyle-blockList.nickNameClass",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "-1%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
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
          background: rgba(222, 184, 135, 0.3) !important;
          backdrop-filter: var(--blur-xs);
        }

        div.UserInfoContainerStyle-containerProgressMainScreen > div.Common-flexStartAlignStartColumn::after {
          background: var(--color-primary) !important;
          filter: var(--filter-saturate-medium) var(--filter-drop-shadow-gold);
          box-shadow: var(--color-primary) 0em 0em 0.275em 0em;
        }

        .UserInfoContainerStyle-xpIcon {
          filter: var(--filter-saturate-none);
        }

        div.UserInfoContainerStyle-progressValue {
          color: var(--color-white) !important;
        }

        div.UserInfoContainerStyle-progressValue > span {
          color: var(--color-white) !important;
        }
      `
    },

    { /* стилизация прогресса возле званки */
      cssStyles: `
        /* LGBT animation */
        td.BattleTabStatisticComponentStyle-gsCell > span.GearScoreStyle-bestGS.bgClipText, div.TankParametersStyle-marginBlockGear > span.GearScoreStyle-bestGS, span.GearScoreStyle-bestGS.bgClipText {
          color: rgba(255,255,255,0.1);
          background: #ed8080;
          background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ed8080), color-stop(16%,#2a77d6), color-stop(32%,#5eb524), color-stop(48%,#eacd25), color-stop(64%,#ed8080), color-stop(80%,#2a77d6), color-stop(100%,#5eb524));
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-repeat: no-repeat;
          background-position: top left;
          background-color: #222;
          animation:LGBT infinite 3s linear;
        }

        @keyframes LGBT {
          0% {
            background-position: top left;
          }
          100% {
            background-position: top right;
          }
        }
      `
    },

    { /* стилизация списка друзей */
      tag: ["QSA"],
      selector: ".FriendListComponentStyle-substrateRhombus",
      styles:
      {
        background: "var(--gradient-transparent)",
        boxShadow: "var(--shadow-none)",
      }
    },

    { /* стилизация кнопочек в разделе друзей */
      tag: ["QS", "fade", "BHV"],
      selector: ".FriendListComponentStyle-buttonCloseAddFriends",
      styles: bsGlass("light", "dark", "xl", "lg", "darker")
    },

    { /* стилизация кнопочек в разделе друзей */
      tag: ["QS", "fade", "BHV"],
      selector: ".FriendListComponentStyle-buttonAddFriends",
      styles: bsGlass("light", "dark", "xl", "lg", "darker")
    },

    { /* стилизация кнопочек в разделе друзей */
      tag: ["QS"],
      selector: "div.FriendListComponentStyle-containerButtonFriends > div > img",
      styles:
      {
        filter: "brightness(10) var(--filter-saturate-none)"
      }
    },

    { /* стилизация кнопочек в разделе друзей */
      tag: ["QS", "fade"],
      selector: ".FriendListComponentStyle-buttonDisableAdd",
      styles: bsGlass("light", "dark", "xl", "lg", "darker")
    },

    { /* стилизация списка друзей в инвайт меню */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-flexStartAlignCenter.Common-whiteSpaceNoWrap.nickNameClass",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "-1%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация списка друзей в инвайт меню */
      tag: ["QSA", "fade"],
      selector: ".Common-flexStartAlignCenter.Common-whiteSpaceNoWrap",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        marginBottom: "-1%",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация списка друзей в инвайт меню */
      tag: ["QSA"],
      selector: ".InvitationWindowsComponentStyle-substrateRank",
      styles:
      {
        background: "var(--gradient-transparent)",
        boxShadow: "var(--shadow-none)"
      }
    },

    { /* стилизация кнопочек в инвайт меню */
      tag: ["QS", "BHV", "fade"],
      selector: ".InvitationWindowsComponentStyle-backButton",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация кнопочек в инвайт меню */
      tag: ["QSA", "BHV", "fade"],
      selector: ".InvitationWindowsComponentStyle-inviteButton",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация полосы поиска */
      tag: ["QSA", "fade", "BHV"],
      selector: ".SearchInputComponentStyle-searchInput .Font-normal",
      styles: bsGlass("light", "dark", "xl", "sm", "darker")
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "fade", "BHV", "scale3d"],
      selector: ".SettingsMenuComponentStyle-menuItemOptions",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        backdropFilter: "var(--blur-sm)",
        boxShadow: "var(--shadow-medium), var(--shadow-inset-dark)",
        width: "17rem",
        height: "3rem",
        marginBottom: "0.7rem",
        top: "3.8rem"
      }
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".GameSettingsStyle-button",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".KeyboardSettingsComponentStyle-buttonResetAllKeys",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "BHV", "fade"],
      selector: ".KeyboardSettingsComponentStyle-keyInput",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "BHV", "fade"],
      selector: ".AccountSettingsComponentStyle-buttonChangesOptions",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".AccountSettingsComponentStyle-buttonConnectOptions",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "BHV", "fade"],
      selector: "div.AccountSettingsComponentStyle-blockChangePassword > div > input, .SecuritySettingsComponentStyle-codeInputBlock > div > div > input[type=text]",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".AccountSettingsComponentStyle-buttonCaptchaOptions",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".TwitchSettingsRendersStyle-button",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: "div.AccountSettingsComponentStyle-containerFormOptions > div > div.AccountSettingsComponentStyle-blockInputEmail > input",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "fade"],
      selector: "div.AccountSettingsComponentStyle-containerFormOptions:nth-child(1) > form > div",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела настроек */
      tag: ["QSA", "BHV", "fade"],
      selector: ".KeyMappingWithIconComponentStyle-commonBlockSupplies",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация ползунков в разделе настроек */
      tag: ["QSA", "fade"],
      selector: ".InputRangeComponentStyle-range",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        backdropFilter: "var(--blur-sm)"
      }
    },

    { /* стилизация активного раздела */
      cssStyles: `
        .InputRangeComponentStyle-range::-webkit-slider-thumb {
          background: var(--gradient-white) !important;
          border-radius: var(--border-radius-md) !important;
        }
      `
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".SecuritySettingsComponentStyle-button",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".KeyMappingWithIconComponentStyle-overdrives",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела настроек */
      tag: ["QS", "BHV", "fade"],
      selector: ".SettingsButtonsComponentStyle-buttonsWidthBackReset",
      styles:
      {
        background: "var(--gradient-red-light)",
        border: "var(--border-width) solid var(--border-color-red-medium)",
        borderRadius: "var(--border-radius-xl)",
        backdropFilter: "var(--blur-sm)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
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
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация выпадающего списка */
      tag: ["QSA", "slide", "BHV"],
      selector: ".VerticalScrollStyle-outerContainerStyle .Common-flexStartAlignCenter",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        marginBottom: "0.4rem"
      }
    },

    { /* стилизация активного раздела */
      cssStyles: `
        .Common-activeMenu {
          color: var(--color-primary) !important;
          animation: fadeIn 0.3s ease-in-out;
        }

        .MenuComponentStyle-mainMenuItem:hover {
          color: var(--color-primary) !important;
        }

        .Common-menuItemActive {
          background: var(--color-primary) !important;
          box-shadow: var(--color-primary) 0rem 0rem 0.375rem !important;
          filter: drop-shadow(var(--color-primary) 0rem 0rem 0.5rem) !important;
          animation: scaleIn 0.7s ease-in-out;
        }

        .MenuComponentStyle-commonBlock > span {
          background: none !important;
          animation: fadeIn 0.3s ease-in-out;
        }

        .MenuComponentStyle-commonBlock > span {
          background: none !important;
          animation: fadeIn 0.3s ease-in-out;
        }

        div.MenuComponentStyle-battleTitleCommunity > div > div > div > span {
          background: none !important;
          animation: fadeIn 0.3s ease-in-out;
        }
      `
    },

    { /* стилизация заголовка раздела */
      cssStyles: `
        div.BreadcrumbsComponentStyle-breadcrumbs > div > span {
          color: var(--color-primary) !important;
        }
      `
    },

    { /* стилизация кнопок в битве */
      tag: ["QSA", "fade", "BHV"],
      selector: ".BattleHudComponentStyle-hudButton",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)",
      }
    },

    { /* стилизация всплывающих сообщений в битве */
    tag: ["QS"],
    selector: ".BattleMessagesComponentStyle-container",
    styles:
      {
        alignItems: "flex-start",
        paddingLeft: "1.1rem"
      }
    },

    { /* стилизация всплывающих сообщений в битве */
      tag: ["QSA"],
      selector: ".BattleMessagesComponentStyle-message",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "0.1rem solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)"
      }
    },

    { /* стилизация кнопочек в менюшке паузы */
      tag: ["QSA", "BHV", "fade"],
      selector: ".BattlePauseMenuComponentStyle-menuButton.BattlePauseMenuComponentStyle-enabledButton",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)",
        height: "4rem",
        justifyContent: "center"
      }
    },

    { /* стилизация кнопочек в менюшке паузы */
      tag: ["QSA", "fade"],
      selector: ".BattlePauseMenuComponentStyle-menuButton.BattlePauseMenuComponentStyle-disabledButton",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)",
        height: "4rem",
        justifyContent: "center"
      }
    },

    { /* стилизация кнопочек в менюшке паузы */
      tag: ["QS", "fade", "BHV"],
      selector: ".BattlePauseMenuComponentStyle-redMenuButton",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-red-light)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)",
        height: "4rem",
        justifyContent: "center"
      }
    },

    { /* стилизация меню паузы */
      tag: ["QS", "fade"],
      selector: ".BattlePauseMenuComponentStyle-blackGlobalWrapper",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        backdropFilter: "var(--blur-md)"
      }
    },

    { /* стилизация меню паузы */
      tag: ["QS", "scale"],
      selector: ".BattlePauseMenuDialogComponentStyle-content",
      styles:
      {
        display: "flex",
        justifyContent: "center"
      }
    },

    { /* стилизация меню паузы */
      tag: ["QS", "fade"],
      selector: ".BattlePauseMenuComponentStyle-wrapperTimer",
      styles:
      {
        position: "absolute",
        top: "94%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "999"
      }
    },

    { /* стилизация меню паузы */
      tag: ["QS", "fade"],
      selector: ".BattlePauseMenuComponentStyle-container",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        gap: "0.5rem",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        padding: "3.5rem",
        boxShadow: "var(--shadow-darkest), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация окна с полученной званкой */
      tag: ["QS", "scale"],
      selector: ".RankupComponentStyle-wrapper",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-xl)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-light), var(--shadow-inset-light)",
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
      styles: bsGlass("light", "dark", "xl", "lg", "light")
    },

    { /* стилизация заданок в ммной стате */
      tag: ["QSA", "BHV", "fade"],
      selector: ".BattleResultQuestProgressComponentStyle-container-true",
      styles: bsGlass("light", "dark", "xl", "lg", "light")
    },

    { /* стилизация заданок в ммной стате */
      tag: ["QSA", "BHV", "fade"],
      selector: ".BattleResultQuestProgressComponentStyle-container-false",
      styles: bsGlass("light", "dark", "xl", "lg", "light")
    },

    { /* стилизация ммной статы */
      tag: ["QS", "fade"],
      selector: ".BattleResultUserInfoComponentStyle-progressVictoryContainer",
      styles: bsGlass("light", "dark", "xl", "lg", "light")
    },

    { /* стилизация ммной статы */
    tag: ["QSA"],
    selector: ".GearScoreStyle-bestGsLight",
    styles:
      {
        marginRight: "0"
      }
    },

    { /* стилизация ммной статы */
    tag: ["QSA"],
    selector: "td.BattleKillBoardComponentStyle-col2 > span.GearScoreStyle-bestGS.bgClipText",
    styles:
      {
        marginRight: "0.649em"
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
        background: "var(--gradient-gray-light)",
        backdropFilter: "var(--blur-md)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация списка игроков в ммной стате */
      tag: ["QSA", "BHV", "fade"],
      selector: "#blueCommand",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-md)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация списка игроков в ммной стате */
      tag: ["QSA", "BHV", "fade"],
      selector: "#enemyCommand",
      styles:
      {
        background: "var(--gradient-red-light)",
        backdropFilter: "var(--blur-md)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация кнопочки купить премиум в ммной стате */
      tag: ["QS", "BHV", "fade"],
      selector: "#root > div > div > div.BattleRewardsComponentStyle-commonBlockButtonRewards > div > div > div",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)",
        width: "30%"
      }
    },

    { /* стилизация навигационных кнопочек в ммной стате */
      tag: ["QSA", "BHV", "fade"],
      selector: ".BattleResultNavigationComponentStyle-button",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация навигационных кнопочек в ммной стате */
      tag: ["QS", "BHV", "fade"],
      selector: "div.Common-flexCenterAlignCenter.BattleResultNavigationComponentStyle-buttonNextWithTimer.BattleResultNavigationComponentStyle-buttonWithTimer.Common-flexCenterAlignCenterColumn.Common-displayFlexColumn.Common-displayFlex.Common-alignCenter",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация навигационных кнопочек в ммной стате */
      tag: ["QS", "fade"],
      selector: ".BattleResultNavigationComponentStyle-disabledButtonWithTimer",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
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
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS", "fade"],
      selector: ".ContainersComponentStyle-possibleRewardsBlock",
      styles: bsGlass("light", "dark", "md")
    },

    {  /* стилизация раздела с контейнерами */
    tag: ["QS", "fade"],
    selector: ".DeviceButtonComponentStyle-blockAlterations",
    styles:
      {
        alignItems: "flex-start"
      }
    },

    { /* стилизация раздела с контейнерами */
    tag: ["QS"],
    selector: ".ContainersComponentStyle-navigationBlockForCategories",
    styles:
      {
        borderBottom: "none"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QSA", "BHV"],
      selector: "div.ContainersComponentStyle-rewards > div",
      styles: bsGlass("light", "dark", "md", "lg", "light")
    },

    { /* стилизация раздела с контейнерами и гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".DeviceButtonComponentStyle-blockAlterations .Common-flexCenterAlignCenter",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS", "BHV", "fade"],
      selector: ".ContainersComponentStyle-moreButton",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS"],
      selector: ".ContainersComponentStyle-rewards",
      styles:
      {
        justifyContent: "center"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS"],
      selector: ".ContainersComponentStyle-navigationBlock",
      styles:
      {
        borderBottom: "none"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS", "fade"],
      selector: ".ContainerInfoComponentStyle-lootBoxDescriptionContainer",
      styles:
      {
        background: "none",
        borderRight: "none"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS"],
      selector: ".ContainersComponentStyle-leftPane",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS"],
      selector: ".ContainersComponentStyle-rightPane",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS", "fade"],
      selector: ".ContainersComponentStyle-containers",
      styles:
      {}
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ContainerInfoComponentStyle-possibleRewardsContainer .Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация дропа с контейнеров */
      tag: ["QSA", "BHV", "fade"],
      selector: ".RewardCardComponentStyle-smoothAppearance",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация дропа с контейнеров */
      tag: ["QSA", "BHV", "fade"],
      selector: ".RewardCardComponentStyle-fastAppearance",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация дропа с контейнеров */
      tag: ["QSA", "BHV", "scale"],
      selector: "#root > div > div > div.AnimationOpenContainerComponentStyle-rewardWrapper > div.AnimationOpenContainerComponentStyle-rewardContainer > div.Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация дропа с контейнеров */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClosedContainerStyle-moreButton",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация дропа с контейнеров */
      tag: ["QS"],
      selector: ".AnimationOpenContainerComponentStyle-receivedReward",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale"],
      selector: ".ScrollingCardsComponentStyle-scrollCard.cardImg",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      cssStyles: `
        .Common-flexCenterAlignCenter.SuperMissionComponentStyle-buttonDisable.Common-flexCenterAlignCenter.Common-displayFlex.Common-alignCenter > span {
          text-wrap: wrap !important;
        }
      `
    },
    { /* стилизация раздела с миссиями */
      tag: ["QS", "RHV", "fade"],
      selector: ".ProBattlesComponentStyle-commonBlockHotkeyV",
      styles:
      {
        border: "none",
        borderRadius: "var(--border-radius-lg)",
        transform: "scale(0.94)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QS", "fade"],
      selector: "div.QuestsComponentStyle-emptyList0 > h2",
      styles:
      {
        background: "var(--gradient-white)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QS", "fade"],
      selector: ".TableMainQuestComponentStyle-commonBlockTimerButtonTable",
      styles:
      {
        background: "var(--gradient-white)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с контейнерами */
      tag: ["QS", "fade"],
      selector: "div.ContainerInfoComponentStyle-lootBoxContainer > div > div > h2",
      styles:
      {
        background: "var(--gradient-white)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-inset-light)"
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
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "fade"],
      selector: ".SuperMissionComponentStyle-rewardsContainer .Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "lg", "lg", "light")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "fade"],
      selector: ".MainQuestComponentStyle-rewardsContainer .Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "lg", "lg", "light")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "fade"],
      selector: ".TableMainQuestComponentStyle-rewardsContainerTable .Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "lg", "lg", "light")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "fade"],
      selector: ".MainQuestComponentStyle-rewardsInDescriptionModal .Common-flexCenterAlignCenterColumn",
      styles: bsGlass("light", "dark", "lg", "lg", "light")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QS", "BHV", "fade"],
      selector: ".MainQuestComponentStyle-buttonContainer",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QS", "BHV", "fade"],
      selector: ".MainQuestComponentStyle-containerButtonStore",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "scale"],
      selector: ".MainQuestComponentStyle-cardRewardGiven",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "fade"],
      selector: ".TableMainQuestComponentStyle-cardRewardGivenTable",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QS", "fade"],
      selector: ".MainQuestComponentStyle-needRank",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".MainQuestComponentStyle-colorCardPlay",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".MainQuestComponentStyle-commonCard",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "fade"],
      selector: ".TableMainQuestComponentStyle-cardLockedTable",
      styles: bsGlass("light", "dark", "lg")
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
      tag: ["QSA", "BHV", "scale"],
      selector: ".ContractCardComponentStyle-card",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale"],
      selector: ".ContractCardComponentStyle-card > div:nth-child(6) > .Common-flexCenterAlignCenter",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA"],
      selector: ".ContractCardComponentStyle-card > .Common-backgroundImageContain",
      styles:
      {
        background: "none",
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".MainQuestComponentStyle-cardPlay",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "fade"],
      selector: ".MainQuestComponentStyle-cardPlayCommon",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".MainQuestComponentStyle-cardRewardCompleted",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "fade"],
      selector: ".TableMainQuestComponentStyle-cardRewardCompletedTable",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с миссиями */
      tag: ["QSA", "BHV", "fade"],
      selector: ".MainQuestComponentStyle-cardCommonLocked",
      styles: bsGlass("light", "dark", "lg")
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
      tag: ["QS", "slide"],
      selector: ".NotificationViewStyle-commonBlockNotification",
      styles: bsGlass("light", "dark", "xxl", "lg", "light")
    },

    { /* стилизация всплывающего инфо-окна */
      tag: ["QSA", "BHV", "fade"],
      selector: "div.NotificationViewStyle-commonBlockButtonYesNo > div",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация всплывающего инфо-окна */
      tag: ["QSA"],
      selector: "div.NotificationViewStyle-commonBlockButtonYesNo > div > p",
      styles:
      {
        borderRadius: "0.7rem",
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
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".TankParametersStyle-parametersBlockGear .Common-flexStartAlignCenter",
      styles:
        {
          filter: "var(--filter-saturate-none)"
        }
    },

    { /* стилизация гаража */
      tag: ["QSA"],
      selector: ".TankParametersStyle-parametersBlockGear",
      styles:
        {
          border: "none"
        }
    },

    { /* стилизация гаража */
      tag: ["QS"],
      selector: ".TankParametersStyle-marginBlockGear",
      styles:
        {
          borderBottom: "0.150em solid rgba(255, 255, 255, 0.25)"
        }
    },

    { /* стилизация гаража */
          tag: ["QSA"],
          selector: ".MountedItemsStyle-resistanceContainer",
          styles:
              {
                  zIndex: "99"
              }
          },

    { /* стилизация гаража */
    tag: ["QS"],
    selector: "div > div.GarageMainScreenStyle-blockParameters > div > div.Common-flexStartAlignStartColumn.CssCommonAnimations-appearFromLeft",
    styles:
      {
        bottom: "4.8rem"
      }
    },

    { /* стилизация гаража */
      tag: ["QS", "BHV", "fade"],
      selector: "div.GarageSuppliesComponentStyle-containerButtons > div > div.GarageSuppliesComponentStyle-check",
      styles:
      {
        backgroundSize: "initial",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.9rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QS", "BHV", "fade"],
      selector: "div.GarageSuppliesComponentStyle-containerButtons > div > div.GarageSuppliesComponentStyle-checkDown",
      styles:
      {
        backgroundSize: "initial",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.9rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QS", "BHV", "fade"],
      selector: ".MountedItemsStyle-commonBlockDrone",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)",
        width: "47%"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".SkinCellStyle-widthHeight",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация гаража */
      tag: ["QS", "fade"],
      selector: ".GarageCommonStyle-positionContentAlteration .Common-flexSpaceBetweenAlignStartColumn",
      styles:
      {
        background: "var(--gradient-transparent)",
        borderRight: "none"
      }
    },

    { /* стилизация гаража */
      tag: ["QS", "BHV", "fade"],
      selector: ".MountedItemsStyle-commonBlockGrenades",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)",
        width: "47%"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".MountedItemsComponentStyleMobile-commonBlockForTurretsHulls",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".MountedItemsComponentStyleMobile-commonBlockForTurretsHulls",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".MountedItemsStyle-commonForCellResistenceName",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".GarageProtectionsComponentStyle-equipmentResistance",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-flexCenterAlignCenter.Common-borderRadius4px",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".SuppliesComponentStyle-cellAdd",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QS", "fade"],
      selector: "#root > div > div.GarageCommonStyle-garageContainer > div.GarageCommonStyle-positionContent > div.GarageMainScreenStyle-blockParameters > div.TanksPartBaseComponentStyle-tankPartContainer > div > div.TanksPartComponentStyle-tankPartUpgrades.GarageCommonStyle-animatedBlurredRightBlock",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QS", "fade"],
      selector: "#root > div > div > div.GarageCommonStyle-garageContainer > div.GarageCommonStyle-positionContent > div.GarageMainScreenStyle-blockParameters > div.TanksPartBaseComponentStyle-tankPartContainer > div > div.TanksPartComponentStyle-tankPartUpgrades.GarageCommonStyle-animatedBlurredRightBlock",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QS", "BHV", "fade"],
      selector: "div.GarageSuppliesComponentStyle-containerButtons > div > input",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QS", "fade"],
      selector: "div.TanksPartComponentStyle-descriptionContainer > div.GarageCommonStyle-animatedBlurredLeftBlock > div:nth-child(2)",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QS", "fade"],
      selector: ".TanksPartComponentStyle-blockForImageResistanceModule",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".SquarePriceButtonComponentStyle-commonBlockButton",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация гаража */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-itemStyle.garage-item",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".ListItemsComponentStyle-itemsListContainer.CssCommonAnimations-appearFromBottom",
      styles:
      {
        background: "transparent"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA"],
      selector: ".ListItemsComponentStyle-itemsListContainer .Common-flexCenterAlignCenter",
      styles:
      {
        background: "transparent"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".GarageProtectionsComponentStyle-iconEquipResist",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".MountedItemsStyle-improvementArrow",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".SkinCellStyle-mountIcon",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".MountedItemsStyle-improvementArrow",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".MountedItemsStyle-improvementArrow",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация гаража */
      tag: ["QSA", "fade"],
      selector: ".GarageItemComponentStyle-improvementArrow",
      styles:
      {
        filter: "var(--filter-saturate-none)"
      }
    },



    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: ".ClanHeaderComponentStyle-blockInform",
      styles: bsGlass("light", "dark", "lg", "lg", "dark")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: "#root > div > div > div.ClanCommonStyle-center.ClanCommonStyle-marginContent > div > div.ClanInfoComponentStyle-clanForeignActions > div.Common-flexCenterAlignCenter",
      styles: bsGlass("light", "dark", "lg", "lg", "dark")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: ".ClanInfoComponentStyle-clanActionDescription",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: ".ClanInfoComponentStyle-messageClan",
      styles: bsGlass("light", "dark", "lg", "lg", "dark")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanInvitationsComponentStyle-sendButton",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanProfileEditComponentStyle-clanDescriptionEdit",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ClanProfileEditComponentStyle-buttonCancel",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "fade"],
      selector: ".ClanProfileEditComponentStyle-containerParametersClanBlockInform",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanInfoComponentStyle-buttonEditProfile",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanInfoComponentStyle-clanForeignActions > div > .Common-flexCenterAlignCenter",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: "#root > div > div > div.FriendListComponentStyle-containerMembers > table > thead > tr",
      styles: bsGlass("light", "dark", "md", "lg", "dark")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA"],
      selector: "#root > div > div > div.FriendListComponentStyle-containerMembers > table > thead > tr *",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ClanCommonStyle-row",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        marginBottom: "0.4rem"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA"],
      selector: ".ClanCommonStyle-rowEmpty",
      styles:
      {
        background: "var(--gradient-transparent)"
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
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "BHV", "fade"],
      selector: ".ClanCommonStyle-buttonInvite",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "BHV", "fade"],
      selector: ".PopupMessageComponentStyle-buttonsContainer .Common-flexCenterAlignCenter",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с кланом */
      tag: ["QSA", "fade"],
      selector: ".ClanStatisticsComponentStyle-areCommon",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS"],
      selector: ".ClanHeaderComponentStyle-logo",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация раздела с кланом */
      tag: ["QS", "fade"],
      selector: ".ClanFounderComponentStyle-infoClan",
      styles:
      {
        marginLeft: "1.7em"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS"],
      selector: ".ApplicationLoaderComponentStyle-container",
      styles:
      {
        background: "var(--gradient-black)"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS"],
      selector: "#root > div.ApplicationLoaderComponentStyle-container.Common-flexCenterAlignCenterColumn > div:nth-child(1)",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS"],
      selector: ".ApplicationLoaderComponentStyle-loader",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS", "scale"],
      selector: ".ApplicationLoaderComponentStyle-logo",
      styles:
      {
        zIndex: "999"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS", "scale"],
      selector: "div.ApplicationLoaderComponentStyle-container.Common-flexCenterAlignCenterColumn > div.Common-flexCenterAlignCenter",
      styles:
      {
        zIndex: "999"
      }
    },

    { /* стилизация загрузочного экрана */
      tag: ["QS", "scale"],
      selector: ".ApplicationLoaderComponentStyle-helpChangeTip",
      styles:
      {
        zIndex: "999"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QSA", "BHV", "scale"],
      selector: ".UserProgressComponentStyle-progressItemCompleted",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QSA", "BHV", "scale"],
      selector: ".UserProgressComponentStyle-progressItemUncompleted",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-rankProgressBarContainerRanks .Common-flexStartAlignStart",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-rankProgressBarContainerRanks .UserProgressComponentStyle-rankProgressBarGained",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QSA", "BHV", "fade"],
      selector: ".UserProgressComponentStyle-itemContainer",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS", "BHV", "fade"],
      selector: ".UserProgressComponentStyle-buyPremium .Common-flexCenterAlignCenter",
      styles: bsGlass("light", "dark", "lg")
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-buyPremium .Common-flexCenterAlignCenter > span",
      styles:
      {
        position: "absolute",
        left: "2.2rem"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-buyPremiumText",
      styles:
      {
        position: "absolute",
        width: "50rem",
        top: "1rem",
        left: "13rem",
        marginLeft: "3em"
      }
    },

    { /* стилизация магаза */
      tag: ["QSA"],
      selector: ".SuccessfulPurchaseComponentStyle-borderLineItemSuccessfulPurchase",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".ScrollBarStyle-leftScrollArrow",
      styles:
      {
        background: "var(--gradient-transparent)",
        /* width: "0rem",
        boxShadow: "-0.3rem 0rem 0.5rem 0.08rem rgba(0, 0, 0, 1)",
        left: "-0.2rem" */
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".ScrollBarStyle-rightScrollArrow",
      styles:
      {
        background: "var(--gradient-transparent)",
        /* width: "0rem",
        boxShadow: "-0.3rem 0rem 0.5rem 0.08rem rgba(0, 0, 0, 1)",
        right: "-0.2rem" */
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-progressLegendPlus",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-progressLegendPlusImage",
      styles:
      {
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация раздела званок */
      tag: ["QS"],
      selector: ".UserProgressComponentStyle-progressLegendPlusGradient",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-flexStartAlignCenter.Common-flexWrapNowrap.modeLimitIcon",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        width: "99%",
        marginBottom: "0.50%"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-emptyBattlesList",
      styles:
      {
        marginRight: "-24.5rem",
        transform: "scale(1.3)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-mainContainer .Common-flexStartAlignCenterColumn .Common-flexStartAlignStartColumn",
      styles:
      {
        borderRight: "none"
      }
    },

    { /* стилизация гаража */
    cssStyles: `
        .GarageSuppliesComponentStyle-check {
            width: 6rem !important;
            height: 2.7rem !important;
          }

        .GarageSuppliesComponentStyle-checkDown {
          width: 6rem !important;
          height: 2.7rem !important;
        }
      `
    },

    { /* стилизация раздела с битвами */
    cssStyles: `
        #root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn {
          border-left: none !important;
        }
      `
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-navigationBlock",
      styles:
      {
        borderBottom: "none"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".BattleModesComponentStyle-blockModesFilter .Common-flexCenterAlignCenter",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "none",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".BattleCreateComponentStyle-mainContainer .Common-flexStartAlignCenterColumn .Common-flexStartAlignStartColumn .Common-flexCenterAlignCenter",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "none",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA"],
      selector: ".MainSectionComponentStyle-transformLinearGradientImgCard",
      styles:
      {
        borderRadius: "0.8rem"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".InformationComponentStyle-blockCard",
      styles:
      {
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-none)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA"],
      selector: ".MainSectionComponentStyle-linearGradientImgCard",
      styles:
      {
        borderRadius: "var(--border-radius-md)",
        bottom: "-0.1rem",
        width: "100.2%"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA"],
      selector: ".BattleModesComponentStyle-blockModesFilter .Common-flexCenterAlignCenter .Common-maskImageContain",
      styles:
      {
        position: "static",
        border: "none",
        borderRadius: "none"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-createBattleButton",
      styles:
      {
        background: "var(--gradient-transparent)",
        borderTop: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-mainContainer .Common-flexStartAlignCenterColumn",
      styles:
      {
        background: "var(--gradient-transparent)",
        borderRight: "none",
        marginBottom: "1rem"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".BattleInfoComponentStyle-customOptions",
      styles:
      {
        border: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".BattleInfoComponentStyle-invite",
      styles:
      {
        border: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".BattleOptionsSectionComponentStyle-checkBoxSettingsCreateBattle .Common-flexSpaceBetweenAlignCenter",
      styles:
      {
        border: "none"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".ProBattlesComponentStyle-rightPanel",
      styles:
      {
        border: "none"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS"],
      selector: "div.FormatsSectionComponentStyle-selectedCard > div:nth-child(4)",
      styles:
      {
        background: "linear-gradient(0deg, rgb(200 200 200 / 50%) 0%, rgba(118, 255, 51, 0) 100%)",
        borderTop: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA"],
      selector: "div.FormatsSectionComponentStyle-unSelectedCard > div:nth-child(4)",
      styles:
      {
        borderTop: "none",
      }
    },

    { /* стилизация раздела с режимами */
      tag: ["QSA"],
      selector: "div.ScrollingCardsComponentStyle-scrollCard > div:nth-child(4)",
      styles:
      {
        borderTop: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".FormatsSectionComponentStyle-card",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-lg)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA"],
      selector: ".BattleCreateComponentStyle-blockCard .Common-flexStartAlignStretchColumn .Common-backgroundImageCover .MapCardComponentStyle-linearGradient",
      styles:
      {
        borderRadius: "0.8rem",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "BHV", "fade"],
      selector: "div.BattleCreateComponentStyle-commonInputButtons.ProBattleCommonStyleMobile-commonInputButtons > form > div > input",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "fade"],
      selector: "div.MainSectionComponentStyle-parameters > div > input",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".TierItemComponentStyle-receivedItem > .PremiumTierItemComponentStyle-parametersTierCommon > h3, .TierItemComponentStyle-getItemNow > .PremiumTierItemComponentStyle-parametersTierCommon > h3",
      styles:
      {
        zIndex: "1",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS", "fade"],
      selector: ".BattleCreateComponentStyle-imagePrivate",
      styles:
      {
        zIndex: "1",
        filter: "var(--filter-saturate-none)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".MainSectionComponentStyle-commonBlockCheckBoxCreateBattle.ProBattleCommonStyleMobile-commonBlockCheckBoxCreateBattle",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "fade"],
      selector: ".SettingsComponentStyle-scrollCreateBattle.Common-scrollBarHoverVisible",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "none",
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QSA", "BHV", "fade"],
      selector: "#root > div > div.BattleCreateComponentStyle-mainContainer > div.ProBattlesComponentStyle-rightPanel.Common-flexSpaceBetween > div > div.Common-flexStartAlignStretchColumn > div > div.Common-flexCenterAlignCenter.Common-alignSelfFlexEnd",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация кнопок в разделе с битвами */
      tag: ["QS"],
      selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter.ProBattleCommonStyleMobile-buttonContainer",
      styles:
      {
        justifyContent: "flex-end"
      }
    },

    { /* стилизация кнопки войти за браво */
      tag: ["QS", "BHV", "fade"],
      selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter > div.Common-flexCenterAlignCenterColumn > div",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        width: "96%"
      }
    },

    { /* стилизация кнопки войти за альфа | дм */
      tag: ["QS", "BHV", "fade"],
      selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter > div",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        height: "95.5%"
      }
    },

    { /* стилизация кнопки войти за альфа | дм */
      tag: ["QS"],
      selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter.ProBattleCommonStyleMobile-buttonContainer > div.Common-flexCenterAlignCenter > div",
      styles:
      {
        background: "none",
        border: "none",
        boxShadow: "none"
      }
    },

    { /* стилизация кнопки войти за альфа | дм */
      tag: ["QS"],
      selector: "#root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter > div > div.Common-flexCenterAlignCenter.ButtonComponentStyle-disabled",
      styles:
      {
        background: "none",
        border: "none",
        boxShadow: "none"
      }
    },

    { /* стилизация кнопки запуска битвы */
      tag: ["QS", "BHV", "fade"],
      selector: "#root > div > div.BattleCreateComponentStyle-mainContainer > div.ProBattlesComponentStyle-rightPanel.Common-flexSpaceBetween > div > div.Common-flexCenterAlignCenter.JoinToBattleComponentStyle-buttonJoin.ProBattleCommonStyleMobile-buttonContainer",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        width: "95%"
      }
    },

    { /* стилизация кнопки запуска битвы */
      tag: ["QS"],
      selector: "#root > div > div.BattleCreateComponentStyle-mainContainer > div.ProBattlesComponentStyle-rightPanel.Common-flexSpaceBetween > div > div.Common-flexCenterAlignCenter.JoinToBattleComponentStyle-buttonJoin.ProBattleCommonStyleMobile-buttonContainer > span",
      styles:
      {
        color: "var(--color-white)"
      }
    },

    { /* стилизация списка игроков в разделе битв */
      tag: ["QSA", "BHV", "fade"],
      selector: ".UsersTableStyle-centerCell.UsersTableStyle-fontCell.UsersTableStyle-rowBattle",
      styles: { 
        ...bsGlass("light", "dark", "md", "lg", "dark"), 
        'margin-bottom': '0.3rem'
      },
    },

    { /* стилизация списка игроков в разделе битв */
      tag: ["QSA", "fade"],
      selector: ".UsersTableStyle-cellName.UsersTableStyle-rowBattleEmpty.UsersTableStyle-centerCell.UsersTableStyle-fontCell",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        marginBottom: "0.3rem"
      }
    },

    { /* стилизация списка игроков в разделе битв */
      tag: ["QSA", "BHV", "fade"],
      selector: ".UsersTableStyle-row.UsersTableStyle-rowBattle.UsersTableStyle-rowWidth",
      styles: { 
        ...bsGlass("light", "dark", "md", "lg", "dark"), 
        'margin-bottom': '0.3rem'
      },
    },

    { /* стилизация списка игроков в разделе битв */
      tag: ["QSA", "fade"],
      selector: ".UsersTableStyle-row.UsersTableStyle-rowBattleEmpty.UsersTableStyle-rowWidth",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        marginBottom: "0.3rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QS", "fade"],
      selector: ".Common-entranceGradient .Common-container",
      styles:
      {
        background: "var(--gradient-black)"
      }
    },

    { /* стилизация рег формы */
      tag: ["QSA", "BHV", "scale", "scale3d"],
      selector: ".HeaderComponentStyle-siteLink.menuItemClass",
      styles: bsGlass("light", "dark", "xl")
    },

    { /* стилизация рег формы */
      tag: ["QS", "BHV", "fade"],
      selector: "#email",
      styles: bsGlass("light", "dark", "xl", "sm")
    },

    { /* стилизация рег формы */
      tag: ["QS", "BHV", "fade"],
      selector: "#username",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        bottom: "0.3rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QSA", "BHV", "fade"],
      selector: "#password",
      styles: bsGlass("light", "dark", "xl", "sm")
    },

    { /* стилизация рег формы */
      tag: ["QSA", "BHV", "fade"],
      selector: "#password1",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        top: "0.3rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QSA", "BHV", "fade"],
      selector: ".EntranceComponentStyle-styleButtons",
      styles: bsGlass("light", "dark", "xl", "sm")
    },

    { /* стилизация рег формы */
      tag: ["QS", "BHV", "fade"],
      selector: "div.RegistrationComponentStyle-containerItem > input",
      styles: bsGlass("light", "dark", "xl", "sm")
    },

    { /* стилизация рег формы */
      tag: ["QS", "BHV", "fade"],
      selector: ".HeaderComponentStyle-blockForIconToggleSound",
      styles: bsGlass("light", "dark", "md", "sm")
    },

    { /* стилизация рег формы */
      tag: ["QSA"],
      selector: ".EntranceComponentStyle-styleButtons > span",
      styles:
      {
        color: "var(--color-white)"
      }
    },

    { /* стилизация рег формы */
      tag: ["QSA"],
      selector: "#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm.Common-flexCenterAlignCenter.Common-displayFlex.Common-alignCenter > form > div.RegistrationComponentStyle-containerItem > div.DropDownStyle-dropdownRoot.UidInputComponentStyle-dropDownRoot > div > div > div > div > span",
      styles:
      {
        color: "var(--color-white)"
      }
    },

    { /* стилизация рег формы */
      tag: ["QS"],
      selector: "#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm.Common-flexCenterAlignCenter.Common-displayFlex.Common-alignCenter > form > div.RegistrationComponentStyle-containerItem > div > div.Common-flexCenterAlignCenterColumn.EntranceComponentStyle-commonBlockMessageError.textError",
      styles:
      {
        top: "0.9rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QS"],
      selector: "#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm.Common-flexCenterAlignCenter.Common-displayFlex.Common-alignCenter > form > div > div:nth-child(2) > div.Common-flexCenterAlignCenterColumn.EntranceComponentStyle-commonBlockMessageError.textError",
      styles:
      {
        top: "1.45rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QS"],
      selector: "#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div > div:nth-child(2) > div.Common-flexCenterAlignCenterColumn.EntranceComponentStyle-commonBlockMessageError.textError",
      styles:
      {
        top: "0.9rem"
      }
    },

    { /* стилизация рег формы */
      tag: ["QS", "BHV", "fade"],
      selector: "#root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
      }
    },

    { /* стилизация рег формы */
      cssStyles: `
        #root > div > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div.EntranceComponentStyle-checkbox > div > label > span::before {
          filter: var(--filter-saturate-none);
        }
      `
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS"],
      selector: "#parallax-root > div.parallax",
      styles:
      {
        background: "black"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: ".navbar",
      styles:
      {
        background: "var(--gradient-transparent)",
        boxShadow: "var(--shadow-none)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "fade"],
      selector: ".generic-box.panel",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: ".generic-box.error-box",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".generic-box.profile-entity-card",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: ".generic-box.user-achievements",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "fade"],
      selector: ".generic-box.leaderboard",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "BHV", "fade"],
      selector: ".search-panel__input-wrapper > input",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.7rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".generic-selector__itself",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.7rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".search-panel__button-search",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.7rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "slide"],
      selector: ".my-favorites__list",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "0.7rem",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: ".progress-bar",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: "#app-root > main > div.generic-box.panel.stats-panel > section.stats-panel__foot > div.stats-panel__achievements-wrapper > div > div.stats-panel__achievements-bar-wrapper > div",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: ".progress-bar__bar",
      styles:
      {
        background: "var(--gradient-white-dark)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        position: "absolute",
        height: "1.5rem",
        left: "0.1rem"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "fade"],
      selector: "#app-root > main > div.generic-box.panel.stats-panel > section.stats-panel__foot > div.stats-panel__achievements-wrapper > div > div.stats-panel__achievements-bar-wrapper > div > div.progress-bar__bar",
      styles:
      {
        background: "var(--gradient-white-dark)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        position: "absolute",
        height: "1.55rem",
        bottom: "0.1rem",
        left: "0.1rem"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QS", "slide"],
      selector: ".lang-selector__list",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)"
      }
    },

    { /* стилизация сайта с рейтингами */
      tag: ["QSA", "fade"],
      selector: ".lang-selector__list-item",
      styles:
      {
        background: "var(--gradient-transparent)"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "fade"],
      selector: ".QuestsChallengesComponentStyle-maxTierBlock",
      styles:
      {
        borderLeft: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-maxTierBlockFree",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockGradient",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockImage",
      styles:
      {
        backgroundImage: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockGradientTiersCommon",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockGradientTiersPremium",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockGradientTiersEvent",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-tiers",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-premiumTier",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".EventBattlePassLobbyComponentStyle-commonBlockProgressBarChallenge",
      styles:
      {
        background: "none"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-flexCenterAlignCenterColumn.TierItemComponentStyle-receivedItemPremium",
      styles:
      {
        background: "var(--gradient-transparent-light)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-gold-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QSA", "fade"],
      selector: ".Common-flexCenterAlignCenterColumn.TierItemComponentStyle-tierPremium",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-gold-light)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        height: "11.92rem"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".Common-flexCenterAlignCenterColumn.TierItemComponentStyle-receivedItem",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "BHV", "fade"],
      selector: ".Common-flexCenterAlignCenterColumn.TierItemComponentStyle-getItemNow",
      styles: bsGlass("light", "dark", "md")
    },

    { /* стилизация разделов с челленджами */
      tag: ["QSA", "fade"],
      selector: ".Common-flexCenterAlignCenterColumn.TierItemComponentStyle-tierCommon",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)",
        height: "11.92rem"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "BHV", "fade"],
      selector: ".ChallengePurchaseComponentStyle-buttonBattlePass",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QSA", "BHV", "fade"],
      selector: ".ChallengeTierComponentStyle-blockTier .Common-flexCenterAlignCenterColumn",
      styles:
      {
        background: "var(--gradient-transparent)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-gold-medium)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-dark)"
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "fade"],
      selector: ".QuestsChallengesComponentStyle-eventTier",
      styles:
      {
        background: "none",
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS"],
      selector: ".QuestsChallengesComponentStyle-blockGradientEvent",
      styles:
      {
        background: "none",
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "fade"],
      selector: ".EventBattlePassLobbyComponentStyle-commonBlockProgressBarEvent",
      styles:
      {
        background: "none",
      }
    },

    { /* стилизация разделов с челленджами */
      tag: ["QS", "fade"],
      selector: ".QuestsChallengesComponentStyle-maxTierBlockEvent",
      styles:
      {
        borderLeft: "none"
      }
    },

    { /* стилизация увед окна с ошибкой */
      tag: ["QS", "slide"],
      selector: "#root > div.Common-container > div.Common-entranceGradient > div.Common-flexStartAlignStartColumn",
      styles:
      {
        background: "var(--gradient-gray-medium)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-inset-dark)",
        top: "auto",
        bottom: "3em",
        right: "3em",
        left: "auto"
      }
    },

    { /* стилизация избранных красок в гараже */
      tag: ["QSA", "BHV", "fade"],
      selector: ".PaintsCollectionComponentStyle-favoriteIconContainer",
      styles:
      {
        background: "var(--gradient-transparent-dark)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-round)",
        boxShadow: "var(--shadow-inset-dark)",
        width: "1.5rem",
        height: "1.5rem"
      }
    },

    { /* стилизация избранных красок в гараже */
      tag: ["QSA"],
      selector: ".PaintsCollectionComponentStyle-favoriteIconContainer > img",
      styles:
      {
        width: "1.5rem",
        height: "1.5rem"
      }
    },

    { /* стилизация таймеров в миссиях/магазе */
      tag: ["QSA"],
      selector: ".TableMainQuestComponentStyle-timerTable, .ContractCardComponentStyle-timer, .TimeLeftComponentStyle-timeLeftContainer, .ShowcaseItemComponentStyle-discountContainer > p",
      styles:
      {
        background: "var(--color-white)",
        borderRadius: "0.7rem",
        color: "black"
      }
    },

    { /* стилизация таймеров в миссиях */
      tag: ["QSA"],
      selector: ".MainQuestComponentStyle-timer",
      styles:
      {
        background: "var(--color-white)",
        borderRadius: "0.7rem"
      }
    },

    { /* стилизация таймеров в миссиях */
      tag: ["QSA"],
      selector: ".Common-headerTimer",
      styles:
      {
        background: "var(--color-white)",
        borderRadius: "0.7rem"
      }
    },

    { /* стилизация кнопки-иконки логов в битве */
      tag: ["QS", "slide"],
      selector: "#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div > div.Common-flexCenterAlignCenter",
      styles:
      {
        position: "absolute",
        right: "1.2rem"
      }
    },

    { /* стилизация чата в битве */
      cssStyles: `
        .BattleChatComponentStyle-inputContainerAll.slideIn > input {
            flex-grow: 0.8 !important;
        }
      `
    },

    { /* стилизация чата в битве */
      cssStyles: `
        .BattleChatComponentStyle-inputContainerAllies > input {
            flex-grow: 0.1 !important;
        }
      `
    },

    { /* стилизация чата в битве */
      cssStyles: `
        .BattleChatComponentStyle-inputContainerAll > input {
            flex-grow: 0.4 !important;
        }
      `
    },

    { /* стилизация раздела создания битвы */
      cssStyles: `
        #root > div > div.BattleCreateComponentStyle-mainContainer > div.ProBattlesComponentStyle-rightPanel.Common-flexSpaceBetween > div > div.MainSectionComponentStyle-commonBlockCheckBoxCreateBattle.ProBattleCommonStyleMobile-commonBlockCheckBoxCreateBattle > div:hover {
            scrollbar-width: thin !important;
        }
      `
    },

    { /* стилизация закупа припасов в гараже */
      tag: ["QS", "fade"],
      selector: ".SaleByKitStyle-commonBlockModal",
      styles:
      {
        background: "var(--gradient-transparent)",
        borderRight: "var(--border-width) solid var(--border-color-medium)"
      }
    },

    { /* стилизация закупа припасов в гараже */
      tag: ["QSA", "scale", "BHV"],
      selector: ".SaleByKitStyle-commonCard",
      styles:
      {
        background: "var(--gradient-transparent)",
        border: "var(--border-width) solid var(--border-color-medium)",
        borderRadius: "var(--border-radius-round)",
        boxShadow: "none"
      }
    },

    { /* стилизация чата в битве/стилизация списка никнеймов в друзьях/инвайтах/списка битв */
      cssStyles: `
        .UserGroupTitleButtonComponentStyle-commonBlockGroup, .FriendListComponentStyle-nickName, .InvitationWindowsComponentStyle-usersScroll > div > div > div:nth-child(2), .ProBattleCommonStyleMobile-blockModesFilter > div.Common-flexCenterAlignCenter > div.Common-flexStartAlignCenter > p, .BattleModesComponentStyle-button > div.Common-flexStartAlignCenter.BattleModesComponentStyle-fund > div.Common-flexStartAlignCenter:nth-child(2), .BattleModesComponentStyle-button > .Common-flexCenterAlignCenter, .BattleCreateComponentStyle-mainContainer.ProBattlesComponentStyle-mainContainer.Common-flexStartAlignStart > div.Common-flexStartAlignCenterColumn > div, .MapCardComponentStyle-message > span, .MapCardComponentStyle-imgSelectCard {
            filter: var(--filter-saturate-none) !important;
        }

        .FriendListComponentStyle-greenTextOnline, .InvitationWindowsComponentStyle-onlineLabel, .ProBattlesComponentStyle-createBattleButton > p, .FormatsSectionComponentStyle-selectedCard.cardImg > div.Common-flexCenterAlignCenterColumn > h2, .ClosedContainerStyle-moreButton > span, #root > div > div > div.BattleRewardsComponentStyle-commonBlockButtonRewards > div > div > div > div.Common-flexCenterAlignCenter > h2 {
          color: var(--color-primary) !important;
        }

        .FormatsSectionComponentStyle-unSelectedCard:hover > div:nth-child(4) > h2 {
          color: var(--color-primary) !important;
        }
      `
    },

    { /* стилизация раздела с битвами/раздела званий/карточек/гаража */
      cssStyles: `
        .ProBattleCommonStyleMobile-blockModesFilter .Common-maskImageContain, .ProBattlesComponentStyle-cellName span, .UserProgressComponentStyle-rankScore, .UserProgressComponentStyle-rankProgressBarContainerLegend, .BattlePickComponentStyle-blockForCrystalXP > div:nth-child(2), .Common-backgroundImageCover.modeLimitIcon > div.Common-flexSpaceBetweenAlignStretch > div > div > img, td.Common-flexSpaceBetweenAlignCenter.ProBattlesComponentStyle-cellName > div.Common-flexStartAlignCenter > img, .GarageCommonStyle-animatedBlurredRightBlock > div.Common-flexSpaceBetweenAlignStretch, .Common-flexCenterAlignCenterColumn.blockCard, .ProBattlesComponentStyle-commonBlockHotkeyV > div > div, .ProBattlesComponentStyle-chatIcon, .SkinCellStyle-nameDevices {
          filter: var(--filter-saturate-none) !important;
        }

        .MainQuestComponentStyle-messageReward {
          color: var(--color-primary) !important;
        }

        .iconsMission:hover .MainQuestComponentStyle-messageReward {
          color: transparent !important;
        }
      `
    },

    { /* стилизация раздела с битвами/инвайт меню */
      tag: ["QSA"],
      selector: ".Common-displayFlex .BattleCardComponentStyle-containerTicker span, .InvitationWindowsComponentStyle-inviteButton span",
      styles:
      {
        color: "rgb(255 206 142)"
      }
    },

    { /* стилизация раздела с битвами */
      tag: ["QS"],
      selector: "div.BattleCardComponentStyle-mapName > div.BattleCardComponentStyle-containerTicker.Common-displayFlex > span",
      styles:
      {
        color: "white"
      }
    },

    { /* стилизация раздела с друзьями */
      tag: ["QSA"],
      selector: ".FriendListComponentStyle-opacityText, .InvitationWindowsComponentStyle-battleLabel",
      styles:
      {
        marginTop: "0"
      }
    },

    { /* стилизация раздела с заданками */
      cssStyles: `
        .MainQuestComponentStyle-progress, .TableMainQuestComponentStyle-progressTableMission {
          filter: var(--filter-saturate-none) drop-shadow(0rem 0rem 0.2rem var(--color-white));
        }

        .MainQuestComponentStyle-scrollContainer {
          scrollbar-width: thin !important;
        }
      `
    },

    { /* стилизация ммной статы/кнопок навигации/челленджа/према */
      cssStyles: `
        .BattleResultQuestProgressComponentStyle-progressContainer, .BlockResultTankComponentStyle-gsContainer > img, .BattleResultUserInfoComponentStyle-containerProgress > .Common-displayFlexColumn, .BattleResultUserInfoComponentStyle-xp > img, .BattleRewardsComponentStyle-commonBlockButtonRewards > div > table > tr > td > img, .BattleResultNavigationComponentStyle-button > img, .HeaderComponentStyle-backArrowBlock, .BreadcrumbsComponentStyle-rightButtonsContainer > .Common-flexCenterAlignCenter > .Common-backgroundImageContain, .BreadcrumbsComponentStyle-iconLogout, .IconStyle-iconBackArrow, .IconStyle-iconLogOff, .TierItemComponentStyle-receivedItem > .TierIconComponentStyle-icons, .TierHeaderComponentStyle-descriptionTier {
          filter: var(--filter-saturate-none) !important;
        }

        .BattleResultQuestProgressComponentStyle-text:nth-child(2), .BattleResultUserInfoComponentStyle-rankNameContainer > span, .BattleResultUserInfoComponentStyle-xp > span, .BattleRewardsComponentStyle-commonBlockButtonRewards > div > table > tr > td:nth-child(2) > span, .BasePaymentComponentStyle-buttonContainer > div > span, .PaymentInfoComponentStyle-currency, .SuccessfulPurchaseComponentStyle-container > .Common-flexCenterAlignCenter > span, .SuccessfulPurchaseComponentStyle-content > .Common-flexCenterAlignCenter > span, .SuccessfulPurchaseComponentStyle-reward > .Common-flexEndAlignStartColumn > span, .ChallengePurchaseComponentStyle-spanStyleWidthHotKey > span, .UserTitleComponentStyle-premiumButton > span {
          color: var(--color-primary) !important;
        }

        .BattleResultUserInfoComponentStyle-containerProgress > .Common-displayFlexColumn::after {
          box-shadow: rgb(255, 188, 9) 0px 0px 0.575em 0px;
        }
      `
    },

    { /* стилизация раздела с заданками/клана */
      tag: ["QSA"],
      selector: ".MainQuestComponentStyle-cardPlay > div > h4, .MainQuestComponentStyle-commonDescriptionProgress > div > h4, .MainQuestComponentStyle-commonCard > div > h4, .ClanCommonStyle-onlineNickName, .ClanInfoComponentStyle-buttonEditProfile > span, .ClanMembersListComponentStyle-buyClanPlaceButton > span, .ClanCommonStyle-buttonInvite > span, .TutorialModalComponentStyle-mediaContainer.MainQuestComponentStyle-mediaContainer > div > h2, .MainQuestComponentStyle-buttonContainer > span, .ClanStatisticsComponentStyle-areCommonSpanOnline, .ClanInvitationsComponentStyle-sendButton > span, .ClanInfoComponentStyle-clanForeignActions > div.Common-flexCenterAlignCenter:nth-child(3) > span",
      styles:
      {
        color: "var(--color-primary)"
      }
    },

    { /* стилизация раздела с настройками/заданками */
      tag: ["QSA"],
      selector: ".GameSettingsStyle-button > span, .SettingsComponentStyle-slider > p > span, .TwitchSettingsRendersStyle-button > span, .TwitchSettingsRendersStyle-nick, .ChatComponentStyle-chatRegularUser, .MainQuestComponentStyle-cardRewardCompleted.iconsMission.MainQuestComponentStyle-animationImgHover> div.Common-flexCenterAlignCenterColumn > h4, .SuperMissionComponentStyle-buttonCollect > span, .SecuritySettingsComponentStyle-button > span, .SecuritySettingsComponentStyle-activation2FaButton > span",
      styles:
      {
        color: "var(--color-primary)"
      }
    },

    { /* стилизация раздела с гаражом*/
      tag: ["QSA"],
      selector: ".GarageItemComponentStyle-descriptionDevice > div > .Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap",
      styles:
      {
        color: "rgba(239, 239, 239, 1)",
      }
    },

    { /* стилизация раздела с гаражом*/
      tag: ["QSA"],
      selector: ".GarageItemComponentStyle-amountItemsScroll",
      styles:
        {
          color: "rgb(255, 188, 9)",
          background: "transparent",
          textShadow: "rgb(255, 204, 0) 0px 0px 0.375em",
        }
    },

    { /* стилизация раздела с гаражом */
      tag: ["QSA"],
      selector: ".GarageItemComponentStyle-descriptionDevice > h2, .GarageCommonStyle-animatedBlurredRightBlock > div > div > h2:nth-child(2)",
      styles:
      {
        color: "var(--color-primary)",
        textShadow: "rgb(255, 204, 0) 0px 0px 0.375em",
        zIndex: "9"
      }
    },

    { /* стилизация раздела с гаражом */
      tag: ["QSA"],
      selector: ".SquarePriceButtonComponentStyle-commonBlockButton > .Common-flexEndAlignEnd > span, .ItemDescriptionComponentStyle-textModal > a > u, .TutorialModalComponentStyle-navigationButton > span, .GarageCommonStyle-animatedBlurredRightBlock > div.Common-displayFlexColumn > div > span.Font-bold.Common-flexEnd.Common-whiteSpaceNoWrap, .TanksPartComponentStyle-tankPartUpgrades.GarageCommonStyle-animatedBlurredRightBlock > div > div > span",
      styles:
      {
        color: "var(--color-primary)"
      }
    },

    { /* стилизация контекстного меню/чата/клана */
      cssStyles: `
        .ContextMenuStyle-menuItem.ContextMenuStyle-menuItemRank > div > div > div > span, #root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn > div.Common-flexStartAlignCenter > div > span, .ChatComponentStyle-channelSelect {
          color: var(--color-primary) !important;
        }

        .ClanCommonStyle-offlineNickName {
          color: rgb(167, 167, 167) !important;
        }
      `
    },

    { /* стилизация раздела с контами */
      cssStyles: `
        .DeviceButtonComponentStyle-blockAlterations > div > span {
          color: var(--color-primary) !important;
        }

        .ContainersComponentStyle-countBlock > div, .TanksPartComponentStyle-amountItems {
          box-shadow: var(--color-primary) 0em 0em 1em 0em !important;
          background: var(--color-primary);
          background-color: var(--color-primary) !important;
        }
      `
    },

    { /* стилизация списка битв/всплывающего окна */
      tag: ["QSA"],
      selector: ".JoinToBattleComponentStyle-buttonJoin > span, .NotificationViewStyle-blockButtonAndTimer > div > div > span, .NotificationViewStyle-descriptionNotification > div > span:nth-child(2), .BattleSelectDialogComponentStyle-container > span > a > u, .UserProgressComponentStyle-buttonOk > div > h2, .PopupMessageComponentStyle-buttonsContainer > .Common-flexCenterAlignCenter:nth-child(2) > span",
      styles:
      {
        color: "var(--color-primary)"
      }
    },

    { /* стилизация списка битв */
      cssStyles: `
        #root > div > div.ProBattlesComponentStyle-mainContainer > div.Common-flexStartAlignCenterColumn > div.Common-flexStartAlignStretchColumn {
          margin-bottom: 0.8rem !important;
        }
      `
    },

    { /* стилизация карточек в режимах битв/рег меню/финальной статистики/контейнеров */
      cssStyles: `
        .Common-flexSpaceBetweenAlignCenterColumn.descriptionMode.blockCard:hover > div:nth-child(1) > h2, .Common-flexSpaceBetweenAlignCenterColumn.descriptionMode.blockCard:hover > span, .HeaderComponentStyle-siteLink.menuItemClass:hover > .EntranceComponentStyle-fontStyleLabel, .HeaderComponentStyle-siteLink.menuItemClass:hover > .HeaderComponentStyle-textLink > span, .ButtonComponentStyle-disabled.BattleResultNavigationComponentStyle-disabledButtonWithTimer.BattleResultNavigationComponentStyle-buttonWithTimer.Common-flexCenterAlignCenterColumn.Common-displayFlexColumn.Common-displayFlex.Common-alignCenter > span, .BattleResultNavigationComponentStyle-buttonNextWithTimer.BattleResultNavigationComponentStyle-buttonWithTimer.Common-flexCenterAlignCenterColumn.Common-displayFlexColumn.Common-displayFlex.Common-alignCenter > span {
          color: var(--color-primary) !important;
        }

        .Common-flexSpaceBetweenAlignCenterColumn.descriptionMode.blockCard:hover > div:nth-child(2), .HeaderComponentStyle-siteLink.menuItemClass:hover > .Common-flexCenterAlignCenter, .BattleResultNavigationComponentStyle-buttonWithTimer.Common-flexCenterAlignCenterColumn.Common-displayFlexColumn.Common-displayFlex.Common-alignCenter > img, .TableComponentStyle-thead, .ContainersComponentStyle-chatIcon {
          filter: var(--filter-saturate-none);
        }
      `
    },

    { /* стилизация бэкграунда карточек в гараже/ммной статы */
      tag: ["QSA"],
      selector: ".SkinCellComponentStyle-gradientCategoryDevices-LEGENDARY, .SkinCellComponentStyle-gradientCategoryDevices-EPIC, .SkinCellComponentStyle-gradientCategoryDevices-RARE, .SkinCellComponentStyle-gradientCategoryDevices-SPECIAL, .BattleResultHeaderComponentStyle-resultBg",
      styles:
      {
        display: "none"
      }
    },

    { /* стилизация бэкграунда иконок в миссиях */
      tag: ["QSA"],
      selector: ".MainQuestComponentStyle-backgroundIcon",
      styles:
      {
        backgroundImage: "none"
      }
    },

    { /* стилизация иконок в шапке/таблиц */
      cssStyles: `
        .BreadcrumbsComponentStyle-headerContainer > div.BreadcrumbsComponentStyle-rightButtonsContainer > div.Common-flexCenterAlignCenter > div, .UserScoreComponentStyle-blockRightPanel > .Common-flexCenterAlignCenter > .Common-maskImage.Common-maskImageContain, div.ProBattlesComponentStyle-mainContainer > div.Common-flexCenterAlignStart.Common-alignSelfStart.Common-flexStartAlignStart.Common-flexWrapNowrap.Common-scrollBarVisible > div > table > thead {
          border-radius: 0rem !important;
          filter: var(--filter-saturate-none) !important;
        }
      `
    },

    { /* стилизация раздела с битвами */
      cssStyles: `
        .NewBattleCreateInputStyle-settings .Common-backgroundImageContain {
          z-index: 1 !important;
          filter: var(--filter-saturate-none) !important;
        }

        .ProBattlesComponentStyle-borderLineCell.ProBattlesComponentStyle-cellPlayers.ProBattlesComponentStyle-fontCellRegular, .BattleCardComponentStyle-battleInfo {
          background: none !important;
        }
      `,
    },

    { /* стилизация раздела с магазом */
      tag: ["QS"],
      selector: ".NewShopCommonComponentStyle-commonContainer > div:nth-child(2), .SuccessfulPurchaseComponentStyle-borderLineItem",
      styles:
        {
          display: "none"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA", "fade"],
      selector: ".NewShopCommonComponentStyle-commonContainer, .PromoCodesComponentStyle-controlsWrapper",
      styles:
        {
          background: "none",
          backgroundColor: "transparent"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QS", "fade"],
      selector: ".ShopFooterComponentStyle-container, .PaymentInfoComponentStyle-commonBlock, .SuccessfulPurchaseComponentStyle-containerHeadline",
      styles:
        {
          border: "none"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QS", "fade"],
      selector: ".NewShopCommonComponentStyle-commonBlockMenuShop",
      styles:
      {
        position: "relative",
        top: "1rem",
        background: "none",
        backdropFilter: "none",
        padding: "1.25em 1.25em 1.25em 1.25em",
        boxShadow: "none"
      }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA", "fade", "BHV", "scale3d"],
      selector: ".NewShopCommonComponentStyle-commonBlockMenuShop > div > .Common-flexStartAlignCenter",
      styles:
        {
          /* background: "rgba(0, 0, 0, 0.1)", */
          height: "3.3rem",
          minHeight: "0",
          width: "23rem",
          border: "var(--border-width) solid var(--border-color-dark)",
          borderRadius: "var(--border-radius-xl)",
          backdropFilter: "var(--blur-sm)",
          marginBottom: "0.5rem",
          boxShadow: "var(--shadow-medium), var(--shadow-inset-dark)",
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".NewShopCommonComponentStyle-commonBlockMenuShop > div > .Common-flexStartAlignCenter > div",
      styles:
        {
          position: "relative",
          left: "0.7rem",
          transition: "all 0.4s ease"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".SuccessfulPurchaseComponentStyle-containerHeadline > .Common-flexStartAlignStartColumn > .Common-flexCenterAlignCenter > span, .LargeSingleCardComponentStyle-commonBlock > .Common-flexCenterAlignCenter > span, .NewShopCommonComponentStyle-commonContainer > .CoinSubscribeComponentStyle-containerCoinSubscribe > div > .Common-flexCenterAlignCenter > .Common-flexCenterAlignCenter > span, .ShowcaseItemComponentStyle-priceText",
      styles:
        {
          color: "white"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".ShowcaseItemComponentStyle-disabledReason",
      styles:
        {
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "var(--blur-md)",
          borderRadius: "var(--border-radius-xl)"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".NewShopCommonComponentStyle-commonBlockMenuShop > div > .Common-flexStartAlignCenter > h4",
      styles:
        {
          position: "relative",
          left: "0"
        }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA", "fade", "BHV"],
      selector: ".ShopCategoryOfferSectionStyle-containerLimitOffers > .Common-flexCenterAlignCenter, .shop-item-component, .CoinPaymentComponentStyle-itemsContainer > .Common-flexCenterAlignCenterColumn, .CoinPaymentComponentStyle-container",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },
    
    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".SpecialItemComponentStyle-smallSizePreviewItem, .SpecialItemComponentStyle-bigSizePreviewItem",
      styles:
      {
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "var(--blur-sm)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с магазом */
      tag: ["QS", "BHV"],
      selector: ".ShopFooterComponentStyle-reportButton, .SuccessfulPurchaseComponentStyle-containerHeadline > .Common-flexStartAlignStartColumn > .Common-flexCenterAlignCenter",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-md)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с магазом*/
      cssStyles: `
        .LargeSingleCardComponentStyle-commonBlock > .Common-flexCenterAlignCenterColumn.Common-backgroundImageCover {
          border-radius: var(--border-radius-xxl) !important;
          box-shadow: rgba(0, 0, 0, 0.5) 0rem 0rem 1rem 0.1rem, rgba(0, 0, 0, 0.3) 0rem 0rem 0.25rem 0.05rem inset !important;
        }
      `
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA", "fade", "BHV"],
      selector: ".LargeSingleCardComponentStyle-commonBlock > .Common-flexCenterAlignCenter, .PromoCodesComponentStyle-sendButton, .BasePaymentComponentStyle-buttonContainer > .Common-flexCenterAlignCenter",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с магазом */
      tag: ["QS", "scale",],
      selector: ".NewShopCommonComponentStyle-containerAnnouncement, .ShopCategoryComponentStyle-bonusContainer",
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-sm)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xxl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA", "BHV", "scale"],
      selector: ".ShopSelectedSectionComponentStyle-limitedOffersCommon, .ShopSelectedSectionComponentStyle-commonCard",
      styles:
      {
        background: "black",
        border: "var(--border-width) solid var(--border-color-darker)",
        borderRadius: "var(--border-radius-lg)",
        transform: "scale(1)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация раздела с магазом */
      tag: ["QSA"],
      selector: ".ShopSelectedSectionComponentStyle-limitedOffersCommon > .Common-backgroundImageCover, .ShopSelectedSectionComponentStyle-commonCard > .Common-backgroundImageCover, .ShopSelectedSectionComponentStyle-gradientCategory",
      styles:
      {
        transform: "scale(1.05)"
      }
    },

    { /* стилизация раздела с магазом*/
      cssStyles: `
        .ShopSelectedSectionComponentStyle-limitedOffersCommon::before, .ShopSelectedSectionComponentStyle-commonCard::before, .ShopSelectedSectionComponentStyle-limitedOffersCommon::after, .ShopSelectedSectionComponentStyle-commonCard::after {
          content: none !important;
        }
      `
    },

    { /* стилизация модалки с конвертацией в рубины */
      tag: ["QSA"],
      selector: ".ConverterDialogComponentStyle-descriptionContainer, .ConverterDialogComponentStyle-conversionContainer",
      styles:
      {
        background: "none",
        border: "none"
      }
    },

    { /* стилизация модалки с конвертацией в рубины */
      tag: ["QSA", "fade", "BHV"],
      selector: ".ConverterDialogComponentStyle-buttonsContainer > .ConverterDialogComponentStyle-dialogButton, .ConverterDialogComponentStyle-sliderWithButtonsContainer > .ConverterDialogComponentStyle-sliderButton", 
      styles:
      {
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "var(--blur-lg)",
        border: "var(--border-width) solid var(--border-color-dark)",
        borderRadius: "var(--border-radius-xl)",
        boxShadow: "var(--shadow-none), var(--shadow-inset-light)"
      }
    },

    { /* стилизация текста и иконок после "редизайна" */
      tag: ["QSA"],
      selector: ".ShopBuyButtonComponentStyle-container > .Common-flexStartAlignCenter > div, .ShopBuyButtonComponentStyle-container > h4, .ConverterDialogComponentStyle-sliderButton > img, .SquarePriceButtonComponentStyle-paddingPriceStyleButton, .GarageCommonStyle-bigActionButton.MountedItemsComponentStyleMobile-widthHeightButtonGarage > .Common-flexCenterAlignCenter > .Common-backgroundImage",
      styles:
      {
        filter: "invert(1) var(--filter-saturate-none)"
      }
    },

    { /* стилизация иконок в шапке/таблиц */
      cssStyles: `
        .UserProgressComponentStyle-buyPremium > .Common-flexCenterAlignCenter > span, .ShopBuyButtonComponentStyle-container > .Common-flexStartAlignCenter > h4, .ConverterDialogComponentStyle-dialogButton:nth-child(2) > span, .DialogContainerComponentStyle-getRubyButton > span, .ClanInfoComponentStyle-clanForeignActions > div > .Common-flexCenterAlignCenter > span, .SettingsButtonsComponentStyle-buttonsWidthBackReset > span, .ContainersComponentStyle-moreButton > span {
          color: white !important;
        }
      `
    },

    { /* колхозная но как никак стилизация иконок в гараже */
      tag: ["QSA"],
      selector: ".GarageCommonStyle-bigActionButton:nth-child(1) > div.Common-flexCenterAlignCenter > div",
      styles:
        {
          backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgoJCSAgZD0iTTE2IDM2VjMwTDMyIDE2TDQ4IDMwVjM2TDQwIDI5VjQwTDMyIDMzTDI0IDQwVjI5TDE2IDM2Wk0yNCA0NFY0OEwzMiA0MUw0MCA0OFY0NEwzMiAzN0wyNCA0NFoiCgkJICBmaWxsPSIjZGViODg3Ii8+Cjwvc3ZnPgo=)"
        }
    },

    { /* колхозная но как никак стилизация иконок в гараже */
      tag: ["QS"],
      selector: ".GarageCommonStyle-bigActionButton:nth-child(2) > div.Common-flexCenterAlignCenter > div, .GarageTurretsAlterationsComponentStyle-mountStandardButton > div > .Common-flexCenterAlignCenter > div",
      styles:
        {
          backgroundImage: "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIgoJCSAgZD0iTTMyIDIwLjYwN0wyOSAyMi4zMjEyVjM1Ljk5OTlMMjIgMzEuOTk5OVYzNy42Nzg3TDMyIDQzLjM5MjlMNDIgMzcuNjc4N1YzMS45OTk5TDM1IDM1Ljk5OTlWMjIuMzIxMkwzMiAyMC42MDdaTTQ2IDI1Ljc0MDlDNDYgMjQuNjY0MyA0NS40MjMxIDIzLjY3MDMgNDQuNDg4NCAyMy4xMzYyTDMzLjQ4ODQgMTYuODUwNUMzMi41NjYxIDE2LjMyMzQgMzEuNDMzOSAxNi4zMjM0IDMwLjUxMTYgMTYuODUwNUwxOS41MTE2IDIzLjEzNjJDMTguNTc2OSAyMy42NzAzIDE4IDI0LjY2NDMgMTggMjUuNzQwOVYzOC4yNTlDMTggMzkuMzM1NiAxOC41NzY5IDQwLjMyOTYgMTkuNTExNiA0MC44NjM3TDMwLjUxMTYgNDcuMTQ5NEMzMS40MzM5IDQ3LjY3NjUgMzIuNTY2MSA0Ny42NzY1IDMzLjQ4ODQgNDcuMTQ5NEw0NC40ODg0IDQwLjg2MzdDNDUuNDIzMSA0MC4zMjk2IDQ2IDM5LjMzNTYgNDYgMzguMjU5VjI1Ljc0MDlaIgoJCSAgZmlsbD0iI2RlYjg4NyIvPgo8L3N2Zz4K)"
        }
    }
  ];

  if (!cssStyles) {cssStyles = document.createElement('style'); document.head.appendChild(cssStyles);} cssStyles.textContent = cssVariables + '\n';

  elements.forEach((element) => {
    let selectedElements;

    if (element.tag && element.tag.includes('QSA')) {selectedElements = document.querySelectorAll(element.selector);}
      else if (element.tag && element.tag.includes('QS')) {
        const singleElement = document.querySelector(element.selector); selectedElements = singleElement ? [singleElement] : [];}

    if (selectedElements) {selectedElements.forEach((el) => {
      if (el && !elementsProcessed.has(el)) {elementsProcessed.add(el); animationTags(element, el); mouseHover(element, el);
          el.addEventListener('animationend', () => {el.classList.remove('animate');},{once: true});

          if (el.classList.contains('scale3d')) {
            el.addEventListener('mousemove', (e) => handleMouseMove(e, el));
            el.addEventListener('mouseenter', () => el.classList.add('is-hovered'));
            el.addEventListener('mouseleave', () => {el.classList.remove('is-hovered'); resetTransform(el);});}}});}

    if (element.cssStyles) {
      if (!cssStyles.textContent.includes(element.cssStyles)) {cssStyles.textContent += element.cssStyles;}}});
};