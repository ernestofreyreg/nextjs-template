import { z } from "zod";
import { differenceInHours, isValid, parse } from "date-fns";
import { nanoid } from "nanoid";

export type FormActionsProps = {
  nextButtonLabel: string;
  onNextButtonOnClick: () => void;
  previousButtonLabel: string;
  onPreviousButtonOnClick: () => void;
};

export const RequiredStaffSchema = z.array(z.array(z.number().int())).length(7);
export type RequiredStaff = z.infer<typeof RequiredStaffSchema>;
export const RequiredStaffFormSchema = z.object({
  required_staff: RequiredStaffSchema,
});
export type RequiredStaffFormValues = z.infer<typeof RequiredStaffFormSchema>;

export const RoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  required_staff: RequiredStaffSchema,
  existing_staff: z.number().int().min(0, "Existing staff is required"),
  rate_cents: z.optional(z.number().int()),
});

export const ScheduleFormSchema = z
  .object({
    open_days: z.array(z.boolean()).length(7),
    shifts: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    opening_time: z.string().min(1, "Opening time is required"),
    closing_time: z.string().min(1, "Closing time is required"),
    shift_time_0: z.optional(z.string()),
    shift_time_1: z.optional(z.string()),
  })
  .superRefine((values, ctx) => {
    if (values.open_days.every((dayOpened) => !dayOpened)) {
      ctx.addIssue({
        path: ["opens"],
        code: "custom",
        message: "Need to select day or days opened",
      });
    }
  });
export type ScheduleFormValues = z.infer<typeof ScheduleFormSchema>;

export const RolesFormSchema = z.object({
  roles: z.array(RoleSchema).min(1, "At least one role is required"),
});
export type RolesFormValues = z.infer<typeof RolesFormSchema>;

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

export const calculateShiftHours = (values: ScheduleFormValues) => {
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
};
