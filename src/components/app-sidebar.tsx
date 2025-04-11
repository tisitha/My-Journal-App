import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarContentPanel from "./SidebarContentPanel";


export function AppSidebar() {

    return (
        <Sidebar>
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContentPanel />
            <SidebarFooter />
        </Sidebar>
    )
}
