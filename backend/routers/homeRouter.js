const User = require('../database/userSchema')

const getNeighbours = async(userId, range) => {
    const user = await User.findById(userId)
    if(!user)
    {
        throw new Error('User not found')
    }
    const userPincode = user.pincode
    const neighbours = await User.find({
        $and: [
            { pincode: { $ne: userPincode } },
            { pincode: { $gte: userPincode - range } },
            { pincode: { $lte: userPincode + range } }
        ]
    })

    return neighbours
}

module.exports = {
    getNeighbours
}