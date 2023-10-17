import PageHandler from './page-handler.page';

export default class BasePage extends PageHandler {
   readonly ['Spinner'] = '.spinner-border';
   readonly ['Toast body'] = '.toast-body';
   readonly ['Toast close button'] = '.toast-container button';
   readonly ['Modal close button'] = 'button.btn-close';
}
