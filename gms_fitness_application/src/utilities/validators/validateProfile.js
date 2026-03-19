import * as yup from 'yup';

export const validateProfile = (t) => {
  const today = new Date();
  const minAgeDate = new Date();
  minAgeDate.setFullYear(today.getFullYear() - 16);

  return yup.object().shape({
    gender: yup.string()
      .required(t('genderRequired'))
      .oneOf(['Male', 'Female', 'Other'], t('selectValidGender')),

    weight: yup.number()
      .typeError(t('weightNumber'))
      .required(t('weightRequired'))
      .positive(t('validation.weightPositive'))
      .min(30, t('atleast'))
      .max(300, t('less_equal_300')),

    height: yup.number()
      .typeError(t('heightMustNumber'))
      .required(t('heightRequired'))
      .positive(t('heightPositiveNumber'))
      .min(100, t('height100'))
      .max(250, t('height250')),

    dob: yup.date()
      .typeError(t('dobValid'))
      .required(t('dobRequired'))
      .max(today, t('dobCannotBeFuture'))
      .max(minAgeDate, t('atleast16')),
  });
};
