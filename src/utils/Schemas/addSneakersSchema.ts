import { Joi } from "express-validation";
import { type SneakersStructure } from "../../types";

const addSneakersSchema = {
  body: Joi.object<SneakersStructure>({
    name: Joi.string().required(),
    brand: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    colors: Joi.array().items(Joi.string().required()),
    features: Joi.object({
      description: Joi.string().required(),
      description2: Joi.string(),
      isAvailable: Joi.boolean().required(),
    }),
    user: Joi.string(),
  }),
};

export default addSneakersSchema;
