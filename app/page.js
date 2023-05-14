import { PrismaClient } from "@prisma/client";
import { Card, CardBody, CardContent, CardTitle } from "./components/CommunityCard";

const prisma = new PrismaClient();

async function getData() {
  let communities = [
    { id: 0, name: 'all', description: 'All posts from all communities' },
    {
      id: 1,
      name: 'CodeParadise',
      description: 'All about coding & development!'
    },
    {
      id: 2,
      name: 'foodies',
      description: 'We love food and we love talking about it'
    },
    {
      id: 3,
      name: 'placements',
      description: 'Desperate for a job? Discuss everything related to scoring a job, here'
    },
    {
      id: 4,
      name: 'gaming',
      description: 'Discussions on new games, events, and more!'
    },
    {
      id: 4,
      name: 'gaming',
      description: 'Discussions on new games, events, and more!'
    },
    {
      id: 4,
      name: 'gaming',
      description: 'Discussions on new games, events, and more!'
    },
    {
      id: 4,
      name: 'gaming',
      description: 'Discussions on new games, events, and more!'
    },
  ]
  await prisma.$disconnect();
  return communities;
}

export default async function Home() {
  let communities = await getData();
  console.log(communities);
  return (
    <>
      <h2>
        Which community would you like to view today?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {communities?.map(community => {
          return (
            <Card key={community.id}>
              <CardBody>
                <CardTitle>{community.name}</CardTitle>
                <CardContent>{community.description}</CardContent>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}