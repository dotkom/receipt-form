import React, { ChangeEvent, FC, useContext } from 'react';
import styled from 'styled-components';

import { ReceiptContext } from 'contexts/ReceiptData';
import { useInteraction } from 'hooks/useInteraction';
import { ActionType } from 'hooks/useReceiptData';
import { useValidation } from 'hooks/useValidation';
import { COMMITTEES } from 'models/comittees';

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
  const { dispatch } = useContext(ReceiptContext);
  const { interacted, setInteracted } = useInteraction('committee');
  const { validation, level } = useValidation('committee');

  const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    const committee = COMMITTEES.find((com) => com.group === key);
    if (committee) {
      dispatch({
        type: ActionType.CHANGE,
        data: {
          committee,
        },
      });
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
