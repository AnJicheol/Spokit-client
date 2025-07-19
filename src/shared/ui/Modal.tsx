import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '@/shared/ui/shadcn/components/dialog';
import type { PropsWithChildren } from 'react';

interface Modal {
  trigger: React.ReactNode;
  title: string;
}

export function Modal({ children, trigger, title }: PropsWithChildren<Modal>) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
