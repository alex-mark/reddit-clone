import { Flex, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import {
  Post,
  PostSnippetFragment,
  useVoteMutation,
  VoteMutationVariables,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoading] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        icon="chevron-up"
        aria-label="vote up"
        isLoading={loadingState === "updoot-loading"}
        onClick={async () => {
          setLoading("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoading("not-loading");
        }}
      />
      {post.points}
      <IconButton
        icon="chevron-down"
        aria-label="vote down"
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          setLoading("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoading("not-loading");
        }}
      />
    </Flex>
  );
};
