import * as yup from 'yup';

export const validateRegistration = (t) =>
  yup.object({
    fullName: yup.string()
      .required(t('fullNameRequired'))
      .min(2, t('fullNameMin'))
      .max(50, t('fullNameMax'))
      .matches(/^[a-zA-Z\s]+$/, t('fullNameFormat'))
      .trim(t('fullNameTrim')),

    phone: yup.string()
      .required(t('phoneRequired'))
      .matches(/^[0-9]{10}$/, t('phoneFormat'))
      .test('is-valid-phone', t('phoneValid'), (val) => /^[0-9]{10}$/.test(val || '')),

    email: yup.string()
      .required(t('emailRequired'))
      .email(t('emailFormat'))
      .max(100, t('emailMax')),

    password: yup.string()
      .required(t('passwordRequired'))
      .min(6, t('passwordMin'))
      .max(12, t('passwordMax'))
      .matches(/[a-z]/, t('passwordLowercase'))
      .matches(/[A-Z]/, t('passwordUppercase'))
      .matches(/[0-9]/, t('passwordNumber'))
      .matches(/[@$!%*?&]/, t('passwordSpecial')),
  });
