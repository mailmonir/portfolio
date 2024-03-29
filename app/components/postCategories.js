import Link from "next/link";

const PostCategories = ({ categories, page }) => {
  return (
    <>
      {page !== "category" && (
        <div>
          {categories?.map((category) => (
            <Link
              key={category?.id}
              href={`/category/${category?.slug}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {category?.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default PostCategories;
