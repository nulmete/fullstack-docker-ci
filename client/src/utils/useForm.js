import { useState } from 'react';

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e) => {
      const isSelect = e.target.type === 'select-one';
      setValues({
        ...values,
        [e.target.name]: isSelect
          ? parseInt(e.target.value, 10)
          : e.target.value,
      });
    },
  ];
};

export default useForm;
