import { Company } from "@/components/Company";

export default async function Page({ params }) {
  return (
    <div>
      <Company id={params.id} />
    </div>
  );
}
