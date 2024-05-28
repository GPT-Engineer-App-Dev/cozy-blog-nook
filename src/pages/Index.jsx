import { Box, Container, Flex, Heading, Link, Text, VStack, HStack, Spacer, IconButton, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram, FaSun, FaMoon, FaTrash } from "react-icons/fa"; // Import icons
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);

  const { colorMode, toggleColorMode } = useColorMode(); // Use color mode hook
  const bg = useColorModeValue("gray.800", "gray.200"); // Background color based on color mode
  const color = useColorModeValue("white", "black"); // Text color based on color mode

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <Container maxW="container.xl">
      {/* Navigation Bar */}
      <Flex as="nav" bg={bg} color={color} p={4} align="center">
        <Heading size="md">My Blog</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Link as={RouterLink} to="/" color={color}>Home</Link>
          <Link as={RouterLink} to="/about" color={color}>About</Link>
          <Link as={RouterLink} to="/contact" color={color}>Contact</Link>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex mt={8} direction={{ base: "column", md: "row" }}>
        {/* Blog Posts Section */}
        <Box flex="3" mr={{ md: 8 }}>
          <VStack spacing={8} align="stretch">
            {posts.map((post, index) => (
              <Box key={index} p={5} shadow="md" borderWidth="1px">
                <Flex justify="space-between" align="center">
                  <Heading fontSize="xl">{post.title}</Heading>
                  <IconButton
                    aria-label="Delete post"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => handleDelete(index)}
                  />
                </Flex>
                <Text mt={4}>{post.content}</Text>
                <Text mt={2} fontSize="sm" color="gray.500">Tags: {post.tags.join(", ")}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Sidebar */}
        <Box flex="1" mt={{ base: 8, md: 0 }}>
          <Heading size="md" mb={4}>Recent Posts</Heading>
          <VStack spacing={4} align="stretch">
            {posts.slice(0, 3).map((post, index) => (
              <Link key={index} href="#">{post.title}</Link>
            ))}
          </VStack>
        </Box>
      </Flex>

      {/* Add Post Button */}
      <Flex justify="center" mt={8}>
        <Button as={RouterLink} to="/add-post" colorScheme="teal">
          Add New Post
        </Button>
      </Flex>

      {/* Footer */}
      <Flex as="footer" bg={bg} color={color} p={4} mt={8} align="center" justify="center">
        <HStack spacing={4}>
          <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
          <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook />} />
          <IconButton as="a" href="#" aria-label="Instagram" icon={<FaInstagram />} />
        </HStack>
      </Flex>
    </Container>
  );
};

export default Index;