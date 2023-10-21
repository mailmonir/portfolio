import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cookies } from "next/headers";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";

import supabase from "@/app/lib/supabase";
import Page from "@/app/components/page";
import Categories from "../components/categories";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: posts } = await supabase.from("posts").select("slug");

  return posts.map((post) => ({ slug: post.slug }));
}

const getPost = cache(async function (slug) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: post } = await supabase
    .from("posts")
    .select(
      `*, profiles(full_name, bio, avatar_url, twitter_handle, website), categories(id, name, slug))`
    )
    .match({ slug })
    .single();

  return post;
});

const PostDetails = async ({ params: { slug } }) => {
  const post = await getPost(slug);

  const markdown = post?.content;

  if (!post) {
    notFound();
  }

  return (
    <Page>
      <div className="relative isolate overflo-hidden">
        <div className="mx-auto max-w-7xl gap-x-6 lgp:x-8">
          <div className="mx-auto max-w-2xl lg:ml-0">
            <div>
              {post?.feature_image && (
                <Image
                  src={post?.feature_image}
                  alt={post?.title}
                  width={750}
                  height={400}
                  className="mb-4 w-full h-auto object-cover"
                />
              )}
            </div>
            <p className="text-lg font-semibold leading-8 tracking-tight text-sky-500">
              {format(new Date(post?.publish_time), "do MMMM, cccc, yyyy")}
            </p>
            <div className="py-6 text-sm">
              <Categories categories={post?.categories} />
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {post?.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-700">
              {post?.excerpt}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
            <div className="relative lg:order-last lg:col-span-5">
              <figure className="border-l border-sky-400 pl-8">
                <blockqnonete className="text-base italic font-normal leading-6 tracking-tight text-gray-500">
                  {post?.profiles?.bio}
                </blockqnonete>
                <figcaption className="mt-8 flex gap-x-4">
                  <Image
                    src={post?.profiles?.avatar_url}
                    alt={post?.profiles?.full_name}
                    className="mt-1 h-10 w-10 flex-none rounded-full bg-gray-50"
                    width={400}
                    height={400}
                  />
                  <div className="text-sm leading-6">
                    <div className="font-semibold text-gray-500">
                      {post?.profiles?.website ? (
                        <a href={post?.profiles?.website}>
                          {post?.profiles?.full_name}
                        </a>
                      ) : (
                        post?.profiles?.full_name
                      )}
                    </div>
                    <div className="text-gray-600">
                      {post?.profiles?.twitter_handle}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className=" max-w-xl text-base leading-7 text-gray-700 lg:col-span-7 markdown">
              {/* <div dangerouslySetInnerHTML={{ __html: post?.content }}></div> */}
              <MDXRemote source={markdown} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PostDetails;
