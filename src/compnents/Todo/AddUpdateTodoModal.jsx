import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

export const AddUpdateTodoModal = ({
  editable = false,
  url ="",
  defaultValues,
  onSuccess = () => {},
  ...rest
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { todo_id } = useParams();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      if (editable) {
        await axiosInstance.put(`/todo/${todo_id}`, values);
      } else {
        await axiosInstance.post(`/todo/create`, values);
      }
      toast({
        title: editable ? "Todo Updated" : "Todo Added",
        status: "success",
        isClosable: true,
        diration: 1500,
      });
      onClose();
      onSuccess(url);
      // navigate('/')
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        diration: 1500,
      });
    }
  };

  return (
    <Box {...rest}>
      <Button w="100%" colorScheme="green" mt={6} onClick={onOpen}>
        {editable ? "UPDATE TODO" : "ADD TODO"}
      </Button>
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{editable ? "UPDATE TODO" : "ADD TODO"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.title}>
                <Input
                  placeholder="Todo Title...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("title", {
                    required: "This is required field",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                    maxLength: {
                      value: 55,
                      message: "Title must be at most 55 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description}>
                <Textarea
                  rows={5}
                  placeholder="Add description...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="test"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("description", {
                    required: "This is required field",
                    minLength: {
                      value: 5,
                      message: "Description must be at least 5 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description must be at most 200 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
              <Controller
                control={control}
                name="status"
                render={({field: {onChange, onBlur,value,ref}})=>(
                  <FormControl mt={6} display="flex" alignItems="center">
                    <FormLabel htmlFor="is-done">Status</FormLabel>
                    <Switch
                      // onChange={(e) => field.onChange(e.target.checked)}
                      onChange={onChange}
                      isChecked={value}
                      id="id-done"
                      size="lg"
                      name="status"
                      isDisabled={false}
                      isLoading={false}
                      colorScheme="green"
                      variant="ghost"
                    />
                  </FormControl>
                  )}
              />
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText={editable ? "Updating" : "Creating"}
                >
                  {editable ? "Update" : "Create"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
