const ApiError = require("../error/apiError");
const { Trainer } = require("../models/models");

class TrainerActivate {
    async activate(activationLink) {
        const trainer = await Trainer.findOne({where : {activationLink}})
        if (!trainer) {
            throw ApiError.badRequest("Неккоректная ссылка активации")
        }
        trainer.isActivated = true;
        await trainer.save()
    }
}

module.exports = new TrainerActivate()