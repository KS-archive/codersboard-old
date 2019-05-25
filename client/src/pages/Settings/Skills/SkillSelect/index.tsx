import React, { useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import withSkills, { IWithSkills, ISkill } from '../store/withSkills';
import { IMySkill } from '../store/withMySkills';
import { OptionContent, Icon, Text } from './styles';

const { Option } = Select;

const sortSkills = (a: ISkill, b: ISkill) => {
  const labelA = a.name.toLowerCase();
  const labelB = b.name.toLowerCase();

  if (labelA < labelB) return -1;
  if (labelA > labelB) return 1;
  return 0;
};

const filterSkills = (inputValue: string, option: any) =>
  option.props.title.toLowerCase().includes(inputValue.toLowerCase());

const Skills: React.FC<Props> = ({ skills = [], unshift, values }) => {
  const valuesIds = useMemo(() => values.map(value => value.skill.id), [values]);
  const skillOptions = useMemo(() => skills.filter(({ id }) => !valuesIds.includes(id)).sort(sortSkills), [
    skills,
    valuesIds,
  ]);
  const [options, setOptions] = useState(skillOptions);

  useEffect(() => {
    setOptions(skillOptions);
    // eslint-disable-next-line
  }, [skillOptions.length]);

  const filterOptions = (value: string) => {
    const newOptions = options.filter(option => option.id !== value);
    setOptions(newOptions);
  };

  return (
    <Select
      showSearch
      loading={!options.length}
      filterOption={filterSkills}
      value={undefined}
      placeholder="Wyszukaj umiejętność lub dodaj nową"
      defaultActiveFirstOption={false}
      showArrow={false}
      onSelect={(value, option: any) => {
        const skill = skills.find(({ id }) => id === value);
        filterOptions(value as string);
        unshift({ skill, level: 0 });
      }}
    >
      {options.map(option => (
        <Option key={option.id} title={option.name}>
          <OptionContent>
            <Icon src={option.icon} />
            <Text>{option.name}</Text>
          </OptionContent>
        </Option>
      ))}
    </Select>
  );
};

interface Props extends IWithSkills {
  unshift: (value: any) => void;
  values: IMySkill[];
}

export default withSkills(Skills);
