import validator from "validator"; 

const validate = (data) => {
    const mandatoryFields = ['firstName', 'email', 'password'];

    const IsAllowed = mandatoryFields.every((k) => Object.keys(data).includes(k));
    if(!IsAllowed) throw new Error("Some Field Missing");

    if(!validator.isEmail(data.email)) throw new Error("Invalid Email");

    if(!validator.isStrongPassword(data.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0
    })) throw new Error("Weak Password");

    return true;
}

export default validate;
