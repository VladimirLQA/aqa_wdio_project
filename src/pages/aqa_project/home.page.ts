class HomePage {
    get ["User dropdown menu"]() {
        return "#sidebar #dropdownUser1";
    }

    get ["Sign out button"]() {
        return "#signOut";
    }

    get ["Sidebar title"]() {
        return "#sidebar > a > span.fs-4";
    }

    get ["Home page"]() {
        return "#sidebar > ul > li:nth-child(1) > a";
    }

    get ["Orders page"]() {
        return "#sidebar > ul > li:nth-child(2) > a";
    }

    get ["Products page"]() {
        return "#sidebar > ul > li:nth-child(3) > a";
    }

    get ["Customers page"]() {
        return "#sidebar > ul > li:nth-child(4) > a";
    }

    get ["Currency input"]() {
        return "#currency-input";
    }

    get ["Currency 'Buy' button"]() {
        return "#sidebar > div > button";
    }

}
export default new HomePage();