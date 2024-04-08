import { FC, Fragment, useCallback, useEffect } from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const fieldNames: Partial<Array<keyof ScheduleFormValues>> = [
  "open_0",
  "open_1",
  "open_2",
  "open_3",
  "open_4",
  "open_5",
  "open_6",
];

type Step1Props = {} & FormActionsProps;

export const Step1: FC<Step1Props> = (props) => {
  const form = useFormContext<ScheduleFormValues>();

  const handleSelectAll = useCallback(() => {
    days.forEach((day, index) => {
      form.setValue(fieldNames[index], true);
    });
  }, [form]);

  const handleSelectWeekends = useCallback(() => {
    days.forEach((day, index) => {
      if (index === 5 || index === 6) {
        form.setValue(fieldNames[index], true);
      } else {
        form.setValue(fieldNames[index], false);
      }
    });
  }, [form]);

  const handleSelectWeekdays = useCallback(() => {
    days.forEach((day, index) => {
      if (index === 5 || index === 6) {
        form.setValue(fieldNames[index], false);
      } else {
        form.setValue(fieldNames[index], true);
      }
    });
  }, [form]);

  const handleClear = useCallback(() => {
    days.forEach((day, index) => {
      form.setValue(fieldNames[index], false);
    });
  }, [form]);

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Select the days you want to create the schedule for"
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
        <div className="flex flex-col gap-2 p-3 bg-gray-50">
          {days.map((day, index) => (
            <Fragment key={day}>
              <FormField
                control={form.control}
                name={fieldNames[index]}
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
      <div>
        {(form.formState.errors as any).opens && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Select at least one day to continue
            </AlertDescription>
          </Alert>
        )}
      </div>
    </FormFrame>
  );
};
