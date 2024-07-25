import { Navbar } from "../Export"

const Layout = ({ children } : { children: React.ReactNode}) => {
  return (
    <div className="min-h-screen w-screen bg-[#282c34] text-[#61dafb]">
        <Navbar />
        {children}
    </div>
  )
}

export default Layout