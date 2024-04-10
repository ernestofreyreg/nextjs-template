import { FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormActionsProps,
  RolesFormValues,
} from "@/app/(public)/create/components/schemas";
import { FormFrame } from "@/app/(public)/create/components/FormFrame";

type Step4Props = {} & FormActionsProps;

export const Step4: FC<Step4Props> = (props) => {
  const form = useFormContext<RolesFormValues>();

  return (
    <FormFrame
      title="Let's create a new schedule"
      subTitle="Add your current and future employees to the schedule"
      currentStep={4}
      {...props}
    >
      <div className="grid grid-cols-6 bg-gray-50 p-3">
        <div className="text-md font-medium">Qty</div>
        <div className="col-span-2 text-md font-medium">Role</div>
        <div className="text-md font-medium">Existing</div>
        <div className="text-md font-medium">Rate</div>
        <div className="text-md font-medium">Hours</div>
      </div>
    </FormFrame>
  );
};
