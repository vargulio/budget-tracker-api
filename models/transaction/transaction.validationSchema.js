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
                max: 256
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
    category: {
        in: ['body'],
        isString: true,
        isIn: {options: [['0', '1', '2', '3', '4', '5', '6', '7']]},
        exists: true
    }
};