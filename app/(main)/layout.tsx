import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";

export default function Layout({children}:{children:React.ReactNode}){
    return <div className="flex flex-col min-h-screen pt-16">
        <Header />
        {children}
        <Footer />
        </div>
}
