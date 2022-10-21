import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBVmBcFII59Gm4THlYXzUdRJO6CdWshazg",
    authDomain: "glass-sequence-363307.firebaseapp.com",
    databaseURL: "https://glass-sequence-363307-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "glass-sequence-363307",
    storageBucket: "glass-sequence-363307.appspot.com",
    messagingSenderId: "570933788040",
    appId: "1:570933788040:web:ccab586252ea0577e78e3d",
    measurementId: "G-XJ2R2HZ3EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// getting list of recipeId from favourite table, using the recipeId => return a list of recipe objects
export const getFavourite = () => {
    return new Promise((resolve, reject) => {
        console.log('start promise');
        var recipeFound = []
        const recipes = ref(db, 'recipes/FavouriteRecipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                return reject([])
            }
            for (let id of data) {
                // eslint-disable-next-line
                const recipes = ref(db, 'recipes/recipes');
                onValue(recipes, (snapshot) => {
                    const data = snapshot.val();
                    for (const obj of data) {
                        // console.log(obj.id);
                        if (obj.recipeId == id) {
                            recipeFound.push(obj)
                        }
                    }
                    // console.log(len);
                });
            }
        });
        console.log(recipeFound);
        console.log('end promises');
        return resolve(recipeFound)
    })
}

// getting list of recipeId from Past table, using the recipeId => return a list of recipe objects
export const getPast = () => {
    return new Promise((resolve, reject) => {
        var recipeFound = []
        const recipes = ref(db, 'recipes/PastRecipes');
        onValue(recipes, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                return reject([])
            }
            for (let id of data) {
                // eslint-disable-next-line
                const recipes = ref(db, 'recipes/recipes');
                onValue(recipes, (snapshot) => {
                    const data = snapshot.val();
                    for (const obj of data) {
                        // console.log(obj.id);
                        if (obj.recipeId == id) {
                            recipeFound.push(obj)
                        }
                    }
                    // console.log(len);
                });
            }
        });
        return resolve(recipeFound)
    })
}


// Profile Functions

// generating index for tables
async function getIndex(table) {
    const specificTable = ref(db, table + '/');
    let index = 0
    let indexPromise = new Promise(function (resolve) {
        setTimeout(
            onValue(specificTable, (snapshot) => {
                const data = snapshot.val();
                if (data == null) {
                    index = 0
                } else {
                    index = Object.keys(data).length;
                }
                console.log("this is data", data)
                console.log("this is userid", index)
                resolve(index)
            }), 3000);

    });
    return indexPromise;
}

// creating a new user account
export const createUser = (username, email, password) => {
    console.log("createUser is called")

    if (username == "" || email == "" || password == "") {
        console.log("Please input your username, email and password")
        return
    }

    // TODO: hash the password

    console.log("this is res", getIndex("users"))
    getIndex("users").then(
        function (value) {
            console.log("this is the returned index", value)
            console.log("this is userId ATER CALLING", value);
            set(ref(db, 'users/' + value), {
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
                calorieDetails: []
            });
        },
        function (error) {
            console.log("Error: " + error.message);
        }

    );
}

// creating family table
export const createFamily = (userId, userName) => {
    console.log("createFamily is called")
    if (userId == undefined || userName == undefined) {
        console.log("Error. Please pass in userId and userName")
        return
    }
    getIndex("families").then(
        function (value) {
            console.log("this is the returned index", value)
            // creating the family table
            set(ref(db, 'families/' + value), {
                familyId: value,
                referralCode: Math.floor(100000 + Math.random() * 900000),
                users: {
                    [userId]: {
                        userId: userId,
                        userName: userName
                    }
                }
            });

            // updating the field for familyId in the user table
            update(ref(db, 'users/' + userId), {
                familyId: value
            });

            return value;    // this returns the familyId    
        },
        function (error) {
            console.log("Error: " + error.message);
        }
    );
}

// get family table. MUST pass in userId
export const getFamily = (userId) => {
    console.log("getFamily is called")
    if (userId == undefined) {
        console.log("Error. Please pass in userId")
        return
    }
    return new Promise((resolve, reject) => {
        const families = ref(db, 'families/');
        onValue(families, (snapshot) => {
            const data = snapshot.val();
            if (data == null) {
                return reject("no family found")
            }
            console.log("this is data", data)
            for (let j = 0; j < data.length; j++) {
                let obj = data[j]
                console.log("this is obj", obj)
                for (let user of obj.users) {
                    console.log("this is user", user)
                    if (user == undefined) {
                        continue
                    }
                    if (user.userId == userId) {
                        console.log("this is resolved", obj)
                        return resolve(obj)
                    }
                    // console.log('no')
                }
                // console.log('end of loop')
            }
            // console.log("this is the end")
            return reject("no family found")
        });
    })
}

// addFamilyMember. MUST pass in userId and familyId
export const addFamilyMember = (userId, userName, familyId) => {
    console.log("addFamilyMember is called")
    if (userId == undefined || userName == undefined || familyId == undefined) {
        console.log("Error. Please pass in userId and familyId")
        return
    }
    set(ref(db, 'families/' + familyId + "/users/" + userId), {
        userId: userId,
        userName: userName
    });
}

// updating the fields of the user (height, weight, activityFrequency)
export const calculateCalories = (userId, height, weight, activityFrequency) => {
    console.log("calculateCalories is called")
    if (userId == undefined || height == undefined || weight == undefined || activityFrequency == undefined) {
        console.log("Error. Please pass in userId, height, weight and activityFrequency")
        return
    }

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

    // TODO: how to append list to calorieDetails
    update(ref(db, 'users/' + userId), {
        height: height,
        weight: weight,
        activityFrequency: activityFrequency
    });
    update(ref(db, 'users/' + userId + "/calorieDetails"), {
        [new Date()]:
        {
            date: new Date(),
            dailyCalorieIntake: 0,
            calorieLimit: calorieLimit,
        }
    });

    return calorieLimit
}

// retreiving the user's calorie limit
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
            for (let j = 0; j < data.length; j++) {
                let obj = data[j]
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