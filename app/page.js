import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "./components/CommunityCard";
import { headers, cookies } from "next/headers";
import FormCard from "./components/FormCard";

export default async function Home() {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies
  })
  let { data: communities } = await supabase.from('communities').select();

  return (
    <>
      <h2 className="pb-12">
        Which community would you like to view today?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        <FormCard />

        {communities?.map(community => {
          return <Card community={community} key={community.id} href={`/${community.name}`} />;
        })}
      </div>
    </>
  );
}