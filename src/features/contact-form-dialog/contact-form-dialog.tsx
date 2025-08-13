'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { InputField, MultipleLineField } from '../auth/components/form-fields';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormFields, ContactFormSchema } from '../auth/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function ContactFormDialog(props: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const { open, onOpenChange } = props;
    const form = useForm<ContactFormFields>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            subject: '',
            message: '',
        },
    });
    const { handleSubmit } = form;

    const onSubmit: SubmitHandler<ContactFormFields> = (data) => {
        console.log('data', data);
        // TODO: handle submit
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="top-[calc(50%)] h-full max-h-[calc(100dvh-116px)] w-[calc(100%-2.5rem)] p-6 md:pb-20">
                <DialogHeader className="gap-0 text-left">
                    <DialogTitle>Get in touch with us!</DialogTitle>
                    <p className="mt-4 text-paragraph-4 md:text-paragraph-3">
                        {`You can expect a reply in 24 - 48h. If it’s urgent,
                        please use the chat.`}
                    </p>
                </DialogHeader>
                <div className="mt-6 max-h-full min-h-0 overflow-y-auto p-2 md:mt-[60px]">
                    <Form {...form}>
                        <form
                            className="flex flex-col items-start gap-6"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full flex-col gap-6 md:gap-10">
                                <InputField
                                    control={form.control}
                                    name="fullName"
                                    label="Your Name"
                                    placeholder="Your name"
                                />
                                <InputField
                                    control={form.control}
                                    name="email"
                                    label="Your E-Mail"
                                    placeholder="Your e-mail address"
                                />

                                <InputField
                                    control={form.control}
                                    name="subject"
                                    label="Reason for writing*"
                                    placeholder="Subject of your matter"
                                />
                                <MultipleLineField
                                    control={form.control}
                                    name="message"
                                    label="Your Message"
                                    placeholder="Tell us what’s on your mind..."
                                />
                                <div>
                                    <Button variant={'dark'} type="submit">
                                        Send message <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
