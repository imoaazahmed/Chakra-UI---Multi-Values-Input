import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Container,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  MultiValuesInput,
  OnAddItemProps,
  OnRemoveItemProps,
} from "./multi-values-input";

type FormValues = {
  synonymsList: string[];
};

const schema = yup.object().shape({
  synonymsList: yup.array().of(yup.string()),
});

const defaultValues: FormValues = {
  synonymsList: [],
};

function App() {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const synonymsListValue = watch("synonymsList");

  const onSynonymListAdd = ({ value, clearInput }: OnAddItemProps) => {
    if (!value) return;

    const isSynonymExists = synonymsListValue?.find((s) => s === value);
    if (isSynonymExists)
      return setError(
        "synonymsList",
        { message: "Synonym already exists" },
        { shouldFocus: true },
      );

    setValue("synonymsList", [...synonymsListValue, value], {
      shouldValidate: true,
    });

    // Should be called to empty the input after success add
    clearInput();
  };

  const onSynonymListRemove = ({ item }: OnRemoveItemProps) => {
    setValue(
      "synonymsList",
      synonymsListValue.filter((s) => s !== item),
      { shouldValidate: true },
    );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <Container mt="6">
      <Stack
        as="form"
        id="addSynonymsForm"
        spacing="lg"
        align="end"
        w="full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          control={control}
          name="synonymsList"
          render={() => (
            <FormControl isInvalid={!!errors.synonymsList}>
              <FormLabel>Synonyms</FormLabel>

              <MultiValuesInput.Input
                variant="outline"
                placeholder="Add new synonym"
                type="text"
                onAddItem={onSynonymListAdd}
              />

              <FormErrorMessage>
                {errors.synonymsList?.message}
              </FormErrorMessage>

              <MultiValuesInput.List
                valuesArray={synonymsListValue}
                onRemoveItem={onSynonymListRemove}
              />
            </FormControl>
          )}
        />

        <Button
          variant="solid"
          colorScheme="red"
          type="submit"
          form="addSynonymsForm"
        >
          Submit
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
