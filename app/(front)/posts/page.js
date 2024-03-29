import Page from "@/app/components/page";
import SectionTitle from "@/app/components/sectionTitle";
import SectionDescription from "@/app/components/sectionDescription";
import supabase from "@/app/lib/supabase";
import Post from "@/app/components/post";
import PostNotFound from "@/app/components/postNotFount";

export const revalidate = 60;

export const getPosts = async () => {
  const { data: posts } = await supabase
    .from("posts")
    .select(
      `title, excerpt, slug, publish_time, content, profiles(*), categories(*)`
    )
    .eq("status", "published")
    .order("publish_time", { ascending: false });

  return posts;
};

const Posts = async () => {
  const posts = await getPosts();

  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        {posts.length ? (
          <>
            <div className="mx-auto max-w-2xl lg:mx-0  px-6 lg:px-8">
              <SectionTitle title="From the blog" />
              <SectionDescription description="List of all posts" />
            </div>
            <Post posts={posts} page="posts" />
          </>
        ) : (
          <PostNotFound />
        )}
      </div>
    </Page>
  );
};

export default Posts;
