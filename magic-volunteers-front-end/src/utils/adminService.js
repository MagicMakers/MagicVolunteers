let user;

const setUserData = (userData) => {
	user = userData;
};

const getUserData = () => {
	return user;
};

export { setUserData, getUserData };