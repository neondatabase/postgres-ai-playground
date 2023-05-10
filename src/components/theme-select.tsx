'use client';
import { useTheme } from 'next-themes';
import { Icon } from '@/components/shared/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select';

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="system">
            <div className="flex items-center space-x-3">
              <Icon name="Monitor" className="h-4 w-4" />
              <span>System</span>
            </div>
          </SelectItem>
          <SelectItem value="light">
            <div className="flex items-center space-x-3">
              <Icon name="Sun" className="h-4 w-4" />
              <span>Light</span>
            </div>
          </SelectItem>

          <SelectItem value="dark">
            <div className="flex items-center space-x-3">
              <Icon name="Moon" className="h-4 w-4" />
              <span>Dark</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
