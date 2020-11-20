import { render } from '@testing-library/react';
import { serializeReceipt } from 'form/state';
import { validate } from 'form/validation';
import { getPage } from 'next-page-tester';
import { act } from 'react-dom/test-utils';
import { formDataUpdated } from 'redux/reducers/formReducer';
import { setAllInteracted } from 'redux/reducers/interactionReducer';
import { setValidation } from 'redux/reducers/validationReducer';
import { State, store } from 'redux/store';
import { getValidForm } from 'utils/testing';
import * as fileUtils from 'utils/readFileAsDataUrl';

const readFileAsDataUrlMock = jest.spyOn(fileUtils, 'readFileAsDataUrl');
readFileAsDataUrlMock.mockResolvedValue(Promise.resolve(''));

describe('Index page', () => {
  it('Renders index page correctly', async () => {
    const Index = await getPage({ route: '/index', useCustomApp: true });
    const { getByText } = render(Index);
    await act(async () => {
      const title = await getByText('Kvitteringsskjema');
      expect(title).toBeInTheDocument();
    });
  });

  it('Renders validation errors when fields are set to interacted on empty form', async () => {
    const Index = await getPage({ route: '/index', useCustomApp: true });
    const { getByText } = render(Index);
    await act(async () => {
      const { form } = store.getState() as State;
      const validation = validate(form);
      await store.dispatch(setValidation(validation));
      await store.dispatch(setAllInteracted());
      const validationErrorText = await getByText('Feltet må inneholde en gyldig e-postadresse');
      expect(validationErrorText).toBeDefined();
    });
  });

  it('Reveals all errors when the download button is clicked when state is invalid', async () => {
    const Index = await getPage({ route: '/index', useCustomApp: true });
    const { getByTestId, getByText } = render(Index);
    await act(async () => {
      const downloadButton = await getByTestId('button-submit-download');
      downloadButton.click();
      const validationErrorText = await getByText('Feltet må inneholde en gyldig e-postadresse');
      expect(validationErrorText).toBeDefined();
    });
  });

  it('Renders with valid form in state', async () => {
    const Index = await getPage({ route: '/index', useCustomApp: true });
    const form = await serializeReceipt(await getValidForm());
    const { getByTestId } = render(Index);
    await act(async () => {
      await store.dispatch(formDataUpdated(form));
      const downloadButton = await getByTestId('button-submit-download');
      expect(downloadButton).toBeEnabled();
    });
  });
});
