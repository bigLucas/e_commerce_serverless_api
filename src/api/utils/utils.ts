export const arrayToMap = <T>(array: T[], propertyToUseAsKey: keyof T): {[key:number]: T} => {
    return array.reduce((previousValue, currentObject) =>  {
        previousValue[currentObject[propertyToUseAsKey as string]] = currentObject;
        return previousValue;
    }, {});
}