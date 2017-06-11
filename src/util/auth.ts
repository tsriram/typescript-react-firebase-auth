import { db, firebaseAuth } from './constants';

export function saveUser(user: any) {
    return db.child(`users/${user.uid}/info`)
        .set({
            email: user.email,
            uid: user.uid
        })
        .then(() => user);
}

export function createUser(email: string, password: string) {
    return firebaseAuth()
        .createUserWithEmailAndPassword(email, password)
        .then(saveUser);
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
