import React, { useState, useEffect, useMemo } from 'react';
import { Select } from 'antd';
import { Formik, Form, Field, FieldArray, FieldProps } from 'formik';
import { withSkills, SkillProps } from 'store/skill/queries/Skills';
import { MeProps } from 'store/user/queries/Me';
import { IOption } from 'components/formik/Select';
import { SkillsWrapper, SkillCard, SkillName, Rating, RatingDot } from './styles';

const Option = Select.Option;

const initialValues: Values = {
  skills: [],
};

const handleSubmit = (values: Values) => {
  console.log(values);
};

const sortSkillOptions = (a: IOption, b: IOption) => {
  const labelA = a.label.toLowerCase();
  const labelB = b.label.toLowerCase();

  if (labelA < labelB) return -1;
  if (labelA > labelB) return 1;
  return 0;
};

const filterSkills = (inputValue: string, option: any) =>
  option.props.children.toLowerCase().includes(inputValue.toLowerCase());

const parseSkillsToOptions = (skills: SkillProps[]) =>
  skills.map(skill => ({ label: skill.name, value: skill.id })).sort(sortSkillOptions);

const Skills: React.FC<Props> = ({ me, skills = [] }) => {
  const skillOptions = useMemo(() => parseSkillsToOptions(skills), [skills]);
  const [options, setOptions] = useState(skillOptions);

  useEffect(() => {
    setOptions(skillOptions);
    // eslint-disable-next-line
  }, [skillOptions.length]);

  const filterOptions = (value: string) => {
    const newOptions = options.filter(option => option.value !== value);
    setOptions(newOptions);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values }) => {
        return (
          <Form>
            <FieldArray
              name="skills"
              render={arrayHelpers => {
                return (
                  <>
                    <Select
                      showSearch
                      filterOption={filterSkills}
                      value={null}
                      size="large"
                      placeholder="Wyszukaj umiejętnośc lub dodaj nową"
                      onSelect={(value, option: any) => {
                        filterOptions(value as string);
                        arrayHelpers.unshift({ skillId: value, skillLabel: option.props.children, level: 0 });
                      }}

                    >
                      {options.map(option => <Option key={option.value}>{option.label}</Option>)}
                    </Select>
                    <SkillsWrapper>
                      {values.skills.map((skill, index) => {
                        return (
                          <Field
                            key={index}
                            name={`skills.${index}`}
                            render={({ field, form }: FieldProps) => {
                              return (
                                <SkillCard>
                                  <SkillName>{field.value.skillLabel}</SkillName>
                                  <Rating
                                    value={field.value.level}
                                    character={<RatingDot />}
                                    onChange={value => form.setFieldValue(`skills.${index}`, { ...field.value, level: value })}
                                    onBlur={() => form.setFieldTouched(`skills.${index}`, true)}
                                  />
                                </SkillCard>
                              );
                            }}
                          />
                        );
                      })}
                    </SkillsWrapper>
                  </>
                );
              }}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

interface UserSkill {
  skillId: string;
  skillLabel: string;
  level: number;
}

interface Values {
  skills: UserSkill[];
}

interface Props {
  me: MeProps;
  skills: SkillProps[];
}

export default withSkills(Skills);
