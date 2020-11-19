import React, { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import { useInteraction } from 'hooks/useInteraction';
import { useValidation } from 'hooks/useValidation';
import { useDispatch } from 'redux/hooks';
import { formDataUpdated } from 'redux/reducers/formReducer';

import { Label } from './Base';
import { Select } from './Dropdown';
import { ValidationMessages } from './ValidationMessages';
import { useSelector } from 'redux/hooks';
import { isOnlineGroup } from 'models/groups';

const Option = styled.option``;

const SelectContainer = styled.div`
  display: flex;
  margin: 0.8rem 0;
  flex-direction: column;
  justify-content: flex-end;
`;

export const CommitteeDropdown: FC = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const selectedGroupId = useSelector((state) => state.form.committee?.id);
  const { interacted, setInteracted } = useInteraction('committee');
  const { validation, level } = useValidation('committee');

  const onDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const groupId = Number(event.target.value);
    const selectedGroup = groups.find((group) => group.id === groupId);
    if (selectedGroup) {
      dispatch(
        formDataUpdated({
          committee: selectedGroup,
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
        onBlur={setInteracted}
        level={interacted ? level : undefined}
        value={selectedGroupId || 'default'}
      >
        <Option disabled value="default">
          Velg enheten/komiteen kjøpet er gjort for
        </Option>
        {groups.map((group) =>
          isOnlineGroup(group) ? (
            <Option key={group.id} value={group.id}>
              {group.name_long}
            </Option>
          ) : (
            <Option key={group.name} value={group.id}>
              {group.name}
            </Option>
          )
        )}
      </Select>
    </SelectContainer>
  );
};
