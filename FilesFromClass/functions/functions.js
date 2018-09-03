function writeFullName(firstName, lastName) {
    firstName = firstName.toUpperCase();
    console.log(`Full name is ${firstName} ${lastName}`);
}

const givenName = "Peter";
const familyName = "Lind";

//givenName = givenName.toUpperCase();

writeFullName(givenName, familyName);
console.log(givenName);

function splitName(fullName) {
    const space = fullName.indexOf(" ");
    const firstName = fullName.substring(0, space);
    const lastName = fullName.substring(space + 1);

    console.log(`First name: ${firstName} last name: ${lastName}`);

}
splitName("Peter Lind");