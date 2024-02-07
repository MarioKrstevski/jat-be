const { PrismaClient } = require("@prisma/client");

type Company = {
  name: string;
  industry: string;
  companySize: string;
  description: string;
  linkedin: string;
  logo: string;
  website: string;
};

const tempPrismaDb = new PrismaClient();
async function createCompanies(companies: Company[]) {
  try {
    const createdCompanies = await tempPrismaDb.company.createMany({
      data: companies,
    });

    console.log("Companies created:", createdCompanies);
  } catch (error) {
    console.error("Error creating companies:", error);
  } finally {
    await tempPrismaDb.$disconnect();
  }
}

const companies: Company[] = [
  {
    name: "MCA.mk",
    industry: "Technology, IT",
    companySize: "Medium",
    description: "Build better, not more",
    linkedin: "https://www.linkedin.com/company/mca-dooel/",
    logo: "https://media.licdn.com/dms/image/C4E0BAQHb7GpEYhlOHA/company-logo_200_200/0/1630586926782/mca_dooel_logo?e=1715212800&v=beta&t=ezBigmtYEmeRNBGyFiduJTZ8x7NZLHUQv6MxPTSb4RE",
    website: "https://www.mca.mk/",
  },
  {
    name: "Netcetera",
    industry: "Technology, IT",
    companySize: "Large",
    description:
      "Software Development Zürich, Schweiz 25K followers 501-1K employees",
    linkedin: "https://www.linkedin.com/company/netcetera/",
    logo: "https://media.licdn.com/dms/image/C560BAQHVmq49XVp7Ow/company-logo_200_200/0/1630603919096/netcetera_logo?e=1715212800&v=beta&t=k9eWE4JZ6pIUYjf_Tm9lr-OpwYr5-Kx-qOggrx4zWw8",
    website: "https://www.netcetera.com/home.html",
  },
  {
    name: "Connect Macedonia",
    industry: "Technology, IT",
    companySize: "Small",
    description:
      "Connect is a premium outsourcing company helping businesses hire, scale and save. Sourcing for 🇺🇸 🇬🇧 🇪🇺",
    linkedin: "https://www.linkedin.com/company/company-a",
    logo: "https://media.licdn.com/dms/image/D4D0BAQHqeDHs2KpJgA/company-logo_200_200/0/1685284354961/connect_macedonia_logo?e=1715212800&v=beta&t=4TwiqSjR5RB0kn1obKb4TH8Y7jF3iN-1m0JhSEZcu1o",
    website: "https://connectmkd.com/",
  },
  {
    name: "Nobel Courses Macedonia",
    industry: "Education",
    companySize: "Small",
    description:
      "Nobel Courses enables success within kids through Roblox Game Development, Programming",
    linkedin: "https://www.linkedin.com/company/nobelcourses/",
    logo: "https://media.licdn.com/dms/image/D4D0BAQE0v1Ju88X82g/company-logo_200_200/0/1704921823277?e=1715212800&v=beta&t=jw5C0_fz49lK8gyLtPMGDK96t_jinxIYoX59Eiif5uE",
    website: "https://nobelcourses.com/",
  },
];
// Uncomment when you want to create again, but becareful, it will create duplicates
// createCompanies(companies);
