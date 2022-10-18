//middleware for the flash messages. To alert/infrom the user
module.exports.setFlash = function(req,res,next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error'),
    }
    next();
}