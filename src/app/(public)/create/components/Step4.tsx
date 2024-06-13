import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
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
import { repeat } from "ramda";
import { calculateHumanHours } from "@/services/helpers";
import { WeekShiftInput } from "./WeekShiftInput";
import { convertCentsToDollar, toCents } from "@/services/converters";

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

  const calculatedValues = useMemo(
    () =>
      values.roles.map((role) => {
        const humanHours = calculateHumanHours(role, scheduleValues);
        const weekTotal = role.rate_cents * humanHours;
        return {
          humanHours,
          weekTotal,
        };
      }),
    [values, scheduleValues],
  );

  useEffect(() => {
    console.log(values);
  }, [values]);

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
            <div className="col-span-4 text-md font-semibold text-gray-700">
              Role
            </div>
            <div className="text-md font-semibold text-gray-700">Rate</div>
            <div className="text-md font-semibold text-gray-700">Required</div>
          </div>

          <div className="md:max-h-[350px] overflow-y-scroll flex flex-col space-y-[1px] md:space-y-0 bg-gray-200">
            {fields.map((field, index) => (
              <div key={field.id}>
                <div
                  className={clsx(
                    "grid py-1 md:py-1 grid-cols-2 md:grid-cols-6 gap-x-2 gap-y-2 md:gap-x-1 px-1 bg-gray-50",
                  )}
                >
                  <div className="w-full col-span-2 md:col-span-4 flex flex-col gap-1">
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
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="rate" className="block md:hidden">
                      Rate
                    </Label>
                    <Controller
                      name={`roles.${index}.rate_cents`}
                      control={form.control}
                      render={({ field: inputFields }) => (
                        <NumericFormat
                          className={clsx(
                            "focus-visible:ring-offset-0",
                            form.formState.errors.roles?.[index]?.rate_cents &&
                              "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                          )}
                          {...inputFields}
                          onChange={(event) => {
                            if (event.target.value[0] === "$") {
                              inputFields.onChange?.(
                                parseInt(event.target.value.substring(1), 10),
                              );
                            } else {
                              inputFields.onChange?.(event.target.value);
                            }
                          }}
                          customInput={Input}
                          thousandSeparator
                          prefix="$"
                          placeholder="$0.00"
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
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
                </div>

                <div
                  key={field.id}
                  className="flex flex-col md:gap-3 md:flex-row justify-start p-1 bg-gray-50"
                >
                  <div className="text-xs text-gray-500">
                    {calculatedValues[index].humanHours} human/hours week
                  </div>
                  <div className="text-xs text-gray-500">
                    {convertCentsToDollar(
                      toCents(calculatedValues[index].weekTotal),
                    )}{" "}
                    Weekly total
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="text-sm text-gray-700 p-1">
              <strong>
                {calculatedValues.reduce(
                  (acc, value) => acc + value.humanHours,
                  0,
                )}
              </strong>{" "}
              Total human/hours per week
            </div>
            <div className="text-sm text-gray-700 p-1">
              <strong>
                {convertCentsToDollar(
                  toCents(
                    calculatedValues.reduce(
                      (acc, value) => acc + value.weekTotal,
                      0,
                    ),
                  ),
                )}
              </strong>{" "}
              Total weekly salary
            </div>
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
