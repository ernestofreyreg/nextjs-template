import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import {
  FormActionsProps,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { FormFrame } from "@/app/(public)/create/components/FormFrame";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { calculateShiftHours } from "@/services/helpers";

type Step3Props = {
  onStepChange: (step: number) => void;
} & FormActionsProps;

export const Step3: FC<Step3Props> = ({ onStepChange, ...props }) => {
  const form = useFormContext<ScheduleFormValues>();

  const shifts = form.watch("shifts");
  const values = form.watch();
  const shiftHours = useMemo(() => calculateShiftHours(values), [values]);

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Set opening, closing and shifts change times"
      currentStep={3}
      onStepClick={onStepChange}
      {...props}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-between">
        <div className="flex flex-col gap-2 p-3 bg-gray-50">
          <div className="flex flex-col gap-2 p-3">
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="opening_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {shifts > 1 && (
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="shift_time_0"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2nd shift</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {shifts > 2 && (
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="shift_time_0"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3rd shift</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="closing_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2">
            {shiftHours.map((shift) => (
              <div key={shift.id}>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-row items-center gap-2 grow">
                    <div className="text-md text-gray-700">
                      {format(shift.starts, "hh:mm a")}
                    </div>
                    <div className="grow bg-gray-100 text-2xl flex flex-row justify-center items-center gap-1">
                      {shift.duration}{" "}
                      <span className="text-sm text-gray-500">hours</span>
                    </div>
                    <div className="text-md text-gray-700">
                      {format(shift.ends, "hh:mm a")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FormFrame>
  );
};
