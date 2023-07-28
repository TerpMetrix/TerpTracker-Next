/* eslint-disable */

/**
 * Okay, so this is a bit of a mess:
 *
 * I'll try to explain:
 *
 * Prisma queries that have a column type of DateTime return JavaScript Date objects.
 * We want to use the types generated by Prisma on both the backend and frontend.
 *
 * NextJS will not serialize Date objects that are returned by getServerSideProps or getStaticProps.
 *
 * So, we need to convert the Date objects to strings before sending them to the frontend.
 * and then convert them back to Date objects on the frontend.
 *
 * These functions are used to do that.
 *
 * convertDatesToStrings: will look at every field of an object and recursively convert any Date objects to strings.
 * convertStringsToDates: will convert all strings to Dates for the specified fields listed in stringToDateFields.
 */

const stringToDateFields = ["updatedAt", "createdAt", "batchDate"];

/**
 * Converts any Date objects in the given object to ISO string format.
 * @param {any} obj - The object to convert.
 * @returns {any} - The converted object.
 */
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

/**
 * Recursively converts specified string fields in an object to Date objects.
 * @param {any} obj - The object to convert.
 * @returns {any} - The converted object.
 */
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
