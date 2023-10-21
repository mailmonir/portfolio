import Page from "@/app/components/page";
import SectionTitle from "@/app/components/sectionTitle";
import SectionDescription from "@/app/components/sectionDescription";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { formatDistanceFromNow } from "@/app/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Categories from "./components/categories";

export const revalidate = 3600;

export const getPosts = cache(async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `title, excerpt, slug, publish_time, content, profiles(full_name, avatar_url, position, slug ), categories(id, name, slug)`
    )
    .eq("status", "published")
    .order("publish_time", { ascending: false });

  if (error) console.log(error);

  return posts;
});

const Posts = async () => {
  const posts = await getPosts();

  return (
    <Page>
      <div className="mx-auto max-w-2xl">
        {posts.length ? (
          <>
            <div className="mx-auto max-w-2xl lg:mx-0  px-6 lg:px-8">
              <SectionTitle title="From the blog" />
              <SectionDescription description="Learn how to grow your business with our expert advice." />
            </div>

            <div className="mx-auto mt-10 max-w-2xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 space-y-20">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex  flex-col items-start justify-between"
                >
                  <div className="flex items-center justify-between gap-x-4 text-xs w-full">
                    <time
                      dateTime={post?.publish_time}
                      className="text-gray-500"
                    >
                      {formatDistanceFromNow(post?.publish_time)}
                    </time>
                    <Categories categories={post?.categories} />
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/posts/${post?.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post?.excerpt}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <Image
                      src={post?.profiles?.avatar_url}
                      alt={post?.profiles?.full_name}
                      className="h-10 w-10 rounded-full bg-gray-50"
                      width={400}
                      height={400}
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link href={`/posts/author/${posts?.profiles?.slug}`}>
                          <span className="absolute inset-0" />
                          {post?.profiles?.full_name}
                        </Link>
                      </p>
                      <p className="text-gray-600">
                        {post?.profiles?.position}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="mx-auto max-w-2xl lg:mx-0  px-6 lg:px-8 mt-10 font-medium text-center">
            Sorry, we didn&apos;t find any post to show
          </p>
        )}
      </div>
    </Page>
  );
};

export default Posts;
