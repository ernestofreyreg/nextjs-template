import { Company } from "@/components/Company";
import { protectPage } from "@/services/protectPage";

export default async function Page({ params }) {
  await protectPage();

  return (
    <div>
      <Company id={params.id} />
    </div>
  );
}
