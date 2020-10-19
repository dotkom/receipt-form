import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { COMMITTEES } from 'models/comittees';
import { useDispatch } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';

import { Label } from './Base';
import { Select } from './Dropdown';
import { ValidationMessages } from './ValidationMessages';

const Option = styled.option``;

const SelectContainer = styled.div`
  display: flex;
  margin: 0.8rem 0;
  flex-direction: column;
  justify-content: flex-end;
`;

export const CommitteeDropdown: FC = () => {
  const dispatch = useDispatch();
  const { interacted, setInteracted } = useInteraction('committee');
  const { validation, level } = useValidation('committee');

  const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    const committee = COMMITTEES.find((com) => com.group === key);
    if (committee) {
      dispatch(
        formDataUpdated({
          committee,
        })
      );
      setInteracted();
    }
  };

  return (
    <SelectContainer>
      <Label>Ansvarlig enhet</Label>
      <ValidationMessages validation={validation} display={interacted} />
      <Select
        onChange={onDropdownChange}
        defaultValue="default"
        onBlur={setInteracted}
        level={interacted ? level : undefined}
      >
        <Option disabled value="default">
          Velg enheten/komiteen kjøpet er gjort for
        </Option>
        {COMMITTEES.map(({ group, name }) => (
          <Option key={group} value={group}>
            {name}
          </Option>
        ))}
      </Select>
    </SelectContainer>
  );
};
