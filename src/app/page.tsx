import Header from "@/components/Header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Editor from "@/components/Editor";


export default function Home() {


  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="max-w-full">
          <Header />
          <Editor />
        </SidebarInset>
      </SidebarProvider>

    </>
  );
}
