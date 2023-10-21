import Page from "@/app/components/page";
import SectionTitle from "@/app/components/sectionTitle";
import SectionDescription from "@/app/components/sectionDescription";
import supabase from "@/app/lib/supabase";
import PostNotFound from "@/app/components/postNotFount";
import Post from "@/app/components/post";

export const revalidate = 60;

export const getPosts = async (slug) => {
  const { data: posts } = await supabase
    .from("posts")
    .select(`*, profiles(*), categories!inner(slug)`)
    .eq("categories.slug", slug)
    .eq("status", "published")
    .order("publish_time", { ascending: false });

  return posts;
};

const Posts = async ({ params: { slug } }) => {
  const posts = await getPosts(slug);

  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        {posts.length ? (
          <>
            <div className="mx-auto max-w-2xl lg:mx-0  px-6 lg:px-8">
              <SectionTitle
                title={`CATEGORY: ${slug.toUpperCase().split("_").join(" ")}`}
              />
              <SectionDescription description="Posts by category" />
            </div>
            <Post posts={posts} page="category" />
          </>
        ) : (
          <PostNotFound />
        )}
      </div>
    </Page>
  );
};

export default Posts;
