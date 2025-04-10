export const applyMenuStyles = () => {
  const styleElement = document.createElement('style'); styleElement.textContent = `
    #bs-menu {position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 960px; max-width: 95vw; height: 680px; max-height: 90vh; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(0.3rem); -webkit-backdrop-filter: blur(0.3rem); border: 0.150rem solid rgba(255, 255, 255, 0.15); border-radius: 1.2rem; z-index: 9999; display: flex; flex-direction: column; font-family: Arial, sans-serif; color: white; overflow: hidden; box-shadow: var(--shadow-darkest), var(--shadow-inset-dark); transition: opacity 0.3s, transform 0.3s;}
    #bs-menu.bs-menu-hidden {opacity: 0; transform: translate(-50%, -50%) scale(0.95); pointer-events: none;}
    .bs-menu-title-container {display: flex; align-items: center;}
    .bs-menu-header {display: flex; justify-content: space-between; align-items: center; padding: 16px 20px;}
    .bs-menu-header h2 {margin: 0; font-size: 20px; font-weight: 500; color: rgba(222, 184, 135, 0.9);}
    .bs-menu-close, .bs-menu-back {background: rgba(255, 255, 255, 0.1); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s;}
    .bs-menu-close:hover, .bs-menu-back:hover {background: rgba(255, 255, 255, 0.2);}
    .bs-menu-back {margin-right: 12px;}
    .bs-menu-content {flex: 1; overflow: hidden; position: relative;}
    .bs-menu-section {position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow-y: auto; padding: 30px; box-sizing: border-box; display: none; opacity: 0; transform: translateY(10px); transition: opacity 0.3s, transform 0.3s; scrollbar-width: thin; scrollbar-color: rgba(222, 184, 135, 0.5) rgba(0, 0, 0, 0.1);}
    .bs-menu-section::-webkit-scrollbar {width: 8px;}
    .bs-menu-section::-webkit-scrollbar-track {background: rgba(0, 0, 0, 0.1); border-radius: 4px;}
    .bs-menu-section::-webkit-scrollbar-thumb {background-color: rgba(222, 184, 135, 0.5); border-radius: 4px;}
    .bs-menu-section.active {display: block; opacity: 1; transform: translateY(0);}
    .bs-section-appear {animation: sectionAppear 0.3s ease-out;}
    .bs-card {background: rgba(255, 255, 255, 0.08); border-radius: 1rem; padding: 18px; margin-bottom: 20px; border: 0.150rem solid rgba(255, 255, 255, 0.05); box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5); transition: background 0.3s, transform 0.3s, border-color 0.3s; width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden;}
    .bs-card-clickable {cursor: pointer;}
    .bs-card-clickable:hover {background: rgba(255, 255, 255, 0.12); transform: translateY(-2px); border-color: rgba(255, 255, 255, 0.1);}
    .bs-card-title {margin-top: 0; margin-bottom: 16px; font-size: 18px; font-weight: 500; color: rgba(222, 184, 135, 0.9);}
    .bs-option {display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 5px 0; width: 100%; box-sizing: border-box;}
    .bs-option > span, .bs-shadow-color > span, .bs-shadow-slider > span {width: 50%;}
    .bs-slider-container {display: flex; flex-direction: row; justify-content: space-between; align-items: center;}
    .bs-slider-label {width: 170px; padding-top: 0; font-size: 14px; flex-shrink: 0;}
    .bs-slider-control {flex: 1; display: flex; align-items: center; gap: 10px;}
    .bs-input-label {width: 50%; padding-top: 0; font-size: 14px; flex-shrink: 0;}
    .bs-toggle {position: relative; display: inline-block; width: 48px; height: 24px; flex-shrink: 0; margin-left: 20px;}
    .bs-toggle input {opacity: 0; width: 0; height: 0;}
    .bs-toggle-slider {position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255, 255, 255, 0.2); transition: .4s; border-radius: 34px;}
    .bs-toggle-slider:before {position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);}
    .bs-slider {flex: 1; max-width: 200px; height: 6px; -webkit-appearance: none; background: rgba(255, 255, 255, 0.2); border-radius: 3px; outline: none; margin: 0 10px;}
    .bs-slider::-webkit-slider-thumb {-webkit-appearance: none; appearance: none; width: 16px; height: 16px; border-radius: 50%; background: rgba(222, 184, 135, 0.8); cursor: pointer; box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);}
    .bs-slider::-moz-range-thumb {width: 16px; height: 16px; border-radius: 50%; background: rgba(222, 184, 135, 0.8); cursor: pointer; box-shadow: 0 0 2px rgba(0, 0, 0, 0.3); border: none;}
    .bs-slider-value {min-width: 40px; text-align: right; font-variant-numeric: tabular-nums;}
    .bs-input {background: rgba(255, 255, 255, 0.1); border: 0.150rem solid rgba(255, 255, 255, 0.2); border-radius: 0.6rem; color: white; padding: 8px 12px; transition: border-color 0.3s, background 0.3s; flex-grow: 1; max-width: calc(100% - 10px); box-sizing: border-box; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-input:focus {border-color: rgba(222, 184, 135, 0.5); outline: none; background: rgba(255, 255, 255, 0.15);}
    .bs-row {display: flex; align-items: center; gap: 12px; margin-bottom: 16px; width: 100%; box-sizing: border-box;}
    .bs-btn {background: rgba(222, 184, 135, 0.2); border: none; border-radius: 0.7rem; color: white; padding: 10px 16px; cursor: pointer; transition: background 0.3s, transform 0.2s; font-weight: 500;}
    .bs-btn:hover {background: rgba(222, 184, 135, 0.4); transform: translateY(-1px);}
    .bs-btn:active {transform: translateY(0);}
    .bs-card-grid {display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; width: 100%; box-sizing: border-box;}
    .bs-nav-card {background: rgba(255, 255, 255, 0.08); border-radius: 0.7rem; padding: 20px; display: flex; align-items: center; cursor: pointer; transition: background 0.3s, transform 0.3s, border-color 0.3s; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5); position: relative; overflow: hidden; width: 100%; box-sizing: border-box; height: 100%;}
    .bs-nav-card:hover {background: rgba(255, 255, 255, 0.12); transform: translateY(-2px); border-color: rgba(222, 184, 135, 0.3);}
    .bs-nav-card-content {flex: 1;}
    .bs-nav-card-title {margin: 0 0 8px 0; font-size: 18px; font-weight: 500; color: rgba(222, 184, 135, 0.7);}
    .bs-nav-card-description {margin: 0; font-size: 14px; color: rgba(255, 255, 255, 0.7); line-height: 1.4;}
    .bs-nav-card-icon {display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; background: rgba(222, 184, 135, 0.1); border-radius: 8px; margin-right: 16px; flex-shrink: 0;}
    .bs-nav-card-arrow {display: flex; align-items: center; opacity: 0.7; transition: transform 0.3s, opacity 0.3s; margin-left: 10px;}
    .bs-nav-card:hover .bs-nav-card-arrow {transform: translateX(3px); opacity: 1;}
    .bs-resources-list {max-height: 320px; overflow-y: auto; margin-top: 16px; scrollbar-width: thin; scrollbar-color: rgba(222, 184, 135, 0.3) rgba(0, 0, 0, 0.1); padding-right: 12px; width: 100%; box-sizing: border-box;}
    .bs-resources-list::-webkit-scrollbar {width: 8px;}
    .bs-resources-list::-webkit-scrollbar-track {background: rgba(0, 0, 0, 0.1); border-radius: 3px;}
    .bs-resources-list::-webkit-scrollbar-thumb {background-color: rgba(222, 184, 135, 0.3); border-radius: 3px;}
    .bs-resource-item {padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; margin-bottom: 10px; font-size: 14px; width: 100%; box-sizing: border-box; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-resource-header {margin-bottom: 10px; white-space: nowrap;}
    .bs-resource-notice {padding: 16px; margin-bottom: 20px; background: rgba(222, 184, 135, 0.1); border-radius: 8px; font-size: 14px; border-left: 3px solid rgba(222, 184, 135, 0.5); display: flex; align-items: center; width: 100%; box-sizing: border-box;}
    .bs-resource-details {font-size: 12px; color: rgba(255, 255, 255, 0.7); word-break: break-all;}
    .bs-color-preview {position: relative; width: 28px; height: 28px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.3); cursor: pointer; box-shadow: 0 0 4px rgba(0, 0, 0, 0.2); transition: transform 0.2s; flex-shrink: 0;}
    .bs-color-preview:hover {transform: scale(1.1);}
    .bs-shadow-control {margin-bottom: 20px; padding: 16px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; width: 100%; box-sizing: border-box; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-shadow-slider {display: flex; align-items: center; margin: 10px 0; width: 100%; box-sizing: border-box;}
    .bs-shadow-color {display: flex; align-items: center; margin: 16px 0 8px; width: 100%; box-sizing: border-box;}
    .bs-shadow-value {font-size: 14px; color: rgba(255, 255, 255, 0.7); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
    .bs-hotkey-modal {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); z-index: 10001; display: flex; justify-content: center; align-items: center; display: none; animation: modalFadeIn 0.3s ease-out;}
    .bs-hotkey-modal.closing {animation: modalFadeOut 0.3s ease-out forwards;}
    .bs-hotkey-modal-content {width: 450px; max-width: 90vw; background: rgba(0, 0, 0, 0.3); border-radius: 16px; padding: 24px; box-shadow: var(--shadow-darkest), var(--shadow-inset-dark); border: 0.150rem solid rgba(255, 255, 255, 0.1); animation: modalContentFadeIn 0.3s ease-out;}
    .bs-modal-title {margin: 0 0 20px 0; text-align: center; color: white; font-size: 20px;}
    .bs-key-display {background: rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; text-align: center; font-size: 20px; margin-bottom: 24px; color: white; min-height: 48px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-github-btn {display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 255, 255, 0.05); color: white; border: none; border-radius: 0.6rem; padding: 10px 18px; cursor: pointer; transition: background 0.3s; text-decoration: none; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-github-btn:hover {background: rgba(255, 255, 255, 0.2);}
    .bs-github-btn svg {width: 20px; height: 20px;}
    .bs-changelog-item {margin-bottom: 24px; padding-bottom: 24px; border-bottom: 0.150rem solid rgba(255, 255, 255, 0.1); width: 100%; box-sizing: border-box;}
    .bs-changelog-item:last-child {border-bottom: none;}
    .bs-changelog-version {font-size: 18px; font-weight: 500; margin-bottom: 12px; color: rgba(222, 184, 135, 0.9);}
    .bs-changelog-list {margin: 0; padding-left: 20px;}
    .bs-changelog-list li {margin-bottom: 8px; line-height: 1.5;}
    .bs-filter-options, .bs-sorting-options {display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap; width: 100%; box-sizing: border-box;}
    .bs-filter-btn, .bs-sort-btn {padding: 8px 14px; font-size: 14px; flex-grow: 1; text-align: center; white-space: nowrap; min-width: 100px;}
    .bs-hotkey-item {display: flex; justify-content: space-between; align-items: center; padding: 14px; margin-bottom: 12px; background: rgba(255, 255, 255, 0.05); border-radius: 8px; transition: background 0.3s; width: 100%; box-sizing: border-box; box-shadow: inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5);}
    .bs-hotkey-item:hover {background: rgba(255, 255, 255, 0.08);}
    .bs-hotkey-label {font-weight: 500; flex: 1; font-size: 16px;}
    .bs-hotkey-button {background: rgba(222, 184, 135, 0.2); border: none; border-radius: 0.6rem; color: white; padding: 8px 12px; min-width: 100px; text-align: center; cursor: pointer; transition: background 0.3s, transform 0.2s; flex-shrink: 0; margin-left: 16px; font-size: 14px;}
    .bs-hotkey-button:hover {background: rgba(222, 184, 135, 0.3); transform: translateY(-1px);}
    .bs-notification-content {display: flex; align-items: center; gap: 10px;}
    body.bs-menu-open::after {content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); z-index: 9998; animation: fadeInOverlay 0.3s ease-out;}
    input:checked + .bs-toggle-slider {background-color: rgba(222, 184, 135, 0.8);}
    input:checked + .bs-toggle-slider:before {transform: translateX(24px);}
    @keyframes fadeInUp {from {opacity: 0; transform: translate(-50%, 20px);} to {opacity: 1; transform: translate(-50%, 0);}}
    @keyframes fadeOutDown {from {opacity: 1; transform: translate(-50%, 0);} to {opacity: 0; transform: translate(-50%, 20px);}}
    @keyframes fadeInOverlay {from {opacity: 0;} to {opacity: 1;}}
    @keyframes sectionAppear {from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);}}
    @keyframes modalFadeIn {from {opacity: 0;} to {opacity: 1;}}
    @keyframes modalFadeOut {from {opacity: 1;} to {opacity: 0;}}
    @keyframes modalContentFadeIn {from {opacity: 0; transform: scale(0.95);} to {opacity: 1; transform: scale(1);}}
    @media (max-width: 768px) {
      #bs-menu {width: 95vw; height: 90vh;}
      .bs-card-grid {grid-template-columns: 1fr;}
      .bs-menu-section {padding: 15px;}}`; document.head.appendChild(styleElement);
};