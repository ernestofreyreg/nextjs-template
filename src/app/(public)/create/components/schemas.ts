import { z } from "zod";

export const ScheduleFormSchema = z
  .object({
    open_0: z.boolean(),
    open_1: z.boolean(),
    open_2: z.boolean(),
    open_3: z.boolean(),
    open_4: z.boolean(),
    open_5: z.boolean(),
    open_6: z.boolean(),
    shifts: z.union([z.literal("1"), z.literal("2"), z.literal("3")]),
    opening_time: z.string().min(1, "Opening time is required"),
    closing_time: z.string().min(1, "Closing time is required"),
    shift_time_0: z.optional(z.string()),
    shift_time_1: z.optional(z.string()),
  })
  .superRefine((values, ctx) => {
    if (
      [
        values.open_0,
        values.open_1,
        values.open_2,
        values.open_3,
        values.open_4,
        values.open_5,
        values.open_6,
      ].every((dayOpened) => !dayOpened)
    ) {
      ctx.addIssue({
        path: ["opens"],
        code: "custom",
        message: "Need to select day or days opened",
      });
    }
  });
export type ScheduleFormValues = z.infer<typeof ScheduleFormSchema>;

export type FormActionsProps = {
  nextButtonLabel: string;
  onNextButtonOnClick: () => void;
  previousButtonLabel: string;
  onPreviousButtonOnClick: () => void;
};

export const RoleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  required_staff: z.number().int().min(1, "Required staff is required"),
  existing_staff: z.number().int().min(0, "Existing staff is required"),
  rate_cents: z.optional(z.number().int()),
  hours_per_week: z.optional(z.number().int()),
});
export type Role = z.infer<typeof RoleSchema>;

export const RolesFormSchema = z.object({
  roles: z.array(RoleSchema).nonempty("At least one role is required"),
});
export type RolesFormValues = z.infer<typeof RolesFormSchema>;