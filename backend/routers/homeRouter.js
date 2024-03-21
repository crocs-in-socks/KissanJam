const User = require('../database/userSchema')

const getNeighbours = async(userId, range) => {
    const user = await User.findById(userId)
    if(!user)
    {
        throw new Error('User not found')
    }
    const userPincode = user.pincode
    const searchRange = parseInt(range)
    const neighbours = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { pincode: { $gte: userPincode - searchRange } },
            { pincode: { $lte: userPincode + searchRange } }
        ]
    })

    return neighbours
}

module.exports = {
    getNeighbours
}