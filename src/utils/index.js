import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import router from "@/router";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//Authentication Functions
export const getLoggedInUser = () => {
    var currentUser = getAuth().currentUser
    var userId = currentUser.uid;
    var user = ref(db, 'users/' + userId);
    onValue(user, (snapshot) => {
        const data = snapshot.val();
        var username = data.username
        console.log(username)
    });
}
export const register = () => {
    console.log("Handling signup")
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var familyId = document.getElementById('familyId').value;
    const name = document.getElementById('name').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    createUserWithEmailAndPassword(getAuth(), email, password)
        .then(function (result) {
            console.log(result.user.uid)
            set(ref(db, 'users/' + result.user.uid), {
                userId: result.user.uid,
                familyId: familyId,
                username: name,
                email: email,
                gender: gender,
                age: age,
                height: "",
                weight: "",
                activityFrequency: "",
                calorieDetails: []
            });
            router.push('/')
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

export const signin = () => {
    console.log("Handling signin")
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    signInWithEmailAndPassword(getAuth(), email, password)
        .then(() => {
            console.log("Successfully signed in")
            router.push('/')
        })

        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password!');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

export const googlesignup = () => {
    var provider = new GoogleAuthProvider();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const familyId = document.getElementById('familyId').value;
    const name = document.getElementById('name').value;
    signInWithPopup(getAuth(), provider).then(function (result) {
        console.log(result.user)
        set(ref(db, 'users/' + result.user.uid), {
            userId: result.user.uid,
            familyId: familyId,
            username: name,
            email: result.user.email,
            gender: gender,
            age: age,
            height: "",
            weight: "",
            activityFrequency: "",
            calorieDetails: []
        });
        router.push('/')
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password!');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                alert("Incorrect password!");
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
};
export const googlesignin = () => {
    var provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then(function (result) {
        // console.log(result.user);
        console.log(getAuth().currentUser.uid)
        router.push('/')
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Incorrect password!');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                alert("Incorrect password!");
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
};

// Getting all the recipe from the DB for display in SearchRecipe.vue
export const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        // eslint-disable-next-line
        const recipes = ref(db, 'recipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            for (const obj of data) {
                recipeFound.push(obj)
            }
            // console.log(recipeFound);
            return resolve(recipeFound)
        })
        console.log('end promises');
        console.log('this is recipefound', recipeFound);
    })
}

// Filter by Cuisine
export const checkCuisine = (phrase) => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        // eslint-disable-next-line
        const recipes = ref(db, 'recipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            for (const obj of data) {
                if ('cuisines' in obj && obj.cuisines.includes(phrase) && !recipeFound.includes(obj)) {
                    recipeFound.push(obj)
                }
            }
            // console.log(recipeFound);
            return resolve(recipeFound)
        })
        console.log('end promises');
        console.log('this is recipefound', recipeFound);
    })
}

// Filter bu Diet
export const checkDiet = (phrase) => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        // eslint-disable-next-line
        const recipes = ref(db, 'recipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            for (const obj of data) {
                if ('diets' in obj && obj.diets.includes(phrase) && !recipeFound.includes(obj)) {
                    recipeFound.push(obj)
                }
            }
            // console.log(recipeFound);
            return resolve(recipeFound)
        })
        console.log('end promises');
        console.log('this is recipefound', recipeFound);
    })
}

// Filter by Dish Type
export const checkDish = (phrase) => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        // eslint-disable-next-line
        const recipes = ref(db, 'recipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            for (const obj of data) {
                if ('dishTypes' in obj && obj.dishTypes.includes(phrase) && !recipeFound.includes(obj)) {
                    recipeFound.push(obj)
                }
            }
            // console.log(recipeFound);
            return resolve(recipeFound)
        })
        console.log('end promises');
        console.log('this is recipefound', recipeFound);
    })
}

// Search bar functionality for SearchRecipe. Looks through the recipe name and summary to see if the keyword is found
export const searchContent = (phrase) => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        // eslint-disable-next-line
        const recipes = ref(db, 'recipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            for (const obj of data) {
                if (obj.recipeName.toLowerCase().includes(phrase) && !recipeFound.includes(obj)) {
                    recipeFound.push(obj)
                }
                if (obj.summary.toLowerCase().includes(phrase) && !recipeFound.includes(obj)) {
                    recipeFound.push(obj)
                }
            }
            // console.log(recipeFound);
            return resolve(recipeFound)
        })
        console.log('end promises');
        console.log('this is recipefound', recipeFound);
    })
}

// Search bar functionality for Fav/Past recipes. Looks through the recipe name and summary to see if the keyword is found
export const searchFavPast = (userid, phrase, type) => {
    return new Promise((resolve, reject) => {
        console.log("start promise");
        var recipeFound = [];
        var recipeIds = [];
        getUser(userid)
            .then((value) => {
                var location = ''
                if (type == 'fav') {
                    location = value.FavouriteRecipes
                } else {
                    location = value.PastRecipes
                }
                recipeIds = location;
                // console.log(recipeIds);
                for (let id of recipeIds) {
                    // eslint-disable-next-line
                    const recipes = ref(db, "recipes");
                    onValue(recipes, (snapshot) => {
                        const data = snapshot.val();
                        for (const obj of data) {
                            // console.log(obj.id);
                            if (obj.recipeId == id) {
                                if (obj.recipeName.toLowerCase().includes(phrase) && !recipeFound.includes(obj)) {
                                    recipeFound.push(obj)
                                }
                                if (obj.summary.toLowerCase().includes(phrase) && !recipeFound.includes(obj)) {
                                    recipeFound.push(obj)
                                }
                            }
                        }
                        // console.log(len);
                        return resolve(recipeFound);
                    });
                }
            })
            .catch((message) => {
                console.log(message);
            });
        console.log("end promises");
        console.log("this is recipefound", recipeFound);
    });
}

// getting list of recipeId from favourite table, using the recipeId => return a list of recipe objects
export const getFavourite = (userid) => {
    return new Promise((resolve, reject) => {
        console.log("start promise");
        var recipeFound = [];
        var recipeIds = [];
        getUser(userid)
            .then((value) => {
                recipeIds = value.FavouriteRecipes;
                // console.log(recipeIds);
                for (let id of recipeIds) {
                    // eslint-disable-next-line
                    const recipes = ref(db, "recipes");
                    onValue(recipes, (snapshot) => {
                        const data = snapshot.val();
                        for (const obj of data) {
                            // console.log(obj.id);
                            if (obj.recipeId == id) {
                                recipeFound.push(obj);
                            }
                        }
                        // console.log(len);
                        return resolve(recipeFound);
                    });
                }
            })
            .catch((message) => {
                console.log(message);
            });
        console.log("end promises");
        console.log("this is recipefound", recipeFound);
    });
};

// getting list of recipeId from Past table, using the recipeId => return a list of recipe objects
export const getPast = (userid) => {
    return new Promise((resolve, reject) => {
        console.log("start promise");
        var recipeFound = [];
        var recipeIds = [];
        getUser(userid)
            .then((value) => {
                recipeIds = value.PastRecipes;
                // console.log(recipeIds);
                for (let id of recipeIds) {
                    // eslint-disable-next-line
                    const recipes = ref(db, "recipes");
                    onValue(recipes, (snapshot) => {
                        const data = snapshot.val();
                        for (const obj of data) {
                            // console.log(obj.id);
                            if (obj.recipeId == id) {
                                recipeFound.push(obj);
                            }
                        }
                        // console.log(len);
                        return resolve(recipeFound);
                    });
                }
            })
            .catch((message) => {
                console.log(message);
            });
        console.log("end promises");
        console.log("this is recipefound", recipeFound);
    });
};

// Profile Functions
// generating index for tables
async function getIndex(table) {
  const specificTable = ref(db, table + "/");
  let index = 0;
  let indexPromise = new Promise(function (resolve) {
    setTimeout(
      onValue(specificTable, (snapshot) => {
        const data = snapshot.val();
        if (data == null) {
          index = 0;
        } else {
          index = Object.keys(data).length;
        }
        console.log("this is data", data);
        console.log("this is userid", index);
        resolve(index);
      }),
      3000
    );
  });
  return indexPromise;
}

async function geIndex(table) {
  const specificTable = ref(db, table + "/");
  let index = 0;
  let indexPromise = onValue(specificTable, (snapshot) => {
    const data = snapshot.val();
    if (data == null) {
      index = 0;
    } else {
      index = Object.keys(data).length;
    }
    console.log("this is data", data);
    console.log("this is userid", index);
    resolve(index);
  });
  return indexPromise;
}

// creating a new user account
export const createUser = (username, email, password) => {
  console.log("createUser is called");

  if (username == "" || email == "" || password == "") {
    console.log("Please input your username, email and password");
    return;
  }

  // TODO: hash the password

  console.log("this is res", getIndex("users"));
  getIndex("users").then(
    function (value) {
      console.log("this is the returned index", value);
      console.log("this is userId ATER CALLING", value);
      set(ref(db, "users/" + value), {
        userId: value,
        familyId: "",
        username: username,
        email: email,
        password: password,
        gender: "",
        age: "",
        height: "",
        weight: "",
        activityFrequency: "",
        calorieDetails: [],
      });
    },
    function (error) {
      console.log("Error: " + error.message);
    }
  );
};

// creating family table
export const createFamily = (userId, userName) => {
  console.log("createFamily is called");
  if (userId == undefined || userName == undefined) {
    console.log("Error. Please pass in userId and userName");
    return;
  }
  getIndex("families").then(
    function (value) {
      console.log("this is the returned index", value);
      // creating the family table
      set(ref(db, "families/" + value), {
        familyId: value,
        referralCode: Math.floor(100000 + Math.random() * 900000),
        users: {
          [userId]: {
            userId: userId,
            userName: userName,
          },
        },
      });

      // updating the field for familyId in the user table
      update(ref(db, "users/" + userId), {
        familyId: value,
      });

      return value; // this returns the familyId
    },
    function (error) {
      console.log("Error: " + error.message);
    }
  );
};

// get family table
export const getFamily = (userId) => {
  console.log("getFamily is called");
  if (userId == undefined) {
    console.log("Error. Please pass in userId");
    return;
  }
  return new Promise((resolve, reject) => {
    const families = ref(db, "families/");
    onValue(families, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        return reject("no family found");
      }
      console.log("this is data", data);
      for (let j = 0; j < data.length; j++) {
        let obj = data[j];
        console.log("this is obj", obj);
        for (let user of obj.users) {
          console.log("this is user", user);
          if (user == undefined) {
            continue;
          }
          if (user.userId == userId) {
            console.log("this is resolved", obj);
            return resolve(obj);
          }
          // console.log('no')
        }
        // console.log('end of loop')
      }
      // console.log("this is the end")
      return reject("no family found");
    });
  });
};

// addFamilyMember.
export const addFamilyMember = (userId, userName, familyId) => {
  console.log("addFamilyMember is called");
  if (userId == undefined || userName == undefined || familyId == undefined) {
    console.log("Error. Please pass in userId and familyId");
    return;
  }
  set(ref(db, "families/" + familyId + "/users/" + userId), {
    userId: userId,
    userName: userName,
  });
};

// updating the fields of the user (height, weight, activityFrequency)
export const calculateCalories = (userId, height, weight, activityFrequency, dailyCalorieIntake) => {
    console.log("calculateCalories is called")
    if (userId == undefined || height == undefined || weight == undefined || activityFrequency == undefined) {
        console.log("Error. Please pass in userId, height, weight and activityFrequency")
        return
    }

    if (dailyCalorieIntake == undefined) {
        dailyCalorieIntake = 0
    }
    
    return new Promise((resolve) => {
        // getting the gender of the user
        let gender = "";
        let age = 0;
        onValue(ref(db, 'users/' + userId), (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                console.log("user not found")
                return
            }
            console.log("this is data", data)
            gender = data.gender
            age = data.age
        })
        // calculating the calorie limit
        let calorieLimit = 0
        let BMR = 0
        if (gender == "male") {
            BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
        } else {
            BMR = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)
        }
        console.log('this is activity frequency', activityFrequency)
        if (activityFrequency == "Little to no exercise") {
            calorieLimit = BMR * 1.2
        } else if (activityFrequency == "Exercise 1-3 days/week") {
            calorieLimit = BMR * 1.375
        } else if (activityFrequency == "Exercise 3-5 days/week") {
            calorieLimit = BMR * 1.55
        } else if (activityFrequency == "Exercise 6-7 days/week") {
            calorieLimit = BMR * 1.725
        } else if (activityFrequency == "Hard exercise 6-7 days/week") {
            calorieLimit = BMR * 1.9
        }
        console.log("this is calorie limit", calorieLimit)
        update(ref(db, 'users/' + userId), {
            height: height,
            weight: weight,
            activityFrequency: activityFrequency
        });
        let date = new Date()
        let currDate = date.getDate() + " " + date.getMonth() + " " + date.getFullYear()
        console.log("this is currDate", currDate)
        update(ref(db, 'users/' + userId + "/calorieDetails"), {
            [currDate]:
            {
                date: date,
                dailyCalorieIntake: dailyCalorieIntake,
                calorieLimit: calorieLimit,
            }
        });
        resolve(calorieLimit)
    })
}

// retreiving the user's details
export const getUser = (userId) => {
    console.log("getUser is called")
    if (userId == undefined) {
        console.log("Error. Please pass in userId")
        return
    }
    return new Promise((resolve, reject) => {
        const users = ref(db, 'users/');
        onValue(users, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                return reject("no user found")
            }
            console.log("this is data", data)
            for (const content in data) {
                let obj = data[content]
                console.log("this is obj", obj)
                if (obj == undefined) {
                    continue
                }
                if (obj.userId == userId) {
                    console.log("this is resolved", obj)
                    return resolve(obj)
                }
            }
            return reject("no user found")
        });
    })
};

// updating user calories after using external API
export const updateCalories = (userId, calorieConsumed, dailyCalorieIntake, calorieLimit) => {
    console.log("updateCalories is called")
    if (userId == undefined || calorieConsumed == undefined || dailyCalorieIntake == undefined || calorieLimit == undefined) {
        console.log("Error. Please pass in userId")
        return
    }
    return new Promise( async (resolve) => {
        let date = new Date()
        let currDate = date.getDate() + " " + date.getMonth() + " " + date.getFullYear()
        console.log("this is current calories", dailyCalorieIntake)

        await update(ref(db, 'users/' + userId + "/calorieDetails"), {
            [currDate]:
            {
                calorieLimit: calorieLimit,
                dailyCalorieIntake: calorieConsumed + dailyCalorieIntake,
                date: date,
            }
        });
        return resolve(true)
    })
};

export const saveIngredients = (obj, itemName, quantity, selectedValue) => {
  console.log("createFridge is called");
  console.log("retrieveditemname" + obj.itemName);
  console.log("retrieveditemname" + obj.quantity);

  if (
    obj.itemName == undefined ||
    obj.quantity == undefined ||
    obj.selectedValue == undefined
  ) {
    console.log("Error. Please pass in ItemName");
    return;
  }
  getIndex("fridge")
    .then(function (value) {
      // creating the family table
      set(ref(db, "fridge/" + value), {
        Name: itemName,
        Quantity: quantity,
        Type: selectedValue,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  obj.itemName = "";
  obj.quantity = "";
  obj.selectedValue = "";
  // let inputs = document.querySelectorAll('input');
  // inputs.forEach(input => input.value = "")
};

export const retrieveIngredients = () => {
  console.log("retrieveIngredients call");

  return new Promise((resolve, reject) => {
    const ingredients = ref(db, "fridge/");
    let retrievedIngredientObject = [];
    onValue(ingredients, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        return reject("no ingredients found");
      }
      console.log("this is data" + data + "1");
      for (let index = 0; index < data.length; index++) {
        let retrievedObject = data[index];
        let itemName = retrievedObject.Name;
        let itemQuantity = retrievedObject.Quantity;
        let itemType = retrievedObject.Type;

        let ingredientObject = {
          itemName: itemName,
          itemType: itemType,
          itemQuantity: itemQuantity,
        };
        retrievedIngredientObject.push(ingredientObject);
      }
      resolve(retrievedIngredientObject);
    });
  });
};

//push specific ingredients to user
export const getUserIngredients = (userId) => {
  console.log("start retrievedusersingredients promise");
  retrieveIngredients().then(function (retrievedIngredientsResults) {
    const retrievedResults = retrievedIngredientsResults;
    //array of objects
    console.log("retrievedResults" + JSON.stringify(retrievedResults));

      getUser(userId).then((value) => {
        getIndex( "users/" + userId + "/assignedIngredients").then((value) => {
          console.log(value);
          let updateValue = value;
        console.log("this is retrieveduserId" + JSON.stringify(value));
        for (let item of retrievedResults) {
          update(ref(db, "users/" + userId + "/assignedIngredients"), {
            [updateValue]: {
              itemName: item.itemName,
              quantity: item.itemQuantity,
              itemType: item.itemType,
            },
          });
          updateValue++;
        }
      });
    });
  });
};
