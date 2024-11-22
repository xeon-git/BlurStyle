import {changeTitle} from './utils/changeTitle';
import {restoreFilterSettings, initializeFilters} from './utils/filters';
import {resistanceTab} from './utils/resistanceTab';
import {replaceChecker} from './utils/replaceChecker';
import {cssBg} from './utils/cssBg';
import {canvasBg} from './utils/canvasBg';
import {initObserver} from './utils/initObserver';

changeTitle('BlurStyle');
restoreFilterSettings();
initializeFilters();
resistanceTab();
replaceChecker();
cssBg();
canvasBg();
initObserver();