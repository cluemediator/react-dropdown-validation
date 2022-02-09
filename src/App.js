import React, { useState, useCallback } from 'react';
import Select from './Select';

const countryList = [
  { value: "india", label: "India" },
  { value: "us", label: "US" },
  { value: "australia", label: "Australia" }
];
const languageList = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "arabic", label: "Arabic" }
];

function App() {

  const [form, setForm] = useState({
    country: null,
    lang: null
  });

  const onValidate = (value, name) => {
    setError(prev => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value }
    }));
  }

  const [error, setError] = useState({
    country: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    },
    lang: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onValidate
    }
  });

  const onHandleChange = useCallback((value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach(x => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onValidate(true, x);
      }
    });
    return !isInvalid;
  }

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }

    console.log('Data:', form);
  }

  return (
    <div className="app">
      <div className='mb-3'><strong>Validate react-select dropdown in React - <a href="https://www.cluemediator.com" target="_blank" rel="noreferrer noopener">Clue Mediator</a></strong></div>
      <div className='form'>
        <Select
          name="country"
          title="Country"
          value={form.country}
          options={countryList}
          onChangeFunc={onHandleChange}
          {...error.country}
        />
        <Select
          name="lang"
          title="Language"
          value={form.lang}
          options={languageList}
          onChangeFunc={onHandleChange}
          {...error.lang}
        />
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;