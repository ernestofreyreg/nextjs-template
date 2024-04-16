import { FC, useCallback, useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
  FormActionsProps,
  RolesFormValues,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { FormFrame } from "@/app/(public)/create/components/FormFrame";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SlPlus } from "react-icons/sl";
import { clsx } from "clsx";
import { IoTrashOutline } from "react-icons/io5";
import { NumericFormat } from "react-number-format";
import { nanoid } from "nanoid";
import { repeat } from "ramda";
import { WeekShiftInput } from "./WeekShiftInput";

type Step4Props = {
  onStepChange: (step: number) => void;
  scheduleValues: ScheduleFormValues;
} & FormActionsProps;

export const Step4: FC<Step4Props> = ({
  onStepChange,
  scheduleValues,
  ...props
}) => {
  const form = useFormContext<RolesFormValues>();
  const values = form.watch();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "roles",
  });

  const handleAddStaff = useCallback(() => {
    append({
      name: "",
      rate_cents: 0,
      required_staff: repeat(repeat(1, scheduleValues.shifts), 7),
      existing_staff: 0,
    });
  }, [append, scheduleValues.shifts]);

  const handlerDelete = useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  const handlerChangeRequiredStaff = useCallback(
    (index: number) => (value) => {
      form.setValue(`roles.${index}.required_staff`, value, {
        shouldDirty: true,
      });
    },
    [form],
  );

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Add your current and future employees to the schedule"
      currentStep={4}
      onStepClick={onStepChange}
      {...props}
    >
      <div className="flex flex-col gap-3 bg-gray-50 p-3">
        <div className="flex flex-col gap-2">
          <div className="md:grid grid-cols-6 gap-1 hidden">
            <div className="col-span-3 text-md font-semibold text-gray-700">
              Role
            </div>
            <div className="text-md font-semibold text-gray-700">Rate</div>
            <div className="text-md font-semibold text-gray-700">Required</div>
            <div className="text-md font-semibold text-gray-700">Existing</div>
          </div>

          <div className="max-h-[350px]  overflow-y-scroll">
            {fields.map((_, index) => (
              <div
                key={nanoid()}
                className="grid grid-cols-2 md:grid-cols-6 gap-1 bg-gray-50 p-1"
              >
                <div className="w-full md:col-span-3">
                  <Label htmlFor="role" className="block md:hidden">
                    Role
                  </Label>
                  <div className="flex flex-row items-center gap-1">
                    <Input
                      type="text"
                      id="role"
                      className={clsx(
                        "focus-visible:ring-offset-0",
                        form.formState.errors.roles?.[index]?.name &&
                          "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                      )}
                      {...form.register(`roles.${index}.name`)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlerDelete(index)}
                    >
                      <IoTrashOutline className="text-red-400" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="rate" className="block md:hidden">
                    Rate
                  </Label>
                  <Controller
                    name={`roles.${index}.rate_cents`}
                    control={form.control}
                    render={({ field }) => (
                      <NumericFormat
                        className={clsx(
                          "focus-visible:ring-offset-0",
                          form.formState.errors.roles?.[index]?.rate_cents &&
                            "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                        )}
                        {...field}
                        customInput={Input}
                        thousandSeparator
                        prefix="$"
                        placeholder="$0.00"
                      />
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="qty" className="block md:hidden">
                    Required
                  </Label>
                  <WeekShiftInput
                    name={values.roles[index].name}
                    value={values.roles[index].required_staff}
                    onChange={handlerChangeRequiredStaff(index)}
                    scheduleValues={scheduleValues}
                  />
                </div>
                <div>
                  <Label htmlFor="existing" className="block md:hidden">
                    Existing
                  </Label>
                  <Input
                    type="number"
                    id="existing"
                    className={clsx(
                      "focus-visible:ring-offset-0",
                      form.formState.errors.roles?.[index]?.existing_staff &&
                        "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                    )}
                    {...form.register(`roles.${index}.existing_staff`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button variant="outline" onClick={handleAddStaff}>
              <div className="flex flex-row gap-2 items-center">
                <SlPlus /> Add Staff
              </div>
            </Button>
          </div>
        </div>
      </div>
    </FormFrame>
  );
};
