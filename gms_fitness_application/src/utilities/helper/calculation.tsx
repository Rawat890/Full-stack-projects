export const calculateAge = (dob?: string): string => {
  if (!dob) return 'N/A';
  try {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return 'N/A';

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  } catch (error) {
    return '0';
  }
};

interface BmiResult {
  bmi: string | null;
  categoryKey: string;
  text: string;
}

export const getBmiAndCategory = (
  height: number | string,
  weight: number | string,
  t: (key: string) => string
): BmiResult => {
  const h = parseFloat(height as string);
  const w = parseFloat(weight as string);

  if (!h || !w || h <= 0 || w <= 0) {
    return { bmi: null, categoryKey: '', text: '' };
  }

  const heightInMeters = h / 100;
  const bmi = (w / (heightInMeters * heightInMeters)).toFixed(1);

  let categoryKey = '';
  let text = '';

  const bmiFloat = parseFloat(bmi);
  if (bmiFloat < 18.5) {
    categoryKey = 'underWeight';
    text = t('youAreUnderweight');
  } else if (bmiFloat < 25) {
    categoryKey = 'normalWeight';
    text = t('youAreHealthy');
  } else if (bmiFloat < 30) {
    categoryKey = 'overWeight';
    text = t('youAreOverweight');
  } else {
    categoryKey = 'obese';
    text = t('youAreObese');
  }

  return { bmi, categoryKey, text };
};

export const calculateSleepDuration = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${diffHours}hr ${diffMinutes}min`;
};

export const getExpirationToken = (): number => {
  return Date.now() + 3600 * 1000;
};
