"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { repeat } from "ramda";
import {
  RolesFormSchema,
  RolesFormValues,
  ScheduleFormSchema,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";

const steps = ["days", "shifts", "times", "roles"] as const;
type FormStep = (typeof steps)[number];

export default function CreateSchedulePage() {
  const router = useRouter();
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
          existing_staff: 0,
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

  const shifts = form.watch("shifts");

  const updateShiftsRequiredStaff = useCallback(
    (rolesForm: RolesFormValues, shifts: 1 | 2 | 3) => {
      rolesForm.roles.forEach((role, index) => {
        const requiredStaff = role.required_staff;
        const newRequiredStaff = requiredStaff.map((staff) => {
          return staff.length === shifts ? staff : repeat(1, shifts);
        });

        rolesForm.roles[index].required_staff = newRequiredStaff;
      });
    },
    [],
  );

  useEffect(() => {
    updateShiftsRequiredStaff(rolesForm.getValues(), shifts);
  }, [rolesForm, shifts, updateShiftsRequiredStaff]);

  const handleCreateSchedule = useCallback(async () => {
    await form.trigger();
    await rolesForm.trigger();
    console.log(form.getValues());
    console.log(rolesForm.getValues());
  }, [form, rolesForm]);

  const handleStepChange = useCallback((newStep: number) => {
    setStep(steps.find((_, index) => index === newStep) || "days");
  }, []);

  const scheduleValues = form.getValues();

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
            scheduleValues={scheduleValues}
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
