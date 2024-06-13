"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { repeat } from "ramda";
import { useMutation } from "@tanstack/react-query";
import {
  RolesFormSchema,
  RolesFormValues,
  ScheduleFormSchema,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPublicSchedule } from "@/services/createPublicSchedule";
import { toCents } from "@/services/converters";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";

const steps = ["days", "shifts", "times", "roles"] as const;
type FormStep = (typeof steps)[number];

export default function CreateSchedulePage() {
  const router = useRouter();

  const scheduleMutation = useMutation({
    mutationFn: createPublicSchedule,
  });

  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      open_days: repeat(false, 7),
      shifts: 1,
      opening_time: "08:00",
      closing_time: "20:00",
      shift_time_0: "12:00",
      shift_time_1: "16:00",
    },
    resolver: zodResolver(ScheduleFormSchema),
  });
  const rolesForm = useForm<RolesFormValues>({
    resolver: zodResolver(RolesFormSchema),
    defaultValues: {
      roles: [
        {
          name: "",
          rate_cents: 0,
          required_staff: repeat([1], 7),
        },
      ],
    },
  });

  const [step, setStep] = useState<FormStep>("days");

  const handlerNext = useCallback(
    (nextStep: FormStep) => async () => {
      const valid = await form.trigger();
      if (valid) {
        setStep(nextStep);
      }
    },
    [form],
  );

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const values = form.watch();
  const { shifts } = values;

  useEffect(() => {
    const rolesValue = rolesForm.getValues();
    rolesValue.roles.forEach((role, index) => {
      const requiredStaff = role.required_staff;
      const newRequiredStaff =
        requiredStaff[0].length === shifts
          ? requiredStaff
          : repeat(repeat(1, shifts), 7);

      rolesForm.setValue(`roles.${index}.required_staff`, newRequiredStaff);
    });
  }, [rolesForm, shifts]);

  const handleCreateSchedule = useCallback(async () => {
    const valid = await form.trigger();
    const validRoles = await rolesForm.trigger();
    if (valid && validRoles) {
      const formValues = form.getValues();
      const rolesValues = rolesForm.getValues();
      scheduleMutation.mutate(
        {
          values: {
            open_days: formValues.open_days,
            shifts: formValues.shifts,
            opening_time: formValues.opening_time,
            closing_time: formValues.closing_time,
            shift_time_0: formValues.shift_time_0,
            shift_time_1: formValues.shift_time_1,
          },
          roles: rolesValues.roles.map((role) => ({
            name: role.name,
            rate_cents: toCents(role.rate_cents),
            required_staff: role.required_staff,
          })),
        },
        {
          onSuccess: (schedule) => {
            if (schedule.length > 0) {
              // router.push(`/schedule${schedule[0].id}`);
              alert("Schedule created");
            }
          },
          onError: () => {
            alert("Error creating schedule");
          },
        },
      );
    }
  }, [form, rolesForm, router, scheduleMutation]);

  const handleStepChange = useCallback((newStep: number) => {
    setStep(steps.find((_, index) => index === newStep) || "days");
  }, []);

  return (
    <>
      <FormProvider {...form}>
        {step === "days" && (
          <Step1
            nextButtonLabel="Select shifts"
            previousButtonLabel="Cancel"
            onNextButtonOnClick={handlerNext("shifts")}
            onPreviousButtonOnClick={handleGoBack}
            onStepChange={handleStepChange}
          />
        )}

        {step === "shifts" && (
          <Step2
            nextButtonLabel="Set hours"
            previousButtonLabel="Change days"
            onNextButtonOnClick={handlerNext("times")}
            onPreviousButtonOnClick={handlerNext("days")}
            onStepChange={handleStepChange}
          />
        )}

        {step === "times" && (
          <Step3
            nextButtonLabel="Set roles"
            onNextButtonOnClick={handlerNext("roles")}
            previousButtonLabel="Change shifts"
            onPreviousButtonOnClick={handlerNext("shifts")}
            onStepChange={handleStepChange}
          />
        )}
      </FormProvider>

      {step === "roles" && (
        <FormProvider {...rolesForm}>
          <Step4
            scheduleValues={values}
            nextButtonLabel="Create Schedule"
            onNextButtonOnClick={handleCreateSchedule}
            previousButtonLabel="Change times"
            onPreviousButtonOnClick={handlerNext("times")}
            onStepChange={handleStepChange}
          />
        </FormProvider>
      )}
    </>
  );
}
