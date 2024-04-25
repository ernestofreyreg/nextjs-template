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
  rate_cents: z.optional(z.number().int()),
});
export type Role = z.infer<typeof RoleSchema>;

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
