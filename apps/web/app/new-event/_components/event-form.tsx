"use client";
import { createEventAction } from "@/lib/server/db/event";
import { CreatEventSchema } from "@/lib/validate-schema";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { toast } from "sonner";
import { Controller } from "react-hook-form";

import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  CalendarIcon,
  ClockIcon,
  DollarSign,
  MapPin,
  TicketIcon,
} from "lucide-react";
import SkeletonWrapper from "@/components/SkeletonWapper";
import FileUploader from "@/components/FileUploader";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@repo/ui/components/popover";
import { format, startOfDay } from "date-fns";
import { Calendar } from "@repo/ui/components/calendar";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "@/lib/networkConfig";
import { Transaction } from "@mysten/sui/transactions";
import z from "zod";
import { cn } from "@repo/ui/lib/utils";
type FormSchemaType = z.infer<typeof CreatEventSchema>;

const EventForm = () => {
  const currentAccount = useCurrentAccount();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const ticketMasterPackageId = useNetworkVariable("ticketMasterPackageId");

  const {
    form,
    action: { isExecuting, isPending },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(createEventAction, zodResolver(CreatEventSchema), {
    actionProps: {
      onSuccess: ({ data }) => {
        if (data?.success) {
          toast("Event has been created successfully!");
          resetFormAndAction();
          form.reset();
          router.push(`/events/${data?.data?.id}`);
        }
      },
    },
    formProps: {
      mode: "onBlur",
      defaultValues: {
        wallet: currentAccount?.address || "",
        name: "",
        ticketPrice: 0,
        location: "",
        image: [],

        startAt: new Date(),
        endAt: new Date(new Date().setHours(new Date().getHours() + 1)),

        ticketAvailable: 1,
      },
    },
    errorMapProps: {},
  });

  const onSubmit = async (values: FormSchemaType) => {
    const tx = new Transaction();
    tx.moveCall({
      target: `${ticketMasterPackageId}::ticketmaster::create_event`,
      arguments: [
        tx.pure.string(values.name),
        tx.pure.u64(1_000_000_000),
        tx.pure.string(values.location),
        tx.pure.u64(values.ticketAvailable),
        tx.pure.u64(values.ticketPrice * 1_000_000),
      ],
    });
    toast.promise(
      signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: ({ digest }) => {
            console.log("executed transaction", digest);
          },
        }
      ),
      {
        loading: "Creating event...",
        success: "Event created successfully!",
        error: (error) => {
          return `Failed to create event: ${error.message}`;
        },
      }
    );
  };

  const isLoading = isExecuting || isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SkeletonWrapper isLoading={isLoading} fullWidth>
          <Card className="card-background">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <TicketIcon className="w-4 h-4 text-white" />
                </div>
                <span>Event Details</span>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Provide the essential details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900 dark:text-white">
                      Event Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter event name"
                        className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 dark:text-gray-400">
                      Choose a clear and descriptive name for your event (max
                      100 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="ticketPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Ticket Price (SUI)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 dark:text-gray-400">
                        Price per ticket in SUI tokens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter event location"
                          className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 dark:text-gray-400">
                        Venue name, address, or "Virtual Event" (max 200
                        characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ticketAvailable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900 dark:text-white flex items-center space-x-2">
                        <TicketIcon className="w-4 h-4" />
                        <span>Tickets Available</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1"
                          className="bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500 dark:text-gray-400">
                        Total number of tickets available for this event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="card-background">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-orange-500" />
                <span>Date & Time</span>
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                When will your event take place?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Start Date & Time */}
                <FormField
                  control={form.control}
                  name="startAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date & Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select start date and time</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-white dark:bg-slate-800 border-gray-200 dark:border-white/20"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < startOfDay(new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select when your event will begin (must be a future
                        date)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date & Time */}
                <FormField
                  control={form.control}
                  name="endAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date & Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select end date and time</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0 bg-white dark:bg-slate-800 border-gray-200 dark:border-white/20"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < startOfDay(new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select when your event will end (must be after start
                        time)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="card-background">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Event Images
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Upload images to showcase your event (1-4 images, max 5MB each)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Controller
                control={form.control}
                name="image"
                render={({ field: { value, onChange } }) => (
                  <FileUploader
                    value={value}
                    onValueChange={onChange}
                    multiple
                    maxFiles={4}
                    maxSize={4 * 1024 * 1024}
                    disabled={isExecuting || isPending}
                  />
                )}
              />
            </CardContent>
          </Card>
          <div>
            <pre>
              <code className="text-sm text-gray-500 dark:text-gray-400">
                {JSON.stringify(form.formState.errors, null, 2)}
              </code>
            </pre>
          </div>
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="primary-button"
            >
              {isLoading ? "Creating Event..." : "Create Event on Sui"}
            </Button>
            <Button
              type="reset"
              onClick={resetFormAndAction}
              variant="ghost"
              color="warning"
            >
              <span className="flex items-center gap-2">Clear</span>
            </Button>
          </div>
        </SkeletonWrapper>
      </form>
    </Form>
  );
};

export default EventForm;
