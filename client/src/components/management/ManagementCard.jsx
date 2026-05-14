import { Plus, Wrench } from "lucide-react";

function ManagementCard({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon = Plus,
  cardIcon: CardIcon = Wrench,
  cardIconColor = "text-[#0F7A4F]",
  onButtonClick,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CardIcon className={`h-5 w-5 ${cardIconColor}`} />
            <h2 className="text-lg font-bold text-[#0B2B26]">{title}</h2>
          </div>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        {buttonText && (
          <button
            type="button"
            onClick={onButtonClick}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0F6B3D] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0B5631] hover:shadow-md active:translate-y-0"
          >
            <ButtonIcon className="h-4 w-4" />
            {buttonText}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

export default ManagementCard;
