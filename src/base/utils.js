
export function phoneReg(phone) {
	var reg = /^[1][3,4,5,7,8][0-9]{9}$/;

	return reg.test(phone)
}

export function passWordReg(psw){
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
	return reg.test(psw)
}