import PageHandler from './page-handler.page';

export default class BasePage extends PageHandler {
   readonly ['Spinner'] = '.spinner-border';
   readonly ['Toast text'] = '.toast-body';
   readonly ['Toast close button'] = '.toast-container button';

}
