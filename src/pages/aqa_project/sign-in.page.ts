import {credentials} from "../../data/aqa_project";

class SignInPage {
    get ["Email"]() {
        return $("#emailinput");
    }

    get ["Password"]() {
        return $("#passwordinput");
    }

    get ["Remember me check box"]() {
        return $("#remembermecheckbox");
    }

    get ["Login button"]() {
        return $(".btn-lg");
    }

    get ["Spinner"]() {
        return $(".spinner-border");
    }

    get ["Image"]() {
        return $(".img-fluid");
    }

    async login() {
        await this.Email.setValue(credentials.login);
        await this.Password.setValue(credentials.password);
        await this["Login button"].click();
    }
}
export default new SignInPage();