type CheckoutSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function CheckoutSection({
  title,
  children,
}: CheckoutSectionProps) {
  return (
    <div className="pt-3 pb-6">
      <h2 className="text-lg pb-2">{title}</h2>
      <hr className="sub-line" />
      <div className="py-3">{children}</div>
    </div>
  );
}
