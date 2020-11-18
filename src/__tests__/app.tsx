import { render } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { act } from 'react-dom/test-utils';

test('Renders index page correctly', async () => {
  const Index = await getPage({ route: '/index', useCustomApp: true });
  const { getByText } = render(Index);
  await act(async () => {
    const title = await getByText('Kvitteringsskjema');
    expect(title).toBeInTheDocument();
  });
});
