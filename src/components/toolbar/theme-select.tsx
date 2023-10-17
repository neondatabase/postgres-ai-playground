'use client';
import { ChevronDownIcon, DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useHasMounted } from '~/lib/hooks/use-has-mounted';
import { Button } from '../ui/button';

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted;

  if (!hasMounted()) {
    return (
      <Button className="w-[125px] h-10 border-muted" variant="outline">
        <div className="flex items-center space-x-3">
          <DesktopIcon className="h-4 w-4" />
          <span>System</span>
          <ChevronDownIcon className="h-4 w-4 opacity-50 " />
        </div>
      </Button>
    );
  }
  return (
    <>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-[125px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">
            <div className="flex items-center space-x-3">
              <DesktopIcon className="h-4 w-4" />
              <span>System</span>
            </div>
          </SelectItem>
          <SelectItem value="light">
            <div className="flex items-center space-x-3">
              <SunIcon name="Sun" className="h-4 w-4" />
              <span>Light</span>
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center space-x-3">
              <MoonIcon name="Moon" className="h-4 w-4" />
              <span>Dark</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};
