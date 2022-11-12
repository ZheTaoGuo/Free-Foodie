import { getDatabase, ref, onValue, set, update, push, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
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
export const isLoggedIn = () => {
    onAuthStateChanged(getAuth(), (currentUser) => {
        if (currentUser!=null) {
            router.push('/profileinit')
            return true
        } else {
            router.push('/Login')
            return false
        }
    })
}
export const getLoggedInUser = () => {
    return new Promise ((resolve) => {
        onAuthStateChanged(getAuth(), (currentUser) => {
        if (currentUser) {
          var userId = currentUser.uid;
          var user = ref(db, 'users/' + userId);
          onValue(user, (snapshot) => {
              const data = snapshot.val();
              var username = data.username
            //   console.log(username)
              let returnObj = {
                    userId: userId,
                    userName: username,
              }
            //   console.log("returned object");
            //   console.log(returnObj);
              return resolve(returnObj)
          });
        } 
        else{
            console.log(null)
        }
        })
    })
}

export const register = () => {
    console.log("Handling signup")
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value
    var age = document.getElementById('age').value;
    var gender = document.getElementById('gender').value;
    var familyId = document.getElementById('familyId').value;
    const name = document.getElementById('name').value;
    var alertstr = '';
    if (email.length < 4) {
        alertstr += 'Please enter an email address.' + '\n';
    }else{
        if (
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        ) {
            alertstr += 'Email address is invalid.' + '\n';
        }
    }
    if(password.length < 8){
        alertstr += 'Password must be at least 8 characters long.' + '\n';
    }
    if(!/[A-Z]/.test(password) || !/[a-z]/.test(password)){
        alertstr += 'Password must contain at least one uppercase and lowercase letter.' + '\n';
    }
    if(!/[^0-9a-zA-Z]/.test(password)){
        alertstr += 'Password must be aplanumeric' + '\n';
    }
    if(!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){
        alertstr += 'Password must contain at least one special character.' + '\n';
    }
    
    if (name.length == 0) {
        alertstr += 'Please enter your name.' + '\n';
    }
    if (age.length == 0) {
        alertstr += 'Please enter your age.' + '\n';
    }
    if (gender == 'Gender') {
        alertstr += 'Please enter your gender.' + '\n';
    }
    if (alertstr.length>0){
        alert(alertstr)
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
            if (familyId == ''){
                createFamily(result.user.uid,name)
            }else{
                addFamilyMember(result.user.uid, name, familyId)
            }
            router.push('/')
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                alert("Incorrect password!");
            } 
            else if (errorCode === "email-already-in-use") {
                alert("Use a different email!");
            } 
            else {
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
            if (errorCode === "auth/wrong-password") {
                alert("Incorrect password!");
            } 
            else if (errorCode === "auth/user-not-found") {
                alert("User not found! Please enter a valid email address");
            } 
            else {
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
    var alertstr = '';
    if (name.length == 0) {
        alertstr += 'Please enter your name.' + '\n';
    }
    if (age.length == 0) {
        alertstr += 'Please enter your age.' + '\n';
    }
    if (gender == 'Gender') {
        alertstr += 'Please enter your gender.' + '\n';
    }
    if (alertstr.length>0){
        alert(alertstr)
        return;
    }
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
        addFamilyMember(result.user.uid, name, familyId)
        router.push('/')
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/popup-closed-by-user'){
            alert('Please try again! Do not close the popup before logging in');
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
            if (errorCode === 'auth/popup-closed-by-user'){
                alert('Please try again! Do not close the popup before logging in');}
            else if (errorCode === "email-already-in-use") {
                alert("Use a different email!");
            } 
            else {
                alert(errorMessage);
            }
            console.log(error);
        });
};

export const signout = ()=>{
    signOut(getAuth())
    .then(() => {
        console.log('Signed Out');
        router.push('/login')
    })
    .catch(e=>{
        console.error('Sign Out Error', e);
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

export const filterBar = (selectedCuisine, selectedDiet, selectedDish) => {
    if(selectedCuisine != 'Cuisines' && selectedDiet == 'Diet' && selectedDish == 'Dish' ){
        console.log('Only have cuisine');
        return checkCuisine(selectedCuisine)
    }else if (selectedCuisine == 'Cuisines' && selectedDiet != 'Diet' && selectedDish == 'Dish' ){
        console.log('Only have diet');
        return checkDiet(selectedDiet)
    }else if (selectedCuisine == 'Cuisines' && selectedDiet == 'Diet' && selectedDish != 'Dish' ){
        console.log('Only have dish');
        return checkDish(selectedDish)
    }else{
        if (selectedCuisine == 'Cuisines'){
            selectedCuisine = ''
        }
        if (selectedDiet == 'Diet'){
            selectedDiet = ''
        }
        if (selectedDish == 'Dish'){
            selectedDish = ''
        }
        return new Promise((resolve, reject) => {
            console.log('start promise');
            var recipeFound = []
            // eslint-disable-next-line
            const recipes = ref(db, 'recipes');
            onValue(recipes, (snapshot) => {
                const data = snapshot.val();
                for (const obj of data) {
                    if (('cuisines' in obj && 'diets' in obj && 'dishTypes' in obj) && (obj.cuisines.includes(selectedCuisine) && obj.diets.includes(selectedDiet) && obj.dishTypes.includes(selectedDish)) && !recipeFound.includes(obj)) {
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
}

// Filter by Cuisine
function checkCuisine(phrase) {
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
function checkDiet(phrase){
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
function checkDish(phrase) {
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
                console.log(obj);
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
                console.log(recipeIds);
                for (let id in recipeIds) {
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
                console.log(recipeIds);
                for (let id in recipeIds) {
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
                for (let id in recipeIds) {
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

// Adding a recipe from recipe page to user's favourite list [Takes in USERID, recipeId]
export const addToFavourite = (userid, recipeId) => {
    console.log('Start addToFavourite');

    console.log(userid, recipeId);
    const userFavList = ref(db, "users/" + userid + "/FavouriteRecipes/" + recipeId)
    set(userFavList, Number(recipeId))

    console.log('End addToFavourite');
}

// Adding a recipe from recipe page to user's Past list [Takes in USERID, recipeId]
export const addToPast = (userid, recipeId) => {
    console.log('Start addToFavourite');

    console.log(userid, recipeId);
    const userFavList = ref(db, "users/" + userid + "/PastRecipes/" + recipeId)
    set(userFavList, Number(recipeId))

    console.log('End addToFavourite');
}

// Adding missing items to family list of missing ingredients
export const addToMissing = (userId, missingItems) => {
    getFamily(userId).then((value) => {
        console.log("Start addToMissing");
        let familyId = value.familyId
        console.log('Family found: ', value.familyId);
        // console.log('Item adding: ', itemName);
        for (let item of missingItems) {
            // console.log(item);
            push(ref(db, "families/" + familyId + "/missingIngredients/"), item);
        }
        console.log("End addToMissing");

    })
}

// Returns all the missing ingredient in the family of the current user
export const getAllMissing = (userId) => {
    return new Promise((resolve, reject) => {
        getFamily(userId).then((value) => {
            // console.log("Start getAllMissing");
            let familyId = value.familyId
            // console.log('Family found: ', value.familyId);
            // console.log('Item adding: ', itemName);
            const missingListRef = ref(db, 'families/' + familyId + '/missingIngredients')
            onValue(missingListRef, (snapshot) => {
                const missingList = snapshot.val()
                // console.log(missingList);
                // console.log("End getAllMissing");
                return resolve(missingList);
            })
        })
    })
}

export const getAllAssignedIngredients = (userId) => {
    // console.log(userId);
    return new Promise((resolve, reject) => {
            console.log("Start getAllAssignedIngredients");
            // console.log('Item adding: ', itemName);
            const assignedIngredientsRef = ref(db, 'users/' + userId + '/assignedIngredients')
            console.log(assignedIngredientsRef);
            onValue(assignedIngredientsRef, (snapshot) => {
                const assignedList = snapshot.val();
                // console.log(assignedList);
                console.log("End getAllAssignedIngredients");
                return resolve(assignedList);
            })
        
    })
}


// Remove the item from the missingIngrdients list
export const removeItem = (userId, itemName) => {
    return new Promise((resolve, reject) => {
        getFamily(userId).then((value) => {
            let familyId = value.familyId
            console.log('Item adding: ', itemName);
            const missingListRef = ref(db, 'families/' + familyId + '/missingIngredients')
            onValue(missingListRef, (snapshot) => {
                const missingList = snapshot.val()
                for (const item in missingList) {
                    if (missingList[item].name == itemName) {
                        remove(ref(db, 'families/' + familyId + '/missingIngredients/' + item))
                    }
                }
                return resolve(missingList);
            })
        })
    })
}

// Add item into the user's assignedIngredients
function addItem(userId, itemName, itemImage) {
    console.log("addItem is called")
    const newUserItem = ref(db, 'users/' + userId + '/assignedIngredients')
    push(newUserItem, {
        itemName: itemName,
        itemType: 'NA',
        quantity: 1,
        image: itemImage,
    })
}

// Remove assigned item from missingIngredients, add new item into user's assignedIngredients
export const assignItem = (userId, itemName, itemImage) => {
    removeItem(userId, itemName)  
    addItem(userId, itemName, itemImage)
}

// removing item from assigned list 
export const unassignItem = (userId, itemName) => {
    console.log("unassignItem is called");
    return new Promise((resolve) => {
        console.log('Item to add to unassigned list: ', itemName);
        const missingListRef = ref(db, 'users/' + userId + '/assignedIngredients')
            onValue(missingListRef, (snapshot) => {
                const missingList = snapshot.val()
                // console.log("this is missing list", missingList)
                for (const index in missingList) {
                    if (missingList[index].itemName == itemName) {
                        remove(ref(db, 'users/' + userId + '/assignedIngredients/' + index))
                    }
                }
                return resolve(true);
        })
    })
}

// change the assignment of item from one person to the other 
export const changeAssignment = (userId, item, newMember) => {
    console.log("changeAssignment is called");
    console.log("this is item in changeAssignment", item);
    return new Promise((resolve) => {
        addItem(newMember, item.name, item.image) 
        unassignItem(userId, item.name)
        return resolve(true)
    })
}

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


// creating a new user account
// export const createUser = (username, email, password) => {
//     console.log("createUser is called");

//     if (username == "" || email == "" || password == "") {
//         console.log("Please input your username, email and password");
//         return;
//     }

//     console.log("this is res", getIndex("users"));
//     getIndex("users").then(
//         function (value) {
//             console.log("this is the returned index", value);
//             console.log("this is userId ATER CALLING", value);
//             set(ref(db, "users/" + value), {
//                 userId: value,
//                 familyId: "",
//                 username: username,
//                 email: email,
//                 password: password,
//                 gender: "",
//                 age: "",
//                 height: "",
//                 weight: "",
//                 activityFrequency: "",
//                 calorieDetails: [],
//             });
//         },
//         function (error) {
//             console.log("Error: " + error.message);
//         }
//     );
// };

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
            let code = Math.floor(100000 + Math.random() * 900000)
            set(ref(db, "families/" + code), {
                familyId: code,
                referralCode: code,
                users: {
                    [userId]: {
                        userId: userId,
                        userName: userName,
                    },
                },
            });

            // updating the field for familyId in the user table
            update(ref(db, "users/" + userId), {
                familyId: code,
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
    // console.log("getFamily is called");
    //   console.log('UserID of: ', userId);
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
            // console.log("this isssss data", data);
            console.log('outside');
            for (let j in data) {
                let obj = data[j];
                // console.log("this isssss obj", obj);
                for (let user of Object.keys(obj.users)) {
                    // console.log("this is user", user);
                    if (user == undefined) {
                        continue;
                    }
                    if (user == userId) {
                        // console.log("this is resolved", obj);
                        return resolve(obj);
                    }
                    // console.log('no')
                }
                // console.log('end of loop')
            }
            console.log('after');
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
            // console.log("this is data", data)
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
    return new Promise(async (resolve) => {
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
    
    let wordArr = itemName.split(' ')
    for (let i = 0; i < wordArr.length; i++) {
        wordArr[i] = wordArr[i][0].toUpperCase() + wordArr[i].substr(1);
    }
    itemName = wordArr.join(' ')
    console.log(itemName);
    if (
        obj.itemName == undefined ||
        obj.quantity == undefined ||
        obj.selectedValue == undefined
    ) {
        console.log("Error. Please pass in ItemName");
        return;
    }
    push(ref(db, "fridge/"), {
        Name: itemName,
        Quantity: quantity,
        Type: selectedValue,
    });
    obj.itemName = "";
    obj.quantity = "";
    obj.selectedValue = "";
};

export const addingIngredientToFridge = (item, userId) => {
    console.log("addingIngredientToFridge is called")
    return new Promise ((resolve) => {
        push(ref(db, "fridge/"), {
            Name: item.itemName,
            Quantity: item.quantity,
            Type: item.itemType,
        });
        unassignItem(userId, item.itemName)
        resolve(true)
    })
}

export const deleteFromFridge = (item) => {
    return new Promise((resolve, reject) => {
        const ingredients = ref(db, "fridge/");
        onValue(ingredients, (snapshot) => {
            const data = snapshot.val();
            for (let index in data){
                // console.log(items);
                if(data[index].Name == item.itemName){
                    return resolve(remove(ref(db, 'fridge/' + index)))
                }
            }
        })
    })
}

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
            console.log("This is the ingredients in the fridge: " + data);
            for (let index in data) {
                console.log('This are the indiv items: ', data[index]);
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
            //   console.log(retrievedIngredientObject);
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
            getIndex("users/" + userId + "/assignedIngredients").then((value) => {
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
