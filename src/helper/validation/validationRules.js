const validationRules = {
    email: {
        presence: {
            allowEmpty: false,
            message: '^Please enter an email address',
        },
        email: {
            message: '^Please enter a valid email address',
        },
    },

    password: {
        presence: {
            allowEmpty: false,
            message: '^Please enter a password',
        },
        length: {
            minimum: 5,
            message: '^Your password must be at least 5 characters',
        },
    }, c_password: {
        equality: "password"
    },
    first_name: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your first name',
        },
    },
    last_name: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your last name',
        },
    },   address1: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your address',
        },
    },
    phone: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your phone',
        },
    },
    dob: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your date of birth',
        },
    },
    county_id: {
        presence: {
            allowEmpty: false,
            message: '^Please select your county',
        },
    },
    club_id: {
        presence: {
            allowEmpty: false,
            message: '^Please select your club',
        },
    }
    ,
    membership_id: {
        presence: {
            allowEmpty: false,
            message: '^Please select your membership plan',
        },
    },

};

export default validationRules;
