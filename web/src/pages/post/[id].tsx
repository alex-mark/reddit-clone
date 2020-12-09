import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeletePostButtons } from "../../components/EditDeletePostButtons";
import { Layout } from "../../components/Layout";
import { useMeQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <div>could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex>
        <Box flex={1}>
          <Heading mb={4}>{data.post.title}</Heading>
        </Box>
        {!(meData?.me?.id === data.post.creator.id) ? null : (
          <EditDeletePostButtons id={data.post.id} />
        )}
      </Flex>
      <Text>{data.post.text}</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
