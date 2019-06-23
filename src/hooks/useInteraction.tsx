import { useCallback } from 'react';

import { FieldInteractions } from 'form/interaction';
import { useDispatch, useSelector } from 'redux/hooks';
import { ActionType } from 'redux/reducers/interactionReducer';

export const useInteraction = (field: keyof FieldInteractions) => {
  const dispatch = useDispatch();
  const interacted = useSelector((state) => state.interaction[field]);

  const setInteracted = useCallback(() => {
    dispatch({
      type: ActionType.SET_INTERACTED,
      data: {
        [field]: true,
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { interacted, setInteracted };
};
