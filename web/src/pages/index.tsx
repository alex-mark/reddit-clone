import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
  useUpdatePostMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery();
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

  return (
    <Layout>
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Flex flex={1}>
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>posted by {p.creator.username}</Text>
                    <Text mt={4}>{p.textSnippet}</Text>
                  </Box>

                  {!(meData?.me?.id === p.creator.id) ? null : (
                    <Box>
                      <NextLink
                        href="/post/edit/[id]"
                        as={`/post/edit/${p.id}`}
                      >
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
                        onClick={() => deletePost({ id: p.id })}
                      />
                    </Box>
                  )}
                </Flex>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
