import Joi from '@hapi/joi';

// Schema untuk login
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/) // hanya karakter yang diperbolehkan
    .pattern(/[A-Z]/) // setidaknya satu huruf kapital
    .pattern(/[0-9]/) // setidaknya satu angka
    .pattern(/[!@#$%^&*(),.?":{}|<>]/) // setidaknya satu karakter khusus
    .required()
    .messages({
      'string.pattern.base': 'Password harus mengandung setidaknya satu huruf kapital, satu angka, dan satu karakter khusus.',
    }),
});

// Schema untuk registrasi (dapat disesuaikan)
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .pattern(/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/) // hanya karakter yang diperbolehkan
    .pattern(/[A-Z]/) // setidaknya satu huruf kapital
    .pattern(/[0-9]/) // setidaknya satu angka
    .pattern(/[!@#$%^&*(),.?":{}|<>]/) // setidaknya satu karakter khusus
    .required()
    .messages({
      'string.pattern.base': 'Password harus mengandung setidaknya satu huruf kapital, satu angka, dan satu karakter khusus.',
    }),
});

export { loginSchema, registerSchema };
