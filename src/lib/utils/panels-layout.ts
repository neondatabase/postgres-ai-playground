import { cookies } from 'next/headers';

const getMainLayout = () => {
  const layout = cookies().get('react-resizable-panels:mainLayout');
  if (layout) {
    return JSON.parse(layout.value);
  }
  return [12, 88];
};

const getNestedLayout = () => {
  const nestedLayout = cookies().get('react-resizable-panels:nestedLayout');
  if (nestedLayout) {
    return JSON.parse(nestedLayout.value);
  }
  return [50, 50];
};

const getNestedLayoutDirection = () => {
  const nestedLayoutDirection = cookies().get('react-resizable-panels:nestedLayoutDirection');
  if (nestedLayoutDirection) {
    return JSON.parse(nestedLayoutDirection.value);
  }
  return 'horizontal';
};

export { getMainLayout, getNestedLayout, getNestedLayoutDirection };
