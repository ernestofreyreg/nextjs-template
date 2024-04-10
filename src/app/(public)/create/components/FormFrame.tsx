import { FC, PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Stepper } from "@/app/(public)/create/components/Stepper";

interface FormFrameProps {
  title: string;
  subTitle: string;
  nextButtonLabel: string;
  onNextButtonOnClick: () => void;
  previousButtonLabel: string;
  onPreviousButtonOnClick: () => void;
  currentStep: number;
}

export const FormFrame: FC<PropsWithChildren<FormFrameProps>> = ({
  title,
  subTitle,
  children,
  previousButtonLabel,
  onPreviousButtonOnClick,
  nextButtonLabel,
  onNextButtonOnClick,
  currentStep,
}) => (
  <div className="flex flex-col gap-4 p-2 md:p-0 md:min-h-[500px] w-full md:w-[550px]">
    <Stepper
      steps={["Days", "Shifts", "Hours", "Roles"]}
      currentStep={currentStep}
    />
    <div className="flex flex-col gap-3">
      <p className="text-md md:text-xl font-light text-gray-500">{title}</p>
      <h2 className="text-xl md:text-3xl font-normal">{subTitle}</h2>
    </div>

    <div>{children}</div>

    <div className="text-sm text-muted-foreground">
      Once you finish, you can always go back and change your selection
    </div>
    <div className="flex flex-col-reverse md:flex-row gap-2 items-center justify-between">
      <Button
        variant="outline"
        className="w-full md:w-auto"
        size="lg"
        onClick={onPreviousButtonOnClick}
      >
        <SlArrowLeft className="mr-3" />
        {previousButtonLabel}
      </Button>
      <Button
        variant="default"
        className="w-full md:w-auto"
        size="lg"
        onClick={onNextButtonOnClick}
      >
        {nextButtonLabel}
        <SlArrowRight className="ml-3" />
      </Button>
    </div>
  </div>
);
