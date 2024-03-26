import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import {
  LoginFormSchema,
  LoginFormValues,
  VerifyFormSchema,
  VerifyFormValues,
} from "./schema";

interface LoginFlexProps {
  step: "login" | "verify";
  onLogin: (data: LoginFormValues) => void;
  onVerify: (data: VerifyFormValues) => void;
  onBackToPhone: () => void;
  isLoading?: boolean;
  isVerifying?: boolean;
  isError?: string;
}

export const LoginView: FC<LoginFlexProps> = ({
  step,
  onLogin,
  onVerify,
  onBackToPhone,
  isLoading,
  isVerifying,
  isError,
}) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const verifyForm = useForm<VerifyFormValues>({
    resolver: zodResolver(VerifyFormSchema),
  });

  return (
    <Flex className="bg-gray-100 w-full h-full">
      <Flex className="h-full w-full flex">
        <Flex className="flex items-center">
          <Text>
            {step === "login" && "Enter your phone number"}
            {step === "verify" && "Enter the code sent to your phone"}
          </Text>
        </Flex>

        {step === "login" && (
          <Flex className="flex items-start mx-8">
            <Text className="mb-2">Phone number</Text>
            <Controller
              control={form.control}
              name="phone"
              render={({ field }) => (
                <Input onChange={field.onChange} value={field.value} />
              )}
            />

            <Button
              title="Start"
              onClick={form.handleSubmit(onLogin)}
              isLoading={isLoading}
            />

            {isError && (
              <Flex className="w-full">
                <Text className="text-red-500 text-center">{isError}</Text>
              </Flex>
            )}
          </Flex>
        )}
        {step === "verify" && (
          <Flex className="flex items-start mx-8">
            <Text className="mb-2">Security code</Text>
            <Controller
              control={verifyForm.control}
              name="token"
              render={({ field }) => (
                <Input onChange={field.onChange} value={field.value} />
              )}
            />

            <Button
              title="Start"
              onClick={verifyForm.handleSubmit(onVerify)}
              isLoading={isVerifying}
            />

            {isError && (
              <Flex className="w-full">
                <Text className="text-red-500 text-center">{isError}</Text>
              </Flex>
            )}

            <Button title="Go back" onClick={onBackToPhone} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
