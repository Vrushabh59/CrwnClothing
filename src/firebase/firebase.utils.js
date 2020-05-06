import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAD9PY_G8OpDhgZuIUsSYKy0uuRq7axooA',
	authDomain: 'crown-db-33285.firebaseapp.com',
	databaseURL: 'https://crown-db-33285.firebaseio.com',
	projectId: 'crown-db-33285',
	storageBucket: 'crown-db-33285.appspot.com',
	messagingSenderId: '871073692445',
	appId: '1:871073692445:web:4ba060f17240069825fff4'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
