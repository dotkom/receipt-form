import { useCallback } from 'react';

import { FieldInteractions } from 'form/interaction';
import { useDispatch, useSelector } from 'redux/hooks';
import { setInteraction } from 'redux/reducers/interactionReducer';

export const useInteraction = (field: keyof FieldInteractions) => {
  const dispatch = useDispatch();
  const interacted = useSelector((state) => state.interaction[field]);

  const setInteracted = useCallback(() => {
    dispatch(
      setInteraction({
        [field]: true,
      })
    );
  }, [dispatch, field]);

  return { interacted, setInteracted };
};
