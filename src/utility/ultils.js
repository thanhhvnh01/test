export const enumToSelectOptions = (obj) => {
  const keys = Object.keys(obj);
  return keys.map((key) => ({
    id: obj[key],
    label: key,
  }));
};

export const arrayToSelectOptions = (arr, labelKey, valueKey, conditionKey, getAll = false) => {
  if (Array.isArray(arr)) {
    return arr.map((c) => {
      return {
        label: c[labelKey],
        id: c[valueKey],
        ...(!!conditionKey && {
          condition: c[conditionKey],
        }),
        ...(getAll && { item: c }),
      };
    });
  }
};

export const PhoneNumberRegExp =
  /^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/; /* eslint-disable-line */

export const EmailPhoneNumberRegExp =
  /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$|^(?=(?:\D*\d){10,15}\D*$)\+?[0-9]{1,3}[\s-]?(?:\(0?[0-9]{1,5}\)|[0-9]{1,5})[-\s]?[0-9][\d\s-]{5,7}\s?(?:x[\d-]{0,4})?$/; /* eslint-disable-line */
