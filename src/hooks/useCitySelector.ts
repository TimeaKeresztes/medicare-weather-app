import { useQuery } from '@tanstack/react-query';
import { fetchCities, getStoredCity } from '../utils/city';
import { useState } from 'react';
import type { SelectOption } from '../types/definitions';

export function useCitySelector() {
  const [searchInputVal, setSearchInputVal] = useState('');

  const { data, error } = useQuery({
    queryKey: ['cities', searchInputVal],
    queryFn: async () => {
      const data = await fetchCities(searchInputVal);
      return data;
    },
    enabled: !!searchInputVal,
  });

  function handleInputChange(newVal: string) {
    setSearchInputVal(newVal);
  }

  const initialValue = getStoredCity()?.name || 'Select city';

  const computedOptions: SelectOption[] =
    data?.map(d => ({
      value: d.name,
      label: d.name,
    })) || [];

  return {
    data,
    error,
    computedOptions,
    initialValue,
    handleInputChange,
  };
}
