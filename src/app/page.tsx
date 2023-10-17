import { Panels } from '~/components/panels';
import { Toolbar } from '~/components/toolbar';
import {
  getMainLayout,
  getNestedLayout,
  getNestedLayoutDirection,
} from '~/lib/utils/panels-layout';

export default function Home() {
  const mainLayout = getMainLayout();
  const nestedLayout = getNestedLayout();
  const nestedLayoutDirection = getNestedLayoutDirection();

  return (
    <>
      <Toolbar />
      <Panels
        mainLayout={mainLayout}
        nestedLayout={nestedLayout}
        nestedlayoutDirection={nestedLayoutDirection}
      />
    </>
  );
}
