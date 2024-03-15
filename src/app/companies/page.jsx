import { Companies } from "@/components/Companies";
import { protectPage } from "@/services/protectPage";

export default async function Page() {
  await protectPage();

  return (
    <div>
      <h1>Companies</h1>
      <Companies />
    </div>
  );
}
