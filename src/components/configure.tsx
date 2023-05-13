import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shared/dialog';
import { Button } from './shared/button';
import { Icon } from './shared/icon';
import { useForm } from 'react-hook-form';
import { TextInput } from './shared/text-input';
import { Label } from './shared/label';
import { useAtom } from 'jotai';
import { connectionStringAtom, hasConfiguredDatabaseAtom } from '@/utils/atoms';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { connect } from '@/utils/connect';
import { toast } from 'react-hot-toast';
import { maskPassword } from '@/utils/mask-password';

type FormValues = {
  apiKey: string;
  connectionString: string;
};

export const ConfigurationDialog = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const [connectionString, setConnectionString] = useAtom(connectionStringAtom);
  const [hasConfiguredDatabase, setHasConfiguredDatabase] = useAtom(
    hasConfiguredDatabaseAtom
  );

  const { mutate, isLoading } = useMutation(
    async (data: FormValues) => {
      const res = await connect(data);
      return res;
    },
    {
      onSuccess: (data) => {
        toast.success('Configuration saved successfully');
        setConnectionString(data.connectionString);
        setHasConfiguredDatabase(true);
        setIsOpen(false);
      },

      onError: (error) => {
        toast.error(`Error saving configuration: ${error}`);
      },
    }
  );

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <>
        <DialogTrigger asChild>
          <Button className="relative" appearance="outlined">
            {!hasConfiguredDatabase && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-solid opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-solid-hover"></span>
              </span>
            )}
            <span>Connect</span>
          </Button>
        </DialogTrigger>
      </>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>

          <DialogDescription>
            Configure your Neon database connection
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label className="mb-1" size="sm" htmlFor="connectionString">
              Database connection string
            </Label>
            <TextInput
              {...register('connectionString')}
              id="connectionString"
              name="connectionString"
              type="text"
              placeholder={
                connectionString
                  ? maskPassword(connectionString)
                  : 'postgres://daniel:<password>@ep-mute-rain-952417.us-east-2.aws.neon.tech/neondb'
              }
            />
          </div>
          <div className="flex justify-end space-x-5 mt-8">
            {connectionString && (
              <Button
                onClick={() => {
                  setConnectionString('');
                  setHasConfiguredDatabase(false);
                  setIsOpen(false);
                }}
                type="submit"
                appearance="danger"
              >
                Remove connection
              </Button>
            )}
            <Button loading={isLoading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
