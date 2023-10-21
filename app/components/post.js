import Link from "next/link";
import Image from "next/image";
import { formatDistanceFromNow } from "@/app/utils/helpers";
import PostCategories from "./postCategories";

const Post = ({ posts, page }) => {
  return (
    <div className="mx-auto mt-10 max-w-2xl border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 space-y-20">
      {posts.map((post) => (
        <article
          key={post.id}
          className="flex  flex-col items-start justify-between"
        >
          <div className="flex items-center justify-between gap-x-4 text-xs w-full">
            <time dateTime={post?.publish_time} className="text-gray-500">
              {formatDistanceFromNow(post?.publish_time)}
            </time>
            <PostCategories categories={post?.categories} page={page} />
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
          {page !== "author" && (
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
                  <Link href={`/author/${post?.profiles?.slug}`}>
                    <span className="absolute inset-0" />
                    {post?.profiles?.full_name}
                  </Link>
                </p>
                <p className="text-gray-600">{post?.profiles?.position}</p>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
};

export default Post;
