const popup = require('../../models/popup');

exports.getPopup = async (req, res) => {
    try {
        const popup_data = await popup.findOne({});
        res.status(200).json({
            success: true,
            data: popup_data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
