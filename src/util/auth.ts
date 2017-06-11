import { db, firebaseAuth } from './constants';
import { User } from 'firebase';

export function saveUser(user: any, firstName: string, lastName: string) {
    return db.child(`users/${user.uid}/info`)
        .set({
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            uid: user.uid
        })
        .then(() => user);
}

export function createUser(firstName: string, lastName: string, email: string, password: string) {
    return firebaseAuth()
        .createUserWithEmailAndPassword(email, password)
        .then((user: User) => {
            user.updateProfile(({
                displayName: firstName,
                photoURL: ''
            }))
            .then(() => {
                saveUser(user, firstName, lastName);
            })
        });
}

export function login(email: string, password: string) {
    return firebaseAuth()
            .signInWithEmailAndPassword(email, password);
}

export function logout() {
    return firebaseAuth()
        .signOut();
}

export function resetPassword(email: string) {
    return firebaseAuth()
        .sendPasswordResetEmail(email);
}
