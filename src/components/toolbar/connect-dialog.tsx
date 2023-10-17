'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useToast } from '~/components/ui/toast/use-toast';
import { connectionStringAtom, hasConfiguredDatabaseAtom, schemaAtom } from '~/lib/utils/atoms';
import { connect } from '~/lib/utils/connect';
import { maskPassword } from '~/lib/utils/mask-password';

type FormValues = {
  apiKey: string;
  connectionString: string;
};

export const ConnectDialog = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isOpen, setIsOpen] = useState(false);
  const [connectionString, setConnectionString] = useAtom(connectionStringAtom);
  const [hasConfiguredDatabase, setHasConfiguredDatabase] = useAtom(hasConfiguredDatabaseAtom);

  const [schema, setSchema] = useAtom(schemaAtom);

  const { mutate, isLoading } = useMutation(
    async (data: FormValues) => {
      const res = await connect(data);
      return res;
    },
    {
      onSuccess: (data) => {
        toast({
          title: 'Configuration saved successfully',
        });
        setConnectionString(data.connectionString);
        setSchema(data.databaseSchema);
        setHasConfiguredDatabase(true);
        setIsOpen(false);
      },

      onError: (error) => {
        toast({
          title: `Error saving configuration: ${error}`,
        });
      },
    }
  );

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <>
        <DialogTrigger asChild>
          <Button className="relative" variant="outline">
            {!hasConfiguredDatabase && (
              <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                <span className="bg-primary-solid absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-primary-solid-hover relative inline-flex h-2.5 w-2.5 rounded-full"></span>
              </span>
            )}
            <span>Connect</span>
          </Button>
        </DialogTrigger>
      </>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>

          <DialogDescription>Configure your Neon database connection</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-0.5">
            <Label htmlFor="connectionString">Database connection string</Label>
            <Input
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
          <div className="mt-8 flex justify-end space-x-5">
            {connectionString && (
              <Button
                onClick={() => {
                  setConnectionString('');
                  setSchema('');
                  setHasConfiguredDatabase(false);
                  queryClient.clear();
                  setIsOpen(false);
                }}
                type="submit"
                variant="danger"
              >
                Remove connection
              </Button>
            )}
            <Button type="submit">{isLoading ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
