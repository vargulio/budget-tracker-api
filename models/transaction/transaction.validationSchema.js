module.exports = {
    userId: {
        in: ['body'],
        exists: true,
        isString: true
    },
    amount: {
        in: ['body'],
        exists: true,
        isNumeric: true
    },
    description: {
        in: ['body'],
        isString: true,
        isLength: {
            options: {
                max: 144
            }
        }
    },
    repetetive: {
        in: ['body'],
        isBoolean: true,
        exists: true
    },
    repeatInterval: {
        custom: {
            options: (value, {req, location, path}) => {
                return ((req.body.repetetive && value > 0) || !req.body.repetetive)
            }
        },
        in: ['body'],

    },
    startingDate: {
        in: ['body'],
        custom: {
            options: (value, {req, location, path}) => {
               return ((req.body.repetetive && /[0-9]{4}-[0-1][0-9]-[0-3][0-9]/.test(value)) || !req.body.repetetive);
            }
        }
    },
    category: {
        in: ['body'],
        isInt: true,
        isIn: {options: [[0, 1, 2, 3, 4, 5, 6]]},
        exists: true
    }
};