import { getErrorMessage } from "@api/handleApiError";
import { sendMessageAPI } from "@api/main";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, RHFInput } from "@components/hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormattedMessage, useIntl } from "react-intl";

const ContactModal = ({ isOpen, onClose, productId }) => {
  const intl = useIntl();
  const toast = useToast();

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const ContactSchema = yup.object().shape({
    firstName: yup.string().required().max(256),
    lastName: yup.string().required().max(256),
    email: yup.string().email().required().max(256),
    phoneNumber: yup.string().required(),
    message: yup.string().required(),
  });

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(ContactSchema),
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit = async (data) => {
    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
      productId: Number(productId),
    };
    try {
      await sendMessageAPI(formData);
      toast({
        title: "Success",
        description: intl.formatMessage({ id: "toast.messageContactSuccess" }),
        status: "success",
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Api error",
        description: getErrorMessage(error),
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={["sm", "2xl", "2xl", "3xl", "3xl"]}>
      <ModalOverlay />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ModalContent p={[5, 5, 5, 10, 10]} sx={{ borderRadius: "20px !important" }}>
          <ModalBody>
            <Grid templateColumns="repeat(2,1fr)" gap={10}>
              <GridItem colSpan={[2, 1, 1, 1, 1]}>
                <Box>
                  <Text>
                    <FormattedMessage id="label.firstName" />
                  </Text>
                  <RHFInput name="firstName" variant="flushed" />
                </Box>
              </GridItem>
              <GridItem colSpan={[2, 1, 1, 1, 1]}>
                <Box>
                  <Text>
                    <FormattedMessage id="label.lastName" />
                  </Text>
                  <RHFInput name="lastName" variant="flushed" />
                </Box>
              </GridItem>
              <GridItem colSpan={[2, 1, 1, 1, 1]}>
                <Box>
                  <Text>
                    <FormattedMessage id="label.email" />
                  </Text>
                  <RHFInput name="email" variant="flushed" />
                </Box>
              </GridItem>
              <GridItem colSpan={[2, 1, 1, 1, 1]}>
                <Box>
                  <Text>
                    <FormattedMessage id="label.phoneNumber" />
                  </Text>
                  <RHFInput name="phoneNumber" variant="flushed" />
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Text>
                    <FormattedMessage id="label.message" />
                  </Text>
                  <RHFInput
                    placeholder={intl.formatMessage({ id: "placeholder.message" })}
                    name="message"
                    variant="flushed"
                  />
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter pt={10}>
            <Button
              _hover={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.27);" }}
              disabled={!isDirty || !isValid}
              type="submit"
              p={6}
              bg="#000000"
              variant="solid"
              fontWeight="500"
              textTransform="none"
            >
              <FormattedMessage id="button.sendMessage" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
};

export default ContactModal;
