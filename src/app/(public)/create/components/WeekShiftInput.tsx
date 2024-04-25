import { FC, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { maxBy, minBy, reduce, identity, range, flatten } from "ramda";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { calculateShiftHours } from "@/services/helpers";
import {
  RequiredStaff,
  RequiredStaffFormSchema,
  RequiredStaffFormValues,
  ScheduleFormValues,
} from "./schemas";

export interface WeekShiftInputProps {
  scheduleValues: ScheduleFormValues;
  name: string;
  value: RequiredStaff;
  onChange: (value: RequiredStaff) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const WeekShiftInput: FC<WeekShiftInputProps> = ({
  name,
  scheduleValues,
  value,
  onChange,
  onClose,
  onOpen,
}) => {
  const form = useForm<RequiredStaffFormValues>({
    defaultValues: { required_staff: value },
    resolver: zodResolver(RequiredStaffFormSchema),
  });

  const shiftHours = useMemo(
    () => calculateShiftHours(scheduleValues),
    [scheduleValues],
  );

  const minMaxStaff = useMemo(() => {
    const daysSelected = flatten(
      value.filter((dayIndex, index) => scheduleValues.open_days[index]),
    );
    return {
      min: reduce(minBy(identity), daysSelected[0], daysSelected),
      max: reduce(maxBy(identity), daysSelected[0], daysSelected),
    };
  }, [scheduleValues.open_days, value]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
      if (!isOpen) {
        onChange(form.getValues().required_staff);
      }
    },
    [form, onChange, onClose, onOpen],
  );

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full">
          {minMaxStaff.min === minMaxStaff.max
            ? minMaxStaff.min
            : `${minMaxStaff.min}..${minMaxStaff.max}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Weekly Staff for {name}
            </h4>
            <p className="text-sm text-muted-foreground">
              Minimum staff required for each day
            </p>
          </div>
          <div className="flex flex-row gap-1">
            <div className="text-sm font-semibold col-span-2 w-20 shrink-0">
              Shifts
            </div>
            {days
              .filter((day, dayIndex) => scheduleValues.open_days[dayIndex])
              .map((day) => (
                <div key={day} className="w-12 shrink-0 text-sm font-semibold">
                  {day.substring(0, 3)}
                </div>
              ))}
          </div>
          {shiftHours.map((shift, shiftIndex) => (
            <div key={shift.id} className="flex flex-row gap-1">
              <div className="text-sm flex flex-col w-20 shrink-0">
                <div>{format(shift.starts, "hh:mm a")}</div>
                <div>{format(shift.ends, "hh:mm a")}</div>
              </div>
              {range(0, 7)
                .filter((dayIndex) => scheduleValues.open_days[dayIndex])
                .map((dayIndex) => (
                  <div key={days[dayIndex]} className="w-12 shrink-0">
                    <Input
                      type="text"
                      className="w-full appearance-none"
                      {...form.register(
                        `required_staff.${dayIndex}.${shiftIndex}`,
                        {
                          valueAsNumber: true,
                        },
                      )}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
