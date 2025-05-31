import {
  ManagerLayout,
  ManagerLayoutHeader,
  HeaderActions,
} from "@/Layouts/ManagerLayout";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";

export default function UserView() {
  return (
    <ManagerLayout>
      <ManagerLayoutHeader
        count={0}
        title="Usuarios"
        description="This is a test description"
      ></ManagerLayoutHeader>

    <HeaderActions className="justify-between">
        <Button>Nuevo</Button> 

        <SearchBar 
        ></SearchBar>
    </HeaderActions>

    </ManagerLayout>
  );
}
