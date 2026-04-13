function Topbar({ title, subtitle }) {
  return (
    <header className="h-20 bg-[#FFFFFF] px-5 flex flex-col justify-center border-b border-[#B8C9C4]">
      <h1 className="text-[24px] font-semibold text-[#1F2A37]">
        {title}
      </h1>
      <p className="mt-1 text-[14px] text-[#4B5563]">
        {subtitle}
      </p>
    </header>
  );
}

export default Topbar;