const zod = require('zod');


const locationSchema = zod.object({
    city:zod.string(),
})

module.exports = {
    locationSchema
}