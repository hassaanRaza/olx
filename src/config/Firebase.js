import * as firebase from 'firebase';
import { promised } from 'q';

const config = {
    apiKey: "AIzaSyCQ7s6wLxDOSbYLHZ4JYWfm6RlltRoFViY",
    authDomain: "saylani-8099b.firebaseapp.com",
    databaseURL: "https://saylani-8099b.firebaseio.com",
    projectId: "saylani-8099b",
    storageBucket: "saylani-8099b.appspot.com",
    messagingSenderId: "1028251352751"
};
firebase.initializeApp(config);

const db = firebase.firestore();

function addUserInDb(email, fullname, age, res) {
    db.collection("users").doc(res.user.uid).set({ email, fullname, age });
}

function register(userObj) {
    const { email, firstName, age } = userObj;
    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .then((res) => {
            addUserInDb(email, firstName, age, res);
            alert('Registered successfully..');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
        });
}

function getUserById(id) {
    return new Promise((res, rej) => {
        var docRef = db.collection("users").doc(id);
        docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    res(doc.data());
                }
                else {
                    console.log('no such document..');
                }
            })
    })

}

function login(email, password) {
    return new Promise((resolved, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                alert('Login successfully..');
                resolved(getUserById(res.user.uid));
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                alert(errorMessage);
            });
    })

}

function updateProfileFirebase(fullname, age, email) {
    db.collection('users').where('email', '==', email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log('', doc.id, '=>', doc.data());
                db.collection('users').doc(doc.id).update({ fullname, age }).then(() => {
                    alert('Profile updated successfully..');
                });
            })
        })
}

function changePasswordFirebase(getPassword) {
    var user = firebase.auth().currentUser;
    var newPassword = getPassword;

    user.updatePassword(newPassword).then(function () {
        alert('Password changed successfully..');
    }).catch(function (error) {
        // An error happened.
        alert(error);
    });
}

function addImage(image) {
    return new Promise((resolve, reject) => {
        const lastDot = image.name.lastIndexOf('.');
        const filename = image.name.substring(0, lastDot) + '_' + Date.now() + image.name.substring(lastDot);
        var storageRef = firebase.storage().ref('expertizo/' + filename);

        storageRef.put(image).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve(downloadURL)
            })
        })
    })
}
async function addAd(title, description, price, images, catVal) {
    var imagesToDB = [];
    var length = images.length;
    for (var i = 0; i < length; i++) {
        var urladdImage = await addImage(images[i]);
        imagesToDB.push(urladdImage);
    }
    let obj = {
        title, description, price, images: imagesToDB, createdAt: Date.now(), category: catVal
    }
    obj.user = db.doc('users/' + firebase.auth().currentUser.uid);
    db.collection("ads").add(obj).then(function (user) {
        alert("Ad Added Successfully")
    });
}

function getCategories() {
    return new Promise((res, rej) => {
        var myList = [];
        db.collection("categories").get().then(function (querySnapshot) {
            if (querySnapshot.docs.length == 0) {
                res(myList);
            }
            else {
                querySnapshot.forEach(function (doc) {
                    //console.log(doc.data())
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    myList.push(doc.data());
                    res(myList);
                });
            }
        })
    })
}

function firebaseLogout() {
    return new Promise((res, rej) => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            res('Done');
        }, function (error) {
            // An error happened.
        });
    })
}

function getAdByIdFirebase(id) {
    return new Promise((res, rej) => {
        var docRef = db.collection("ads").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log(doc.data());
                res(doc.data());
            }
            else {
                rej("No such document");
            }
        })
    })

}

export {
    register, login, updateProfileFirebase,
    changePasswordFirebase, addImage, addAd, firebaseLogout, db, getCategories, getAdByIdFirebase
};