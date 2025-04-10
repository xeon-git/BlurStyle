import {createCard, createToggle, showNotification} from '../utils';
import {getFromLocalStorage, saveToLocalStorage} from '../../utils/storage';
import {overrides} from '../../arrays/overrides';

export const createResourcesSection = (container) => {
  const resourcesCard = createCard('Управление ресурсами');
  const resourceNotice = document.createElement('div'); resourceNotice.className = 'bs-resource-notice'; resourceNotice.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="rgba(222, 184, 135, 0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 5V8" stroke="rgba(222, 184, 135, 0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 11.01L8.01 10.999" stroke="rgba(222, 184, 135, 0.9)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Примечание: настройки ресурсов требуют перезагрузки страницы для применения`; resourcesCard.appendChild(resourceNotice);
  
  const customResourcesEnabled = getFromLocalStorage('customResourcesEnabled', true);
  const resourcesState = getFromLocalStorage('resourcesState', {});
  const customResourcesToggle = createToggle('Кастомные ресурсы', customResourcesEnabled, (value) => {saveToLocalStorage('customResourcesEnabled', value);
    if (window.toggleAllResources) {window.toggleAllResources(value);} showNotification(`Кастомные ресурсы ${value ? 'включены' : 'отключены'}`, 'success');}); resourcesCard.appendChild(customResourcesToggle);
  
  const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'bs-input';
    searchInput.placeholder = 'Поиск ресурсов...';
    searchInput.style.width = '100%';
    searchInput.style.marginTop = '12px';
    searchInput.style.marginBottom = '12px';
    resourcesCard.appendChild(searchInput);
  
  const resourcesList = document.createElement('div'); resourcesList.className = 'bs-resources-list';
  const renderResources = (filterText = '', sortFunction = null, filterFunction = null) => {resourcesList.innerHTML = '';
    let filteredOverrides = [...overrides];

    if (filterText) {filteredOverrides = filteredOverrides.filter(o => 
      (o.description && o.description.toLowerCase().includes(filterText.toLowerCase())) || 
      (o.from && o.from.toLowerCase().includes(filterText.toLowerCase())) || 
      (o.to && o.to.toLowerCase().includes(filterText.toLowerCase())));}
    
    if (filterFunction) {filteredOverrides = filteredOverrides.filter((o, i) => filterFunction(o, i));}
    if (sortFunction) {filteredOverrides.sort(sortFunction);}
    if (filteredOverrides.length === 0) {
      const noResults = document.createElement('div'); 
        noResults.textContent = 'Ресурсы не найдены'; 
        noResults.style.textAlign = 'center'; 
        noResults.style.padding = '20px'; 
        noResults.style.color = 'rgba(255, 255, 255, 0.5)'; 
        resourcesList.appendChild(noResults);
          return;}

    filteredOverrides.forEach((override, index) => {
      const resourceId = override.id || `resource_${index}`;
      const isEnabled = resourcesState[resourceId] !== false;
      const resourceItem = document.createElement('div'); resourceItem.className = 'bs-resource-item';
      const resourceHeader = document.createElement('div');
        resourceHeader.className = 'bs-resource-header';
        resourceHeader.style.display = 'flex';
        resourceHeader.style.justifyContent = 'space-between';
        resourceHeader.style.alignItems = 'center';
        resourceHeader.style.marginBottom = '10px';
      
      const resourceTitle = document.createElement('div'); resourceTitle.textContent = override.description || `Ресурс ${index + 1}`; resourceTitle.style.fontWeight = 'bold'; resourceTitle.style.color = 'rgba(222, 184, 135, 0.9)';
      const resourceToggle = createToggle('', isEnabled, (value) => {
        const currentState = {...getFromLocalStorage('resourcesState', {})}; currentState[resourceId] = value; saveToLocalStorage('resourcesState', currentState);
          if (window.toggleResource) {window.toggleResource(resourceId, value);}
        
        const resourceName = override.description || `Ресурс ${index + 1}`; showNotification(`${resourceName} ${value ? 'вкл' : 'выкл'}`, 'success');}); resourceHeader.append(resourceTitle, resourceToggle); resourceItem.appendChild(resourceHeader);
      
      const resourceDetails = document.createElement('div'); resourceDetails.className = 'bs-resource-details';
      const fromText = document.createElement('div'); fromText.innerHTML = `<strong>Откуда:</strong> ${override.from}`; fromText.style.marginBottom = '4px';
      const toText = document.createElement('div'); toText.innerHTML = `<strong>Куда:</strong> ${override.to}`; resourceDetails.append(fromText, toText); resourceItem.appendChild(resourceDetails); resourcesList.appendChild(resourceItem);});};

  searchInput.addEventListener('input', () => {renderResources(searchInput.value);}); renderResources(); resourcesCard.appendChild(resourcesList); container.appendChild(resourcesCard);

  const sortingCard = createCard('Сортировка и фильтры');
  const sortingRow = document.createElement('div');
  const sortingOptions = document.createElement('div'); sortingOptions.className = 'bs-sorting-options';
  const sortings = {
    byName: {
      text: 'По имени', 
        fn: (a, b) => {
          const aName = a.description || '';
          const bName = b.description || '';
            return aName.localeCompare(bName);}},
    byStatus: {
      text: 'По статусу', 
        fn: (a, b) => {
          const aId = a.id || '';
          const bId = b.id || '';
          const aEnabled = resourcesState[aId] !== false;
          const bEnabled = resourcesState[bId] !== false;
            return bEnabled - aEnabled;}}};

  const filters = {
    all: {
      text: 'Все', 
        fn: () => true},
    enabled: {
      text: 'Включенные', 
        fn: (override, index) => {
          const resourceId = override.id || `resource_${index}`;
            return resourcesState[resourceId] !== false;}},
    disabled: {
      text: 'Отключенные', 
        fn: (override, index) => {
          const resourceId = override.id || `resource_${index}`;
            return resourcesState[resourceId] === false;}}};

  let activeSortBtn = null;
  let activeFilterBtn = null;
  let currentSort = null;
  let currentFilter = filters.all.fn;
  
  const createSortButton = (text, sortFn) => {
    const button = document.createElement('button'); button.className = 'bs-btn bs-sort-btn'; button.textContent = text; button.style.padding = '6px 12px'; button.style.fontSize = '13px';
      button.addEventListener('click', (e) => {e.stopPropagation();
        if (activeSortBtn) {activeSortBtn.style.background = 'rgba(222, 184, 135, 0.3)';} button.style.background = 'rgba(222, 184, 135, 0.5)'; activeSortBtn = button; currentSort = sortFn; renderResources('', currentSort, currentFilter);});
          return button;};

  Object.values(sortings).forEach(({text, fn}) => {
    const btn = createSortButton(text, fn); sortingOptions.appendChild(btn);}); sortingRow.appendChild(sortingOptions);

  const filterRow = document.createElement('div');
  const filterOptions = document.createElement('div'); filterOptions.className = 'bs-filter-options';
  
  const createFilterButton = (text, filterFn) => {
    const button = document.createElement('button'); button.className = 'bs-btn bs-filter-btn'; button.textContent = text; button.style.padding = '6px 12px'; button.style.fontSize = '13px';
      button.addEventListener('click', (e) => {e.stopPropagation();
        if (activeFilterBtn) {activeFilterBtn.style.background = 'rgba(222, 184, 135, 0.3)';} button.style.background = 'rgba(222, 184, 135, 0.5)';  activeFilterBtn = button; currentFilter = filterFn; renderResources('', currentSort, currentFilter);});
          return button;};

    Object.values(filters).forEach(({text, fn}) => {
      const btn = createFilterButton(text, fn);
        if (text === 'Все') {btn.style.background = 'rgba(222, 184, 135, 0.5)'; activeFilterBtn = btn;} filterOptions.appendChild(btn);}); filterRow.appendChild(filterOptions); sortingCard.append(sortingRow, filterRow); container.appendChild(sortingCard);
};