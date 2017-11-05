import { firebaseAuth } from '../config/constants'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
}

export function updateCurrentUser(fn, ln) {
	var user = firebaseAuth().currentUser;

	return user.updateProfile({
	  firstName: fn,
	  lastName: ln
	}).then(function() {
	  console.log('Success in setting current user\'s first and last name.');
	}).catch(function(error) {
	  console.log(error);
	});
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function getUser() {
  return firebaseAuth().currentUser;
}

