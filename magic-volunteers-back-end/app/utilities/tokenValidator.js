const verifyTokenExpiration = async ( decodedToken ) => {

	let expDate = decodedToken.exp;

	let crtDate = new Date();
	const crtSeconds = crtDate.getTime() / 1000;

	return ( expDate < crtSeconds );
};

module.exports = { verifyTokenExpiration }