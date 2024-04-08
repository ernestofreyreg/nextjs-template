import { FC, PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";

interface FormFrameProps {
  title: string;
  subTitle: string;
  nextButtonLabel: string;
  onNextButtonOnClick: () => void;
  previousButtonLabel: string;
  onPreviousButtonOnClick: () => void;
}

export const FormFrame: FC<PropsWithChildren<FormFrameProps>> = ({
  title,
  subTitle,
  children,
  previousButtonLabel,
  onPreviousButtonOnClick,
  nextButtonLabel,
  onNextButtonOnClick,
}) => (
  <div className="flex flex-col gap-4 p-2 md:p-0 md:min-h-[500px] w-full md:w-[550px]">
    <div className="flex flex-col gap-3">
      <p className="text-md md:text-xl font-light text-gray-500">{title}</p>
      <h2 className="text-xl md:text-3xl font-normal">{subTitle}</h2>
    </div>

    {children}

    <div className="flex flex-row items-center justify-between">
      <Button variant="outline" size="lg" onClick={onPreviousButtonOnClick}>
        {previousButtonLabel}
      </Button>
      <Button variant="default" size="lg" onClick={onNextButtonOnClick}>
        {nextButtonLabel}
      </Button>
    </div>
  </div>
);
