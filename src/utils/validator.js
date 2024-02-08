// const validator = (data) => {
//   const res = schema.validate(data, {
//     abortEarly: false,
//   });
//   console.log(res);
//   if (res.error) {
//     const errorData = storeErrorInDynamicArray(res.error);
//     setError(errorData);
//   } else {
//     let empty = [];
//     setError(empty);
//   }
// };

// function storeErrorInDynamicArray(error) {
//   const structuredError = error._original;

//   error.details.forEach((detail) => {
//     let currentField = structuredError;
//     let currentPath = "";

//     detail.path.forEach((pathPart, index) => {
//       currentPath += (index > 0 ? "." : "") + pathPart;

//       if (!currentField[pathPart]) {
//         currentField[pathPart] = {};
//       }

//       if (index === detail.path.length - 1) {
//         currentField[pathPart] = detail.context.label;
//       }

//       currentField = currentField[pathPart];
//     });
//   });

//   return structuredError;
// }

// module.exports = {
//   validator,
//   storeErrorInDynamicArray,
// };
