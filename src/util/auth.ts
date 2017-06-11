import { db, firebaseAuth, googleProvider } from './constants';
import { User } from 'firebase';

export function saveUser(user: any, fullName: string = '') {
    return db.child(`users/${user.uid}/info`)
        .set({
            fullName: fullName,
            email: user.email,
            uid: user.uid
        })
        .then(() => user);
}

export function createUser(fullName: string, email: string, password: string) {
    return firebaseAuth()
        .createUserWithEmailAndPassword(email, password)
        .then((user: User) => {
            user.updateProfile(({
                displayName: fullName,
                photoURL: ''
            }))
            .then(() => {
                saveUser(user, fullName);
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

export function loginWithGoogle() {
    return firebaseAuth().signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            saveUser(user, user.displayName)
        })
        .catch((error) => {
            console.error('error while Google login', error.message);
            throw error;
        });
}
