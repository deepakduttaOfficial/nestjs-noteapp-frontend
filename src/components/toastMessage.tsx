import React from "react";
// Chakra components
import { useToast } from "@chakra-ui/react";

// Type Check
interface PropsType {
  title: string;
  description?: string;
  status: "success" | "warning" | "error";
}

const toastMessage = ({ title, description, status }: PropsType): void => {
  const toast = useToast();
  toast({
    title: title,
    description: description,
    status: status,
    position: "top-right",
    duration: 9000,
    isClosable: true,
  });
};

export default toastMessage;
