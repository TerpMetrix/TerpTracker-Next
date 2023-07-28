const stringToDateFields = ["updatedAt", "createdAt", "batchDate"];

export function convertDatesToStrings(obj: any): any {
  if (obj instanceof Date) {
    return obj.toISOString();
  } else if (Array.isArray(obj)) {
    return obj.map((item) => convertDatesToStrings(item));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc: any, key) => {
      acc[key] = convertDatesToStrings(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
}

export function convertStringsToDates(obj: any): any {
  // Base case for recursion: if the object is null or not an object, return it as is.
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Create a new object to hold the updated values.
  let newObj: { [key: string]: any } = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    let value = obj[key];

    // Check if the key is one of the specified field names and the value is a string.
    if (stringToDateFields.includes(key) && typeof value === "string") {
      // If so, convert the value to a Date.
      newObj[key] = new Date(value);
    } else if (typeof value === "object") {
      // If the value is an object, recurse on it.
      newObj[key] = convertStringsToDates(value);
    } else {
      // Otherwise, copy the value as is.
      newObj[key] = value;
    }
  }

  return newObj;
}
