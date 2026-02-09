export default function PrimaryCard({
  title,
  description,
  href,
  disabled,
}: {
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
}) {
  const card = (
    <div
      className={`rounded-xl border p-6 transition ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-lg cursor-pointer bg-white"
      }`}
    >
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );

  if (disabled) return card;
  return <a href={href}>{card}</a>;
}
