import { Box, Flex, Heading, HStack, Text, useToast } from "@chakra-ui/react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Input } from "../Input";
import Check from "../../assets/check.png";
import Liters from "../../assets/liters.png";
import Local from "../../assets/local.png";
import Plus from "../../assets/plus.png";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useSell } from "../../contexts/SellOilRequest";

interface IProductCardProps {
  name: string;
  city: string;
  state: string;
  cep: number;
  amountOfOil: number;
  userId: number;
  accessToken: string;
  id: number;
}

interface SaleData {
  name: string;
  amountOfOil: number;
  userId: number;
}

export const ProductCard = ({
  name,
  city,
  state,
  cep,
  amountOfOil,
  userId,
  accessToken,
  id,
}: IProductCardProps) => {
  const { addProduct } = useCart();
  const { attOilSeller } = useSell();
  const toast = useToast();
  const [quantity, setQuantity] = useState(0 as number);

  const handleSubmit = () => {
    if (amountOfOil - quantity >= 0) {
      addProduct({ name, quantity, userId }, accessToken);
      attOilSeller({ amountOfOil, userId }, id, quantity, accessToken);
      toast({
        title: `Adicionado no carrinho`,
        status: "success",
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: `Quantidade indisponivel`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      bg="#FEFBFB"
      boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
      flexDir={["column", "column", "row", "row"]}
      padding="0px 20px"
    >
      <HStack
        spacing={["0", "0", "10"]}
        flexDirection={["column", "column", "row", "row"]}
        alignItems={["flex-start", "flex-start", "center"]}
      >
        <Flex
          as="figure"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Flex
            as="figcaption"
            textAlign="center"
            flexDirection={["row", "row", "column", "column"]}
          >
            <Box>
              <Icon src={Check} size="96" margin="0 auto" />
            </Box>
            <Flex
              flexDirection="column"
              justifyContent="center"
              ml={["20px", "20px", "0"]}
            >
              <Heading as="h2" fontSize={["20px", "20px", "30px", "36px"]}>
                Disponível
              </Heading>
              <Heading as="h3" fontSize="24px">
                <b>Vendedor:</b>&nbsp;{name}
              </Heading>
            </Flex>
          </Flex>
        </Flex>
        <Flex as="figure" alignItems="center" flexDirection="row-reverse">
          <Flex flexDirection="column" textAlign="center">
            <Text as="figcaption" fontSize="24px">
              Endereço
            </Text>
            <Text>
              Cidade: {city} - {state}
            </Text>
            <Text>CEP: {cep}</Text>
          </Flex>
          <Icon src={Local} size="96" mr="20px" />
        </Flex>
        <Flex as="figure" alignItems="center">
          <Icon src={Liters} size="96" />
          <Box textAlign="center">
            <Text>Quantos litros</Text>
            <Input
              bg="#FEFBFB"
              border="2px solid #027847"
              boxSizing="border-box"
              name="quantity"
              type="number"
              onChangeCapture={(evt) =>
                setQuantity(parseInt(evt.currentTarget.value))
              }
            />
            <Text as="figcaption">{amountOfOil} litros disponíveis</Text>
          </Box>
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          alignSelf="center"
        >
          <Text display={["none", "none", "inline"]}>Adicionar</Text>
          <Flex as="button" alignItems="center" onClick={() => handleSubmit()}>
            <Icon src={Plus} size="96" />
          </Flex>
        </Flex>
      </HStack>
    </Flex>
  );
};
