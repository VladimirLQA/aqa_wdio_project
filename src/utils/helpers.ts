import HomePage from "../pages/aqa_project/home.page";

export type FindAsyncCallback<T> = (value: T, index?: number, array?: T[]) => Promise<boolean>;

export async function find<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
    for (let i = 0; i < array?.length; i++) {
        const result = await callback(array[i], i, array);
        if (result) {
            return array[i];
        }
    }
    return undefined;
}

export async function isBgDanger(element: WebdriverIO.Element): Promise<boolean> {
    let classAttribute = await element.getAttribute("class");
    return classAttribute.split(" ").includes("bg-danger");
}