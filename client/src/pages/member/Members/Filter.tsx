import React, { useState } from 'react'
import { Input } from 'antd';

const Filter: React.FC<IProps> = ({ setGlobalFilter }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Input onChange={handleChange} value={value} placeholder="Filtruj wyniki..." />
  )
}

interface IProps {
  setGlobalFilter: (value: string) => void;
}

export default Filter
