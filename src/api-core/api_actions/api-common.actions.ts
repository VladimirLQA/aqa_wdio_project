import { reqAsLoggedUser } from '../request/request-as-logged-user.js';
import { ControllersList } from '../controllers/contollers.index.js';
import { ControllersIndexName } from '../controllers/contollers.index.js';

class ApiCommonActions {
  async deleteCreatedEntities(controller: ControllersIndexName, ids: string[]) {
    for(const id of ids) {
      await reqAsLoggedUser(ControllersList[controller as ControllersIndexName].delete, { data: { _id: id}});
    }
  }
}

export default new ApiCommonActions();
