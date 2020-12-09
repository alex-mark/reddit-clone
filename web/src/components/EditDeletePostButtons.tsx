import { Box, IconButton, Link } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
}) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          icon="edit"
          aria-label="edit post"
          alignSelf="start"
          mr={4}
        />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="delete post"
        alignSelf="start"
        onClick={() => deletePost({ id })}
      />
    </Box>
  );
};
