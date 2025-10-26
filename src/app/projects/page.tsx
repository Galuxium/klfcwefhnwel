// prisma-client.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

// useUser.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { clerkClient } from '@clerk/nextjs/server';
import { getUserFromSessionId } from '@clerk/nextjs/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: {
    emailAddress: string;
    verified: boolean;
  }[];
  publicMetadata: {
    isAdmin: boolean;
  };
}

export const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sessionId = router.query.sessionId as string;
    if (!sessionId) return;

    const fetchUser = async () => {
      const user = await getUserFromSessionId(sessionId);
      if (!user) return;

      const userData = await clerkClient.users.getUser(user.id);
      setUser(userData);
    };

    fetchUser();
  }, [router.query.sessionId]);

  return user;
};

// pages/projects.tsx
import { useUser } from '../lib/useUser';
import prisma from '../lib/prisma-client';
import { Project } from '../types/project';

interface Props {
  projects: Project[];
}

const Projects = ({ projects }: Props) => {
  const user = useUser();

  return (
    <div>
      <h1>Projects</h1>
      {user?.publicMetadata.isAdmin && (
        <button>Create New Project</button>
      )}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  return { props: { projects } };
};

export default Projects;

// types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}