import {createCard, createSlider, createInputField, createButton, showNotification} from '../utils';
import {getFromLocalStorage, saveToLocalStorage, getAllKeysStartingWith, removeFromLocalStorage} from '../../utils/storage';

let activeColorPicker = null;

export const createStylingSection = (container) => {
  const sectionContent = document.createElement('div'); sectionContent.className = 'bs-section-content';
  
  const updateCSSVar = (name, value) => {
    document.documentElement.style.setProperty(`--${name}`, value); 
      setTimeout(() => {saveToLocalStorage(`style_${name}`, value);}, 1);};

  const colorUtils = {
    rgbaToHex: (rgba) => {
      const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
      const match = rgba.match(rgbaRegex);
        if (!match) return '#000000';
      
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);},
    
    hexToRgb: (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;},
    
    hexToRgbValues: (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];},
    
    hexToRgba: (hex, opacity) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;},
    
    getRgbValuesFromBackground: (background) => {
      const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
      const match = background.match(rgbaRegex);
        if (!match) return [0, 0, 0];
          return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];},
    
    getRgbaOpacity: (rgba) => {
      const match = rgba.match(/rgba\([\d\s,]+,\s*([\d.]+)\)/);
        return match ? parseFloat(match[1]) : 1;}};

  document.addEventListener('click', (e) => {
    if (activeColorPicker && !e.target.closest('.bs-color-preview') && e.target !== activeColorPicker) {document.body.removeChild(activeColorPicker); activeColorPicker = null;}});
  
  const createColorInput = (labelText, colorValue, name) => {
    const container = document.createElement('div'); container.className = 'bs-option';
    const label = document.createElement('span'); label.textContent = labelText; label.className = 'bs-input-label';
    const inputWrapper = document.createElement('div'); inputWrapper.style.display = 'flex'; inputWrapper.style.alignItems = 'center'; inputWrapper.style.gap = '10px'; inputWrapper.style.flexGrow = '1';
    const colorPreview = document.createElement('div'); colorPreview.className = 'bs-color-preview'; colorPreview.style.backgroundColor = colorValue;
    const colorText = document.createElement('input'); colorText.type = 'text'; colorText.className = 'bs-input'; colorText.value = colorValue;
      colorPreview.addEventListener('click', (e) => {e.stopPropagation();
        if (activeColorPicker) {document.body.removeChild(activeColorPicker); activeColorPicker = null;}
        
        const newInput = document.createElement('input'); newInput.type = 'color'; newInput.value = colorUtils.rgbaToHex(colorValue);

      const rect = colorPreview.getBoundingClientRect(); newInput.style.position = 'fixed'; newInput.style.left = `${rect.left}px`; newInput.style.top = `${rect.bottom + 5}px`; newInput.style.zIndex = '10002'; newInput.style.opacity = '0';
        newInput.addEventListener('input', (e) => {
          const hexColor = e.target.value;
          const rgbaValue = colorValue.startsWith('rgba') ? colorUtils.hexToRgba(hexColor, colorUtils.getRgbaOpacity(colorValue)) : colorUtils.hexToRgb(hexColor); colorText.value = rgbaValue; colorPreview.style.backgroundColor = rgbaValue; updateCSSVar(name, rgbaValue);});
            newInput.addEventListener('change', () => {showNotification(`${labelText} изменен`, 'success'); document.body.removeChild(newInput); activeColorPicker = null;}); document.body.appendChild(newInput); activeColorPicker = newInput;
              setTimeout(() => newInput.click(), 50);});
    
    colorText.addEventListener('change', (e) => {
      const newValue = e.target.value; colorPreview.style.backgroundColor = newValue; updateCSSVar(name, newValue); showNotification(`${labelText} изменен`, 'success');}); inputWrapper.append(colorPreview, colorText); container.append(label, inputWrapper);
        return container;};

  const colorsCard = createCard('Основные цвета');
  const colorVars = {
    'color-primary': ['Основной цвет', getFromLocalStorage('style_color-primary', 'rgba(222, 184, 135, 1)')],
    'color-white': ['Белый цвет', getFromLocalStorage('style_color-white', 'rgba(255, 255, 255, 1)')], 
    'color-black': ['Черный цвет', getFromLocalStorage('style_color-black', 'rgba(0, 0, 0, 1)')],
    'color-red': ['Красный цвет', getFromLocalStorage('style_color-red', 'rgba(255, 0, 0, 1)')],
    'color-green': ['Зеленый цвет', getFromLocalStorage('style_color-green', 'rgba(60, 179, 113, 1)')],
    'color-gold': ['Золотой цвет', getFromLocalStorage('style_color-gold', 'rgba(255, 204, 0, 1)')]};
      Object.entries(colorVars).forEach(([name, [label, value]]) => {colorsCard.appendChild(createColorInput(label, value, name));});

  const bgCard = createCard('Различные фоны');
  const bgVars = {
    'bg-transparent': ['Прозрачный фон', getFromLocalStorage('style_bg-transparent', 'rgba(0, 0, 0, 0)')],
    'bg-transparent-light': ['Легкий черный фон', getFromLocalStorage('style_bg-transparent-light', 'rgba(0, 0, 0, 0.1)')],
    'bg-transparent-medium': ['Средний черный фон', getFromLocalStorage('style_bg-transparent-medium', 'rgba(0, 0, 0, 0.15)')],
    'bg-transparent-dark': ['Темный черный фон', getFromLocalStorage('style_bg-transparent-dark', 'rgba(0, 0, 0, 0.2)')],
    'bg-transparent-darker': ['Очень темный черный фон', getFromLocalStorage('style_bg-transparent-darker', 'rgba(0, 0, 0, 0.3)')],
    'bg-white-opaque': ['Непрозрачный белый фон', getFromLocalStorage('style_bg-white-opaque', 'rgba(255, 255, 255, 1)')],
    'bg-white-light': ['Легкий белый фон', getFromLocalStorage('style_bg-white-light', 'rgba(255, 255, 255, 0.1)')],
    'bg-white-medium': ['Средний белый фон', getFromLocalStorage('style_bg-white-medium', 'rgba(255, 255, 255, 0.2)')],
    'bg-white-dark': ['Темный белый фон', getFromLocalStorage('style_bg-white-dark', 'rgba(255, 255, 255, 0.3)')],
    'bg-red-light': ['Легкий красный фон', getFromLocalStorage('style_bg-red-light', 'rgba(255, 0, 0, 0.1)')],
    'bg-red-medium': ['Средний красный фон', getFromLocalStorage('style_bg-red-medium', 'rgba(255, 0, 0, 0.15)')],
    'bg-green-light': ['Легкий зеленый фон', getFromLocalStorage('style_bg-green-light', 'rgba(60, 179, 113, 0.1)')],
    'bg-green-medium': ['Средний зеленый фон', getFromLocalStorage('style_bg-green-medium', 'rgba(60, 179, 113, 0.2)')],
    'bg-gold-light': ['Легкий золотой фон', getFromLocalStorage('style_bg-gold-light', 'rgba(255, 204, 0, 0.1)')],
    'bg-gold-medium': ['Средний золотой фон', getFromLocalStorage('style_bg-gold-medium', 'rgba(255, 204, 0, 0.2)')],
    'bg-gray-light': ['Легкий серый фон', getFromLocalStorage('style_bg-gray-light', 'rgba(128, 128, 128, 0.2)')],
    'bg-gray-medium': ['Средний серый фон', getFromLocalStorage('style_bg-gray-medium', 'rgba(176, 176, 176, 0.7)')]};
      Object.entries(bgVars).forEach(([name, [label, value]]) => {bgCard.appendChild(createColorInput(label, value, name));});

  const borderCard = createCard('Настройки бордеров');
  const borderWidthSlider = createSlider('Толщина бордера:', parseFloat(getFromLocalStorage('style_border-width', '0.15')), 0.05, 0.5, (value) => updateCSSVar('border-width', `${value}rem`), 'border-width'); borderCard.appendChild(borderWidthSlider);
  const borderRadiusVars = {
    'border-radius-xs': ['Очень малый радиус', parseFloat(getFromLocalStorage('style_border-radius-xs', '0.6'))],
    'border-radius-sm': ['Малый радиус', parseFloat(getFromLocalStorage('style_border-radius-sm', '0.7'))],
    'border-radius-md': ['Средний радиус', parseFloat(getFromLocalStorage('style_border-radius-md', '1'))],
    'border-radius-lg': ['Большой радиус', parseFloat(getFromLocalStorage('style_border-radius-lg', '1.1'))],
    'border-radius-xl': ['Очень большой радиус', parseFloat(getFromLocalStorage('style_border-radius-xl', '1.2'))],
    'border-radius-xxl': ['Огромный радиус', parseFloat(getFromLocalStorage('style_border-radius-xxl', '1.5'))],
    'border-radius-round': ['Скругленный радиус', parseFloat(getFromLocalStorage('style_border-radius-round', '2'))]};
      Object.entries(borderRadiusVars).forEach(([name, [label, value]]) => {
        const slider = createSlider(label, value, 0.1, 4, (newValue) => updateCSSVar(name, `${newValue}rem`), name); borderCard.appendChild(slider);});

  const borderColorCard = createCard('Цвета бордеров');
  const borderColorVars = {
    'border-color-none': ['Нет бордера', getFromLocalStorage('style_border-color-none', 'rgba(0, 0, 0, 1)')],
    'border-color-light': ['Светлый бордер', getFromLocalStorage('style_border-color-light', 'rgba(255, 255, 255, 0.05)')],
    'border-color-medium': ['Средний бордер', getFromLocalStorage('style_border-color-medium', 'rgba(255, 255, 255, 0.1)')],
    'border-color-dark': ['Темный бордер', getFromLocalStorage('style_border-color-dark', 'rgba(255, 255, 255, 0.2)')],
    'border-color-darker': ['Очень темный бордер', getFromLocalStorage('style_border-color-darker', 'rgba(255, 255, 255, 0.3)')],
    'border-color-red-light': ['Светлый красный бордер', getFromLocalStorage('style_border-color-red-light', 'rgba(255, 0, 0, 0.1)')],
    'border-color-red-medium': ['Средний красный бордер', getFromLocalStorage('style_border-color-red-medium', 'rgba(255, 0, 0, 0.2)')],
    'border-color-gold-light': ['Светлый золотой бордер', getFromLocalStorage('style_border-color-gold-light', 'rgba(255, 204, 0, 0.1)')],
    'border-color-gold-medium': ['Средний золотой бордер', getFromLocalStorage('style_border-color-gold-medium', 'rgba(255, 204, 0, 0.2)')]};
      Object.entries(borderColorVars).forEach(([name, [label, value]]) => {borderColorCard.appendChild(createColorInput(label, value, name));});

  const createShadowControl = (name, label, defaultValue) => {
    const container = document.createElement('div'); container.className = 'bs-shadow-control';
    const headerDiv = document.createElement('div'); headerDiv.className = 'bs-option';
    const titleLabel = document.createElement('span'); titleLabel.textContent = label;
    const shadowInput = document.createElement('input'); shadowInput.type = 'text'; shadowInput.className = 'bs-input'; shadowInput.value = getFromLocalStorage(`style_${name}`, defaultValue);
      shadowInput.addEventListener('change', (e) => {updateCSSVar(name, e.target.value); showNotification(`"${label}" изменена`, 'success');}); headerDiv.append(titleLabel, shadowInput); container.appendChild(headerDiv);

    const previewBox = document.createElement('div');
      previewBox.className = 'bs-shadow-preview';
      previewBox.textContent = 'Предпросмотр';
      previewBox.style.margin = '10px 0';
      previewBox.style.padding = '15px';
      previewBox.style.marginBottom = '20px';
      previewBox.style.textAlign = 'center';
      previewBox.style.borderRadius = '0.6rem';
      previewBox.style.boxShadow = shadowInput.value;
      shadowInput.addEventListener('input', () => {previewBox.style.boxShadow = shadowInput.value;});
      container.appendChild(previewBox);

    const createShadowSlider = (sliderLabel, property, min, max, initial, unit = 'rem') => {
      const sliderContainer = document.createElement('div'); sliderContainer.className = 'bs-shadow-slider';
      const sliderLabel_ = document.createElement('span'); sliderLabel_.textContent = sliderLabel;
      const slider = document.createElement('input'); slider.type = 'range'; slider.min = min; slider.max = max; slider.step = '0.01'; slider.value = initial; slider.className = 'bs-slider';
      const valueDisplay = document.createElement('span'); valueDisplay.textContent = initial + unit; valueDisplay.style.width = '40px'; valueDisplay.style.display = 'inline-block'; valueDisplay.style.textAlign = 'right'; valueDisplay.style.marginLeft = '10px';
      let timeout;
        slider.addEventListener('input', (e) => {
          const newValue = parseFloat(e.target.value);
            if (!isNaN(newValue) && newValue >= min && newValue <= max) {valueDisplay.textContent = newValue + unit; updateShadowValue(); clearTimeout(timeout); 
              timeout = setTimeout(() => {showNotification(`${sliderLabel} изменено на ${newValue}${unit}`, 'info');}, 500);}}); sliderContainer.append(sliderLabel_, slider, valueDisplay);
                return {sliderContainer, slider, valueDisplay};};

    const hOffsetControl = createShadowSlider('Смещение по X', 'h-offset', -1, 1, 0);
    const vOffsetControl = createShadowSlider('Смещение по Y', 'v-offset', -1, 1, 0);
    const blurControl = createShadowSlider('Размытие', 'blur', 0, 2, 0.2);
    const spreadControl = createShadowSlider('Распространение', 'spread', 0, 0.5, 0.05);
    const colorControl = document.createElement('div'); colorControl.className = 'bs-shadow-color';
    const colorLabel = document.createElement('span'); colorLabel.textContent = 'Цвет';
    const colorPreview = document.createElement('div'); colorPreview.className = 'bs-color-preview';
    const opacitySlider = document.createElement('input');
      opacitySlider.type = 'range';
      opacitySlider.min = '0';
      opacitySlider.max = '1';
      opacitySlider.step = '0.01';
      opacitySlider.value = '0.5';
      opacitySlider.className = 'bs-slider';
      opacitySlider.style.width = '100px';
      opacitySlider.style.marginLeft = '10px';
      opacitySlider.style.marginRight = '10px';
    
    const opacityValue = document.createElement('span'); opacityValue.textContent = '0.5'; opacityValue.style.width = '40px'; opacityValue.style.display = 'inline-block'; opacityValue.style.textAlign = 'right';
      colorPreview.addEventListener('click', (e) => {e.stopPropagation(); 
        if (activeColorPicker) {document.body.removeChild(activeColorPicker); activeColorPicker = null;}
        
        const colorPicker = document.createElement('input'); colorPicker.type = 'color'; colorPicker.value = '#000000';
        const rect = colorPreview.getBoundingClientRect(); colorPicker.style.position = 'fixed'; colorPicker.style.left = `${rect.left}px`; colorPicker.style.top = `${rect.bottom + 5}px`; colorPicker.style.zIndex = '10002'; colorPicker.style.opacity = '0';
          colorPicker.addEventListener('input', (e) => {
            const rgba = `rgba(${colorUtils.hexToRgbValues(e.target.value).join(', ')}, ${opacitySlider.value})`; colorPreview.style.backgroundColor = rgba; updateShadowValue();});
        
        colorPicker.addEventListener('change', () => {showNotification('Цвет тени изменен', 'success'); document.body.removeChild(colorPicker); activeColorPicker = null;}); document.body.appendChild(colorPicker); activeColorPicker = colorPicker;
          setTimeout(() => colorPicker.click(), 50);});

    opacitySlider.addEventListener('input', (e) => {opacityValue.textContent = e.target.value;
      const rgbValues = colorUtils.getRgbValuesFromBackground(colorPreview.style.backgroundColor);
      const rgba = `rgba(${rgbValues.join(', ')}, ${e.target.value})`; colorPreview.style.backgroundColor = rgba; updateShadowValue();}); colorControl.append(colorLabel, colorPreview, opacitySlider, opacityValue);

    const updateShadowValue = () => {
      const hOffset = hOffsetControl.slider.value;
      const vOffset = vOffsetControl.slider.value;
      const blur = blurControl.slider.value;
      const spread = spreadControl.slider.value;
      const color = colorPreview.style.backgroundColor;
      const shadowValue = `${hOffset}rem ${vOffset}rem ${blur}rem ${spread}rem ${color}`; shadowInput.value = shadowValue; previewBox.style.boxShadow = shadowValue;
        updateCSSVar(name, shadowValue);}; container.append(hOffsetControl.sliderContainer, vOffsetControl.sliderContainer, blurControl.sliderContainer, spreadControl.sliderContainer, colorControl);
          return container;};

  const shadowCard = createCard('Настройки теней');
  const shadowVars = {
    'shadow-none': ['Пустая тень', '0rem 0rem 0rem 0rem rgba(0, 0, 0, 0)'],
    'shadow-light': ['Легкая тень', '0rem 0rem 0.2rem 0.05rem rgba(0, 0, 0, 0.4)'],
    'shadow-medium': ['Средняя тень', '0rem 0rem 0.5rem 0.05rem rgba(0, 0, 0, 0.55)'],
    'shadow-dark': ['Темная тень', '0rem 0rem 1rem 0.05rem rgba(0, 0, 0, 0.75)'],
    'shadow-darker': ['Очень темная тень', '0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.75)'],
    'shadow-darkest': ['Самая темная тень', '0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.6)']};
      Object.entries(shadowVars).forEach(([name, [label, defaultValue]]) => {shadowCard.appendChild(createShadowControl(name, label, defaultValue));});

  const insetShadowCard = createCard('Внутренние тени');
  const insetShadowVars = {
    'shadow-inset-light': ['Легкая внутренняя тень', 'inset 0rem 0rem 0.25rem 0.05rem rgba(0, 0, 0, 0.2)'],
    'shadow-inset-medium': ['Средняя внутренняя тень', 'inset 0rem 0rem 0.25rem 0.05rem rgba(0, 0, 0, 0.3)'],
    'shadow-inset-dark': ['Темная внутренняя тень', 'inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.3)'],
    'shadow-inset-darker': ['Очень темная внутренняя тень', 'inset 0rem 0rem 0.5rem 0.15rem rgba(0, 0, 0, 0.5)']};
      Object.entries(insetShadowVars).forEach(([name, [label, defaultValue]]) => {insetShadowCard.appendChild(createShadowControl(name, label, defaultValue));});

  const blurCard = createCard('Настройки размытия');
  const blurVars = {
    'blur-xs': ['Очень малое размытие', parseFloat(getFromLocalStorage('style_blur-xs', '0.1'))],
    'blur-sm': ['Малое размытие', parseFloat(getFromLocalStorage('style_blur-sm', '0.2'))],
    'blur-md': ['Среднее размытие', parseFloat(getFromLocalStorage('style_blur-md', '0.3'))],
    'blur-lg': ['Большое размытие', parseFloat(getFromLocalStorage('style_blur-lg', '0.5'))],
    'blur-xl': ['Очень большое размытие', parseFloat(getFromLocalStorage('style_blur-xl', '0.8'))],
    'blur-xxl': ['Огромное размытие', parseFloat(getFromLocalStorage('style_blur-xxl', '1'))],
    'blur-xxxl': ['Максимальное размытие', parseFloat(getFromLocalStorage('style_blur-xxxl', '2'))]};
      Object.entries(blurVars).forEach(([name, [label, value]]) => {
        let validValue = value;
          if (isNaN(validValue) || validValue < 0) validValue = 0.1;
            const slider = createSlider(label, validValue, 0, 3, (newValue) => updateCSSVar(name, `blur(${newValue}rem)`), name); blurCard.appendChild(slider);});

  const textShadowCard = createCard('Тень для текста');
  const textShadowName = 'text-shadow-gold';
  const textShadowLabel = 'Золотая тень для текста';
  const textShadowDefault = 'rgb(222, 184, 135) 1px 0px, rgb(222, 184, 135) 0px -1px 15px, rgb(222, 184, 135) -1px 0px, rgb(222, 184, 135) 0px 1px';
  const textShadowInput = createInputField(textShadowLabel, getFromLocalStorage(`style_${textShadowName}`, textShadowDefault), (value) => updateCSSVar(textShadowName, value)); textShadowCard.appendChild(textShadowInput);
  const textShadowColorPicker = createColorInput('Цвет для текстовой тени', 'rgba(222, 184, 135, 1)', 'text-shadow-color'); textShadowCard.appendChild(textShadowColorPicker);
  
  const textPreview = document.createElement('div');
    textPreview.className = 'bs-text-shadow-preview';
    textPreview.textContent = 'Предпросмотр тени для текста';
    textPreview.style.textAlign = 'center';
    textPreview.style.margin = '15px 0';
    textPreview.style.padding = '10px';
    textPreview.style.fontSize = '18px';
    textPreview.style.fontWeight = 'bold';
    textPreview.style.textShadow = getFromLocalStorage(`style_${textShadowName}`, textShadowDefault);
    textShadowInput.addEventListener('input', (e) => {textPreview.style.textShadow = e.target.value;});
    textShadowCard.appendChild(textPreview);
  
  const hoverCard = createCard('Настройки ховера');
  const borderHoverSection = document.createElement('div'); borderHoverSection.className = 'bs-shadow-control';
  const borderHoverTitle = document.createElement('h4'); borderHoverTitle.textContent = 'Эффект границы при наведении'; borderHoverTitle.style.marginTop = '5px'; borderHoverTitle.style.marginBottom = '15px'; borderHoverTitle.style.color = 'rgba(222, 184, 135, 0.9)'; borderHoverSection.appendChild(borderHoverTitle);
  const borderTransitionDuration = createSlider('Длительность перехода', parseFloat(getFromLocalStorage('style_hover-border-duration', '1')), 0.1, 3, (value) => {saveToLocalStorage('style_hover-border-duration', value); updateHoverPreview();}); borderHoverSection.appendChild(borderTransitionDuration);
  const transformTransitionDuration = createSlider('Длительность трансформации', parseFloat(getFromLocalStorage('style_hover-transform-duration', '0.7')), 0.1, 3, (value) => {saveToLocalStorage('style_hover-transform-duration', value); updateHoverPreview();}); borderHoverSection.appendChild(transformTransitionDuration);
  const scaleValue = createSlider('Масштаб при наведении', parseFloat(getFromLocalStorage('style_hover-scale', '0.97')), 0.8, 1.2, (value) => {saveToLocalStorage('style_hover-scale', value); updateHoverPreview();}); borderHoverSection.appendChild(scaleValue);
  const borderHoverColor = createColorInput('Цвет границы при наведении', getFromLocalStorage('style_hover-border-color', 'rgba(255, 255, 255, 1)'), 'hover-border-color'); borderHoverSection.appendChild(borderHoverColor);
  const borderHoverWidth = createSlider('Толщина границы при наведении', parseFloat(getFromLocalStorage('style_hover-border-width', '0.15')), 0.05, 0.5, (value) => {saveToLocalStorage('style_hover-border-width', value); updateHoverPreview();}); borderHoverSection.appendChild(borderHoverWidth);
  const hoverPreviewBHV = document.createElement('div');
    hoverPreviewBHV.className = 'bs-hover-preview';
    hoverPreviewBHV.textContent = 'Наведи для предпросмотра';
    hoverPreviewBHV.style.margin = '15px 0';
    hoverPreviewBHV.style.padding = '15px';
    hoverPreviewBHV.style.textAlign = 'center';
    hoverPreviewBHV.style.borderRadius = '0.6rem';
    hoverPreviewBHV.style.border = '0.15rem solid rgba(255, 255, 255, 0.3)';
    hoverPreviewBHV.style.backgroundColor = 'rgba(222, 184, 135, 0.2)';
    hoverPreviewBHV.style.cursor = 'pointer';
    borderHoverSection.appendChild(hoverPreviewBHV);
  
    const updateHoverPreview = () => {
      const borderDuration = getFromLocalStorage('style_hover-border-duration', '1');
      const transformDuration = getFromLocalStorage('style_hover-transform-duration', '0.7');
      const scale = getFromLocalStorage('style_hover-scale', '0.97');
      const borderColor = getFromLocalStorage('style_hover-border-color', 'rgba(255, 255, 255, 1)');
      const borderWidth = getFromLocalStorage('style_hover-border-width', '0.15');
      
      hoverPreviewBHV.onmouseover = () => {hoverPreviewBHV.style.transition = `border-color ${borderDuration}s, transform ${transformDuration}s`; hoverPreviewBHV.style.transform = `scale(${scale})`; hoverPreviewBHV.style.border = `${borderWidth}rem solid ${borderColor}`;};
      hoverPreviewBHV.onmouseout = () => {hoverPreviewBHV.style.transition = `border-color ${borderDuration}s, transform ${transformDuration}s`; hoverPreviewBHV.style.transform = 'scale(1)'; hoverPreviewBHV.style.border = '0.15rem solid rgba(255, 255, 255, 0.3)';};}
        updateHoverPreview();
  
  const radiusHoverSection = document.createElement('div'); radiusHoverSection.className = 'bs-shadow-control';
  const radiusHoverTitle = document.createElement('h4');
    radiusHoverTitle.textContent = 'Эффект радиуса при наведении';
    radiusHoverTitle.style.marginTop = '5px';
    radiusHoverTitle.style.marginBottom = '15px';
    radiusHoverTitle.style.color = 'rgba(222, 184, 135, 0.9)';
    radiusHoverSection.appendChild(radiusHoverTitle);
  
  const radiusTransitionDuration = createSlider('Длительность перехода:', parseFloat(getFromLocalStorage('style_hover-radius-duration', '0.5')), 0.1, 3, (value) => {saveToLocalStorage('style_hover-radius-duration', value); updateRadiusPreview();}); radiusHoverSection.appendChild(radiusTransitionDuration);
  const radiusHoverValue = createSlider('Радиус при наведении:', parseFloat(getFromLocalStorage('style_hover-radius', '1.1')), 0.5, 2, (value) => {saveToLocalStorage('style_hover-radius', value); updateRadiusPreview();}); radiusHoverSection.appendChild(radiusHoverValue);
  const hoverPreviewRHV = document.createElement('div');
    hoverPreviewRHV.className = 'bs-hover-preview';
    hoverPreviewRHV.textContent = 'Наведи для предпросмотра';
    hoverPreviewRHV.style.margin = '15px 0';
    hoverPreviewRHV.style.padding = '15px';
    hoverPreviewRHV.style.textAlign = 'center';
    hoverPreviewRHV.style.borderRadius = '0.6rem';
    hoverPreviewRHV.style.backgroundColor = 'rgba(222, 184, 135, 0.2)';
    hoverPreviewRHV.style.cursor = 'pointer';
    radiusHoverSection.appendChild(hoverPreviewRHV);
  
  const updateRadiusPreview = () => {
    const radiusDuration = getFromLocalStorage('style_hover-radius-duration', '0.5');
    const radius = getFromLocalStorage('style_hover-radius', '1.1');
    
    hoverPreviewRHV.onmouseover = () => {hoverPreviewRHV.style.transition = `background ${radiusDuration}s, border-radius ${radiusDuration}s`; hoverPreviewRHV.style.borderRadius = `${radius}rem`;};
    hoverPreviewRHV.onmouseout = () => {hoverPreviewRHV.style.transition = `background ${radiusDuration}s, border-radius ${radiusDuration}s`; hoverPreviewRHV.style.borderRadius = '0.6rem';};} 
      updateRadiusPreview(); hoverCard.appendChild(borderHoverSection); hoverCard.appendChild(radiusHoverSection);
  
  const transformCard = createCard('Настройки 3D трансформации');
  const transformTitle = document.createElement('h4');
    transformTitle.style.marginTop = '5px';
    transformTitle.style.marginBottom = '15px';
    transformTitle.style.color = 'rgba(222, 184, 135, 0.9)';
    transformCard.appendChild(transformTitle);
  
  const perspectiveValue = createSlider('Перспектива', parseFloat(getFromLocalStorage('style_transform-perspective', '300')), 100, 1000, (value) => {saveToLocalStorage('style_transform-perspective', value); updateTransformPreview();}); transformCard.appendChild(perspectiveValue);
  const rotationIntensity = createSlider('Интенсивность вращения', parseFloat(getFromLocalStorage('style_transform-rotation', '5')), 1, 20, (value) => {saveToLocalStorage('style_transform-rotation', value); updateTransformPreview();}); transformCard.appendChild(rotationIntensity);
  const transformShadow = createInputField('Тень при трансформации', getFromLocalStorage('style_transform-shadow', '0rem 0rem 0.7rem 0.05rem rgba(255, 255, 255, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)'), (value) => {saveToLocalStorage('style_transform-shadow', value); updateTransformPreview();}); transformCard.appendChild(transformShadow);
  const resetTransformShadow = createInputField('Тень при сбросе трансформации', getFromLocalStorage('style_transform-reset-shadow', '0rem 0rem 0.3rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)'), (value) => {saveToLocalStorage('style_transform-reset-shadow', value);}); transformCard.appendChild(resetTransformShadow);
  const transformPreviewContainer = document.createElement('div');
    transformPreviewContainer.style.position = 'relative';
    transformPreviewContainer.style.height = '150px';
    transformPreviewContainer.style.margin = '20px 0';
    transformPreviewContainer.style.perspective = `${getFromLocalStorage('style_transform-perspective', '300')}px`;
  
  const transformPreview = document.createElement('div');
    transformPreview.className = 'bs-transform-preview';
    transformPreview.textContent = 'Перемещай курсор для предпросмотра';
    transformPreview.style.position = 'absolute';
    transformPreview.style.top = '0';
    transformPreview.style.left = '0';
    transformPreview.style.right = '0';
    transformPreview.style.bottom = '0';
    transformPreview.style.display = 'flex';
    transformPreview.style.alignItems = 'center';
    transformPreview.style.justifyContent = 'center';
    transformPreview.style.backgroundColor = 'rgba(222, 184, 135, 0.2)';
    transformPreview.style.borderRadius = '0.6rem';
    transformPreview.style.border = '0.150rem solid rgba(255, 255, 255, 0.2)';
    transformPreview.style.cursor = 'pointer';
    transformPreview.style.transformStyle = 'preserve-3d';
    transformPreview.style.boxShadow = getFromLocalStorage('style_transform-reset-shadow', '0rem 0rem 0.3rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)'); 
    transformPreviewContainer.appendChild(transformPreview); 
    transformCard.appendChild(transformPreviewContainer);
  
  const updateTransformPreview = () => {
    const perspective = getFromLocalStorage('style_transform-perspective', '300');
    const intensity = getFromLocalStorage('style_transform-rotation', '5');
    const shadow = getFromLocalStorage('style_transform-shadow', '0rem 0rem 0.7rem 0.05rem rgba(255, 255, 255, 0.75), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)');
    const resetShadow = getFromLocalStorage('style_transform-reset-shadow', '0rem 0rem 0.3rem 0.05rem rgba(0, 0, 0, 0.5), inset 0rem 0rem 0.5rem 0.15rem rgba(0,0,0,0.3)'); transformPreviewContainer.style.perspective = `${perspective}px`; transformPreview.addEventListener('mousemove', (e) => {
      const rect = transformPreview.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) * 110;
      const yPercent = (y / rect.height) * 110;
      
      const rotateX = ((yPercent / 50 - 1) * intensity);
      const rotateY = ((xPercent / 50 - 1) * intensity);
      
      transformPreview.style.transition = 'box-shadow 0.7s, border-color 0.7s'; transformPreview.style.transformOrigin = 'center center'; transformPreview.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`; transformPreview.style.boxShadow = shadow;});
        transformPreview.addEventListener('mouseleave', () => {transformPreview.style.transition = 'transform 0.5s ease-in-out, box-shadow 0.7s, border-color 0.7s';transformPreview.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'; transformPreview.style.boxShadow = resetShadow;});}
          updateTransformPreview();

  const resetStylesButton = createButton('Сбросить стили', () => {
    const styleKeys = getAllKeysStartingWith('style_'); styleKeys.forEach(key => removeFromLocalStorage(key)); showNotification('Настройки стилей сброшены, перезагрузи страницу', 'success');}, 'bs-btn-danger');
  
  resetStylesButton.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';
  resetStylesButton.style.marginTop = '20px';
  resetStylesButton.style.display = 'block';
  resetStylesButton.style.width = '100%';
  resetStylesButton.addEventListener('mouseenter', () => {resetStylesButton.style.backgroundColor = 'rgba(255, 107, 107, 0.4)';});
  resetStylesButton.addEventListener('mouseleave', () => {resetStylesButton.style.backgroundColor = 'rgba(255, 107, 107, 0.3)';});
            
  sectionContent.append(colorsCard, bgCard, borderCard, borderColorCard, shadowCard, insetShadowCard, blurCard, textShadowCard, hoverCard, transformCard, resetStylesButton); container.appendChild(sectionContent);

  Object.entries({...colorVars, ...bgVars, ...borderColorVars}).forEach(([name, [_, value]]) => {document.documentElement.style.setProperty(`--${name}`, value);});
  Object.entries(borderRadiusVars).forEach(([name, [_, value]]) => {document.documentElement.style.setProperty(`--${name}`, `${value}rem`);});
  Object.entries(blurVars).forEach(([name, [_, value]]) => {
    const validValue = isNaN(value) || value < 0 ? 0.1 : value; document.documentElement.style.setProperty(`--${name}`, `blur(${validValue}rem)`);});
      document.documentElement.style.setProperty('--border-width', `${parseFloat(getFromLocalStorage('style_border-width', '0.15'))}rem`); document.documentElement.style.setProperty('--text-shadow-gold', getFromLocalStorage('style_text-shadow-gold', textShadowDefault));
};