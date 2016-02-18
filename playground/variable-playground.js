/*
 * Passing variables by reference.
 * 
 * If we pass a variable into a function via an argument, and
 * set it = to anything, we essentially assign a new value to
 * that variable. Overwriting the original.  This way, changes
 * to the new obj don't affect the original.
 *
 * If we want to update the original objet, we can do that by
 * mutating the origial, meaning we update one of the original's
 * attributes ( .age, in the example below ).
 *
 * When you assign a new value to the original, you do not
 * update the original. When you call something ON the original,
 * you DO update the original.
 *
 * Same works for arrays.
 *
 * RETURNs return a modified value.
 *
*/
 
//var person = {
//  name: 'Jackson',
//  age: 21
//};
//
//function updatePerson (obj) {
////  obj = {                 //
////    name: 'Jackson',      // This code DOES NOT update the 
////    age: 24               // original object.
////  };                      //
//  
//  obj.age = 24;             // this code DOES update the original
//
//};
//
//updatePerson(person);
//console.log(person)

// ARRAY EXAMPLE

var grades = [15, 37];

function addGrade (grades) {
  grades.push(55);           // updates original grades array
  debugger;                  // SPECIAL
  
  // grades = [10, 30, 59];        // reassigns grades
  
}

addGrade(grades);
console.log(grades);
