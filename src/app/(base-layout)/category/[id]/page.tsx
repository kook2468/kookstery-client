import CategoryHeader from "./category-header";
import ProductList from "./product-list";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      {/* title */}
      <CategoryHeader categoryId={id} />
      {/* body */}
      <ProductList categoryId={id} />
    </div>
  );
}
