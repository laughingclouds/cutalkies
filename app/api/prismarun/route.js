import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
  {id: 1, title: "How can I improve my JavaScript skills?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut massa libero. Praesent vitae mattis nisi, pellentesque volutpat velit. Ut augue urna, elementum a sem eget, blandit pellentesque nisi. Sed eget enim hendrerit, molestie massa sit amet, dictum erat. Maecenas a feugiat nisl. Curabitur ullamcorper at odio in consectetur. Proin fermentum ipsum felis, eget rhoncus nisl facilisis venenatis. Vestibulum rhoncus, leo a feugiat gravida, urna orci lacinia tellus, at iaculis nisl quam et diam. Vestibulum id turpis eros. Curabitur sit amet placerat dui. Aenean sit amet laoreet nulla, ac dignissim dui. Sed convallis dolor ut sem pellentesque, nec pulvinar ex imperdiet. Mauris mi nunc, fermentum id ex faucibus, aliquam dignissim elit.", communityId: 1},
  {id: 2, title: "I'm getting tired of these lorem texts.", communityId: 1}
 */
async function main() {
  
}

export async function GET(request) {
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
    })

  return new Response("check the db now!");
}