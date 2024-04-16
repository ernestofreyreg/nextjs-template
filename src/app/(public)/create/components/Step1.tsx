import { FC, Fragment, useCallback } from "react";
import { repeat } from "ramda";
import { useFormContext } from "react-hook-form";
import {
  FormActionsProps,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { FormFrame } from "@/app/(public)/create/components/FormFrame";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Step1Props = {
  onStepChange: (step: number) => void;
} & FormActionsProps;

export const Step1: FC<Step1Props> = ({ onStepChange, ...props }) => {
  const form = useFormContext<ScheduleFormValues>();

  const handleSelectAll = useCallback(() => {
    form.setValue("open_days", repeat(true, 7));
  }, [form]);

  const handleSelectWeekends = useCallback(() => {
    form.setValue("open_days", repeat(false, 5).concat(repeat(true, 2)));
  }, [form]);

  const handleSelectWeekdays = useCallback(() => {
    form.setValue("open_days", repeat(true, 5).concat(repeat(false, 2)));
  }, [form]);

  const handleClear = useCallback(async () => {
    form.reset();
  }, [form]);

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Select the days you want to create the schedule for"
      currentStep={1}
      onStepClick={onStepChange}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
        <div className="flex flex-col gap-2 p-3 bg-gray-50">
          {days.map((day, index) => (
            <Fragment key={day}>
              <FormField
                control={form.control}
                name={`open_days.${index}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
                    <FormControl>
                      <Checkbox
                        checked={Boolean(field.value)}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{day}</FormLabel>
                  </FormItem>
                )}
              />
              {index === 4 && <Separator orientation="horizontal" />}
            </Fragment>
          ))}
        </div>

        <div className="flex flex-col gap-2 p-3">
          <Button variant="outline" onClick={handleSelectAll}>
            All days
          </Button>
          <Button variant="outline" onClick={handleSelectWeekends}>
            Only weekends
          </Button>
          <Button variant="outline" onClick={handleSelectWeekdays}>
            Only week days
          </Button>
          <Button variant="ghost" onClick={handleClear}>
            Clear all
          </Button>
        </div>
      </div>
    </FormFrame>
  );
};
