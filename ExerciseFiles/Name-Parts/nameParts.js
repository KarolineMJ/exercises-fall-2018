"use strict"
/*Given a name string, e.g. “Peter Heronimous Lind” - split the string into three variables: firstName, middleName and lastName.
Hint: use indexOf and substring (avoid substr, it is being deprecals ted).
Expect the name to be a const - you can’t modify it.
*/

//a method doesn't change a string - a string is constant. 

const fullName = "Peter Heronimous Lind";

const firstSpace = fullName.indexOf(" ");
console.log(`Firstspace at ${firstSpace}`);

const secondSpace = fullName.indexOf(" ", firstSpace + 1);
console.log(`Secondspace at ${secondSpace}`);

const firstName = fullName.substring(0, firstSpace);
console.log(firstName);


const middleName = fullName.substring(5, secondSpace).trim(); //trim removes spaces from the sentense 
console.log(middleName);

const lastName = fullName.substring(16 + 1);
console.log(lastName);