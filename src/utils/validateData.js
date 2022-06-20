export const validateName = ( name ) => {

    const nameRegex = /^[A-Za-zaáÁéÉíÍóÓúÚ\u00f1\u00d1\s]+$/;

    if( name?.length < 2 || name?.length > 50 || !nameRegex.test( name ) ) {
        return false;

    } else return true;

};

export const validateEmail = ( email ) => {

    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    return emailRegex.test( email );

};

export const validatePassword = ( password ) => {

    return ( password.length >= 8 && password.length <= 12);
};

