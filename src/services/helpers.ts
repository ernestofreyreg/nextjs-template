import {
  Role,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { differenceInHours, isValid, parse } from "date-fns";
import { nanoid } from "nanoid";
import { flatten, sum } from "ramda";

function hoursBetween(start: Date, end: Date) {
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
}

export function calculateShiftHours(values: ScheduleFormValues) {
  const starts = parse(values.opening_time, "HH:mm", new Date());
  const ends = parse(values.closing_time, "HH:mm", new Date());
  const { shifts } = values;
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
        id: nanoid(),
        starts,
        ends,
        duration: hoursBetween(starts, ends),
      },
    ];
  }
  if (shifts === 2) {
    return [
      {
        id: nanoid(),
        starts,
        ends: shift1,
        duration: hoursBetween(starts, shift1),
      },
      {
        id: nanoid(),
        starts: shift1,
        ends,
        duration: hoursBetween(shift1, ends),
      },
    ];
  }

  if (shifts === 3) {
    return [
      {
        id: nanoid(),
        starts,
        ends: shift1,
        duration: hoursBetween(starts, shift1),
      },
      {
        id: nanoid(),
        starts: shift1,
        ends: shift2,
        duration: hoursBetween(shift1, shift2),
      },
      {
        id: nanoid(),
        starts: shift2,
        ends,
        duration: hoursBetween(shift2, ends),
      },
    ];
  }

  return [];
}

export function calculateHumanHours(role: Role, schedule: ScheduleFormValues) {
  const shiftHours = calculateShiftHours(schedule);
  if (shiftHours.length !== role.required_staff[0].length) {
    return 0;
  }
  return sum(
    flatten(
      role.required_staff
        .filter((_, index) => schedule.open_days[index])
        .map((dayStaff) => {
          return dayStaff.map((shiftStaff, index) => {
            return shiftStaff * shiftHours[index].duration;
          });
        }),
    ),
  );
}
