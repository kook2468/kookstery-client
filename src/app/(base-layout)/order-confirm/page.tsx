export const dynamic = "force-dynamic";

interface OrderConfirmPageProps {
  searchParams: { status?: string };
}
export default function page({ searchParams }: OrderConfirmPageProps) {
  console.log("searchParams", searchParams);
  const { status } = searchParams;
  console.log("status", status);

  const isSuccess = status === "success";

  return (
    <div className="py-10 text-center">
      {isSuccess ? (
        <div>
          <h1 className="text-2xl font-bold text-green-600">
            주문이 완료되었습니다 🎉
          </h1>
          <p className="mt-4 text-gray-600">
            주문 내역은 마이페이지에서 확인하실 수 있습니다.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-red-500">
            주문에 실패했습니다 😢
          </h1>
          <p className="mt-4 text-gray-600">
            문제가 계속된다면 고객센터에 문의해주세요.
          </p>
        </div>
      )}
    </div>
  );
}
