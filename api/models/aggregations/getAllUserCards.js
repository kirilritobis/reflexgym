const UserSchema = require('../../schemas/user.schema')

async function getAllUserCards () {
    try {
        return await ProductSwTypesSchema.aggregate([
            {
                $lookup: {
                    from: 'product_hws',
                    localField: '_id',
                    foreignField: 'swType',
                    as: 'productsData'
                }
            }])
    } catch (err) {
        throw err
    }
}