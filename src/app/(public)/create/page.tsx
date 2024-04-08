"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ScheduleFormSchema,
  ScheduleFormValues,
} from "@/app/(public)/create/components/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "@/app/(public)/create/components/Step3";

type FormStep = "days" | "shifts" | "times" | "roles";

export default function CreateSchedulePage() {
  const router = useRouter();
  const form = useForm<ScheduleFormValues>({
    defaultValues: {
      open_0: false,
      open_1: false,
      open_2: false,
      open_3: false,
      open_4: false,
      open_5: false,
      open_6: false,
      shifts: "1",
      opening_time: "08:00",
      closing_time: "20:00",
      shift_time_0: "12:00",
      shift_time_1: "16:00",
    },
    resolver: zodResolver(ScheduleFormSchema),
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

  return (
    <FormProvider {...form}>
      {step === "days" && (
        <Step1
          nextButtonLabel="Select shifts"
          previousButtonLabel="Cancel"
          onNextButtonOnClick={handlerNext("shifts")}
          onPreviousButtonOnClick={handleGoBack}
        />
      )}

      {step === "shifts" && (
        <Step2
          nextButtonLabel="Set hours"
          previousButtonLabel="Change days"
          onNextButtonOnClick={handlerNext("times")}
          onPreviousButtonOnClick={handlerNext("days")}
        />
      )}

      {step === "times" && (
        <Step3
          nextButtonLabel="Set roles"
          onNextButtonOnClick={handlerNext("roles")}
          previousButtonLabel="Change shifts"
          onPreviousButtonOnClick={handlerNext("shifts")}
        />
      )}
    </FormProvider>
  );
}
