const Joi = require('joi');

const backstore = Joi.object({
  name: Joi
    .string()
    .min(1)
    .max(30)
    .required(),

  image: Joi.string()
    .uri()
    .required(),

  quantity: Joi.number()
    .required(),

  price: Joi.number()
    .required(),
});

module.exports = backstore