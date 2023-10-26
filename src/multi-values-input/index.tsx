import {
  Flex,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AddIcon } from "./icons/add-icon";
import { BoxIcon } from "./icons/box-icon";
import { RemoveIcon } from "./icons/remove-icon";

// Base Multi Input
export const MultiValuesInput = () => {
  return null;
};

type TInputs = {
  value: string;
};

const defaultValues: TInputs = {
  value: "",
};

export type OnAddItemProps = {
  value: string;
  clearInput: () => void;
};

export type OnRemoveItemProps = {
  item: string;
};

// Input
interface InputElementProps extends InputProps {
  onAddItem: ({ value, clearInput }: OnAddItemProps) => void;
}

export const InputElement = (props: InputElementProps) => {
  const { onAddItem, ...rest } = props;

  const { register, setValue, watch } = useForm<TInputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { ...defaultValues },
  });

  const value = watch("value");

  const clearInput = () => {
    setValue("value", defaultValues.value);
  };

  const internalOnAddItem = () => {
    return onAddItem({ value, clearInput });
  };

  return (
    <InputGroup>
      <Input type="text" variant="outline" {...register("value")} {...rest} />

      <InputRightElement
        cursor={value ? "pointer" : "default"}
        onClick={internalOnAddItem}
      >
        <AddIcon fill={value ? "red.500" : "gray.200"} />
      </InputRightElement>
    </InputGroup>
  );
};

// List
interface ListSectionProps extends StackProps {
  valuesArray: string[];
  onRemoveItem: ({ item }: OnRemoveItemProps) => void;
}

const ListSection = (props: ListSectionProps) => {
  const { valuesArray, onRemoveItem, ...rest } = props;

  const internalOnRemoveItem = (item: string) => {
    return onRemoveItem({ item });
  };

  return (
    <VStack spacing=".5rem" align="stretch" mt="1rem" {...rest}>
      {valuesArray?.map((value) => (
        <Flex key={value} justify="flex-start" align="center">
          <BoxIcon me="1rem" />

          <Text textAlign="start" flex={1}>
            {value}
          </Text>

          <RemoveIcon
            cursor="pointer"
            onClick={() => internalOnRemoveItem(value)}
          />
        </Flex>
      ))}
    </VStack>
  );
};

MultiValuesInput.Input = InputElement;
MultiValuesInput.List = ListSection;
