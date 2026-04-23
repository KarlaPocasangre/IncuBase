function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#082d27]">
      <div className="absolute inset-0 z-[1] overflow-hidden blur-[80px]">
        <div className="bubble bubble-1 absolute rounded-full bg-[#17bb9a] opacity-75" />
        <div className="bubble bubble-2 absolute rounded-full bg-[#00796b] opacity-75" />
      </div>

      <div className="absolute inset-0 z-[2] bg-[#082d27]/12" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout