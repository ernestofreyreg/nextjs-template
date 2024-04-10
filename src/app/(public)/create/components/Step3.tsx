import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { differenceInHours, format, isValid, parse } from "date-fns";
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

type Step3Props = {} & FormActionsProps;

const hoursBetween = (start: Date, end: Date) => {
  if (end >= start) {
    return differenceInHours(end, start);
  }

  return (
    differenceInHours(parse("23:59", "HH:mm", new Date()), start, {
      roundingMethod: "ceil",
    }) +
    differenceInHours(end, parse("00:00", "HH:mm", new Date()), {
      roundingMethod: "ceil",
    })
  );
};

export const Step3: FC<Step3Props> = (props) => {
  const form = useFormContext<ScheduleFormValues>();

  const shifts = useMemo(() => parseInt(form.watch("shifts"), 10), [form]);
  const values = form.watch();
  const shiftHours = useMemo(() => {
    const starts = parse(values.opening_time, "HH:mm", new Date());
    const ends = parse(values.closing_time, "HH:mm", new Date());
    const shift1 = values.shift_time_0
      ? parse(values.shift_time_0, "HH:mm", new Date())
      : undefined;
    const shift2 = values.shift_time_1
      ? parse(values.shift_time_1, "HH:mm", new Date())
      : undefined;

    if (
      !isValid(starts) ||
      !isValid(ends) ||
      !isValid(shift1) ||
      !isValid(shift2)
    ) {
      return [];
    }
    if (shifts === 1) {
      return [
        {
          starts,
          ends,
          duration: hoursBetween(starts, ends),
        },
      ];
    }
    if (shifts === 2) {
      return [
        {
          starts,
          ends: shift1,
          duration: hoursBetween(starts, shift1),
        },
        {
          starts: shift1,
          ends,
          duration: hoursBetween(shift1, ends),
        },
      ];
    }

    if (shifts === 3) {
      return [
        {
          starts,
          ends: shift1,
          duration: hoursBetween(starts, shift1),
        },
        {
          starts: shift1,
          ends: shift2,
          duration: hoursBetween(shift1, shift2),
        },
        {
          starts: shift2,
          ends,
          duration: hoursBetween(shift2, ends),
        },
      ];
    }

    return [];
  }, [
    shifts,
    values.closing_time,
    values.opening_time,
    values.shift_time_0,
    values.shift_time_1,
  ]);

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Set opening, closing and shifts change times"
      currentStep={3}
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
            {shiftHours.map((shift, index) => (
              <div key={index}>
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
