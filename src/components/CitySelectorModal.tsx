import Select, { type SingleValue } from 'react-select';
import type { City, SelectOption } from '../types/definitions';
import { useCitySelector } from '../hooks/useCitySelector';
import { useEffect } from 'react';

type CitySelectorModalProps = {
  onClose: () => void;
  onSelectCity: (city?: City) => void;
};

export default function CitySelectorModal({
  onClose,
  onSelectCity,
}: CitySelectorModalProps) {
  const { data, error, computedOptions, initialValue, handleInputChange } =
    useCitySelector();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  async function handleCitySelect(newValue: SingleValue<SelectOption>) {
    if (!newValue) return;
    const selectedCityName = newValue.value;
    const selectedCity = data?.find(d => d.name === selectedCityName);
    onSelectCity(selectedCity);
  }

  if (error) {
    onSelectCity(undefined);
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/45 z-50">
      <div className="flex flex-col justify-center items-center w-screen h-screen px-4">
        <button
          className="absolute text-4xl top-16 right-16 text-white hover:text-red-400 transition-colors duration-200"
          onClick={onClose}
        >
          X
        </button>
        <label className="my-4 text-white text-lg font-semibold">
          Start typing to select a city...
        </label>
        <div className="w-full max-w-md">
          <Select
            className="text-black shadow-md"
            options={computedOptions}
            placeholder={initialValue}
            onChange={handleCitySelect}
            onInputChange={handleInputChange}
            styles={{
              control: base => ({
                ...base,
                borderColor: '#ccc',
                borderRadius: '0.5rem',
                padding: '2px',
                cursor: 'text',
              }),
              menu: base => ({
                ...base,
                zIndex: 100,
              }),
              option: (base, state) => ({
                ...base,
                cursor: 'pointer',
                backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
                color: 'black',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
