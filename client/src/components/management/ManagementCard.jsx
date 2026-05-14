import { Plus, Wrench } from "lucide-react";

function ManagementCard({
  title,
  description,
  buttonText,
  buttonIcon: ButtonIcon = Plus,
  onButtonClick,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E5DF] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-[#0F7A4F]" />
            <h2 className="text-lg font-bold text-[#0B2B26]">{title}</h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        {buttonText && (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center gap-2 rounded-xl bg-[#0F6B3D] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0B5631]"
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
