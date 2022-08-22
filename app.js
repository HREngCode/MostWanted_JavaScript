/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people  A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people); //Need to create
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  } else if (person.length > 1) {
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', 'current spouse', 'sibling', 'parents' or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo); //Undefined-Bug-Done!!!
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      findPersonFamily(person[0], people); //Done!
      break;
    case "current spouse":
      searchByCurrentSpouse(person[0], people);
      break;
    case "sibling":
      searchBySibling(person[0], people);
      break;
    case "parents":
      searchByParents(person[0], people);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      findPersonDescendants(person[0], people);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default: // can add case "test"
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a collection of family-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
 function displayFamily(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName} relation: ${label}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `Date of Birth: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  personInfo += `Parents: ${person.parents}\n`;
  personInfo += `Current Spouse: ${person.currentSpouse}\n`;

  //DONE! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  return personInfo; //Display Information
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function checks to see if the value passed into input is either "single" or "multiple."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function singMult(input) {
  return input.toLowerCase() === "single" || input.toLowerCase() === "multiple";
}
// End of singMult()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  let promptAnswer = input;
  if (!promptAnswer) {
    alert("You must enter an answer");
    return app(people);
  } else {
    return true; // Default validation only
  }
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function searchByTraits(people) {
  let newArray = people;
  let numTraits = promptFor(
    "How many traits would you like to search for? Please type single or multiple! ",
    singMult
  );
  if (numTraits === "single") {
    let trait = promptFor("Please enter a trait type to search for. ", chars);
    let traitValue = promptFor(
      "Please enter the trait value you want to search for. ",
      chars
    );
    newArray = newArray.filter(function (person) {
      if (person[trait] === traitValue) {
        return person;
      }
    });
    if (newArray.length === 1) return newArray;
    if (newArray.length === 0) {
      alert("This function has resulted in zero results. Restarting!");
      return searchByTraits(people);
    }
    displayPeople(newArray);
    return newArray;
  } else if (numTraits === "multiple") {
    let numTraits = parseInt(
      promptFor(
        "How many traits would you like to search for? Enter a number from 2-5! ",
        chars
      )
    );

    if (numTraits === 2) {
      let trait = promptFor(
        "Please enter the first trait type to search for. ",
        chars
      );
      let traitValue = promptFor(
        "Please enter the first trait value you want to search for. ",
        chars
      );
      let trait2 = promptFor(
        "Please enter the second trait type to search for. ",
        chars
      );
      let traitValue2 = promptFor(
        "Please enter the second trait value you want to search for. ",
        chars
      );
      newArray = newArray.filter(function (person) {
        if (person[trait] === traitValue && person[trait2] === traitValue2) {
          return person;
        }
      });
      if (newArray.length === 1) return foundTraits;
      if (newArray.length === 0) {
        alert("This function has resulted in zero results. Restarting!");
        return searchByTraits(people);
      }
      displayPeople(newArray);
      return newArray;
    } else if (numTraits === 3) {
      let trait = promptFor(
        "Please enter the first trait type to search for. ",
        chars
      );
      let traitValue = promptFor(
        "Please enter the first trait value you want to search for. ",
        chars
      );
      let trait2 = promptFor(
        "Please enter the second trait type to search for. ",
        chars
      );
      let traitValue2 = promptFor(
        "Please enter the second trait value you want to search for. ",
        chars
      );
      let trait3 = promptFor(
        "Please enter the third trait type to search for. ",
        chars
      );
      let traitValue3 = promptFor(
        "Please enter the third trait value you want to search for. ",
        chars
      );
      newArray = newArray.filter(function (person) {
        if (
          person[trait] === traitValue &&
          person[trait2] === traitValue2 &&
          person[trait3] === traitValue3
        ) {
          return person;
        }
      });
      if (newArray.length === 1) return foundTraits;
      if (newArray.length === 0) {
        alert("This function has resulted in zero results. Restarting!");
        return searchByTraits(people);
      }
      displayPeople(newArray);
      return newArray;
    } else if (numTraits === 4) {
      let trait = promptFor(
        "Please enter the first trait type to search for. ",
        chars
      );
      let traitValue = promptFor(
        "Please enter the first trait value you want to search for. ",
        chars
      );
      let trait2 = promptFor(
        "Please enter the second trait type to search for. ",
        chars
      );
      let traitValue2 = promptFor(
        "Please enter the second trait value you want to search for. ",
        chars
      );
      let trait3 = promptFor(
        "Please enter the third trait type to search for. ",
        chars
      );
      let traitValue3 = promptFor(
        "Please enter the third trait value you want to search for. ",
        chars
      );
      let trait4 = promptFor(
        "Please enter the fourth trait type to search for. ",
        chars
      );
      let traitValue4 = promptFor(
        "Please enter the fourth trait value you want to search for. ",
        chars
      );
      newArray = newArray.filter(function (person) {
        if (
          person[trait] === traitValue &&
          person[trait2] === traitValue2 &&
          person[trait3] === traitValue3 &&
          person[trait4] === traitValue4
        ) {
          return person;
        }
      });
      if (newArray.length === 1) return foundTraits;
      if (newArray.length === 0) {
        alert("This function has resulted in zero results. Restarting!");
        return searchByTraits(people);
      }
      displayPeople(newArray);
      return newArray;
    } else if (numTraits === 5) {
      let trait = promptFor(
        "Please enter the first trait type to search for. ",
        chars
      );
      let traitValue = promptFor(
        "Please enter the first trait value you want to search for. ",
        chars
      );
      let trait2 = promptFor(
        "Please enter the second trait type to search for. ",
        chars
      );
      let traitValue2 = promptFor(
        "Please enter the second trait value you want to search for. ",
        chars
      );
      let trait3 = promptFor(
        "Please enter the third trait type to search for. ",
        chars
      );
      let traitValue3 = promptFor(
        "Please enter the third trait value you want to search for. ",
        chars
      );
      let trait4 = promptFor(
        "Please enter the fourth trait type to search for. ",
        chars
      );
      let traitValue4 = promptFor(
        "Please enter the fourth trait value you want to search for. ",
        chars
      );
      let trait5 = promptFor(
        "Please enter the fifth trait type to search for. ",
        chars
      );
      let traitValue5 = promptFor(
        "Please enter the fifth trait value you want to search for. ",
        chars
      );
      newArray = newArray.filter(function (person) {
        if (
          person[trait] === traitValue &&
          person[trait2] === traitValue2 &&
          person[trait3] === traitValue3 &&
          person[trait4] === traitValue4 &&
          person[trait5] === traitValue5
        ) {
          return person;
        }
      });
      if (newArray.length === 1) return foundTraits;
      if (newArray.length === 0) {
        alert("This function has resulted in zero results. Restarting!");
        return searchByTraits(people);
      }
      displayPeople(newArray);
      return newArray;
    }
  }
}

function recursiveFindTraits(obj, array = []) {
  let subArray = obj.trait;
  array = [obj];
  if (subArray.length === 0) {
    return array;
  }
  for (let i = 0; i < subArray.length; i++) {
    array = array.concat(recursiveFindTraits(subArray[i]));
  }
}


function searchByCurrentSpouse(foundPerson,people) {
  let foundSpouse = people.filter(function (people) {
    if (foundPerson.id === people.currentSpouse) {
      return true;
    }
  });displayPeople(foundSpouse);
}

function searchBySibling(foundPerson, people) {
  let foundSibling = people.filter(function (people) {
    if (
      foundPerson.lastName === people.lastName &&
      foundPerson.id != people.currentSpouse
    ) {
      return true;
    }
  });displayPeople(foundSibling);
}

function searchByParents(foundPerson, people) {
  let foundParent = people.filter(function (people) {
    if (people.parents.includes(foundPerson.id)) {
      return true;
    }
  });displayPeople(foundParent);
}

function findPersonDescendants(foundPerson, people){
  let foundDescendant = people.filter(function (people) {
    if (foundPerson.parents.includes(people.id)) 
    {
      return true;
    }
  });displayPeople(foundDescendant);
}

function findPersonFamily(foundPerson, people) {
  let foundFamily = people.filter(function (people) {
    let label = (" ")
    if (foundPerson.id === people.currentSpouse) {
      label = "Current Spouse"
      return true;
    } else if (
      foundPerson.lastName === people.lastName &&
      foundPerson.id != people.currentSpouse
    ) {
      label = "Sibling";
      return true;
    } else if (people.parents.includes(foundPerson.id)) {
      label = "Parent"
      return true;
    } else {
      return false;
    }
  });
  displayFamily(foundFamily);
}
