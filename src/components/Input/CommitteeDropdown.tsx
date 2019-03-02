import React, { ChangeEvent, useContext } from 'react';
import styled from 'styled-components';

import { ReceiptContext } from 'contexts/ReceiptData';
import { ActionType } from 'hooks/useReceiptData';
import { COMMITTEES } from 'models/comittees';

import { Label } from './Base';
import { Select } from './Dropdown';

const Option = styled.option``;

const SelectContainer = styled.div`
  margin: auto 0;
`;

export const CommitteeDropdown = () => {
  const { dispatch } = useContext(ReceiptContext);

  const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const key = event.target.value;
    const committee = COMMITTEES.find((com) => com.group === key);
    if (committee) {
      dispatch({
        type: ActionType.CHANGE,
        data: { committee },
      });
    }
  };

  return (
    <SelectContainer>
      <Label>komité</Label>
      <Select onChange={onDropdownChange} defaultValue="default">
        <Option disabled value="default">
          Velg en komité
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
