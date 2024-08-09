const Items = require('../Models/menuItems');

exports.getMenuItemsByResId = (req, res) => {
    const { resId } = req.params;
    Items.find({ restaurantId: resId })
        .then(response => {
            res.status(200).json({
                message: "MenuItems Fetched Succesfully",
                itemsList: response
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}